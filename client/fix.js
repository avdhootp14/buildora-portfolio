const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src/app/admin'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let lines = content.split('\n');
  if (lines.length >= 2 && lines[0].startsWith('import { API_URL }') && lines[1].includes('"use client"')) {
    // Swap line 0 and line 1
    const temp = lines[0];
    lines[0] = lines[1];
    lines[1] = temp;
    fs.writeFileSync(file, lines.join('\n'));
    console.log('Fixed ' + file);
  }
});
