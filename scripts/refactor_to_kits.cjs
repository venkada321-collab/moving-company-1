// ==============================================================================
// MODULAR ARCHITECTURE MIGRATION SCRIPT
// Separates src/components/ into Niche-Agnostic Core vs. Moving Template Kit
// ==============================================================================
const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const compDir = path.join(srcDir, 'components');
const coreDir = path.join(compDir, 'core');
const kitDir = path.join(srcDir, 'kits', 'kit-moving', 'components');

// 1. Ensure directories exist
fs.mkdirSync(coreDir, { recursive: true });
fs.mkdirSync(kitDir, { recursive: true });

// 2. Define File Classifications
const CORE_FILES = [
  'Header.tsx',
  'HeaderStandard.tsx',
  'HeaderMinimal.tsx',
  'HeaderSplit.tsx',
  'HeroCenteredCta.tsx',
  'HeroCompactBanner.tsx',
  'TrustSignals.tsx',
  'TrustStatsRibbon.tsx',
  'Footer.tsx',
  'SectionDivider.tsx',
  'BookingConfirmationModal.tsx'
];

const KIT_FILES = [
  'HeroQuoteCalculator.tsx',
  'HowItWorks.tsx',
  'HowItWorksAccordion.tsx',
  'ServiceNichesPage.tsx',
  'SuppliesAndStoragePage.tsx',
  'SuppliesTable.tsx',
  'GTARoutesPage.tsx',
  'COIModal.tsx',
  'ReferralProgram.tsx',
  'BlogPage.tsx'
];

console.log('🏛️  MIGRATING REPOSITORY TO CORE VS TEMPLATE KIT ARCHITECTURE...');

// Helper to update imports in file content
function rewriteImports(content, depth) {
  const prefix = depth === 'core' ? '../../' : '../../../';
  
  // Replace ../config, ../types, ../data
  let updated = content
    .replace(/from\s+['"]\.\.\/config\/([^'"]+)['"]/g, `from '${prefix}config/$1'`)
    .replace(/from\s+['"]\.\.\/types['"]/g, `from '${prefix}types'`)
    .replace(/from\s+['"]\.\.\/data\/([^'"]+)['"]/g, `from '${prefix}data/$1'`);

  // If in kit, check if it imports any core component like SectionDivider or TrustSignals
  if (depth === 'kit') {
    CORE_FILES.forEach(file => {
      const name = file.replace('.tsx', '');
      const regex = new RegExp(`from\\s+['"]\\.\\/${name}['"]`, 'g');
      updated = updated.replace(regex, `from '../../../components/core/${name}'`);
    });
    // Check if it imports another kit component
    KIT_FILES.forEach(file => {
      const name = file.replace('.tsx', '');
      const regex = new RegExp(`from\\s+['"]\\.\\/${name}['"]`, 'g');
      updated = updated.replace(regex, `from './${name}'`);
    });
  } else if (depth === 'core') {
    // If in core, check if it imports another core component
    CORE_FILES.forEach(file => {
      const name = file.replace('.tsx', '');
      const regex = new RegExp(`from\\s+['"]\\.\\/${name}['"]`, 'g');
      updated = updated.replace(regex, `from './${name}'`);
    });
  }

  return updated;
}

// 3. Move Core Files
CORE_FILES.forEach(file => {
  const oldPath = path.join(compDir, file);
  if (fs.existsSync(oldPath)) {
    let content = fs.readFileSync(oldPath, 'utf8');
    content = rewriteImports(content, 'core');
    const newPath = path.join(coreDir, file);
    fs.writeFileSync(newPath, content, 'utf8');
    fs.unlinkSync(oldPath);
    console.log(`  📦 [CORE ENGINE] Migrated: ${file} -> src/components/core/`);
  }
});

// 4. Move Kit Files
KIT_FILES.forEach(file => {
  const oldPath = path.join(compDir, file);
  if (fs.existsSync(oldPath)) {
    let content = fs.readFileSync(oldPath, 'utf8');
    content = rewriteImports(content, 'kit');
    const newPath = path.join(kitDir, file);
    fs.writeFileSync(newPath, content, 'utf8');
    fs.unlinkSync(oldPath);
    console.log(`  📦 [TEMPLATE KIT: MOVING] Migrated: ${file} -> src/kits/kit-moving/components/`);
  }
});

// 5. Update src/App.tsx imports
const appPath = path.join(srcDir, 'App.tsx');
if (fs.existsSync(appPath)) {
  let appContent = fs.readFileSync(appPath, 'utf8');
  
  CORE_FILES.forEach(file => {
    const name = file.replace('.tsx', '');
    const regex = new RegExp(`from\\s+['"]\\.\\/components\\/${name}['"]`, 'g');
    appContent = appContent.replace(regex, `from './components/core/${name}'`);
  });

  KIT_FILES.forEach(file => {
    const name = file.replace('.tsx', '');
    const regex = new RegExp(`from\\s+['"]\\.\\/components\\/${name}['"]`, 'g');
    appContent = appContent.replace(regex, `from './kits/kit-moving/components/${name}'`);
  });

  fs.writeFileSync(appPath, appContent, 'utf8');
  console.log(`  🔄 Updated src/App.tsx imports to map cleanly to Core Engine and @agy/kit-moving`);
}

console.log('✅ MODULAR ARCHITECTURE MIGRATION COMPLETE!\n');
