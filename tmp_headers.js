const fs = require('fs');
const path = require('path');
const dir = 'server/src/data/Engg_2025';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));
const out = {};
files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  out[f] = content.split('\n')[0].replace(/\r/g, '').trim();
});
fs.writeFileSync('tmp_headers.json', JSON.stringify(out, null, 2));
console.log("Done");
