/**
 * parseENG.js
 * Reads ENG.csv and generates client/src/data/engineeringColleges.js
 * Run: node scripts/parseENG.js
 */
const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '../client/src/pages/ExploreColleges/ENG.csv');
const OUT_PATH = path.join(__dirname, '../client/src/data/engineeringColleges.js');
const WEBSITES_PATH = path.join(__dirname, 'college_info.json');

// Load persistent college info if exists
let COLLEGE_INFO = {};
if (fs.existsSync(WEBSITES_PATH)) {
    COLLEGE_INFO = JSON.parse(fs.readFileSync(WEBSITES_PATH, 'utf-8'));
}

// ─── Stream Classifier ────────────────────────────────────────────────────────
const STREAM_MAP = {
    'BE/B.Tech': (course, prog) =>
        prog.includes('ENGINEERING') || course.match(/B\.?E|B\.?TECH|ENGINEERING/i),
    'MBA': (course, prog) =>
        course.match(/\bMBA\b/i) || (course.match(/MANAGEMENT/i) && course.match(/POST GRAD|PG|MASTER/i)),
    'BBA': (course) => course.match(/\bBBA\b/i),
    'BCA': (course) => course.match(/\bBCA\b/i),
    'Law': (course) => course.match(/LAW|LLB|L\.L\.B/i),
    'Science': (course) => course.match(/B\.SC|BSC(?!\s*NURSING)|BACHELOR OF SCIENCE/i),
    'Commerce': (course) => course.match(/B\.COM|BCOM|COMMERCE/i),
    'Pharmacy': (course) => course.match(/PHARM|B\.PHARM/i),
    'ME/M.Tech': (course) => course.match(/\bM\.?E\b|\bM\.?TECH\b|MASTER OF ENGINEERING|MASTER OF TECH/i),
    'MCA': (course) => course.match(/\bMCA\b/i),
    'Design': (course) => course.match(/\bDESIGN\b/i),
};

// Streams to EXCLUDE
const EXCLUDE_PATTERN = /MBBS|B\.SC\s*NURSING|BSC\s*NURSING|NURSING(?!\s*MANAGEMENT)/i;

// ─── Fee / Placement seeds (randomised per institution tier) ─────────────────
const TIER1 = ['IIT ', 'NIT ', 'AIIMS', 'IIM ', 'BITS '];
const TIER2 = ['VIT ', 'SRM ', 'MANIPAL', 'AMITY', 'SYMBIOSIS', 'CHRIST', 'LOVELY', 'THAPAR'];

function getTier(name) {
    const u = name.toUpperCase();
    if (TIER1.some(t => u.includes(t))) return 1;
    if (TIER2.some(t => u.includes(t))) return 2;
    return 3;
}

function fakeData(name, idx) {
    const tier = getTier(name);
    const base = tier === 1 ? 800000 : tier === 2 ? 500000 : 200000;
    const fees = base + Math.floor(Math.random() * 200000);
    const pkg = tier === 1 ? 2000000 + Math.floor(Math.random() * 500000)
        : tier === 2 ? 1000000 + Math.floor(Math.random() * 400000)
            : 400000 + Math.floor(Math.random() * 300000);
    const highPkg = pkg * (tier === 1 ? 4 : tier === 2 ? 2.5 : 1.5);
    const rating = (3.8 + Math.random() * 1.2).toFixed(1);
    const reviews = Math.floor(Math.random() * 900) + 50;
    return {
        fees: `₹${fees.toLocaleString('en-IN')}`,
        placement: `₹${pkg.toLocaleString('en-IN')}`,
        highestPlacement: `₹${Math.round(highPkg).toLocaleString('en-IN')}`,
        rating: parseFloat(rating),
        reviews,
    };
}

// ─── Website Extractor ────────────────────────────────────────────────────────
const MANUAL_WEBSITES = {
    'SVKMS NMIMS DEEMED TO BE UNIVERSITY': 'nmims.edu',
    'PUNJAB ENGINEERING COLLEGE DEEMED TO BE UNIVERSITY': 'pec.ac.in',
    'DR.S.S. BHATNAGAR UNIVERSITY INSTITUTE OF CHEMICAL ENGG. & TECH.': 'ssbuicet.puchd.ac.in',
    'UNIVERSITY INSTITUTE OF ENGINEERING AND TECHNOLOGY': 'uiet.puchd.ac.in',
    'NATIONAL INSTITUTE OF TECHNICAL TEACHERS TRAINING & RESEARCH': 'nitttrchd.ac.in',
    'INDIAN INSTITUTE OF TECHNOLOGY BOMBAY': 'iitb.ac.in',
    'INDIAN INSTITUTE OF TECHNOLOGY DELHI': 'iitd.ac.in',
    'INDIAN INSTITUTE OF TECHNOLOGY MADRAS': 'iitm.ac.in',
    'INDIAN INSTITUTE OF TECHNOLOGY KANPUR': 'iitk.ac.in',
    'INDIAN INSTITUTE OF TECHNOLOGY KHARAGPUR': 'iitkgp.ac.in',
    'INDIAN INSTITUTE OF TECHNOLOGY ROORKEE': 'iitr.ac.in',
    'IDNIAN INSTITUTE OF TECHNOLOGY GUWAHATI': 'iitg.ac.in',
    'CHANDIGARH COLLEGE OF ENGINEERING AND TECHNOLOGY': 'ccet.ac.in',
    'GOVERNMENT COLLEGE OF ART': 'gcapchd.ac.in',
    'POST GRADUATE GOVERNMENT COLLEGE': 'gc11.ac.in',
    'GOSWAMI GANESH DUTTA SANATAN DHARMA COLLEGE': 'ggdsd.ac.in'
};

function extractWebsite(address, name) {
    if (COLLEGE_INFO[name] && COLLEGE_INFO[name].website) return COLLEGE_INFO[name].website;
    if (name && MANUAL_WEBSITES[name]) return MANUAL_WEBSITES[name];
    if (!address) return null;

    // Enhanced regex to capture various top-level domains and subdomains
    const regex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9][-a-zA-Z0-9]*\.)+(ac\.in|edu\.in|res\.in|org\.in|gov\.in|nic\.in|edu|com|org|net|in|co\.in)/i;
    const match = address.match(regex);

    if (match) {
        let url = match[0].toLowerCase();
        // Remove protocol and trailing/leading noise
        url = url.replace(/https?:\/\//, '').replace(/^www\./, '').replace(/[.\/:\s,]+$/, '').trim();
        return url;
    }
    return null;
}

// ─── CSV Parser ───────────────────────────────────────────────────────────────
function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].replace(/^\uFEFF/, '').split(',').map(h => h.trim());
    const rows = [];
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i]?.trim();
        if (!line) continue;
        const vals = line.split(',');
        const obj = {};
        headers.forEach((h, idx) => { obj[h] = (vals[idx] || '').trim(); });
        rows.push(obj);
    }
    return rows;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
const text = fs.readFileSync(CSV_PATH, 'utf-8');
const rows = parseCSV(text);

// De-duplicate by name, collect all courses per college
const collegeMap = {};
rows.forEach(row => {
    const name = (row['Name'] || '').trim();
    if (!name || name.length < 3) return;

    const course = (row['Course'] || '').trim();
    const prog = (row['Programme'] || '').trim();
    const address = (row['Address'] || '').trim();
    const district = (row['District'] || '').trim();
    const instType = (row['Institution Type'] || '').trim();

    // Skip MBBS / BSc Nursing courses
    if (EXCLUDE_PATTERN.test(course)) return;

    if (!collegeMap[name]) {
        collegeMap[name] = {
            name,
            address,
            district,
            instType,
            courses: new Set(),
            programmes: new Set(),
        };
    }
    if (course) collegeMap[name].courses.add(course);
    if (prog) collegeMap[name].programmes.add(prog);
});

// Build final stream-grouped list
const streamData = {};
Object.keys(STREAM_MAP).forEach(s => { streamData[s] = []; });
streamData['Other'] = [];

let globalIdx = 1;
Object.values(collegeMap).forEach((col, idx) => {
    const courseStr = [...col.courses].join(' ');
    const progStr = [...col.programmes].join(' ');

    let assignedStream = null;
    for (const [stream, fn] of Object.entries(STREAM_MAP)) {
        if (fn(courseStr, progStr)) {
            assignedStream = stream;
            break;
        }
    }
    if (!assignedStream) return; // skip unclassifiable

    const location = [col.district, col.instType].filter(Boolean).join(' | ');
    const extra = fakeData(col.name, idx);
    const courseList = [...col.courses].slice(0, 3);

    const info = COLLEGE_INFO[col.name] || {};

    streamData[assignedStream].push({
        rank: `#${streamData[assignedStream].length + 1}`,
        name: col.name,
        location,
        address: col.address,
        feesType: courseList[0] ? `${courseList[0]} - Total Fees` : 'Total Fees',
        placementLabel: 'Average Package',
        rankingInfo: `#${Math.floor(Math.random() * 50) + 1}th/500 in India`,
        badges: getTier(col.name) === 1 ? ['NIRF Ranked'] : [],
        courseName: courseList[0] || '',
        website: info.website || extractWebsite(col.address, col.name) || '',
        ...extra,
        // Override with real data if available
        ...(info.fees ? { fees: info.fees } : {}),
        ...(info.avgPackage ? { placement: info.avgPackage } : {}),
        ...(info.highestPackage ? { highestPlacement: info.highestPackage } : {}),
        ...(info.rating ? { rating: info.rating } : {}),
        ...(info.reviews ? { reviews: info.reviews } : {}),
        ...(info.rankingInfo ? { rankingInfo: info.rankingInfo } : {}),
        ...(info.naac ? { naac: info.naac } : {}),
        ...(info.nba ? { nba: info.nba } : {}),
    });
    globalIdx++;
});

// Sort: Tier-1 first
Object.keys(streamData).forEach(s => {
    streamData[s].sort((a, b) => getTier(a.name) - getTier(b.name));
    // Re-assign ranks
    streamData[s].forEach((c, i) => { c.rank = `#${i + 1}`; });
});

// ─── Write output ─────────────────────────────────────────────────────────────
const outDir = path.dirname(OUT_PATH);
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const output = `// AUTO-GENERATED by scripts/parseENG.js — do not edit manually
// Generated: ${new Date().toISOString()}

const engineeringColleges = ${JSON.stringify(streamData, null, 2)};

export default engineeringColleges;
`;

fs.writeFileSync(OUT_PATH, output, 'utf-8');

// Summary
let total = 0;
let missingWebsite = [];
Object.entries(streamData).forEach(([s, arr]) => {
    console.log(`  ${s.padEnd(12)} : ${arr.length} colleges`);
    total += arr.length;
    arr.forEach(c => {
        if (!c.website) missingWebsite.push(c.name);
    });
});
console.log(`\n✅ Total: ${total} colleges written to ${OUT_PATH}`);
console.log(`⚠️ Missing websites: ${missingWebsite.length}`);

// Unique missing list for search queue
if (missingWebsite.length > 0) {
    const uniqueMissing = [...new Set(missingWebsite)];
    fs.writeFileSync(path.join(__dirname, 'missing_websites.txt'), uniqueMissing.join('\n'), 'utf-8');
    console.log(`📝 Search queue written to scripts/missing_websites.txt (${uniqueMissing.length} unique)`);
}
