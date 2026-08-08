/**
 * ============================================================
 * VISUAL BENCHMARKING & SCREENSHOT COMPARISON ENGINE
 * Auto-captures high-resolution viewport & full-page snapshots
 * of generated batch websites for AI visual evaluation.
 * ============================================================
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Path to conversation artifacts directory for interactive UI viewing
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || 'C:\\Users\\venka\\.gemini\\antigravity\\brain\\0caa28ce-1401-4fa6-9cb0-21ef028a980a';
const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const BENCHMARK_DIR = path.join(OUTPUT_DIR, 'visual-benchmarks');

if (!fs.existsSync(BENCHMARK_DIR)) {
  fs.mkdirSync(BENCHMARK_DIR, { recursive: true });
}

// Targets to benchmark
const TARGETS = [
  { name: 'High Level Movers', slug: 'high-level-movers', port: 4001 },
  { name: 'Ecoway Movers', slug: 'ecoway-movers', port: 4002 }
];

function checkServerReady(url, timeoutMs = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const interval = setInterval(() => {
      http.get(url, (res) => {
        if (res.statusCode === 200 || res.statusCode === 304) {
          clearInterval(interval);
          resolve(true);
        }
      }).on('error', () => {
        if (Date.now() - start > timeoutMs) {
          clearInterval(interval);
          reject(new Error(`Server at ${url} did not respond within ${timeoutMs}ms`));
        }
      });
    }, 500);
  });
}

async function runVisualBenchmark() {
  console.log('📸 Starting Automated Visual Benchmarking & AI Evaluation Engine...\n');
  const servers = [];

  try {
    for (const target of TARGETS) {
      const targetDir = path.join(OUTPUT_DIR, target.slug);
      if (!fs.existsSync(targetDir)) {
        console.warn(`⚠️ Skipping ${target.name}: Directory ${targetDir} not found.`);
        continue;
      }

      console.log(`🚀 Starting local dev server for ${target.name} on port ${target.port}...`);
      const serverProcess = spawn('npm', ['run', 'dev', '--', '--port', String(target.port), '--host'], {
        cwd: targetDir,
        shell: true,
        stdio: 'ignore'
      });
      servers.push(serverProcess);

      const siteUrl = `http://localhost:${target.port}`;
      console.log(`⏳ Waiting for ${siteUrl} to initialize...`);
      await checkServerReady(siteUrl);
      console.log(`✨ Server ready! Capturing high-resolution viewport snapshots...`);

      // Define filenames
      const heroImg = `${target.slug}-hero-desktop.png`;
      const fullImg = `${target.slug}-full-desktop.png`;
      const heroPath = path.join(BENCHMARK_DIR, heroImg);
      const fullPath = path.join(BENCHMARK_DIR, fullImg);
      const artifactHeroPath = path.join(ARTIFACT_DIR, heroImg);

      // Execute Playwright screenshot capture (Hero Viewport 1440x900)
      console.log(`  📷 Capturing Desktop Hero (1440x900)...`);
      execSync(`npx -y playwright@latest screenshot --viewport-size "1440, 900" "${siteUrl}" "${heroPath}"`, { stdio: 'inherit' });

      // Execute Playwright full page capture
      console.log(`  📷 Capturing Full Page Document...`);
      execSync(`npx -y playwright@latest screenshot --viewport-size "1440, 900" --full-page "${siteUrl}" "${fullPath}"`, { stdio: 'inherit' });

      // Copy hero screenshot to conversation artifact directory for immediate AI & user inspection
      if (fs.existsSync(heroPath)) {
        if (fs.existsSync(ARTIFACT_DIR)) {
          fs.copyFileSync(heroPath, artifactHeroPath);
          console.log(`  💾 Copied snapshot to artifacts: ${heroImg}`);
        }
      }

      console.log(`✅ Completed capture for ${target.name}!\n`);
    }

    console.log('============================================================');
    console.log('🏁 VISUAL BENCHMARKING COMPLETE!');
    console.log(`📁 All visual comparison snapshots saved in: ${BENCHMARK_DIR}`);
    console.log('============================================================');

  } catch (error) {
    console.error('❌ Error during visual benchmark:', error.message);
  } finally {
    console.log('🧹 Shutting down background test servers...');
    servers.forEach(proc => proc.kill('SIGINT'));
    process.exit(0);
  }
}

runVisualBenchmark();
