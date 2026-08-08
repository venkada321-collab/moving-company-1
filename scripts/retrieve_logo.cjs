/**
 * ============================================================
 * ZERO-CORS LOGO & FAVICON RETRIEVAL ENGINE
 * Multi-strategy asset downloader that bypasses hotlink blocks,
 * WAF firewalls, CDN restrictions, and CORS policies.
 *
 * Strategy Cascade (tries each in order until success):
 *   1. Direct HTTP fetch with browser-mimicking headers
 *   2. Playwright page navigation (full browser engine)
 *   3. Playwright in-page element screenshot (visual capture)
 *   4. Dynamic SVG symbol badge generation (guaranteed fallback)
 *
 * Usage:
 *   Single URL:   node scripts/retrieve_logo.cjs <logo_url> [save_dir]
 *   From profile:  node scripts/retrieve_logo.cjs --profile <target-profile.json>
 *   From website:  node scripts/retrieve_logo.cjs --discover <website_url> [save_dir]
 *
 * Examples:
 *   node scripts/retrieve_logo.cjs https://getmovers.ca/img/logo.png ./public/assets/brand/
 *   node scripts/retrieve_logo.cjs --profile target-profile.json
 *   node scripts/retrieve_logo.cjs --discover https://uniquemovers.ca ./public/assets/brand/
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(`❌ Usage:
  node scripts/retrieve_logo.cjs <logo_url> [save_dir]
  node scripts/retrieve_logo.cjs --profile <target-profile.json>
  node scripts/retrieve_logo.cjs --discover <website_url> [save_dir]`);
  process.exit(1);
}

const DEFAULT_SAVE_DIR = path.join(process.cwd(), 'public', 'assets', 'brand');

// ─────────────────────────────────────────────────────────────
// Strategy 1: Direct HTTP Fetch with Browser-Mimicking Headers
// Handles: Standard web servers, most WordPress sites
// ─────────────────────────────────────────────────────────────
async function strategyDirectFetch(url, savePath) {
  console.log(`  [Strategy 1] Direct HTTP fetch with Chrome UA...`);
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': new URL(url).origin + '/',
        'Sec-Ch-Ua': '"Chromium";v="126", "Google Chrome";v="126"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'image',
        'Sec-Fetch-Mode': 'no-cors',
        'Sec-Fetch-Site': 'same-origin',
      },
      redirect: 'follow',
    });
    clearTimeout(timeout);

    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('image') && !contentType.includes('svg') && !contentType.includes('octet-stream')) {
      throw new Error(`Unexpected content-type: ${contentType} (not an image)`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length < 100) throw new Error(`Response too small (${buffer.length} bytes) — likely a redirect or error page`);

    fs.writeFileSync(savePath, buffer);
    console.log(`  ✅ [Strategy 1] SUCCESS — Saved ${(buffer.length / 1024).toFixed(1)} KB to ${savePath}`);
    return true;
  } catch (err) {
    console.log(`  ⚠️ [Strategy 1] Failed: ${err.message}`);
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// Strategy 2: Playwright Full Browser Navigation
// Handles: Cloudflare-protected sites, JS-required assets,
//          Jetpack/CDN image proxies, hotlink-blocked resources
// ─────────────────────────────────────────────────────────────
async function strategyPlaywrightNavigation(url, savePath) {
  console.log(`  [Strategy 2] Playwright browser navigation...`);
  let browser;
  try {
    const { chromium } = require('playwright');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const response = await page.goto(url, { waitUntil: 'load', timeout: 20000 });
    if (!response) throw new Error('No response received');
    if (response.status() !== 200) throw new Error(`HTTP ${response.status()}`);

    const body = await response.body();
    if (body.length < 100) throw new Error(`Response too small (${body.length} bytes)`);

    fs.writeFileSync(savePath, body);
    console.log(`  ✅ [Strategy 2] SUCCESS — Saved ${(body.length / 1024).toFixed(1)} KB to ${savePath}`);
    return true;
  } catch (err) {
    console.log(`  ⚠️ [Strategy 2] Failed: ${err.message}`);
    return false;
  } finally {
    if (browser) await browser.close();
  }
}

// ─────────────────────────────────────────────────────────────
// Strategy 3: Playwright Element Screenshot
// Handles: Inline SVG logos, CSS-background logos, sprites,
//          heavily protected assets, data: URI logos
// ─────────────────────────────────────────────────────────────
async function strategyElementScreenshot(websiteUrl, savePath) {
  console.log(`  [Strategy 3] Playwright element screenshot of logo on page...`);
  let browser;
  try {
    const { chromium } = require('playwright');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    });

    await page.goto(websiteUrl, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(2000);

    // Try multiple selectors to find the logo element
    const logoSelectors = [
      'header img[src*="logo"]', 'nav img[src*="logo"]',
      'img[alt*="logo" i]', 'img[class*="logo" i]',
      'header img', 'nav img',
      '.logo img', '#logo img',
      'a[class*="logo"]', 'a[class*="brand"]',
      'header svg', 'nav svg', '.logo svg', '.logo',
    ];

    for (const selector of logoSelectors) {
      const element = await page.$(selector);
      if (element) {
        const box = await element.boundingBox();
        if (box && box.width > 20 && box.height > 10) {
          // Save as PNG with transparent background
          await element.screenshot({ path: savePath, omitBackground: true });
          const stats = fs.statSync(savePath);
          if (stats.size > 200) {
            console.log(`  ✅ [Strategy 3] SUCCESS — Captured logo via "${selector}" (${(stats.size / 1024).toFixed(1)} KB)`);
            return true;
          }
        }
      }
    }

    throw new Error('No suitable logo element found on page');
  } catch (err) {
    console.log(`  ⚠️ [Strategy 3] Failed: ${err.message}`);
    return false;
  } finally {
    if (browser) await browser.close();
  }
}

// ─────────────────────────────────────────────────────────────
// Strategy 4: Generate SVG Symbol Badge (Guaranteed Fallback)
// Creates a professional-looking branded symbol badge
// ─────────────────────────────────────────────────────────────
function strategySymbolBadge(brandName, palette, savePath) {
  console.log(`  [Strategy 4] Generating SVG symbol badge fallback...`);

  const symbol = brandName ? brandName[0].toUpperCase() : 'M';

  const PALETTE_COLORS = {
    emerald: { bg: '#059669', fg: '#ffffff' },
    blue:    { bg: '#2563eb', fg: '#ffffff' },
    indigo:  { bg: '#4f46e5', fg: '#ffffff' },
    violet:  { bg: '#7c3aed', fg: '#ffffff' },
    rose:    { bg: '#e11d48', fg: '#ffffff' },
    amber:   { bg: '#d97706', fg: '#000000' },
    crimson: { bg: '#dc2626', fg: '#ffffff' },
    gold:    { bg: '#b8860b', fg: '#ffffff' },
    slate:   { bg: '#475569', fg: '#ffffff' },
  };

  const colors = PALETTE_COLORS[palette] || PALETTE_COLORS.amber;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.bg};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.bg};stop-opacity:0.85" />
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="24" fill="url(#bg)"/>
  <text x="60" y="80" font-family="Arial, Helvetica, sans-serif" font-size="68" font-weight="bold" fill="${colors.fg}" text-anchor="middle">${symbol}</text>
</svg>`;

  // Save as both SVG and also convert-ready
  const svgPath = savePath.replace(/\.\w+$/, '.svg');
  fs.writeFileSync(svgPath, svg, 'utf8');
  console.log(`  ✅ [Strategy 4] FALLBACK — Generated symbol badge "${symbol}" at ${svgPath}`);
  return svgPath;
}

// ─────────────────────────────────────────────────────────────
// Orchestrator: Run strategies in cascade
// ─────────────────────────────────────────────────────────────
async function retrieveAsset(assetUrl, websiteUrl, savePath, brandName, palette) {
  console.log(`\n🔗 Retrieving: ${assetUrl || '(discover from page)'}`);
  console.log(`   Save to: ${savePath}`);

  // Ensure target directory exists
  const dir = path.dirname(savePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Strategy 1: Direct HTTP fetch
  if (assetUrl && assetUrl.startsWith('http')) {
    if (await strategyDirectFetch(assetUrl, savePath)) return { success: true, strategy: 1, path: savePath };
  }

  // Strategy 2: Playwright navigation to the asset URL
  if (assetUrl && assetUrl.startsWith('http')) {
    if (await strategyPlaywrightNavigation(assetUrl, savePath)) return { success: true, strategy: 2, path: savePath };
  }

  // Strategy 3: Screenshot the logo element from the website itself
  if (websiteUrl) {
    const screenshotPath = savePath.replace(/\.\w+$/, '.png');
    if (await strategyElementScreenshot(websiteUrl, screenshotPath)) return { success: true, strategy: 3, path: screenshotPath };
  }

  // Strategy 4: Generate an SVG symbol badge
  const badgePath = strategySymbolBadge(brandName || 'Brand', palette || 'amber', savePath);
  return { success: true, strategy: 4, path: badgePath, isFallback: true };
}

// ─────────────────────────────────────────────────────────────
// Discovery Mode: Find and download logos from a live website
// ─────────────────────────────────────────────────────────────
async function discoverAndRetrieve(websiteUrl, saveDir) {
  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🔍 LOGO DISCOVERY MODE — ${websiteUrl}`);
  console.log(`${'═'.repeat(70)}\n`);

  let browser;
  try {
    const { chromium } = require('playwright');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    });

    const candidateUrls = [websiteUrl];
    if (websiteUrl.startsWith('https://') && !websiteUrl.includes('//www.')) {
      candidateUrls.push(websiteUrl.replace('https://', 'https://www.'));
      candidateUrls.push(websiteUrl.replace('https://', 'http://www.'));
    } else if (websiteUrl.startsWith('https://www.')) {
      candidateUrls.push(websiteUrl.replace('https://www.', 'https://'));
    }
    let navSuccess = false;
    let navError = null;
    for (const url of candidateUrls) {
      try {
        console.log(`🌐 Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 22000 });
        await page.waitForTimeout(2500);
        navSuccess = true;
        break;
      } catch (e) {
        console.log(`  ⚠️ Navigation failed for ${url} (${e.message.split('\n')[0]}). Retrying fallback domain/protocol...`);
        navError = e;
      }
    }
    if (!navSuccess) throw navError || new Error('All protocol and domain variations failed to load.');

    // Discover logo and favicon URLs from the page DOM
    const discovered = await page.evaluate(() => {
      // Logo discovery with priority ranking
      const logoSelectors = [
        { sel: 'header img[src*="logo"]', priority: 10 },
        { sel: 'nav img[src*="logo"]', priority: 9 },
        { sel: 'img[alt*="logo" i]', priority: 8 },
        { sel: 'img[class*="logo" i]', priority: 7 },
        { sel: 'a[class*="logo"] img', priority: 7 },
        { sel: 'a[class*="brand"] img', priority: 6 },
        { sel: '#logo img', priority: 6 },
        { sel: '.logo img', priority: 6 },
        { sel: 'header img', priority: 4 },
        { sel: 'nav img', priority: 3 },
      ];

      let logoUrl = '';
      let logoMethod = '';
      let hasSvgLogo = false;

      for (const { sel, priority } of logoSelectors) {
        const el = document.querySelector(sel);
        if (el?.src && !el.src.startsWith('data:') && el.naturalWidth > 15) {
          logoUrl = el.src;
          logoMethod = `DOM selector: "${sel}" (priority ${priority})`;
          break;
        }
      }

      // 🛡️ GEOMETRIC TOP-OF-FOLD VISUAL DISCOVERY FALLBACK
      // Finds logos on sales funnel platforms and custom builders without relying on semantic tags or 'logo' naming
      if (!logoUrl) {
        const topImages = Array.from(document.querySelectorAll('img')).filter(i => {
          if (!i.src || i.src.startsWith('data:')) return false;
          const rect = i.getBoundingClientRect();
          return rect.top >= 0 && rect.top < 300 && rect.height >= 25 && rect.height <= 180 && rect.width >= 30;
        });
        if (topImages.length > 0) {
          topImages.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
          logoUrl = topImages[0].src;
          logoMethod = 'Geometric Top-of-Fold Visual Discovery';
        }
      }

      // Check for inline SVG logos
      if (!logoUrl) {
        const svgLogo = document.querySelector('header svg, nav svg, .logo svg, a[class*="logo"] svg');
        if (svgLogo) {
          hasSvgLogo = true;
          logoMethod = 'Inline SVG detected — will use element screenshot';
        }
      }

      // Favicon discovery
      const favSelectors = [
        'link[rel="apple-touch-icon"][sizes="180x180"]',
        'link[rel="apple-touch-icon"]',
        'link[rel="icon"][sizes="192x192"]',
        'link[rel="icon"][type="image/png"]',
        'link[rel="icon"]',
        'link[rel="shortcut icon"]',
      ];
      let faviconUrl = '';
      for (const sel of favSelectors) {
        const el = document.querySelector(sel);
        if (el?.href) { faviconUrl = el.href; break; }
      }

      // Extract brand name for fallback badge
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
      const logoAlt = document.querySelector('header img, nav img')?.alt || '';
      const pageTitle = document.title || '';
      const brandName = (logoAlt || ogTitle || pageTitle)
        .replace(/\s*[\|–—-]\s*(home|website|official|best|top).*$/i, '')
        .trim();

      return { logoUrl, faviconUrl, hasSvgLogo, logoMethod, brandName };
    });

    await browser.close();
    browser = null;

    console.log(`📋 Discovery Results:`);
    console.log(`   Logo URL: ${discovered.logoUrl || (discovered.hasSvgLogo ? '(inline SVG)' : '(not found)')}`);
    console.log(`   Method: ${discovered.logoMethod || 'N/A'}`);
    console.log(`   Favicon URL: ${discovered.faviconUrl || '(not found)'}`);
    console.log(`   Brand Name: ${discovered.brandName || '(unknown)'}`);

    // Retrieve logo
    const logoExt = discovered.logoUrl ? (path.extname(new URL(discovered.logoUrl).pathname).split('?')[0] || '.png') : '.png';
    const logoSavePath = path.join(saveDir, `logo${logoExt}`);
    const logoResult = await retrieveAsset(
      discovered.logoUrl || null,
      websiteUrl,
      logoSavePath,
      discovered.brandName,
      'amber'
    );

    // Retrieve favicon
    let faviconResult = { success: false };
    if (discovered.faviconUrl) {
      const favExt = path.extname(new URL(discovered.faviconUrl).pathname).split('?')[0] || '.png';
      const favSavePath = path.join(saveDir, `favicon${favExt}`);
      faviconResult = await retrieveAsset(
        discovered.faviconUrl,
        null,
        favSavePath,
        discovered.brandName,
        'amber'
      );
    }

    // Summary
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`✅ RETRIEVAL COMPLETE`);
    console.log(`   Logo: ${logoResult.path} (Strategy ${logoResult.strategy}${logoResult.isFallback ? ' — FALLBACK' : ''})`);
    if (faviconResult.success) {
      console.log(`   Favicon: ${faviconResult.path} (Strategy ${faviconResult.strategy})`);
    }
    console.log(`${'═'.repeat(70)}\n`);

    return { logo: logoResult, favicon: faviconResult, discovered };

  } catch (err) {
    console.error(`⚠️ Live DOM Logo Discovery could not reach domain (${err.message.split('\n')[0]}). Falling back to insulated brand badge.`);
    if (browser) await browser.close();
    return { logo: { success: false, isFallback: true }, favicon: { success: false }, error: err.message };
  }
}

// ─────────────────────────────────────────────────────────────
// Logo Chromatic Pixel Analysis (Primary Color Extraction)
// ─────────────────────────────────────────────────────────────
async function analyzeLogoPrimaryColor(localPath, fallbackPalette = 'blue') {
  if (!fs.existsSync(localPath)) return fallbackPalette;
  console.log(`\n🎨 Running Logo Chromatic Pixel Analysis on: ${localPath}...`);

  let browser;
  try {
    const ext = path.extname(localPath).toLowerCase();
    const mime = ext === '.svg' ? 'image/svg+xml' : (ext === '.jpg' || ext === '.jpeg') ? 'image/jpeg' : 'image/png';
    const buffer = fs.readFileSync(localPath);
    const dataUrl = `data:${mime};base64,${buffer.toString('base64')}`;

    const { chromium } = require('playwright');
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(`
      <!DOCTYPE html>
      <html>
      <body style="margin:0; background:#ffffff;">
        <img id="logo" src="${dataUrl}" style="max-width:300px; max-height:300px;" />
        <canvas id="canvas"></canvas>
      </body>
      </html>
    `);
    await page.waitForLoadState('load');

    const result = await page.evaluate(() => {
      const img = document.getElementById('logo');
      const canvas = document.getElementById('canvas');
      if (!img || img.naturalWidth === 0) return { palette: 'blue', confidence: 'fallback (empty image)' };

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const scores = { emerald: 0, blue: 0, indigo: 0, red: 0, amber: 0, violet: 0, slate: 0 };
      let totalSamples = 0;
      let chromaticSamples = 0;

      for (let i = 0; i < data.length; i += 16) {
        const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
        if (a < 50) continue; // Skip transparent background
        if ((r > 235 && g > 235 && b > 235) || (r < 25 && g < 25 && b < 25)) continue; // Skip near-white & near-black

        totalSamples++;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        if (max - min < 20) {
          scores.slate += 1;
          continue;
        }

        chromaticSamples++;
        if (g > r + 25 && g >= b) scores.emerald += 4;
        else if (b > r + 30 && b >= g) {
          if (r > 70) scores.indigo += 4;
          else scores.blue += 4;
        }
        else if (r > g + 40 && r > b + 40) scores.red += 4;
        else if (r > 150 && g > 100 && b < 90) scores.amber += 4;
        else if (r > 100 && b > 100 && g < 80) scores.violet += 4;
      }

      let bestPalette = 'blue';
      let maxScore = -1;
      for (const [pal, sc] of Object.entries(scores)) {
        if (sc > maxScore && pal !== 'slate') {
          maxScore = sc;
          bestPalette = pal;
        }
      }
      if (chromaticSamples < 15) bestPalette = 'slate';

      return { palette: bestPalette, scores, chromaticSamples, totalSamples };
    });

    await browser.close();
    console.log(`  📊 Chromatic Pixel Samples: ${result.chromaticSamples} / ${result.totalSamples}`);
    console.log(`  📈 Logo Color Score Distribution: ${JSON.stringify(result.scores || {})}`);
    console.log(`  🎯 Assigned Primary Palette from Logo: [${result.palette.toUpperCase()}]`);
    return result.palette || fallbackPalette;
  } catch (err) {
    if (browser) await browser.close();
    console.log(`  ⚠️ Could not sample canvas pixel buffer (${err.message.split('\n')[0]}). Maintaining fallback palette [${fallbackPalette.toUpperCase()}].`);
    return fallbackPalette;
  }
}

// ─────────────────────────────────────────────────────────────
// Profile Mode: Process a target-profile.json
// ─────────────────────────────────────────────────────────────
async function processProfile(profilePath) {
  if (!fs.existsSync(profilePath)) {
    console.error(`❌ Profile not found: ${profilePath}`);
    process.exit(1);
  }

  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
  const saveDir = path.join(process.cwd(), 'public', 'assets', 'brand');
  if (!fs.existsSync(saveDir)) fs.mkdirSync(saveDir, { recursive: true });

  const websiteUrl = profile.websiteUrl || (profile.domain && !profile.domain.startsWith('http') ? (profile.domain.startsWith('www.') ? `https://${profile.domain}` : `https://www.${profile.domain}`) : profile.domain);
  const palette = profile.theme?.primary || 'amber';
  let updated = false;

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`📋 PROFILE MODE — Processing: ${profile.name || profilePath}`);
  console.log(`${'═'.repeat(70)}\n`);

  // Retrieve logo
  if (profile.logoUrl && profile.logoUrl.startsWith('http')) {
    const ext = path.extname(new URL(profile.logoUrl).pathname).split('?')[0] || '.png';
    const savePath = path.join(saveDir, `logo${ext}`);
    const result = await retrieveAsset(profile.logoUrl, websiteUrl, savePath, profile.name, palette);
    if (result.success && !result.isFallback) {
      const webPath = `/assets/brand/${path.basename(result.path)}`;
      profile.logoUrl = webPath;
      updated = true;
    } else if (result.isFallback) {
      profile.logoUrl = `/assets/brand/${path.basename(result.path)}`;
      updated = true;
    }
  } else if (!profile.logoUrl || profile.logoUrl === '' || profile.logoUrl.startsWith('data:')) {
    // No authentic HTTP URL — try live discovery from domain
    console.log(`  ℹ️ No authentic logo URL in profile (found placeholder/empty). Attempting live discovery from ${websiteUrl}...`);
    try {
      const discoveryResult = await discoverAndRetrieve(websiteUrl, saveDir);
      if (discoveryResult.logo && discoveryResult.logo.success && !discoveryResult.logo.isFallback) {
        profile.logoUrl = `/assets/brand/${path.basename(discoveryResult.logo.path)}`;
        updated = true;
      }
      if (discoveryResult.favicon && discoveryResult.favicon.success && (!profile.faviconUrl || profile.faviconUrl.startsWith('data:'))) {
        profile.faviconUrl = `/assets/brand/${path.basename(discoveryResult.favicon.path)}`;
        updated = true;
      }
    } catch (discoveryError) {
      console.log(`  ⚠️ Live logo discovery from ${websiteUrl} could not resolve an image (${discoveryError.message.split('\n')[0]}). Maintaining existing logo settings.`);
    }
  }

  // Retrieve favicon
  if (profile.faviconUrl && profile.faviconUrl.startsWith('http')) {
    const ext = path.extname(new URL(profile.faviconUrl).pathname).split('?')[0] || '.png';
    const savePath = path.join(saveDir, `favicon${ext}`);
    const result = await retrieveAsset(profile.faviconUrl, null, savePath, profile.name, palette);
    if (result.success) {
      profile.faviconUrl = `/assets/brand/${path.basename(result.path)}`;
      updated = true;
    }
  }

  // 🛡️ UNCONDITIONAL LOGO CHROMATIC PIXEL EXTRACTION
  // Enforces that the actual downloaded brand logo is visually analyzed to establish the Primary Website Color!
  if (profile.logoUrl && profile.logoUrl.startsWith('/assets/')) {
    const localLogoFile = path.join(process.cwd(), 'public', profile.logoUrl.replace(/^\//, ''));
    if (fs.existsSync(localLogoFile)) {
      const logoDerivedPalette = await analyzeLogoPrimaryColor(localLogoFile, palette);
      if (!profile.theme) profile.theme = {};
      profile.theme.primary = logoDerivedPalette;
      if (!profile.theme.designTokens) profile.theme.designTokens = {};
      profile.theme.designTokens.colorPalette = logoDerivedPalette;
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), 'utf8');
    console.log(`\n✅ Updated profile with local asset paths & logo primary palette: ${profilePath}`);
  }

  return profile;
}

// ─────────────────────────────────────────────────────────────
// CLI Entry Point
// ─────────────────────────────────────────────────────────────
async function main() {
  if (args[0] === '--profile') {
    // Profile mode
    await processProfile(args[1]);
  } else if (args[0] === '--discover') {
    // Discovery mode
    const websiteUrl = args[1].startsWith('http') ? args[1] : `https://${args[1]}`;
    const saveDir = args[2] || DEFAULT_SAVE_DIR;
    await discoverAndRetrieve(websiteUrl, saveDir);
  } else {
    // Direct URL mode
    const assetUrl = args[0];
    const saveDir = args[1] || DEFAULT_SAVE_DIR;
    const ext = path.extname(new URL(assetUrl).pathname).split('?')[0] || '.png';
    const savePath = path.join(saveDir, `logo${ext}`);
    await retrieveAsset(assetUrl, null, savePath, 'Brand', 'amber');
  }
}

main().catch(err => {
  console.error(`❌ Fatal error: ${err.message}`);
  process.exit(1);
});
