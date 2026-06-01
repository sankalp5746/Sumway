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

  // 1. Fix label tags text-slate-300 -> text-slate-300 dark:text-slate-300 light:text-slate-700
  content = content.replace(/className="text-slate-300"([^>]*>(?:Your Full Name|Phone Coordinate|Email Address|Subject|Detailed Message|Preferred Time|Phone Number|Your Full Name|Target Skills|Company Name|Business \/ Service Type|GST Number Coordinate|Password Code|Email Coordinates))/g, 'className="text-slate-300 dark:text-slate-300 light:text-slate-700"$1');
  content = content.replace(/<label className="text-slate-300">/g, '<label className="text-slate-300 dark:text-slate-300 light:text-slate-700">');

  // 2. Fix input/textarea text-slate-100 -> text-slate-100 dark:text-slate-100 light:text-slate-800
  content = content.replace(
    /(className="[^"]*border-slate-700[^"]*bg-white\/5[^"]*)text-slate-100/g,
    '$1text-slate-100 dark:text-slate-100 light:text-slate-800 border-slate-700 dark:border-slate-700 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-50'
  );
  content = content.replace(
    /(className="[^"]*pl-10[^"]*)text-slate-100/g,
    '$1text-slate-100 dark:text-slate-100 light:text-slate-800 border-slate-700 dark:border-slate-700 light:border-slate-300 bg-white/5 dark:bg-white/5 light:bg-slate-50'
  );

  // 3. Fix coordinate icons/lists text-slate-300 -> text-slate-300 dark:text-slate-300 light:text-slate-700
  content = content.replace(
    /className="flex gap-3\.5 items-start text-slate-300"/g,
    'className="flex gap-3.5 items-start text-slate-300 dark:text-slate-300 light:text-slate-700"'
  );
  content = content.replace(
    /className="flex flex-col gap-1.5 text-slate-300"/g,
    'className="flex flex-col gap-1.5 text-slate-300 dark:text-slate-300 light:text-slate-700"'
  );
  content = content.replace(
    /text-slate-300\s+dark:text-slate-300\s+light:text-slate-700\s+mt-1/g,
    'text-slate-300 dark:text-slate-300 light:text-slate-700 mt-1'
  );

  // 4. Fix About Us overview metrics text-slate-300
  content = content.replace(
    /className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-\[11px\] font-semibold text-slate-300"/g,
    'className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] font-semibold text-slate-300 dark:text-slate-300 light:text-slate-700"'
  );
  
  // Clean up duplicate background/border entries if regex doubled them
  content = content.replace(/border-slate-700\s+dark:border-slate-700\s+light:border-slate-300\s+border border-slate-700/g, 'border border-slate-700 dark:border-slate-700 light:border-slate-300');
  content = content.replace(/bg-white\/5\s+dark:bg-white\/5\s+light:bg-slate-50\s+bg-white\/5/g, 'bg-white/5 dark:bg-white/5 light:bg-slate-50');

  // Clean up whitespace inside classes
  content = content.replace(/className="([^"]+)"/g, (match, p1) => {
    const clean = p1.split(/\s+/).filter((val, idx, self) => self.indexOf(val) === idx).join(' ');
    return `className="${clean}"`;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✅ Refactored form elements in: ${path.relative(path.join(__dirname, '..'), file)}`);
  }
});
