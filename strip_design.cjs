const fs = require('fs');
const path = require('path');

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

const dirsToScan = ['./src/components', './src/pages'];
let allFiles = [];
for (const dir of dirsToScan) {
    if (fs.existsSync(dir)) {
        allFiles = scanDirectory(dir, allFiles);
    }
}

for (const file of allFiles) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace simple string classNames
  content = content.replace(/className="[^"]*"/g, 'className=""');
  
  // Replace template literal classNames (simple single-line ones)
  content = content.replace(/className=\{`[^`]*`\}/g, 'className=""');
  
  // Replace complex bracket classNames that don't contain nested braces
  // This is a bit risky but we will try a non-greedy match that avoids matching too much
  content = content.replace(/className=\{[^>]*?\}/g, (match) => {
      // If it has multiple lines or nested braces, it might break, but we'll try to strip it
      if (match.includes('=>') || match.includes('function')) return match; // avoid functions
      return 'className=""';
  });

  fs.writeFileSync(file, content);
  console.log(`Stripped design from ${file}`);
}
