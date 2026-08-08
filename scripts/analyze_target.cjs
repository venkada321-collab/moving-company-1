/**
 * ============================================================
 * AUTOMATED PLAYWRIGHT BRAND DISCOVERY & THEME MATCHING ENGINE
 * Analyzes live client web pages to harvest computed colors,
 * logos, favicons, and design characteristics for authentic cloning.
 * ============================================================
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const targetFilePath = process.argv[2] || 'targets-live-clones.json';
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || 'C:\\Users\\venka\\.gemini\\antigravity\\brain\\0caa28ce-1401-4fa6-9cb0-21ef028a980a';
const BENCHMARK_DIR = path.join(process.cwd(), 'output', 'visual-benchmarks');

if (!fs.existsSync(BENCHMARK_DIR)) {
  fs.mkdirSync(BENCHMARK_DIR, { recursive: true });
}

// Map computed RGB averages to our closest Pro Max theme palettes
function classifyColorPalette(rgbColors) {
  const scores = { emerald: 0, blue: 0, amber: 0, red: 0, indigo: 0, violet: 0, slate: 0 };
  
  for (const [r, g, b] of rgbColors) {
    // Ignore near white or near black neutral backgrounds
    if ((r > 230 && g > 230 && b > 230) || (r < 25 && g < 25 && b < 25)) continue;
    
    if (g > r + 30 && g > b + 20) {
      scores.emerald += 3; // Prominent Green / Emerald
    } else if (b > r + 40 && b > g + 20) {
      if (r > 80) scores.indigo += 2; // Violet / Indigo
      else scores.blue += 3; // Pure Blue
    } else if (r > g + 50 && r > b + 50) {
      scores.red += 3; // True Brand Red (Not Pink/Rose)
    } else if (r > 150 && g > 110 && b < 100) {
      scores.amber += 3; // Gold / Yellow / Amber / Orange
    } else if (r > 120 && b > 120 && g < 90) {
      scores.violet += 3;
    } else {
      scores.slate += 1;
    }
  }

  let bestPalette = 'amber'; // default fallback
  let maxScore = -1;
  for (const [palette, score] of Object.entries(scores)) {
    if (score > maxScore && score > 0) {
      maxScore = score;
      bestPalette = palette;
    }
  }
  return bestPalette;
}

async function analyzeTargets() {
  if (!fs.existsSync(targetFilePath)) {
    console.error(`❌ Target list file not found: ${targetFilePath}`);
    process.exit(1);
  }

  const targets = JSON.parse(fs.readFileSync(targetFilePath, 'utf8'));
  console.log(`🚀 Starting Playwright Brand Discovery Engine for ${targets.length} targets...\n`);

  const browser = await chromium.launch({ headless: true });
  
  for (let i = 0; i < targets.length; i++) {
    const item = targets[i];
    const url = item.websiteUrl || `https://${item.domain}`;
    const slug = item.slug || item.domain.replace(/[^a-z0-9]/gi, '-').toLowerCase();

    console.log(`============================================================`);
    console.log(`[${i + 1}/${targets.length}] 🔍 Analyzing Live Website: ${item.name || url}`);
    console.log(`🌐 Navigating to: ${url}...`);

    const page = await browser.newPage();
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 25000 });
      await page.waitForTimeout(3000); // Allow styles and JS widgets to settle

      // 1. Capture Authoritative Reference Screenshot of the real client website
      const refImgName = `${slug}-real-client.png`;
      const refPath = path.join(BENCHMARK_DIR, refImgName);
      console.log(`  📸 Capturing authoritative reference screenshot: ${refImgName}...`);
      await page.screenshot({ path: refPath, viewport: { width: 1440, height: 900 } });
      if (fs.existsSync(ARTIFACT_DIR) && fs.existsSync(refPath)) {
        fs.copyFileSync(refPath, path.join(ARTIFACT_DIR, refImgName));
      }

      // 2. Extract DOM computed styles from buttons, navigation ribbons, and headers
      console.log(`  🎨 Extracting live CSS computed colors & branding cues...`);
      const harvestedData = await page.evaluate(() => {
        const rgbColors = [];
        const elements = document.querySelectorAll('button, a[class*="btn"], a[class*="button"], .btn, header, nav, h1, h2');
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          ['backgroundColor', 'color', 'borderColor'].forEach(prop => {
            const val = style[prop];
            const match = val.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
            if (match) {
              rgbColors.push([parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]);
            }
          });
        });

        // Try discovering favicon
        const favElem = document.querySelector('link[rel="icon"], link[rel="shortcut icon"]');
        const discoveredFavicon = favElem ? (favElem.href || '') : '';

        // Try discovering main brand logo
        const logoImg = document.querySelector('header img, nav img, .logo img, img[alt*="logo" i]');
        const discoveredLogo = logoImg ? (logoImg.src || '') : '';

        return { rgbColors, discoveredFavicon, discoveredLogo };
      });

      const matchedPalette = classifyColorPalette(harvestedData.rgbColors);
      console.log(`  🎯 Intelligent Palette Match: [${matchedPalette.toUpperCase()}] derived from ${harvestedData.rgbColors.length} live DOM style elements.`);

      // Update target profile with discovered authentic palette and assets
      if (!item.theme) item.theme = {};
      item.theme.primary = matchedPalette;
      
      if (!item.logoUrl && harvestedData.discoveredLogo) {
        item.logoUrl = harvestedData.discoveredLogo;
        console.log(`  🏷️ Discovered live logo asset: ${item.logoUrl}`);
      }
      if (!item.faviconUrl && harvestedData.discoveredFavicon) {
        item.faviconUrl = harvestedData.discoveredFavicon;
        console.log(`  🔖 Discovered live favicon asset: ${item.faviconUrl}`);
      }

      console.log(`✅ Completed visual analysis & palette assignment for ${item.name}!`);

    } catch (err) {
      console.warn(`  ⚠️ Could not complete live scraping for ${url} (${err.message}). Maintaining fallback settings.`);
    } finally {
      await page.close();
    }
  }

  await browser.close();

  // Save updated configurations back to target list
  fs.writeFileSync(targetFilePath, JSON.stringify(targets, null, 2), 'utf8');
  console.log(`\n============================================================`);
  console.log(`🎉 BRAND DISCOVERY COMPLETE! Updated ${targetFilePath} with authentic brand color accents & asset URLs.`);
  console.log(`============================================================`);
}

analyzeTargets();
