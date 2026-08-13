const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const sites = [
  { name: 'Orbit International Moving', slug: 'orbit-international-moving-logistics-ltd' },
  { name: 'Coraza Movers', slug: 'coraza-movers' },
  { name: 'Tetris Moving', slug: 'tetris-moving' }
];

console.log('🚀 INITIATING FLEET DEPLOYMENT TO CLOUDFLARE EDGE...\n');
console.log('═'.repeat(70));

for (const site of sites) {
  const siteDir = path.join(OUTPUT_DIR, site.slug);
  if (!fs.existsSync(siteDir)) {
    console.error(`❌ Missing directory for ${site.name}: ${siteDir}`);
    continue;
  }
  
  console.log(`\n📦 Skipping build for [${site.name}] (Already built)`);
  // const buildResult = spawnSync('npm', ['run', 'build'], { cwd: siteDir, stdio: 'inherit', shell: true });
  // if (buildResult.status !== 0) {
  //   console.error(`❌ Build failed for ${site.name}`);
  //   continue;
  // }

  console.log(`\n🏗️ Creating Cloudflare project for [${site.name}]...`);
  spawnSync('npx', ['--yes', 'wrangler@latest', 'pages', 'project', 'create', site.slug, '--production-branch', 'main'], { cwd: siteDir, stdio: 'inherit', shell: true });
  
  console.log(`\n☁️ Deploying [${site.name}] to Cloudflare Pages...`);
  const deployResult = spawnSync('npx', ['--yes', 'wrangler@latest', 'pages', 'deploy', 'dist', '--project-name', site.slug, '--branch', 'main'], { cwd: siteDir, stdio: 'inherit', shell: true });
  
  if (deployResult.status === 0) {
    console.log(`✅ Successfully deployed: https://${site.slug}.pages.dev`);
  } else {
    console.error(`❌ Deployment failed for ${site.name}`);
  }
}

console.log('\n═'.repeat(70));
console.log('✨ FLEET DEPLOYMENT COMPLETE');
