const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const ARTIFACT_DIR = 'C:\\Users\\venka\\.gemini\\antigravity\\brain\\0caa28ce-1401-4fa6-9cb0-21ef028a980a';

const sites = [
  { name: "Let's Get Moving", slug: 'lets-get-moving', port: 5001 },
  { name: 'Mansa Movers', slug: 'mansa-movers', port: 5002 },
  { name: 'Golden Toby Movers', slug: 'golden-toby-movers', port: 5003 }
];

function checkServerReady(port) {
  return new Promise((resolve) => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      http.get(`http://localhost:${port}`, (res) => {
        if (res.statusCode === 200 || res.statusCode === 304) {
          clearInterval(interval);
          resolve(true);
        }
      }).on('error', () => {
        if (count >= 35) {
          clearInterval(interval);
          resolve(false);
        }
      });
    }, 500);
  });
}

async function capturePreviews() {
  console.log('🚀 Spawning live preview dev servers for all 3 generated brands...');
  const servers = [];
  
  for (const site of sites) {
    const cwd = path.join(OUTPUT_DIR, site.slug);
    const server = spawn('npm', ['run', 'dev', '--', '--port', site.port.toString(), '--host'], {
      cwd,
      stdio: 'pipe',
      shell: true
    });
    servers.push(server);
    console.log(`  🌐 Booted dev server for [${site.name}] at http://localhost:${site.port}`);
  }

  console.log('⏳ Waiting for application bundles to mount...');
  await Promise.all(sites.map(s => checkServerReady(s.port)));
  console.log('✨ All 3 servers are live! Deploying Playwright for visual screenshot capture...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const site of sites) {
    const url = `http://localhost:${site.port}`;
    console.log(`📸 Capturing live rendering for ${site.name} (${url})...`);
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'load', timeout: 20000 });
    await page.waitForTimeout(2000); // Allow animations and fonts to settle

    const fileName = `${site.slug}-live-preview.png`;
    const destPath = path.join(ARTIFACT_DIR, fileName);
    await page.screenshot({ path: destPath, fullPage: false });
    console.log(`✅ Saved artifact screenshot: ${destPath}`);
    await page.close();
  }

  await browser.close();

  console.log('\n🧹 Terminating temporary snapshot servers...');
  servers.forEach(s => {
    try { s.kill(); } catch (e) {}
  });

  console.log('🎉 LIVE PREVIEW HARVEST COMPLETE!');
  process.exit(0);
}

capturePreviews();
