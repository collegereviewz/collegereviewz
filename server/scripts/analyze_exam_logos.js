import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const EXAMS_DATA_PATH = path.resolve(__dirname, '../../client/src/data/exams_list.json');

// Exact same mapping logic as used in ExamsSection.jsx
function analyzeLogos() {
    if (!fs.existsSync(EXAMS_DATA_PATH)) {
        console.error("Exams data file not found!");
        return;
    }

    const examsListData = JSON.parse(fs.readFileSync(EXAMS_DATA_PATH, 'utf8'));
    let addedCount = 0;
    let notAddedCount = 0;
    const addedLogos = [];
    const missingLogos = [];

    examsListData.forEach(exam => {
        const name = (exam.fullName || "").toLowerCase();
        let hasLogo = false;

        // 1. Local Assets
        if (name.includes('cuet') ||
            name.includes('jee main') ||
            name.includes('jee advanced') ||
            name.includes('gate') ||
            name.includes('wbjee') ||
            name.includes('ts eamcet') ||
            name.includes('ts eapcet') ||
            name.includes('ibps') ||
            name.includes('sbi') ||
            name.includes('kiit') ||
            name.includes('clat') ||
            name.includes('nchm')) {
            hasLogo = true;
        }
        // 2. Logo.dev API Mappings
        else if (name.includes('neet') ||
            name.includes('cat') ||
            name.includes('bitsat') ||
            name.includes('mat') ||
            name.includes('xat') ||
            name.includes('nmat') ||
            name.includes('snap') ||
            name.includes('iit') ||
            name.includes('uceed') ||
            name.includes('jam') ||
            name.includes('aiims') ||
            name.includes('nift') ||
            name.includes('lsat') ||
            name.includes('mhcet') ||
            name.includes('mah-') ||
            name.includes('upcet') ||
            name.includes('uppsc') ||
            name.includes('kcet') ||
            name.includes('kpsc') ||
            name.includes('tancet') ||
            name.includes('tnpsc') ||
            name.includes('upsc') ||
            name.includes('ssc') ||
            name.includes('rbi') ||
            name.includes('nabard') ||
            name.includes('sebi') ||
            name.includes('rr b') ||
            name.includes('rrb') ||
            name.includes('vit') ||
            name.includes('srm') ||
            name.includes('manipal') ||
            name.includes('met') ||
            name.includes('amrita') ||
            name.includes('aeee') ||
            name.includes('comedk') ||
            name.includes('nata') ||
            name.includes('net') ||
            name.includes('ugc') ||
            name.includes('appsc') ||
            name.includes('gpsc') ||
            name.includes('mppsc') ||
            name.includes('bpsc') ||
            name.includes('opsc') ||
            name.includes('rpsc') ||
            name.includes('wbpsc') ||
            name.includes('nid') ||
            name.includes('ailet') ||
            name.includes('jipmat') ||
            name.includes('fddi') ||
            name.includes('klee') ||
            name.includes('nmims') ||
            name.includes('npat') ||
            name.includes('symbiosis') ||
            name.includes('set') ||
            name.includes('slat') ||
            name.includes('cusat') ||
            name.includes('ipu') ||
            name.includes('amu') ||
            name.includes('jmi')) {
            hasLogo = true;
        }

        if (hasLogo) {
            addedCount++;
            addedLogos.push(exam.name);
        } else {
            notAddedCount++;
            missingLogos.push(exam.name);
        }
    });

    console.log("==========================================");
    console.log("EXAM LOGO COVERAGE REPORT");
    console.log("==========================================");
    console.log(`Total Unique Exams: ${examsListData.length}`);
    console.log(`Logos Added (High Quality): ${addedCount}`);
    console.log(`Using Fallback Icons: ${notAddedCount}`);
    console.log("------------------------------------------");
    console.log("Logos Currently Mapped:");
    console.log("National/Local: JEE, CUET, GATE, NEET, CAT, CLAT, etc.");
    console.log("------------------------------------------");
    console.log("Examples of Exams using Fallback Icons:");
    console.log(missingLogos.slice(0, 10).join(", ") + "...");
    console.log("==========================================");
}

analyzeLogos();
