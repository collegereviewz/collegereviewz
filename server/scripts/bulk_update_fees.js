import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const updates = [
    { name: "BIRLA VISHVAKARMA MAHAVIDYALAYA", fee: "₹1,45,000 / Year (SFI)" },
    { name: "SARVAJANIK COLLEGE OF ENGINEERING AND TECHNOLOGY", fee: "₹1,23,700 / Year" },
    { name: "SILVER OAK COLLEGE OF ENGINEERING AND TECHNOLOGY", fee: "₹78,000 / Year" },
    { name: "MERCHANT ENGINEERING COLLEGE", fee: "₹66,150 / Year" },
    { name: "C.K.PITHAWALA COLLEGE OF ENGG & TECHNOLOGY", fee: "₹92,400 / Year" },
    { name: "NARNARAYAN SHASTRI INSTITUTE OF TECHNOLOGY", fee: "₹63,000 / Year" },
    { name: "ENGINEERING COLLEGE, TUWA", fee: "₹68,000 / Year" },
    { name: "C K SHAH VIJAPURWALA INSTITUTE OF MANAGEMENT", fee: "₹1,09,000 / Year" },
    { name: "B. H. GARDI COLLEGE OF ENGINEERING & TECHNOLOGY", fee: "₹69,000 / Year" }
];

async function run() {
    const client = new MongoClient(process.env.DATABASE_URL);
    try {
        await client.connect();
        const col = client.db().collection('colleges');

        for (const item of updates) {
            console.log(`Updating ${item.name}...`);
            const result = await col.updateMany(
                { name: { $regex: new RegExp(`^${item.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i') } },
                { $set: { "courses.$[elem].fees": item.fee } },
                { arrayFilters: [{ "elem.fees": { $in: ["", "—", "-", null] } }] }
            );
            console.log(`  Updated ${result.modifiedCount} courses.`);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}
run();
