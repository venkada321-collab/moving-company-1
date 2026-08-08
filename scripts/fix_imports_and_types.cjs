const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const coreDir = path.join(srcDir, 'components', 'core');
const kitDir = path.join(srcDir, 'kits', 'kit-moving', 'components');

function fixFiles(dir, prefix) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix imports that start with '../config', '../types', '../data', '../utils'
    // Also cover cases with or without trailing filenames
    content = content.replace(/from\s+['"]\.\.\/config['"]/g, `from '${prefix}config'`);
    content = content.replace(/from\s+['"]\.\.\/config\/([^'"]+)['"]/g, `from '${prefix}config/$1'`);
    content = content.replace(/from\s+['"]\.\.\/types['"]/g, `from '${prefix}types'`);
    content = content.replace(/from\s+['"]\.\.\/data\/([^'"]+)['"]/g, `from '${prefix}data/$1'`);
    content = content.replace(/from\s+['"]\.\.\/data['"]/g, `from '${prefix}data'`);
    
    // Fix implicit any in Footer.tsx
    if (file === 'Footer.tsx') {
      content = content.replace(/routes\.map\(\(route,\s*idx\)\s*=>/g, `routes.map((route: any, idx: number) =>`);
      content = content.replace(/routes\.slice\(0, 6\)\.map\(\(route,\s*idx\)\s*=>/g, `routes.slice(0, 6).map((route: any, idx: number) =>`);
    }

    // Fix implicit any in HeroQuoteCalculator.tsx
    if (file === 'HeroQuoteCalculator.tsx') {
      content = content.replace(/\(n\)\s*=>\s*n\.name/g, `(n: any) => n.name`);
      content = content.replace(/\(n\)\s*=>\s*n\.name\s*===/g, `(n: any) => n.name ===`);
      content = content.replace(/\(\(n\)\s*=>/g, `((n: any) =>`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
  }
}

console.log('🔧 Fixing import prefixes and strict types...');
fixFiles(coreDir, '../../');
fixFiles(kitDir, '../../../');
console.log('✅ Import and type fix complete!');
