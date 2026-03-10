import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto';

/**
 * Initialize Cloudflare R2 S3 Client
 */
let r2Client = null;

const getR2Client = () => {
    if (!r2Client) {
        if (!process.env.R2_ENDPOINT || !process.env.R2_ACCESS_KEY || !process.env.R2_SECRET_KEY) {
            throw new Error('R2 credentials missing from environment variables');
        }
        r2Client = new S3Client({
            region: "auto",
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY,
                secretAccessKey: process.env.R2_SECRET_KEY,
            },
        });
    }
    return r2Client;
};

/**
 * Uploads a Base64 string to Cloudflare R2
 * @param {string} base64Data - The full data URI or raw Base64 string
 * @param {string} folder - The folder to store the file in (e.g., 'reviews/audio')
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadToR2 = async (base64Data, folder = 'media') => {
    try {
        if (!base64Data || !base64Data.includes('base64,')) {
            return base64Data; // Not a base64 string, return as is (could be a URL)
        }

        // Extract mime type and actual base64 content
        const [meta, data] = base64Data.split('base64,');
        const mimeType = meta.split(':')[1].split(';')[0];
        const buffer = Buffer.from(data, 'base64');

        // Generate a unique filename
        const extension = mimeType.split('/')[1] || 'bin';
        const fileName = `${folder}/${crypto.randomBytes(16).toString('hex')}.${extension}`;

        const uploadParams = {
            Bucket: process.env.R2_BUCKET,
            Key: fileName,
            Body: buffer,
            ContentType: mimeType,
            // ACL: 'public-read' is not always needed for R2 if you use a public worker/domain
        };

        await getR2Client().send(new PutObjectCommand(uploadParams));

        // Construct the URL. Note: R2 usually needs a custom domain or the public bucket URL.
        // If the user has a custom domain, they should provide R2_PUBLIC_URL.
        // Otherwise, we use the S3 API endpoint format (though R2 might need a specific public access setup).

        const publicUrlPrefix = process.env.R2_PUBLIC_URL || `${process.env.R2_ENDPOINT}/${process.env.R2_BUCKET}`;

        // Ensure R2_PUBLIC_URL doesn't end with a slash
        const formattedPrefix = publicUrlPrefix.endsWith('/') ? publicUrlPrefix.slice(0, -1) : publicUrlPrefix;

        return `${formattedPrefix}/${fileName}`;
    } catch (error) {
        console.error('Error uploading to R2:', error);
        throw new Error(`Failed to upload media to R2: ${error.message}`);
    }
};

export default getR2Client;
