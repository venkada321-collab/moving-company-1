const { spawn } = require('child_process');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'output');
const sites = [
  { name: 'Moving ASAP', slug: 'moving-asap', port: 5001 },
  { name: 'A-Z Moving', slug: 'a-z-moving', port: 5002 },
  { name: 'Shuttle Moving Company', slug: 'shuttle-moving-company', port: 5003 },
  { name: 'Bravos Moving', slug: 'bravos-moving', port: 5004 },
  { name: 'T&M Movers Canada', slug: 't-m-movers-canada', port: 5005 },
  { name: 'Sheffield Moving & Storage', slug: 'sheffield-moving-storage', port: 5006 }
];

console.log('🌐 BOOTING MULTI-TENANT BATCH FLEET ON LIVE PREVIEW PORTS...\n');
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
