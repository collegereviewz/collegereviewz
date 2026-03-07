import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import College from '../src/models/College.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const normalize = (s) => s?.toLowerCase().replace(/[^a-z0-9]/g, '') || '';
const normalizeState = (s) => {
    if (!s) return '';
    // Strip suffixes like "(Computer Applications)" or "(Engineering and Technology)"
    let clean = s.split('(')[0].trim();
    return normalize(clean);
};
const normalizeName = (s) => {
    if (!s) return '';
    let clean = s.toLowerCase();
    // Common suffixes to ignore during matching
    clean = clean.replace(/\(non aicte\)/g, '');
    clean = clean.replace(/\(non-aicte\)/g, '');
    clean = clean.replace(/ \d+$/g, ''); // Trailing numbers like " 117"
    return normalize(clean);
};

async function cleanup() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Connected.');

        console.log('Fetching all colleges...');
        const colleges = await College.find({}, { name: 1, state: 1, aisheId: 1, aicteId: 1, establishedYear: 1, managementType: 1, courses: 1 }).lean();
        console.log(`Found ${colleges.length} colleges.`);

        // Build global sets of IDs to prevent E11000
        const allAisheIds = new Set();
        const allAicteIds = new Set();
        colleges.forEach(c => {
            if (c.aisheId) allAisheIds.add(c.aisheId);
            if (c.aicteId) allAicteIds.add(c.aicteId);
        });

        const groupedByState = {};
        colleges.forEach(c => {
            const stateKey = normalizeState(c.state);
            if (!groupedByState[stateKey]) groupedByState[stateKey] = [];
            groupedByState[stateKey].push(c);
        });

        let mergedCount = 0;
        const toDeleteIds = [];
        const updates = [];

        for (const stateKey in groupedByState) {
            const stateColleges = groupedByState[stateKey];
            console.log(`Processing state: ${stateKey} (${stateColleges.length} colleges)`);
            // Use a map for prefix grouping to reduce O(N^2)
            const prefixMap = {};
            stateColleges.forEach(c => {
                const norm = normalizeName(c.name);
                if (norm.length < 5) return;
                const prefix = norm.substring(0, 10); // Slightly longer prefix
                if (!prefixMap[prefix]) prefixMap[prefix] = [];
                prefixMap[prefix].push(c);
            });

            for (const prefix in prefixMap) {
                const group = prefixMap[prefix];
                if (group.length < 2) continue;

                for (let i = 0; i < group.length; i++) {
                    const c1 = group[i];
                    if (c1._merged) continue;

                    for (let j = i + 1; j < group.length; j++) {
                        const c2 = group[j];
                        if (c2._merged) continue;

                        const norm1 = normalizeName(c1.name);
                        const norm2 = normalizeName(c2.name);

                        let match = false;
                        if (norm1 === norm2) match = true;
                        else if (norm1.length > 5 && norm2.length > 5 && (norm1.startsWith(norm2) || norm2.startsWith(norm1))) match = true;

                        if (!match && norm1.replace(/[. ]/g, '') === norm2.replace(/[. ]/g, '')) match = true;

                        if (match) {
                            console.log(`[MERGE] "${c1.name}" (IDS: ${c1.aisheId || 'N/A'}|${c1.aicteId || 'N/A'}) <- "${c2.name}" (IDS: ${c2.aisheId || 'N/A'}|${c2.aicteId || 'N/A'})`);

                            // Propose new IDs
                            const targetAisheId = c1.aisheId || c2.aisheId;
                            const targetAicteId = c1.aicteId || c2.aicteId;

                            const mergedUpdate = {
                                aisheId: targetAisheId,
                                aicteId: targetAicteId,
                                establishedYear: (c1.establishedYear && c1.establishedYear !== '—') ? c1.establishedYear : c2.establishedYear,
                                managementType: (c1.managementType && c1.managementType !== 'undefined' && c1.managementType !== '—') ? c1.managementType : c2.managementType,
                                courses: mergeCourses(c1.courses, c2.courses)
                            };

                            // Double check E11000 conflicts
                            // If c1 has NO aisheId but c2 HAS one, and that ID is already assigned to some OTHER college in our memory, we CANNOT take it.
                            if (!c1.aisheId && c2.aisheId && allAisheIds.has(c2.aisheId)) {
                                console.log(`  [CONFLICT] AisheId ${c2.aisheId} already exists elsewhere. Skipping ID merge.`);
                                mergedUpdate.aisheId = undefined;
                            }
                            if (!c1.aicteId && c2.aicteId && allAicteIds.has(c2.aicteId)) {
                                console.log(`  [CONFLICT] AicteId ${c2.aicteId} already exists elsewhere. Skipping ID merge.`);
                                mergedUpdate.aicteId = undefined;
                            }

                            updates.push({
                                updateOne: {
                                    filter: { _id: c1._id },
                                    update: { $set: mergedUpdate }
                                }
                            });

                            toDeleteIds.push(c2._id);
                            c2._merged = true;
                            mergedCount++;
                            Object.assign(c1, mergedUpdate);
                        }
                    }
                }
            }
        }

        function mergeCourses(list1 = [], list2 = []) {
            const map = new Map();
            [...list1, ...list2].forEach(c => {
                const key = `${normalize(c.programme)}|${normalize(c.course)}`;
                if (!map.has(key)) map.set(key, c);
            });
            return Array.from(map.values());
        }

        if (updates.length > 0) {
            console.log(`Applying ${updates.length} updates in batches...`);
            const BATCH_SIZE = 100; // Smaller batch for safer E11000 debugging
            for (let i = 0; i < updates.length; i += BATCH_SIZE) {
                try {
                    await College.bulkWrite(updates.slice(i, i + BATCH_SIZE), { ordered: false });
                    console.log(`  Updated ${Math.min(i + BATCH_SIZE, updates.length)} / ${updates.length}`);
                } catch (err) {
                    console.error(`  [ERROR] BulkWrite error at index ${i}:`, err.message);
                }
            }
        }

        if (toDeleteIds.length > 0) {
            console.log(`Deleting ${toDeleteIds.length} merged records...`);
            const BATCH_SIZE = 500;
            for (let i = 0; i < toDeleteIds.length; i += BATCH_SIZE) {
                await College.deleteMany({ _id: { $in: toDeleteIds.slice(i, i + BATCH_SIZE) } });
            }
        }

        console.log(`Cleanup success. Merged: ${mergedCount}`);
        process.exit(0);
    } catch (e) {
        console.error('CRITICAL ERROR:', e);
        process.exit(1);
    }
}

cleanup();
