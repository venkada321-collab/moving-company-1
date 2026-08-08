const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('Playwright required. npx playwright install chromium');
  process.exit(1);
}

const ARTIFACTS_DIR = 'C:\\Users\\venka\\.gemini\\antigravity\\brain\\0caa28ce-1401-4fa6-9cb0-21ef028a980a';
const OUTPUT_DIR = path.join(__dirname, '..', 'output');

const sites = [
  { name: "Let's Get Moving", slug: 'lets-get-moving', port: 5001, img: 'lets-get-moving-live-preview.png', footerImg: 'lets-get-moving-footer-live.png' },
  { name: 'Mansa Movers', slug: 'mansa-movers', port: 5002, img: 'mansa-movers-live-preview.png', footerImg: 'mansa-movers-footer-live.png' },
  { name: 'Golden Toby Movers', slug: 'golden-toby-movers', port: 5003, img: 'golden-toby-movers-live-preview.png', footerImg: 'golden-toby-movers-footer-live.png' }
];

async function checkServerReady(port, retries = 30) {
  const http = require('http');
  for (let i = 0; i < retries; i++) {
    const isUp = await new Promise(resolve => {
      const req = http.get(`http://localhost:${port}`, res => {
        resolve(res.statusCode >= 200 && res.statusCode < 500);
      });
      req.on('error', () => resolve(false));
      req.setTimeout(1000, () => { req.destroy(); resolve(false); });
    });
    if (isUp) return true;
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

async function runCapture() {
  console.log('🚀 Spawning temporary staging servers for live high-resolution preview capturing...');
  const procs = [];

  for (const site of sites) {
    const siteDir = path.join(OUTPUT_DIR, site.slug);
    console.log(`   Spawning ${site.name} on port ${site.port}...`);
    const cp = spawn('npm', ['run', 'dev', '--', '--port', site.port.toString(), '--host'], {
      cwd: siteDir,
      stdio: 'pipe',
      shell: true
    });
    procs.push(cp);
  }

  console.log('⏳ Waiting for servers to come alive...');
  await Promise.all(sites.map(s => checkServerReady(s.port)));
  console.log('✨ All servers responding! Deploying Headless Chromium to capture live previews...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 2200 }, deviceScaleFactor: 1 });

  for (const site of sites) {
    console.log(`📸 Capturing live rendering for ${site.name} (http://localhost:${site.port})...`);
    const page = await context.newPage();
    await page.goto(`http://localhost:${site.port}`, { waitUntil: 'networkidle', timeout: 25000 });
    await page.waitForTimeout(3000); // Allow fonts & animations to render cleanly

    // Full page preview
    const fullPath = path.join(ARTIFACTS_DIR, site.img);
    await page.screenshot({ path: fullPath, fullPage: false });
    console.log(`   ✅ Saved Live Preview: ${site.img}`);

    // Scroll down to Footer and capture anti-template regulatory compliance bar
    const footerEl = await page.$('footer');
    if (footerEl) {
      const footerPath = path.join(ARTIFACTS_DIR, site.footerImg);
      await footerEl.screenshot({ path: footerPath });
      console.log(`   ✅ Saved Footer Compliance Bar: ${site.footerImg}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('\n🧹 Terminating temporary capturing processes...');
  for (const p of procs) {
    p.kill('SIGKILL');
  }
  console.log('🎉 ALL LIVE PREVIEWS CAPTURED SUCCESSFULLY!');
  process.exit(0);
}

runCapture();
