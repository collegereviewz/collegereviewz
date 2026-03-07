import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
    const client = new MongoClient(process.env.DATABASE_URL);
    try {
        await client.connect();
        const col = client.db().collection('colleges');
        const colleges = await col.find({
            'courses.fees': { $in: ['', '—', '-', null] }
        }, { projection: { name: 1, state: 1, _id: 1 } }).limit(10).toArray();
        console.log(JSON.stringify(colleges, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}
run();
