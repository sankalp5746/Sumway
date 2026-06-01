const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'app');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk(targetDir);

files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Replace outer bg-[#0A0F1E] wrapper with bg-transparent and transition
  // We look for patterns like <div className="bg-[#0A0F1E]"> or <div className="bg-[#0A0F1E] min-h-screen">
  content = content.replace(/(className\s*=\s*")bg-\[#0A0F1E\](?!\s*dark:bg-)(.*?")/g, '$1bg-transparent transition-colors duration-400$2');

  // 2. Resolve clashing bg-[#111827] border-slate-800 in glass-card elements
  // Pattern: class containing glass-card with bg-[#111827] and border-slate-800
  // e.g. glass-card p-8 bg-[#111827] border-slate-800
  content = content.replace(/(class(Name)?\s*=\s*"[^"]*glass-card[^"]*)bg-\[#111827\]\s*/g, '$1');
  content = content.replace(/(class(Name)?\s*=\s*"[^"]*glass-card[^"]*)border-slate-800\s*/g, '$1');
  
  // Clean up any double spaces inside classes
  content = content.replace(/(class(Name)?\s*=\s*"[^"]*)"/g, (match, p1) => {
    return p1.replace(/\s+/g, ' ').trim() + '"';
  });

  // 3. Fix image gradients that fade to hardcoded bg-[#0A0F1E]
  // e.g. bg-gradient-to-t from-[#0A0F1E] via-transparent to-transparent
  content = content.replace(/from-\[#0A0F1E\]\s+via-transparent/g, 'from-[#0A0F1E] dark:from-[#0A0F1E] light:from-slate-50 via-transparent');
  content = content.replace(/from-\[#0A0F1E\]\s+to-transparent/g, 'from-[#0A0F1E] dark:from-[#0A0F1E] light:from-slate-50 to-transparent');
  
  // bg-gradient-to-br from-[#111827] to-[#0A0F1E] (in about-us/page.tsx etc)
  content = content.replace(/bg-gradient-to-br\s+from-\[#111827\]\s+to-\[#0A0F1E\]/g, 'bg-gradient-to-br from-[#111827] dark:from-[#111827] light:from-white to-[#0A0F1E] dark:to-[#0A0F1E] light:to-slate-100');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Refactored styling in: ${path.relative(path.join(__dirname, '..'), file)}`);
  }
});
