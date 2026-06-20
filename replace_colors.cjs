const fs = require('fs');
const path = require('path');

const replacements = [
  { search: /bg-\[#1A1A1A\]/g, replace: 'bg-black2' },
  { search: /bg-\[#EEEEEE\]/g, replace: 'bg-gray-200' },
  { search: /border-\[#EEEEEE\]/g, replace: 'border-gray-200' },
  { search: /from-\[#3B1F0A\]/g, replace: 'from-black2' },
  { search: /to-\[#3B1F0A\]/g, replace: 'to-black2' },
  { search: /\bbg-green-50\b/g, replace: 'bg-sage/10' },
  { search: /\bbg-green-100\b/g, replace: 'bg-sage/20' },
  { search: /\btext-green-700\b/g, replace: 'text-forest' },
  { search: /\btext-green-500\b/g, replace: 'text-forest' },
  { search: /\bbg-green-500\b/g, replace: 'bg-forest' },
  { search: /\bbg-green-600\b/g, replace: 'bg-forest2' },
  { search: /\bbg-yellow-50\b/g, replace: 'bg-gold/10' },
  { search: /\btext-yellow-700\b/g, replace: 'text-gold' },
  { search: /\bbg-orange-100\b/g, replace: 'bg-gold/20' },
  { search: /\btext-orange-700\b/g, replace: 'text-gold' },
  { search: /\bborder-saffron\b/g, replace: 'border-forest' },
  { search: /\bfrom-saffron\b/g, replace: 'from-gold' },
  { search: /\bvia-saffron\b/g, replace: 'via-forest' },
  { search: /\bto-saffron\b/g, replace: 'to-gold' },
  { search: /\btext-saffron\b/g, replace: 'text-forest' },
  { search: /\bbg-saffron\b/g, replace: 'bg-forest' },
  { search: /\btext-darkbrown\b/g, replace: 'text-charcoal' },
  { search: /\bbg-darkbrown\b/g, replace: 'bg-charcoal' },
  { search: /\bborder-darkbrown\b/g, replace: 'border-charcoal' },
  { search: /\btext-ivory\b/g, replace: 'text-cream' },
  { search: /\bbg-ivory\b/g, replace: 'bg-cream' },
  { search: /\bborder-ivory\b/g, replace: 'border-cream' },
  { search: /\bbg-lightgold\b/g, replace: 'bg-gold/20' }
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

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  
  for (const rule of replacements) {
    if (rule.search.test(content)) {
      content = content.replace(rule.search, rule.replace);
      changed = true;
    }
  }
  
  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
}
