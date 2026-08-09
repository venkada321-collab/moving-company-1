const { spawn } = require('child_process');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const sites = [
  { name: 'Orbit International Moving Logistics Ltd', slug: 'orbit-international-moving-logistics-ltd', port: 5001 },
  { name: 'Coraza Movers', slug: 'coraza-movers', port: 5002 },
  { name: 'Tetris Moving', slug: 'tetris-moving', port: 5003 }
];

console.log('🌐 BOOTING USER BATCH FLEET ON LIVE PREVIEW PORTS...\n');
console.log('═'.repeat(70));
for (const site of sites) {
  const siteDir = path.join(OUTPUT_DIR, site.slug);
  console.log(`🚀 [${site.name}] -> http://localhost:${site.port}`);
  spawn('npm', ['run', 'dev', '--', '--port', site.port.toString(), '--host'], {
    cwd: siteDir,
    stdio: 'inherit',
    shell: true
  });
}
console.log('═'.repeat(70));
console.log('\n✨ All live staging environments are active! Keep this daemon running.');
// Keep process alive
setInterval(() => {}, 10000);
