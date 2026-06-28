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
  if (content.includes('http://localhost:5000/api')) {
    console.log('Updating: ' + file);
    
    // Normalize path separators for calculation
    const normalizedFile = file.replace(/\\/g, '/');
    const depth = normalizedFile.split('src/app/admin/')[1].split('/').length - 1;
    
    let importPath = '';
    if (depth === 0) importPath = '../../utils/api';
    else if (depth === 1) importPath = '../../../utils/api';
    else if (depth === 2) importPath = '../../../../utils/api';
    else if (depth === 3) importPath = '../../../../../utils/api';
    
    let importStmt = `import { API_URL } from "${importPath}";\n`;
    content = importStmt + content;
    
    // Replace API calls
    content = content.replace(/fetch\(`http:\/\/localhost:5000\/api/g, 'fetch(`${API_URL}');
    content = content.replace(/fetch\('http:\/\/localhost:5000\/api/g, 'fetch(`${API_URL}');
    content = content.replace(/fetch\("http:\/\/localhost:5000\/api/g, 'fetch(`${API_URL}');
    content = content.replace(/'http:\/\/localhost:5000\/api/g, '`${API_URL}');
    content = content.replace(/"http:\/\/localhost:5000\/api/g, '`${API_URL}');
    
    fs.writeFileSync(file, content);
  }
});
console.log("Done updating admin URLs");
