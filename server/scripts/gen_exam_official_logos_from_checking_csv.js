import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_INPUT = path.resolve(__dirname, '../checking.csv');
const DEFAULT_OUTPUT = path.resolve(__dirname, '../../client/src/data/exam_official_logos.json');

function parseCsvLine(line) {
  const out = [];
  let cur = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      out.push(cur);
      cur = '';
      continue;
    }
    cur += ch;
  }
  out.push(cur);
  return out.map(s => s.trim());
}

function normKey(s) {
  return (s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function main() {
  const inputPath = process.argv[2] ? path.resolve(process.argv[2]) : DEFAULT_INPUT;
  const outputPath = process.argv[3] ? path.resolve(process.argv[3]) : DEFAULT_OUTPUT;

  if (!fs.existsSync(inputPath)) {
    // Create a template so the command can succeed immediately.
    const template = 'Exam Name,Logo URL\n';
    fs.mkdirSync(path.dirname(inputPath), { recursive: true });
    fs.writeFileSync(inputPath, template, 'utf8');

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify({}, null, 2) + '\n', 'utf8');

    console.log(`checking.csv not found. Created template at: ${inputPath}`);
    console.log(`Wrote empty logo map to: ${outputPath}`);
    console.log('Now fill checking.csv with rows like: Exam Name,Logo URL');
    return;
  }

  const raw = fs.readFileSync(inputPath, 'utf8');
  const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
  if (lines.length < 2) {
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify({}, null, 2) + '\n', 'utf8');
    console.log(`checking.csv has no data rows. Wrote empty logo map to: ${outputPath}`);
    return;
  }

  const headers = parseCsvLine(lines[0]).map(h => normKey(h));
  const idxExam = headers.findIndex(h => ['exam', 'exam name', 'name', 'full name', 'fullname'].includes(h));
  const idxLogo = headers.findIndex(h => ['logo', 'logo url', 'logourl', 'official logo', 'official logo url', 'image', 'image url', 'url', 'domain'].includes(h));

  if (idxExam === -1 || idxLogo === -1) {
    console.error(`Could not detect required columns. Found headers: ${headers.join(', ')}`);
    console.error('Expected something like "Exam Name" and "Logo URL" (or "Domain").');
    process.exit(1);
  }

  const map = {};
  let rows = 0;
  let kept = 0;

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    rows++;
    const examRaw = cols[idxExam] || '';
    const logoRaw = cols[idxLogo] || '';
    const key = normKey(examRaw);
    const logo = (logoRaw || '').trim();
    if (!key || !logo) continue;

    map[key] = logo;
    kept++;
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(map, null, 2) + '\n', 'utf8');
  console.log(`Generated ${Object.keys(map).length} logos from ${rows} rows.`);
  console.log(`Wrote: ${outputPath}`);
  console.log(`Kept: ${kept}`);
}

main();

