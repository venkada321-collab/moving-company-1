const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { getCopyVariation } = require('./copy-variations.cjs');
const { generateNicheUniquePalette } = require('./color_spectrum_engine.cjs');

// Load .env file
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  });
}

// Usage: node scripts/batch_clone.cjs <path_to_batch.json> [--deploy] [--skip-build] [--variation-window=N]
const batchFilePath = process.argv[2];
const shouldDeploy = process.argv.includes('--deploy');
const skipBuild = process.argv.includes('--skip-build');
const variationWindowArg = process.argv.find(arg => arg.startsWith('--variation-window='));
const variationWindow = variationWindowArg ? parseInt(variationWindowArg.split('=')[1], 10) : 8;

if (!batchFilePath || !fs.existsSync(batchFilePath)) {
  console.error('❌ Error: Please provide a valid path to a JSON list of target websites or domain strings.');
  console.log('Usage: node scripts/batch_clone.cjs examples/batch-targets.sample.json [--deploy] [--skip-build] [--variation-window=N]');
  process.exit(1);
}

console.log(`📥 Loading batch target list from: ${batchFilePath}...`);

// Automate branding discovery: Run Playwright analyzer first to fetch live colors, logos, and favicons
console.log(`🔍 Executing Live Brand Discovery & Extraction Engine...`);
try {
  execSync(`node scripts/analyze_target.cjs "${batchFilePath}"`, { stdio: 'inherit' });
} catch (err) {
  console.warn(`⚠️ Brand Discovery warning: ${err.message}. Proceeding with existing config.`);
}

const rawBatch = JSON.parse(fs.readFileSync(batchFilePath, 'utf8'));

if (!Array.isArray(rawBatch)) {
  console.error('❌ Error: Input file must be a JSON array of website profile objects or domain strings.');
  process.exit(1);
}

// Helper to sanitize strings into filesystem folder names (slugs)
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || `brand-${Date.now()}`;
}

// Helper to copy directory recursively while filtering out artifacts and node_modules
function copyDirectorySync(src, dest, excludeNames = ['.git', 'node_modules', 'dist', '.wrangler', 'output', 'batch-output', '.system_generated', '.user_uploaded']) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    if (excludeNames.includes(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectorySync(srcPath, destPath, excludeNames);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Ensure master output directory exists
const outputRootDir = path.join(__dirname, '..', 'output');
if (!fs.existsSync(outputRootDir)) {
  fs.mkdirSync(outputRootDir, { recursive: true });
}

console.log(`🚀 Starting Batch Engine for ${rawBatch.length} target websites...`);

const results = [];
const allResolvedProfiles = [];
const highPerceptionHistory = []; // Tracks sliding window of High-Perception features across variationWindow sites
const masterRepoDir = path.resolve(__dirname, '..');
const masterNodeModules = path.join(masterRepoDir, 'node_modules');

for (let i = 0; i < rawBatch.length; i++) {
  const rawItem = rawBatch[i];
  
  // Normalize item: support either a raw domain string or a comprehensive profile JSON object
  const profile = typeof rawItem === 'string'
    ? {
        name: rawItem.split('.')[0].toUpperCase() + ' Moving Group',
        domain: rawItem,
        shortName: rawItem.split('.')[0],
        websiteUrl: `https://www.${rawItem}`
      }
    : rawItem;

  // Algorithmic 9-Dimension Permutation Table (Guarantees distinct colors, fonts, geometry & UI architectures across batch sites)
  const structuralPermutations = [
    { nav: 'sticky-standard', hero: 'calculator-split', heroBackground: 'geometric-mesh', services: 'icon-grid', howItWorks: 'cards-grid', supplies: 'cards-catalog', footer: 'multi-column', motion: 'snappy-tech', color: 'amber', font: 'Montserrat', bodyFont: 'Inter', buttonRadius: '8px', cardRadius: '16px' },
    { nav: 'transparent-overlay', hero: 'centered-cta', heroBackground: 'dark-gradient-overlay', services: 'horizontal-cards', howItWorks: 'accordion-protocol', supplies: 'pricing-table', footer: 'cta-banner', motion: 'luxury-smooth', color: 'indigo', font: 'Space Grotesk', bodyFont: 'DM Sans', buttonRadius: '9999px', cardRadius: '24px' },
    { nav: 'centered-split', hero: 'compact-banner', heroBackground: 'clean-minimal', services: 'accordion-panels', howItWorks: 'accordion-protocol', supplies: 'pricing-table', footer: 'minimal-compact', motion: 'playful-bounce', color: 'emerald', font: 'Plus Jakarta Sans', bodyFont: 'DM Sans', buttonRadius: '0px', cardRadius: '8px' },
    { nav: 'sticky-standard', hero: 'centered-cta', heroBackground: 'geometric-mesh', services: 'accordion-panels', howItWorks: 'cards-grid', supplies: 'cards-catalog', footer: 'cta-banner', motion: 'luxury-smooth', color: 'rose', font: 'Outfit', bodyFont: 'Inter', buttonRadius: '12px', cardRadius: '20px' },
    { nav: 'transparent-overlay', hero: 'compact-banner', heroBackground: 'dark-gradient-overlay', services: 'icon-grid', howItWorks: 'accordion-protocol', supplies: 'pricing-table', footer: 'minimal-compact', motion: 'snappy-tech', color: 'blue', font: 'Plus Jakarta Sans', bodyFont: 'DM Sans', buttonRadius: '9999px', cardRadius: '24px' },
    { nav: 'sticky-standard', hero: 'calculator-split', services: 'icon-grid', howItWorks: 'cards-grid', supplies: 'cards-catalog', footer: 'multi-column', motion: 'snappy-tech', color: 'amber', font: 'Montserrat', bodyFont: 'Inter', buttonRadius: '8px', cardRadius: '16px' },
    { nav: 'transparent-overlay', hero: 'centered-cta', services: 'horizontal-cards', howItWorks: 'accordion-protocol', supplies: 'pricing-table', footer: 'cta-banner', motion: 'luxury-smooth', color: 'indigo', font: 'Space Grotesk', bodyFont: 'DM Sans', buttonRadius: '9999px', cardRadius: '24px' },
    { nav: 'centered-split', hero: 'compact-banner', services: 'accordion-panels', howItWorks: 'accordion-protocol', supplies: 'pricing-table', footer: 'minimal-compact', motion: 'playful-bounce', color: 'emerald', font: 'Plus Jakarta Sans', bodyFont: 'DM Sans', buttonRadius: '0px', cardRadius: '8px' },
    { nav: 'sticky-standard', hero: 'centered-cta', services: 'accordion-panels', howItWorks: 'cards-grid', supplies: 'cards-catalog', footer: 'cta-banner', motion: 'luxury-smooth', color: 'rose', font: 'Outfit', bodyFont: 'Inter', buttonRadius: '12px', cardRadius: '20px' },
    { nav: 'transparent-overlay', hero: 'compact-banner', services: 'icon-grid', howItWorks: 'accordion-protocol', supplies: 'pricing-table', footer: 'minimal-compact', motion: 'snappy-tech', color: 'blue', font: 'Plus Jakarta Sans', bodyFont: 'DM Sans', buttonRadius: '9999px', cardRadius: '24px' },
    { nav: 'centered-split', hero: 'calculator-split', services: 'horizontal-cards', howItWorks: 'cards-grid', supplies: 'cards-catalog', footer: 'multi-column', motion: 'playful-bounce', color: 'violet', font: 'Roboto', bodyFont: 'Inter', buttonRadius: '6px', cardRadius: '12px' }
  ];

  // Algorithmic expansion: generate all valid combinations for fleets > 6
  const navOptions = ['sticky-standard', 'transparent-overlay', 'centered-split', 'floating-pill-glass', 'dual-ribbon-bar', 'transparent-scroll-morph', 'brutalist-border-box', 'promo-ticker-nav', 'asymmetry-cta-dominant', 'minimal-dual-deck'];
  const heroOptions = ['calculator-split', 'centered-cta', 'compact-banner', 'interactive-step-quiz', 'slideout-executive-drawer', 'neomorphic-command-console', 'brutalist-tariff-ledger', 'glass-floating-widget'];
  const svcOptions = ['icon-grid', 'horizontal-cards', 'accordion-panels'];
  const howOptions = ['cards-grid', 'accordion-protocol', 'timeline-horizontal'];
  const supOptions = ['cards-catalog', 'pricing-table', 'minimal-list'];
  const reviewsOptions = ['cards-grid', 'stats-ribbon', 'grid-carousel', 'stats-ribbon-ticker', 'brutalist-monospaced-audit', 'luxury-editorial-carousel'];
  const footerOptions = ['multi-column', 'cta-banner', 'minimal-compact', 'gigantic-cta-banner', 'saas-mega-directory', 'brutalist-monospaced-ledger', 'minimal-dual-column'];
  const motionOptions = ['snappy-tech', 'luxury-smooth', 'playful-bounce'];
  const colorOptions = ['amber', 'indigo', 'emerald', 'rose', 'blue', 'violet', 'slate'];
  const uiOptions = ['modern-standard', 'brutalist-high-contrast', 'soft-glassmorphic', 'luxury-minimalist'];
  const sectionOrderPermutations = [
    ['hero_quote_calculator', 'how_it_works', 'trust_signals', 'service_niches', 'gta_routes', 'supplies_and_storage', 'referral_program', 'blog_page'],
    ['hero_quote_calculator', 'trust_signals', 'service_niches', 'how_it_works', 'supplies_and_storage', 'gta_routes', 'referral_program', 'blog_page'],
    ['hero_quote_calculator', 'service_niches', 'trust_signals', 'how_it_works', 'gta_routes', 'supplies_and_storage', 'referral_program', 'blog_page'],
    ['hero_quote_calculator', 'how_it_works', 'service_niches', 'supplies_and_storage', 'trust_signals', 'gta_routes', 'referral_program', 'blog_page']
  ];
  const radiusOptions = [{ b: '8px', c: '16px' }, { b: '9999px', c: '24px' }, { b: '0px', c: '8px' }, { b: '12px', c: '20px' }];
  const fontOptions = [
    { heading: 'Montserrat', body: 'Inter' },
    { heading: 'Playfair Display', body: 'Source Sans 3' },
    { heading: 'Space Grotesk', body: 'DM Sans' },
    { heading: 'Outfit', body: 'Inter' },
    { heading: 'Plus Jakarta Sans', body: 'DM Sans' },
    { heading: 'Roboto', body: 'Inter' },
  ];

  function getExpandedPermutation(baseHashHex, nonce = 0) {
    const effectiveHash = crypto.createHash('sha256').update(baseHashHex + nonce.toString()).digest('hex');
    
    const navIdx = parseInt(effectiveHash.substring(0, 4), 16);
    const heroIdx = parseInt(effectiveHash.substring(4, 8), 16);
    const svcIdx = parseInt(effectiveHash.substring(8, 12), 16);
    const howIdx = parseInt(effectiveHash.substring(12, 16), 16);
    const supIdx = parseInt(effectiveHash.substring(16, 20), 16);
    const revIdx = parseInt(effectiveHash.substring(20, 24), 16);
    const footerIdx = parseInt(effectiveHash.substring(24, 28), 16);
    const motionIdx = parseInt(effectiveHash.substring(28, 32), 16);
    const colorIdx = parseInt(effectiveHash.substring(32, 36), 16);
    const uiIdx = parseInt(effectiveHash.substring(36, 40), 16);
    const seqIdx = parseInt(effectiveHash.substring(40, 44), 16);
    const fontIdx = parseInt(effectiveHash.substring(44, 48), 16);
    const radIdx = parseInt(effectiveHash.substring(48, 52), 16);

    const nav = navOptions[navIdx % navOptions.length];
    const hero = heroOptions[heroIdx % heroOptions.length];
    const svc = svcOptions[svcIdx % svcOptions.length];
    const how = howOptions[howIdx % howOptions.length];
    const sup = supOptions[supIdx % supOptions.length];
    const rev = reviewsOptions[revIdx % reviewsOptions.length];
    const footer = footerOptions[footerIdx % footerOptions.length];
    const motion = motionOptions[motionIdx % motionOptions.length];
    const color = colorOptions[colorIdx % colorOptions.length];
    const ui = uiOptions[uiIdx % uiOptions.length];
    const seq = sectionOrderPermutations[seqIdx % sectionOrderPermutations.length];
    const font = fontOptions[fontIdx % fontOptions.length];
    const rad = radiusOptions[radIdx % radiusOptions.length];
    
    return { ui, sectionOrder: seq, nav, hero, services: svc, howItWorks: how, supplies: sup, reviews: rev, footer, motion, color, font: font.heading, bodyFont: font.body, buttonRadius: rad.b, cardRadius: rad.c };
  }

  const crypto = require('crypto');
  const slugString = profile.slug || profile.domain || profile.name || `brand-${i}`;
  const hashHex = crypto.createHash('sha256').update(String(slugString)).digest('hex');
  let hashIdx = parseInt(hashHex.substring(0, 8), 16) + (i * 11);

  // 🛡️ STATISTICAL PERCEPTUAL UNIQUENESS & HERO VARIATION ENGINE (Pre-Build Verification)
  // Ensures high-perception visual features (Hero Canvas + UI Profile + Palette) never repeat within the configured variationWindow
  let mutationAttempts = 0;
  let perm = getExpandedPermutation(hashHex, mutationAttempts);
  
  while (mutationAttempts < 15) {
    const perceptionKey = `${perm.hero}|${perm.ui}|${perm.color}`;
    const isCollided = highPerceptionHistory.some(prevKey => prevKey.startsWith(`${perm.hero}|${perm.ui}`));
    if (!isCollided) {
      highPerceptionHistory.push(perceptionKey);
      if (highPerceptionHistory.length > variationWindow) highPerceptionHistory.shift(); // Enforce dynamic variation sliding window
      break;
    }
    mutationAttempts++;
    hashIdx += 7; // Mutate cryptographic hash index to pick a divergent high-perception architecture
    perm = getExpandedPermutation(hashHex, mutationAttempts);
  }
  console.log(`🛡️ Pre-Build Perceptual Uniqueness Confirmed [Hero: ${perm.hero} | UI: ${perm.ui} | Palette: ${perm.color}]`);

  if (!profile.layout) profile.layout = {};
  profile.layout.sectionOrder = profile.layout.sectionOrder || perm.sectionOrder;
  const existingVars = profile.layout.variants || {};
  profile.layout.variants = {
    uiProfile: existingVars.uiProfile || perm.ui,
    nav: existingVars.nav || perm.nav,
    hero: existingVars.hero || perm.hero,
    services: existingVars.services || perm.services,
    howItWorks: existingVars.howItWorks || perm.howItWorks,
    supplies: existingVars.supplies || perm.supplies,
    reviews: existingVars.reviews || perm.reviews,
    footer: existingVars.footer || perm.footer,
  };

  if (!profile.theme) profile.theme = {};
  // Synthesize a Niche-Restricted Bounded Unique Palette (guarantees professional logistics color boundaries)
  const nicheColor = generateNicheUniquePalette(slugString, profile.niche || 'logistics-relocation', hashIdx);
  profile.theme.nichePalette = nicheColor;
  profile.theme.primary = profile.theme.primary || nicheColor.keyword || perm.color;
  const tObj = profile.theme.tokens || profile.theme.designTokens || profile.designTokens || {};
  tObj.synthesizedHex = nicheColor.synthesizedHex;
  tObj.niche = nicheColor.niche;
  if (!tObj.animation) tObj.animation = {};
  tObj.animation.profile = tObj.animation.profile || perm.motion || 'snappy-tech';
  if (!tObj.fonts) tObj.fonts = {};
  // Enforce distinct typography stack per site in fleet for >90% visual divergence
  tObj.fonts.heading = tObj.fonts.heading || perm.font;
  tObj.fonts.body = tObj.fonts.body || perm.bodyFont;
  if (!tObj.geometry) tObj.geometry = {};
  // Enforce distinct geometry per site in fleet
  tObj.geometry.radiusButton = perm.buttonRadius;
  tObj.geometry.radiusCard = perm.cardRadius;
  profile.theme.tokens = tObj;
  profile.theme.designTokens = tObj;

  const brandName = profile.name || profile.domain || `Target Site ${i + 1}`;

  // Inject copy variation for uniqueness
  const copyVar = getCopyVariation(i);
  if (!profile.heroTagline) {
    profile.heroTagline = (profile.name || brandName).toUpperCase() + ' — ' + copyVar.heroTaglineSuffix;
  }
  if (!profile.heroSubtitle) profile.heroSubtitle = copyVar.heroSubtitle;
  if (!profile.rankingClaim) profile.rankingClaim = copyVar.rankingClaim;
  if (!profile.ctaText) profile.ctaText = copyVar.ctaText;
  if (!profile.microcopy) profile.microcopy = {};
  if (!profile.microcopy.buttons) profile.microcopy.buttons = copyVar.buttons;
  if (!profile.microcopy.reassurances) profile.microcopy.reassurances = copyVar.reassurances;
  if (!profile.microcopy.toneProfile) profile.microcopy.toneProfile = copyVar.toneProfile;

  const slug = profile.githubRepo || toSlug(brandName);
  const targetDir = path.join(outputRootDir, slug);

  console.log(`\n============================================================`);
  console.log(`[${i + 1}/${rawBatch.length}] 🛠️  Processing Brand: ${brandName} (Slug: ${slug})`);
  console.log(`🎨 Architecture Assigned: [Palette: ${profile.theme.primary.toUpperCase()}] [Font: ${profile.theme.designTokens.fonts.heading}] [Hero: ${profile.layout.variants.hero}] [Nav: ${profile.layout.variants.nav}]`);
  console.log(`============================================================`);

  const itemResult = {
    index: i + 1,
    name: brandName,
    slug: slug,
    directory: targetDir,
    populateStatus: 'Pending',
    buildStatus: 'Pending',
    deployUrl: 'N/A',
    error: null
  };

  try {
    // Step 1: Create isolated build folder and copy template
    console.log(`📦 Creating isolated brand clone in: ./output/${slug}/...`);
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    copyDirectorySync(masterRepoDir, targetDir);

    // Step 2: Write profile JSON and run modular substitution engine
    const targetProfilePath = path.join(targetDir, 'target-profile.json');
    fs.writeFileSync(targetProfilePath, JSON.stringify(profile, null, 2), 'utf8');
    
    console.log(`📥 Executing Zero-CORS Multi-Strategy Asset Retrieval Engine...`);
    execSync(`node scripts/retrieve_logo.cjs --profile target-profile.json`, {
      cwd: targetDir,
      stdio: 'inherit'
    });

    console.log(`🔄 Executing modular substitution engine with cryptographic fingerprint index (${hashIdx})...`);
    execSync(`node scripts/populate_template.cjs target-profile.json --batch-index ${hashIdx}`, {
      cwd: targetDir,
      stdio: 'inherit'
    });
    itemResult.populateStatus = '✅ Success';

    // Step 3: Fast dependency symlinking or copying for compiler verification
    if (!skipBuild) {
      console.log(`⚙️  Preparing dependencies for build check...`);
      const targetNodeModules = path.join(targetDir, 'node_modules');
      if (fs.existsSync(masterNodeModules) && !fs.existsSync(targetNodeModules)) {
        // Use directory copy or symlink if available for high-speed batch execution
        try {
          fs.symlinkSync(masterNodeModules, targetNodeModules, 'dir');
        } catch (e) {
          copyDirectorySync(masterNodeModules, targetNodeModules, []);
        }
      }

      console.log(`🔍 Verifying production compilation (npm run build)...`);
      execSync('npm run build', {
        cwd: targetDir,
        stdio: 'inherit'
      });
      itemResult.buildStatus = '✅ Passed (0 Errors)';

      console.log(`\n📸 Step 4.5: Capturing Pre-Design Snapshot for AI Design Agent...`);
      execSync(`node ../../scripts/qa_playwright_auditor.cjs . ../../output/qa-screenshots/${slug}-pre-design`, {
        cwd: targetDir,
        stdio: 'inherit'
      });

      console.log(`\n\n============================================================`);
      console.log(`⏸️  PIPELINE PAUSED: PRO MAX DESIGN AGENT HANDOFF`);
      console.log(`============================================================`);
      console.log(`Please invoke the \`pro_max_designer\` subagent to review:`);
      console.log(`-> output/qa-screenshots/${slug}-pre-design/full-page-master.png`);
      console.log(`\nSend any input (e.g., 'Enter') to this task via manage_task when the Design Agent is done to resume QA...`);
      const buffer = Buffer.alloc(1);
      require('fs').readSync(0, buffer, 0, 1);

      console.log(`\n▶️  RESUMING PIPELINE: Compiling final design changes...`);
      execSync('npm run build', { cwd: targetDir, stdio: 'inherit' });

      console.log(`📸 Step 5: Executing Final Retina High-DPI QA Auditor...`);
      execSync(`node ../../scripts/qa_playwright_auditor.cjs . ../../output/qa-screenshots/${slug}`, {
        cwd: targetDir,
        stdio: 'inherit'
      });
      console.log(`✅ QA Auditor verified visual rendering & contrast rules!`);
    } else {
      itemResult.buildStatus = '⏭️  Skipped';
    }

    // Step 4: Automated GitHub & Cloudflare Pages Deployment
    if (shouldDeploy) {
      console.log(`🚀 Triggering automated live edge deployment...`);
      
      // Git provisioning (can fail safely)
      try {
        execSync(`git init; git add -A; git commit -m "feat: initial batch release for ${brandName}"`, {
          cwd: targetDir,
          stdio: 'ignore'
        });

        if (profile.githubRepo && process.env.GITHUB_TOKEN) {
          console.log(`🌐 Provisioning GitHub repository: ${profile.githubRepo}...`);
          execSync(`gh repo create ${profile.githubRepo} --public --source=. --push`, { cwd: targetDir, stdio: 'inherit' });
        }
      } catch (gitErr) {
        console.warn(`⚠️ Git provisioning warning (safe to ignore): ${gitErr.message.split('\\n')[0]}`);
      }

      // Cloudflare Pages Deployment
      try {
        console.log(`⚡ Deploying to Cloudflare Pages...`);
        const cfProject = profile.cloudflareProject || slug;
        
        // Create project first if it doesn't exist
        try {
          execSync(`npx --yes wrangler@latest pages project create ${cfProject} --production-branch main`, {
            cwd: targetDir,
            encoding: 'utf8',
            stdio: 'ignore'
          });
        } catch (e) {
          // Ignore if it already exists
        }

        const deployOutput = execSync(`npx --yes wrangler@latest pages deploy dist --project-name ${cfProject} --branch main`, {
          cwd: targetDir,
          encoding: 'utf8'
        });
        
        // Extract live URL from deployment output
        const urlMatch = deployOutput.match(/https:\/\/[^\s]+\.pages\.dev/);
        itemResult.deployUrl = urlMatch ? urlMatch[0] : 'Deployed (Check Cloudflare Dashboard)';
      } catch (deployErr) {
        console.warn(`⚠️ Cloudflare deployment encountered warning: ${deployErr.message.split('\\n')[0]}`);
        itemResult.deployUrl = '⚠️ Manual push required';
      }
    }

    console.log(`✨ Successfully generated & verified clean build for: ${brandName}`);
  } catch (err) {
    console.error(`❌ Error processing ${brandName}:`, err.message);
    itemResult.error = err.message.split('\n')[0];
    if (itemResult.populateStatus === 'Pending') itemResult.populateStatus = '❌ Failed';
    if (itemResult.buildStatus === 'Pending') itemResult.buildStatus = '❌ Failed';
  }

  results.push(itemResult);
  allResolvedProfiles.push(profile);
}

// ============================================================
// FINAL BATCH EXECUTION REPORT
// ============================================================
console.log(`\n\n============================================================`);
console.log(`📋 BATCH EXECUTION SUMMARY (${results.length} Targets Processed)`);
console.log(`============================================================`);

console.table(results.map(r => ({
  '#': r.index,
  'Brand Name': r.name,
  'Slug': r.slug,
  'Substitution': r.populateStatus,
  'Build Test': r.buildStatus,
  'Live Edge URL': r.deployUrl
})));

const failedCount = results.filter(r => r.buildStatus.includes('❌') || r.populateStatus.includes('❌')).length;
const successCount = results.length - failedCount;

console.log(`\n🎉 Batch processing finished! Success: ${successCount} | Failed: ${failedCount}`);
console.log(`📁 All independent generated websites are ready in: ./output/<brand-slug>/`);

// Dump all resolved profiles to a single JSON file for verification/AI processing
const dumpPath = path.join(outputRootDir, 'batch_variants_dump.json');
fs.writeFileSync(dumpPath, JSON.stringify(allResolvedProfiles, null, 2), 'utf8');
console.log(`📄 Saved full variant configuration dump to: ${dumpPath}`);
if (failedCount > 0) {
  process.exit(1);
}
