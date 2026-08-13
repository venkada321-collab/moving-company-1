const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'output');

// 1. Delete previous competitor sites
const hlmPath = path.join(outputDir, 'high-level-movers');
const ecoPath = path.join(outputDir, 'ecoway-movers');

if (fs.existsSync(hlmPath)) {
  fs.rmSync(hlmPath, { recursive: true, force: true });
  console.log('🗑️  Deleted previous build: ./output/high-level-movers');
}
if (fs.existsSync(ecoPath)) {
  fs.rmSync(ecoPath, { recursive: true, force: true });
  console.log('🗑️  Deleted previous build: ./output/ecoway-movers');
}

// 2. Update Core Headers to dynamically filter out disabled Kit tabs
const coreDir = path.join(__dirname, '..', 'src', 'components', 'core');
const headers = ['HeaderStandard.tsx', 'HeaderMinimal.tsx', 'HeaderSplit.tsx'];

headers.forEach(headerFile => {
  const filePath = path.join(coreDir, headerFile);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure LAYOUT is imported from config
  if (!content.includes('LAYOUT')) {
    content = content.replace(/import { BRAND, GEO, LEGAL } from ['"]\.\.\/\.\.\/config['"];/, "import { BRAND, GEO, LEGAL, LAYOUT } from '../../config';");
  }

  // Update navItems definition to include enabled checks
  const oldNav = /const navItems = \[[^\]]+\];/m;
  const newNav = `const navItems = [
    { id: 'quote', label: 'Home & Estimate', icon: Tag, enabled: true },
    { id: 'niches', label: 'Service Niches', icon: Truck, enabled: LAYOUT.sectionsEnabled.core_services },
    { id: 'routes', label: \`\${GEO.regionName} Routes\`, icon: MapPin, enabled: LAYOUT.sectionsEnabled.service_areas },
    { id: 'how-it-works', label: 'How It Works', icon: ShieldCheck, enabled: LAYOUT.sectionsEnabled.how_it_works },
    { id: 'supplies-storage', label: 'Supplies & Storage', icon: Box, enabled: LAYOUT.sectionsEnabled.supplemental_services },
    { id: 'blog', label: \`\${GEO.regionName} Blog\`, icon: Award, enabled: LAYOUT.sectionsEnabled.blog_page },
    { id: 'referral', label: \`Referral ($\${BRAND.referralGetAmount})\`, icon: Gift, highlight: true, enabled: LAYOUT.sectionsEnabled.referral_program },
  ].filter(item => item.enabled !== false);`;

  if (oldNav.test(content)) {
    content = content.replace(oldNav, newNav);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✨ Injected dynamic Kit module filtering into Core Navigation component: ${headerFile}`);
  }
});

console.log('🚀 Core preparation complete! Ready to compile pure basic websites without Kit plugins.');
