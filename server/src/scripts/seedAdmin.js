import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedAdmin = async () => {
    try {
        const uri = process.env.DATABASE_URL;
        if (!uri) {
            throw new Error('DATABASE_URL is not defined in environment variables');
        }
        await mongoose.connect(uri);

        const adminEmail = 'admin@example.com';
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log('Admin user already exists');
        } else {
            const hashedPassword = await bcrypt.hash('admin@123', 12);
            const adminUser = new User({
                fullName: 'System Admin',
                email: adminEmail,
                password: hashedPassword,
                isAdmin: true
            });
            await adminUser.save();
            console.log('Admin user seeded successfully');
        }

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding admin user:', error.message);
        process.exit(1);
    }
};

seedAdmin();
