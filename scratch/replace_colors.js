const fs = require('fs');
const path = require('path');

const replacements = [
  { oldColor: /#F5C542/gi, newColor: '#FF555F' },
  { oldColor: /#00C2B2/gi, newColor: '#4AABCA' },
  { oldColor: /#0A0F1E/gi, newColor: '#0A1128' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        processDirectory(fullPath);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      
      for (const rep of replacements) {
        if (rep.oldColor.test(content)) {
          content = content.replace(rep.oldColor, rep.newColor);
          changed = true;
        }
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

console.log('Starting color replacements...');
processDirectory(path.join(__dirname, '../app'));
processDirectory(path.join(__dirname, '../components'));
console.log('Color replacements completed!');
