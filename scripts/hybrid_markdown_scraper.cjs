const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const url = process.argv[2];
if (!url) {
  console.error("Usage: node scripts/hybrid_markdown_scraper.cjs <url>");
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  
  const outputDir = path.join(__dirname, '..', 'output', 'research');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const page = await context.newPage();
  let hostname;
  try {
    hostname = new URL(url).hostname;
  } catch (e) {
    hostname = url.replace(/[^a-zA-Z0-9]/g, '_');
  }

  console.log(`Processing ${hostname}...`);
  
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Allow animations and client-side rendering to settle
    await page.waitForTimeout(2000);
    
    // Capture Visual Design (Playwright Screenshot)
    const imgPath = path.join(outputDir, `${hostname}-design.png`);
    await page.screenshot({ path: imgPath, fullPage: true });
    
    // Capture Spatial Skeleton & SEO Text
    const skeleton = await page.evaluate(() => {
      const items = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, null, false);
      let node;
      while ((node = walker.nextNode())) {
        const tag = node.tagName.toLowerCase();
        if (['h1', 'h2', 'h3', 'p', 'a', 'button', 'li'].includes(tag)) {
          const rect = node.getBoundingClientRect();
          // Only include visible elements with text
          if (rect.width > 0 && rect.height > 0 && node.innerText && node.innerText.trim()) {
            const text = node.innerText.trim().split('\n').join(' ');
            items.push(`[${tag.toUpperCase()}] {x: ${Math.round(rect.x)}, y: ${Math.round(rect.y)}, w: ${Math.round(rect.width)}, h: ${Math.round(rect.height)}} ${text}`);
          }
        }
      }
      return items.join('\n');
    });
    
    const txtPath = path.join(outputDir, `${hostname}-skeleton.txt`);
    fs.writeFileSync(txtPath, skeleton);
    
    console.log(`Success: ${hostname}`);
    console.log(`Screenshot saved to: ${imgPath}`);
    console.log(`Spatial Skeleton saved to: ${txtPath}`);
  } catch (e) {
    console.error(`Failed ${hostname}: ${e.message}`);
  }
  
  await page.close();
  await browser.close();
})();
