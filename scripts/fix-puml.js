const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  const lines = content.split('\n');
  const output = [];
  let inFence = false;
  let inUml = false;
  let umlBuffer = [];

  lines.forEach((line) => {
    const fenceMatch = line.match(/^```(\w+)?\s*$/);
    if (fenceMatch) {
      if (inUml) {
        output.push('```pumld');
        output.push(...umlBuffer);
        output.push('```');
        umlBuffer = [];
        inUml = false;
        changed = true;
      }

      inFence = !inFence;
      output.push(line);
      return;
    }

    if (!inFence && line.trim().startsWith('@startuml')) {
      inUml = true;
      umlBuffer = [line];
      return;
    }

    if (inUml) {
      umlBuffer.push(line);
      if (line.trim().startsWith('@enduml')) {
        output.push('```pumld');
        output.push(...umlBuffer);
        output.push('```');
        umlBuffer = [];
        inUml = false;
        changed = true;
      }
      return;
    }

    output.push(line);
  });

  if (inUml) {
    output.push(...umlBuffer);
  }

  const newContent = output.join('\n');

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
