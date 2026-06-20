const fs = require('fs');
const path = require('path');

const targetPatterns = [
  /bg-amber-[0-9]+/g, /text-amber-[0-9]+/g, /border-amber-[0-9]+/g,
  /bg-yellow-[0-9]+/g, /text-yellow-[0-9]+/g, /border-yellow-[0-9]+/g,
  /bg-orange-[0-9]+/g, /text-orange-[0-9]+/g, /border-orange-[0-9]+/g,
  /bg-green-[0-9]+/g, /text-green-[0-9]+/g, /border-green-[0-9]+/g,
  /bg-\[#[A-Fa-f0-9]+\]/g, /text-\[#[A-Fa-f0-9]+\]/g, /border-\[#[A-Fa-f0-9]+\]/g,
  /#C89B3C/ig, /#1B4332/ig, /#D4AF37/ig, /#FF6B00/ig, /#2D5016/ig,
  /\btext-saffron\b/g, /\bbg-saffron\b/g, /\bborder-saffron\b/g, /\bvia-saffron\b/g, /\bfrom-saffron\b/g, /\bto-saffron\b/g,
  /\btext-darkbrown\b/g, /\bbg-darkbrown\b/g, /\bborder-darkbrown\b/g,
  /\btext-ivory\b/g, /\bbg-ivory\b/g, /\bborder-ivory\b/g,
  /\btext-lightgold\b/g, /\bbg-lightgold\b/g, /\bborder-lightgold\b/g,
  /\btext-gold\b/g, /\bbg-gold\b/g, /\bborder-gold\b/g, /\bfrom-gold\b/g, /\bto-gold\b/g,
];

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDirectory(fullPath, fileList);
    } else if (fullPath.endsWith('.jsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = scanDirectory('./src');

let output = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    let matchFound = false;
    let matchedStrings = [];
    
    for (const pattern of targetPatterns) {
      const matches = line.match(pattern);
      if (matches) {
        matchFound = true;
        matchedStrings.push(...matches);
      }
    }
    
    if (matchFound) {
      output.push(`FILE: ${file}:${index + 1}`);
      output.push(`LINE: ${line.trim()}`);
      output.push(`MATCHES: ${[...new Set(matchedStrings)].join(', ')}`);
      output.push('---');
    }
  });
}

fs.writeFileSync('color_report.txt', output.join('\n'));
console.log('Report generated.');
