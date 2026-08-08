const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Simple embedded static server for testing built 'dist' directories without needing external servers
function startStaticServer(distDir, port) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const cleanPath = req.url.split('?')[0];
      let filePath = path.join(distDir, (cleanPath === '/' || cleanPath === '') ? 'index.html' : cleanPath);
      
      if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html');
      }
      if (!fs.existsSync(filePath)) {
        // Fallback to index.html for SPA routing
        filePath = path.join(distDir, 'index.html');
      }
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        res.writeHead(404);
        res.end('Not Found');
        return;
      }
      const ext = path.extname(filePath).toLowerCase();
      const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2'
      };
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

async function runQACapture() {
  let targetArg = process.argv[2] || 'http://localhost:5173';
  const outputDir = process.argv[3] || path.join(__dirname, '..', 'output', 'qa-screenshots');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  let server = null;
  let targetUrl = targetArg;

  // If a local folder path (like ./output/fast-track-moving-storage) is passed, start static server on dist
  if (!targetArg.startsWith('http')) {
    let distDir = path.join(targetArg, 'dist');
    if (!fs.existsSync(distDir)) {
      // Check if targetArg is already pointing directly to dist
      if (path.basename(targetArg) === 'dist') {
        distDir = targetArg;
      } else {
        console.error(`❌ Critical Error: Dist folder not found at ${distDir}. Did you run npm run build?`);
        process.exit(1);
      }
    }
    const testPort = 8999 + Math.floor(Math.random() * 1000);
    console.log(`📡 Spinning up embedded static server for ${distDir} on port ${testPort}...`);
    server = await startStaticServer(distDir, testPort);
    targetUrl = `http://127.0.0.1:${testPort}`;
  }

  console.log(`\n═══════════════════════════════════════════════════════════════════════════════`);
  console.log(`📸 ANTIGRAVITY PLAYWRIGHT QA ENGINEER ENGINE — AUTOMATED SCREENSHOT SUITE`);
  console.log(`═══════════════════════════════════════════════════════════════════════════════`);
  console.log(`🎯 Target Endpoint: ${targetUrl} (Source: ${targetArg})`);
  console.log(`📂 Output Directory: ${outputDir}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2 // 2x Retina scaling for ultra-crisp AI visual inspection
  });

  const page = await context.newPage();
  
  try {
    console.log(`⏳ Navigating to ${targetUrl}...`);
    await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000); // Allow any layout animations or fonts to stabilize

    // Capture Complete Full Page Master Screenshot for High-Efficiency AI Evaluation
    const fullPagePath = path.join(outputDir, 'full-page-master.png');
    console.log(`📸 Capturing Full Page Master Screenshot -> ${fullPagePath}...`);
    await page.screenshot({ path: fullPagePath, fullPage: true });

    console.log(`\n═══════════════════════════════════════════════════════════════════════════════`);
    console.log(`🏁 SCREENSHOT CAPTURE COMPLETE — READY FOR AI MULTIMODAL INSPECTION`);
    console.log(`═══════════════════════════════════════════════════════════════════════════════`);
    console.log(`📄 Available Visual Evidence Files:`);
    fs.readdirSync(outputDir).forEach(file => {
      if (file.endsWith('.png')) {
        console.log(`   - ${path.join(outputDir, file)}`);
      }
    });

  } catch (error) {
    console.error(`❌ QA Screenshot Engine Error: ${error.message}`);
  } finally {
    await browser.close();
    if (server) {
      server.close();
      console.log(`📡 Embedded static server shut down.`);
    }
  }
}

runQACapture();
