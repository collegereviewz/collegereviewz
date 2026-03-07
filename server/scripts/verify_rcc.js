import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const dbUrl = process.env.DATABASE_URL;

const collegeSchema = new mongoose.Schema({
    name: String,
    state: String,
    address: String,
    district: String,
    courses: Array
}, { strict: false });

const College = mongoose.models.College || mongoose.model('College', collegeSchema);

async function checkData() {
    try {
        await mongoose.connect(dbUrl);
        const college = await College.findOne({ name: { $regex: /RCC INSTITUTE/i } }).lean();
        if (college) {
            console.log("Verified Document:");
            console.log("Name:", college.name);
            console.log("Fees:", college.fees);
            console.log("Avg Package:", college.avgPackage);
            console.log("Highest Package:", college.highestPackage);
            console.log("About Info Snippet:", college.about?.substring(0, 50) + "...");
            console.log("Admission Process:", college.admissionProcess?.substring(0, 50) + "...");
            console.log("Cut Offs Snippet:", college.cutOffs?.substring(0, 50) + "...");
            console.log("Ranking:", college.ranking?.substring(0, 50) + "...");
            console.log("Scholarships:", college.scholarships?.substring(0, 50) + "...");
            console.log("Facilities Count:", college.facilities ? college.facilities.length : 0);
            console.log("FAQ Count:", college.faq ? college.faq.length : 0);
            console.log("Top Recruiters Count:", college.topRecruiters ? college.topRecruiters.length : 0);
            console.log("Courses Count:", college.courses ? college.courses.length : 0);
        } else {
            console.log("Document not found!");
        }
    } finally {
        await mongoose.disconnect();
    }
}

checkData();
