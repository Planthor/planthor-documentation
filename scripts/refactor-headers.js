const fs = require('fs');
const path = require('path');

const docsDir = '/Volumes/worker/Code/Planthor/planthor-documentation/docs';
const files = [
  'api-specs.md',
  'c4-architecture.md',
  'devops.md',
  'erd.md',
  'git-strategy.md',
  'index.md',
  'mindmap-features.md',
  'original-design.md',
  'program-management.md',
  'roadmap.md',
  'tech-stack.md',
  'use-case-diagram.md',
  'use-case.md'
];

const acronyms = ['API', 'C4', 'CI/CD', 'DNS', 'GCP', 'JWT', 'DDoS', 'GHA', 'GHCR', 'UI', 'PKCE', 'SSO', 'SSH', 'IAP', 'D2D', 'OpenAPI', 'Strava', 'PostgreSQL', 'NoSQL', 'IDP', 'VM', 'DDoS', 'D2D', 'D2D'];

function toTitleCase(str) {
  // Check if it's all caps first (ignoring non-alpha)
  const isAllCaps = str === str.toUpperCase() && /[A-Z]/.test(str);
  if (isAllCaps) {
    return str.split(/(\s+|[-/:&()])/).map(part => {
        if (!part || /^\s+$/.test(part) || /^[-/:&()]$/.test(part)) return part;
        
        const upperPart = part.toUpperCase();
        // Check for specific acronyms
        for (const acronym of acronyms) {
            if (upperPart === acronym.toUpperCase()) return acronym;
        }
        
        // Check for specific patterns like EP01, UC01
        if (/^[A-Z]+\d+/.test(upperPart)) {
            // Try to find if it matches EPIC01 -> Epic01
            return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
        }
        
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    }).join('');
  }
  return str;
}

files.forEach(file => {
  const filePath = path.join(docsDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');

  // Normalize newlines to \n for processing
  const normalizedContent = content.replace(/\r\n/g, '\n');
  const linesContent = normalizedContent.split('\n');
  
  let inCodeBlock = false;
  const newLines = linesContent.map(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      return line;
    }
    if (!inCodeBlock && trimmedLine.startsWith('#')) {
      // It's a header.
      // Match the header prefix (#s) and the text
      const headerMatch = line.match(/^(\s*)(#+)\s*(.*)$/);
      if (headerMatch) {
        const leadingSpaces = headerMatch[1];
        const prefix = headerMatch[2];
        const text = headerMatch[3];
        return `${leadingSpaces}${prefix} ${toTitleCase(text)}`;
      }
    }
    return line;
  });

  let newContent = newLines.join('\n');
  if (content.includes('\r\n')) {
    newContent = newContent.replace(/\n/g, '\r\n');
  }

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Refactored ${file}`);
  } else {
    console.log(`No changes needed for ${file}`);
  }
});
