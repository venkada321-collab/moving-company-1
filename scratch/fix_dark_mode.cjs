const fs = require('fs');
const path = require('path');

function fixDarkMode(file) {
  const filePath = path.resolve(__dirname, '../src/kits/kit-moving/components', file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Gradients
  content = content.replace(/from-zinc-950/g, 'from-white');
  content = content.replace(/via-zinc-900\/50/g, 'via-zinc-100/50');
  content = content.replace(/to-zinc-950/g, 'to-white');
  
  // Backgrounds
  content = content.replace(/bg-zinc-900\/50\/60/g, 'bg-white/80');
  content = content.replace(/bg-zinc-900\/50\/70/g, 'bg-white/90');
  content = content.replace(/bg-zinc-900\/60/g, 'bg-white shadow-sm');
  content = content.replace(/bg-zinc-900\/50/g, 'bg-white shadow-sm');
  content = content.replace(/bg-zinc-900\/40/g, 'bg-white shadow-sm');
  content = content.replace(/bg-zinc-800\/80/g, 'bg-zinc-100');
  content = content.replace(/bg-zinc-800/g, 'bg-zinc-100');
  content = content.replace(/bg-zinc-900/g, 'bg-white');
  content = content.replace(/bg-neutral-900 hover:bg-neutral-800 text-white/g, 'bg-zinc-900 hover:bg-zinc-800 text-white');
  content = content.replace(/bg-neutral-900/g, 'bg-zinc-900');
  
  // Borders
  content = content.replace(/border-zinc-800\/80/g, 'border-zinc-200');
  content = content.replace(/border-zinc-800\/60/g, 'border-zinc-200');
  content = content.replace(/border-zinc-800/g, 'border-zinc-200');
  content = content.replace(/border-white\/50/g, 'border-zinc-200');
  content = content.replace(/border-white\/40/g, 'border-zinc-200');

  // Text
  content = content.replace(/text-white/g, 'text-zinc-900');
  content = content.replace(/text-zinc-200/g, 'text-zinc-700');
  content = content.replace(/text-zinc-300/g, 'text-zinc-600');
  content = content.replace(/text-zinc-400/g, 'text-zinc-600');
  content = content.replace(/text-slate-950/g, 'text-zinc-900');
  content = content.replace(/bg-slate-950/g, 'bg-zinc-100');
  
  fs.writeFileSync(filePath, content);
  console.log('Fixed', file);
}

fixDarkMode('HeroQuoteCalculator.tsx');
fixDarkMode('BlogPage.tsx');
