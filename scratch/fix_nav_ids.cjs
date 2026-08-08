const fs = require('fs');
const path = require('path');

function fixNavIds(file) {
  const filePath = path.resolve(__dirname, '../src/components/core', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace ID strings in the navLinks arrays
  content = content.replace(/id: 'quote'/g, "id: 'hero_quote_calculator'");
  content = content.replace(/id: 'niches'/g, "id: 'service_niches'");
  content = content.replace(/id: 'routes'/g, "id: 'gta_routes'");
  content = content.replace(/id: 'how-it-works'/g, "id: 'how_it_works'");
  content = content.replace(/id: 'supplies-storage'/g, "id: 'supplies_and_storage'");
  content = content.replace(/id: 'referral'/g, "id: 'referral_program'");
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed nav ids in', file);
}

fixNavIds('HeaderMinimal.tsx');
fixNavIds('HeaderSplit.tsx');
fixNavIds('HeaderStandard.tsx');
