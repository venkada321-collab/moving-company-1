/**
 * ============================================================
 * ZERO-CORS LOCAL ASSET INGESTION ENGINE
 * Downloads remote HTTP/HTTPS logos and favicons directly into
 * ./public/assets/brand/ to bypass hotlink blocks and CDN outages.
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

const profilePath = process.argv[2];

if (!profilePath || !fs.existsSync(profilePath)) {
  console.error('❌ Error: Please provide a valid path to target-profile.json');
  process.exit(1);
}

const profile = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
const brandAssetsDir = path.join(process.cwd(), 'public', 'assets', 'brand');

if (!fs.existsSync(brandAssetsDir)) {
  fs.mkdirSync(brandAssetsDir, { recursive: true });
}

async function fetchAssetWithFallback(url, targetPath) {
  console.log(`  🌐 Downloading asset from remote source: ${url}`);
  try {
    // Attempt standard fetch with Chrome User-Agent
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': new URL(url).origin + '/'
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(targetPath, buffer);
    console.log(`  📦 Saved local static file: ${targetPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
    return true;
  } catch (err) {
    console.warn(`  ⚠️ Simple HTTP fetch failed (${err.message}). Attempting Playwright fallback...`);
    try {
      const { chromium } = require('playwright');
      const browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      const response = await page.goto(url, { waitUntil: 'load', timeout: 15000 });
      if (response && response.status() === 200) {
        const buffer = await response.body();
        fs.writeFileSync(targetPath, buffer);
        console.log(`  📦 Playwright successfully ingested asset: ${targetPath} (${(buffer.length / 1024).toFixed(1)} KB)`);
        await browser.close();
        return true;
      }
      await browser.close();
      throw new Error(`Playwright received HTTP ${response ? response.status() : 'No Response'}`);
    } catch (pwErr) {
      console.error(`  ❌ Failed to ingest asset ${url}: ${pwErr.message}. Keeping remote fallback URL.`);
      return false;
    }
  }
}

async function ingestAssets() {
  console.log(`📥 Checking remote asset dependencies for ${profile.name || 'target brand'}...`);
  let updated = false;

  // Ingest Logo
  if (profile.logoUrl && profile.logoUrl.startsWith('http')) {
    const ext = path.extname(new URL(profile.logoUrl).pathname) || '.png';
    const filename = `logo${ext.split('?')[0]}`;
    const localPath = path.join(brandAssetsDir, filename);
    const webPath = `/assets/brand/${filename}`;
    
    const success = await fetchAssetWithFallback(profile.logoUrl, localPath);
    if (success) {
      profile.logoUrl = webPath;
      updated = true;
    }
  }

  // Ingest Favicon
  if (profile.faviconUrl && profile.faviconUrl.startsWith('http')) {
    const ext = path.extname(new URL(profile.faviconUrl).pathname) || '.png';
    const filename = `favicon${ext.split('?')[0]}`;
    const localPath = path.join(brandAssetsDir, filename);
    const webPath = `/assets/brand/${filename}`;

    const success = await fetchAssetWithFallback(profile.faviconUrl, localPath);
    if (success) {
      profile.faviconUrl = webPath;
      updated = true;
    }
  }

  if (updated) {
    fs.writeFileSync(profilePath, JSON.stringify(profile, null, 2), 'utf8');
    console.log(`✅ Asset ingestion complete! Rebuilt target-profile.json with immutable local paths.\n`);
  } else {
    console.log(`ℹ️ No remote asset downloading needed or assets already local.\n`);
  }
}

ingestAssets();
