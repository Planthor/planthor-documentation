const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Find @startuml blocks that are NOT already inside a code fence (```)
  // This regex looks for @startuml not preceded by ```
  const regex = /(?<!```[a-z]*\n)@startuml([\s\S]*?)@enduml(?!\n```)/g;
  
  const newContent = content.replace(regex, (match) => {
    changed = true;
    return `\`\`\`pumld\n${match}\n\`\`\``;
  });

  if (changed) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Fixed PlantUML in: ${filePath}`);
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      processFile(fullPath);
    }
  });
}

console.log('Scanning for raw PlantUML blocks...');
walk(docsDir);
console.log('Done.');
