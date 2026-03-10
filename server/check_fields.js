import mongoose from 'mongoose';
import College from './src/models/College.model.js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

async function checkFields() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        const col = await College.findOne({ name: "RCC INSTITUTE OF INFORMATION TECHNOLOGY" });
        if (col) {
            fs.writeFileSync('db_check.json', JSON.stringify({
                fees: col.fees,
                avgPackage: col.avgPackage,
                highestPackage: col.highestPackage,
                courses: col.courses,
                about: col.about ? col.about.substring(0, 100) + '...' : null,
                cutOffs: col.cutOffs ? col.cutOffs.substring(0, 100) + '...' : null,
                admissionProcess: col.admissionProcess ? col.admissionProcess.substring(0, 100) + '...' : null,
                ranking: col.ranking,
                resultInfo: col.resultInfo,
                scholarships: col.scholarships ? col.scholarships.substring(0, 100) + '...' : null,
                faq: col.faq?.length,
                facilities: col.facilities?.length,
                studentLife: col.studentLife ? col.studentLife.substring(0, 100) + '...' : null,
                contactDetails: col.contactDetails,
                updates: col.updates
            }, null, 2));
            console.log("Done");
        }
    } catch (e) { console.error(e); } finally { mongoose.disconnect(); }
}
checkFields();
