/**
 * ============================================================
 * BRAND INTELLIGENCE EXTRACTOR
 * Deep-scrapes a live website to build a complete brand profile
 * including identity, color palette, typography, contact info,
 * taglines, tone of voice, and asset URLs.
 *
 * Usage:
 *   node scripts/extract_brand.cjs <url_or_domain> [output_path]
 *
 * Examples:
 *   node scripts/extract_brand.cjs https://getmovers.ca
 *   node scripts/extract_brand.cjs uniquemovers.ca ./profiles/unique.json
 *   node scripts/extract_brand.cjs maple-mover.com
 *
 * Output: Writes a target-profile.json compatible with
 *         populate_template.cjs and batch_clone.cjs
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

const input = process.argv[2];
const outputPath = process.argv[3] || 'target-profile.json';

if (!input) {
  console.error('❌ Usage: node scripts/extract_brand.cjs <url_or_domain> [output_path]');
  process.exit(1);
}

const url = input.startsWith('http') ? input : `https://${input}`;
const domain = new URL(url).hostname.replace(/^www\./, '');

// ─────────────────────────────────────────────────────────────
// Color Classification Engine
// Maps RGB values to our standardized design token palettes
// ─────────────────────────────────────────────────────────────
const PALETTE_MAP = {
  emerald:  { hueRange: [120, 170], label: 'Emerald (Green)' },
  blue:     { hueRange: [200, 250], label: 'Blue' },
  indigo:   { hueRange: [225, 275], label: 'Indigo (Blue-Violet)' },
  violet:   { hueRange: [275, 310], label: 'Violet (Purple)' },
  rose:     { hueRange: [330, 360], label: 'Rose (Red)' },
  rose2:    { hueRange: [0, 15],    label: 'Rose (Red-Low)' },
  amber:    { hueRange: [30, 55],   label: 'Amber (Gold/Yellow)' },
  slate:    { hueRange: [0, 360],   label: 'Slate (Neutral)' },  // catch-all
};

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) { h = s = 0; }
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) * 60; break;
      case g: h = ((b - r) / d + 2) * 60; break;
      case b: h = ((r - g) / d + 4) * 60; break;
    }
  }
  return { h, s: s * 100, l: l * 100 };
}

function classifyPalette(rgbSamples) {
  const scores = { emerald: 0, blue: 0, indigo: 0, violet: 0, rose: 0, amber: 0, slate: 0 };
  const chromatic = [];

  for (const [r, g, b] of rgbSamples) {
    // Skip near-white (bg) and near-black (text) — they carry no brand signal
    if ((r > 220 && g > 220 && b > 220) || (r < 30 && g < 30 && b < 30)) continue;

    const { h, s, l } = rgbToHsl(r, g, b);
    // Skip very desaturated colors (greys)
    if (s < 15) { scores.slate += 0.5; continue; }
    // Skip very dark or very light washed-out colors
    if (l < 10 || l > 92) continue;

    chromatic.push({ h, s, l, r, g, b });

    if (h >= 120 && h < 170)       scores.emerald += (s > 40 ? 3 : 1);
    else if (h >= 200 && h < 250)  scores.blue    += (s > 40 ? 3 : 1);
    else if (h >= 225 && h < 275)  scores.indigo  += (s > 40 ? 3 : 1);
    else if (h >= 275 && h < 310)  scores.violet  += (s > 40 ? 3 : 1);
    else if (h >= 330 || h < 15)   scores.rose    += (s > 40 ? 3 : 1);
    else if (h >= 15 && h < 55)    scores.amber   += (s > 40 ? 3 : 1);
    else if (h >= 55 && h < 120)   scores.amber   += 1; // yellow-green → amber
    else                           scores.slate   += 0.5;
  }

  const sorted = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);
  const primary = sorted[0] || 'amber';
  const secondary = sorted[1] || (primary === 'blue' ? 'emerald' : 'indigo');
  const tertiary = sorted[2] || 'slate';

  return { palette: primary, triad: { primary, secondary, tertiary }, scores, chromaticCount: chromatic.length, totalSampled: rgbSamples.length };
}

// ─────────────────────────────────────────────────────────────
// Main Extraction Engine
// ─────────────────────────────────────────────────────────────
async function extractBrand() {
  let chromium;
  try {
    ({ chromium } = require('playwright'));
  } catch {
    console.error('❌ Playwright is required. Install with: npx playwright install chromium');
    process.exit(1);
  }

  console.log(`\n${'═'.repeat(70)}`);
  console.log(`🔍 BRAND INTELLIGENCE EXTRACTOR`);
  console.log(`   Target: ${url}`);
  console.log(`   Domain: ${domain}`);
  console.log(`${'═'.repeat(70)}\n`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  try {
    const candidateUrls = [url];
    if (url.startsWith('https://') && !url.includes('//www.')) {
      candidateUrls.push(url.replace('https://', 'https://www.'));
      candidateUrls.push(url.replace('https://', 'http://www.'));
    } else if (url.startsWith('https://www.')) {
      candidateUrls.push(url.replace('https://www.', 'https://'));
    }
    let navSuccess = false;
    for (const testUrl of candidateUrls) {
      try {
        console.log(`🌐 Navigating to ${testUrl}...`);
        await page.goto(testUrl, { waitUntil: 'domcontentloaded', timeout: 22000 });
        await page.waitForTimeout(2500);
        navSuccess = true;
        break;
      } catch (e) {
        console.log(`  ⚠️ Navigation failed for ${testUrl} (${e.message.split('\n')[0]}). Trying fallback...`);
      }
    }
    if (!navSuccess) throw new Error("All protocol and domain variations failed to load.");

    // ─── 1. IDENTITY EXTRACTION ──────────────────────────────
    console.log(`\n📋 Phase 1: Identity Extraction`);
    const identity = await page.evaluate((domainStr) => {
      // Company Name — try multiple DOM signals
      const ogTitle = document.querySelector('meta[property="og:title"]')?.content || '';
      const pageTitle = document.title || '';
      const h1Text = document.querySelector('h1')?.textContent?.trim() || '';
      const logoAlt = document.querySelector('header img, nav img, .logo img, img[alt*="logo" i]')?.alt || '';

      // Strip common suffixes and filter out graphic asset descriptions
      function cleanName(raw) {
        if (!raw || /\.(png|jpe?g|webp|svg|ico|gif)$/i.test(raw) || /^logo\d*\.?/i.test(raw)) return '';
        // Reject design asset alt text descriptors (e.g., "Mansa Graphic Truck with Logo RGB", "Transparent Vector")
        if (/\b(rgb|cmyk|vector|pixelated|graphic|transparent|header|banner|favicon|cropped)\b/i.test(raw)) return '';
        return raw
          .replace(/\blogo\b/gi, '')
          .replace(/\s*[\|–—-]\s*(home|website|official|best|top|#1|canada|toronto|moving|company).*$/i, '')
          .replace(/\s*[\|–—-]\s*$/, '')
          .trim();
      }

      // Prioritize authoritative meta titles over image alt text which often contains graphic asset labels
      const candidates = [ogTitle, pageTitle, h1Text, logoAlt].filter(Boolean).map(cleanName).filter(c => c !== '');
      const name = candidates.find(c => c.length > 2 && c.length < 50) || domainStr;

      // Meta description
      const metaDesc = document.querySelector('meta[name="description"]')?.content ||
                       document.querySelector('meta[property="og:description"]')?.content || '';

      // Favicons
      const favSelectors = ['link[rel="icon"]', 'link[rel="shortcut icon"]', 'link[rel="apple-touch-icon"]'];
      let faviconUrl = '';
      for (const sel of favSelectors) {
        const el = document.querySelector(sel);
        if (el?.href) { faviconUrl = el.href; break; }
      }

      // Logo — expanded selector priority
      const logoSelectors = [
        'header img[src*="logo"]', 'nav img[src*="logo"]',
        'img[alt*="logo" i]', 'img[class*="logo" i]',
        'header img', 'nav img', '.logo img', '#logo img',
        'a[class*="logo"] img', 'a[class*="brand"] img',
      ];
      let logoUrl = '';
      for (const sel of logoSelectors) {
        const el = document.querySelector(sel);
        if (el?.src && !el.src.includes('data:') && el.naturalWidth > 20) {
          logoUrl = el.src; break;
        }
      }

      // 🛡️ GEOMETRIC TOP-OF-FOLD VISUAL DISCOVERY FALLBACK
      // Handles platforms like GoHighLevel, ClickFunnels, Elementor & Wix where header elements
      // are wrapped in generic DIVs and image sources/alt tags contain encrypted hashes or company names rather than the word 'logo'.
      if (!logoUrl) {
        const topImages = Array.from(document.querySelectorAll('img')).filter(i => {
          if (!i.src || i.src.startsWith('data:')) return false;
          const rect = i.getBoundingClientRect();
          // Logo must reside near the very top of the webpage (top < 300px) with genuine logo dimensions (25px to 180px height)
          return rect.top >= 0 && rect.top < 300 && rect.height >= 25 && rect.height <= 180 && rect.width >= 30;
        });
        if (topImages.length > 0) {
          // Sort by highest vertical position (closest to top navigation bar)
          topImages.sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
          logoUrl = topImages[0].src;
        }
      }

      // Fallback: check for SVG inline logos
      if (!logoUrl) {
        const svgLogo = document.querySelector('header svg, nav svg, .logo svg');
        if (svgLogo) logoUrl = '__SVG_INLINE__';
      }

      return { name, metaDescription: metaDesc, faviconUrl, logoUrl, pageTitle };
    }, domain);

    console.log(`   📛 Company Name: ${identity.name}`);
    console.log(`   🔗 Logo URL: ${identity.logoUrl || '(not found — will use symbol fallback)'}`);
    console.log(`   🔖 Favicon URL: ${identity.faviconUrl || '(not found)'}`);

    // ─── 2. CONTACT DIRECTORY EXTRACTION ─────────────────────
    console.log(`\n📞 Phase 2: Contact Directory Extraction`);
    const contacts = await page.evaluate(() => {
      const bodyText = document.body.innerText || '';
      const bodyHtml = document.body.innerHTML || '';

      // Phone — match North American formats
      const phonePatterns = [
        /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
        /(?:tel:|phone:)\s*([\d\s()+-]+)/gi,
      ];
      const phones = [];
      for (const pat of phonePatterns) {
        const matches = bodyText.match(pat) || [];
        phones.push(...matches.map(p => p.replace(/^(?:tel:|phone:)\s*/i, '').trim()));
      }
      // Also check href="tel:" links
      document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        const raw = a.href.replace('tel:', '').replace(/[^\d+()-\s]/g, '').trim();
        if (raw.length >= 10) phones.push(raw);
      });

      // Email
      const emails = [];
      document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
        emails.push(a.href.replace('mailto:', '').split('?')[0].trim());
      });
      const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
      (bodyText.match(emailRegex) || []).forEach(e => { if (!emails.includes(e)) emails.push(e); });

      // Physical address — look for common patterns
      const addressPatterns = [
        /\d{1,5}\s+[\w\s]+(?:St|Ave|Blvd|Rd|Dr|Way|Ct|Ln|Pkwy|Hwy)\.?\s*(?:#\s*\d+)?[,\s]+\w+[,\s]+(?:ON|BC|AB|QC|MB|SK|NS|NB|PE|NL|NT|YT|NU)\s+[A-Z]\d[A-Z]\s?\d[A-Z]\d/gi,
        /\d{1,5}\s+[\w\s]+(?:Street|Avenue|Boulevard|Road|Drive)[,\s]+[\w\s]+[,\s]+(?:Ontario|British Columbia|Alberta|Quebec)/gi,
      ];
      let address = '';
      for (const pat of addressPatterns) {
        const m = bodyText.match(pat);
        if (m) { address = m[0].trim(); break; }
      }

      return {
        phone: phones[0] || '',
        phoneRaw: (phones[0] || '').replace(/[^0-9]/g, ''),
        email: emails[0] || '',
        address: address,
        allPhones: [...new Set(phones)].slice(0, 3),
        allEmails: [...new Set(emails)].slice(0, 3),
      };
    });

    console.log(`   📱 Phone: ${contacts.phone || '(not found)'}`);
    console.log(`   📧 Email: ${contacts.email || '(not found)'}`);
    console.log(`   📍 Address: ${contacts.address || '(not found)'}`);

    // ─── 3. COLOR PALETTE EXTRACTION ─────────────────────────
    console.log(`\n🎨 Phase 3: Color Palette Extraction`);
    const colorData = await page.evaluate(() => {
      const rgbColors = [];
      // Sample interactive & branded elements
      const selectors = [
        'button', 'a[class*="btn"]', 'a[class*="button"]', '.btn',
        'header', 'nav', 'footer',
        'h1', 'h2', 'h3',
        '[class*="hero"]', '[class*="banner"]', '[class*="cta"]',
        '[class*="primary"]', '[class*="accent"]',
        '.bg-primary', '.text-primary',
      ];
      const elements = document.querySelectorAll(selectors.join(', '));
      elements.forEach(el => {
        const style = window.getComputedStyle(el);
        ['backgroundColor', 'color', 'borderColor', 'outlineColor'].forEach(prop => {
          const val = style[prop];
          const match = val?.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            rgbColors.push([parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]);
          }
        });
      });

      // Also sample CSS custom properties on :root
      const rootStyle = getComputedStyle(document.documentElement);
      const customProps = ['--primary', '--accent', '--brand', '--color-primary', '--wp--preset--color--primary'];
      for (const prop of customProps) {
        const val = rootStyle.getPropertyValue(prop).trim();
        if (val) {
          // Try parsing hex
          const hexMatch = val.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i);
          if (hexMatch) {
            rgbColors.push([parseInt(hexMatch[1], 16), parseInt(hexMatch[2], 16), parseInt(hexMatch[3], 16)]);
          }
        }
      }

      return rgbColors;
    });

    const paletteResult = classifyPalette(colorData);
    console.log(`   🎯 Matched Palette: ${paletteResult.palette.toUpperCase()}`);
    console.log(`   📊 Sampled ${paletteResult.totalSampled} DOM elements (${paletteResult.chromaticCount} chromatic)`);
    console.log(`   📈 Score breakdown: ${JSON.stringify(paletteResult.scores)}`);

    // ─── 4. TYPOGRAPHY EXTRACTION ────────────────────────────
    console.log(`\n🔤 Phase 4: Typography Extraction`);
    const typography = await page.evaluate(() => {
      const fonts = new Map(); // fontName → count

      function sampleElement(el) {
        const ff = getComputedStyle(el).fontFamily;
        if (!ff) return;
        // Take the first font in the stack
        const primary = ff.split(',')[0].replace(/['"]/g, '').trim();
        if (primary && !['serif', 'sans-serif', 'monospace', 'system-ui', 'inherit'].includes(primary.toLowerCase())) {
          fonts.set(primary, (fonts.get(primary) || 0) + 1);
        }
      }

      // Sample headings
      document.querySelectorAll('h1, h2, h3').forEach(sampleElement);
      const headingFonts = new Map(fonts);
      fonts.clear();

      // Sample body text
      document.querySelectorAll('p, li, span, a, div').forEach(el => {
        if (el.children.length === 0 || el.textContent.trim().length > 10) sampleElement(el);
      });

      // Sort by frequency
      const sortedHeading = [...headingFonts.entries()].sort((a, b) => b[1] - a[1]);
      const sortedBody = [...fonts.entries()].sort((a, b) => b[1] - a[1]);

      return {
        headingFont: sortedHeading[0]?.[0] || '',
        bodyFont: sortedBody[0]?.[0] || '',
        allHeadingFonts: sortedHeading.slice(0, 3).map(([name, count]) => ({ name, count })),
        allBodyFonts: sortedBody.slice(0, 3).map(([name, count]) => ({ name, count })),
      };
    });

    console.log(`   🔠 Heading Font: ${typography.headingFont || '(browser default)'}`);
    console.log(`   🔡 Body Font: ${typography.bodyFont || '(browser default)'}`);

    // ─── 5. HERO & TAGLINE EXTRACTION ────────────────────────
    console.log(`\n✨ Phase 5: Hero & Tagline Extraction`);
    const hero = await page.evaluate(() => {
      // Hero tagline — usually the biggest visible heading
      const h1 = document.querySelector('h1');
      const heroTagline = h1?.textContent?.trim() || '';

      // Hero subtitle — sibling paragraph or next heading
      let heroSubtitle = '';
      if (h1) {
        const sibling = h1.nextElementSibling;
        if (sibling && ['P', 'H2', 'H3', 'SPAN', 'DIV'].includes(sibling.tagName)) {
          heroSubtitle = sibling.textContent?.trim() || '';
        }
      }
      // Fallback: first paragraph in hero-like container
      if (!heroSubtitle) {
        const heroContainer = document.querySelector('[class*="hero"], [class*="banner"], [class*="jumbotron"], [id*="hero"]');
        if (heroContainer) {
          const p = heroContainer.querySelector('p');
          heroSubtitle = p?.textContent?.trim() || '';
        }
      }

      // CTA button text
      const ctaSelectors = [
        '[class*="hero"] button', '[class*="hero"] a[class*="btn"]',
        '[class*="banner"] button', 'header + * button',
        'a[class*="cta"]', 'button[class*="cta"]',
        '.btn-primary', 'a.btn',
      ];
      let ctaText = '';
      for (const sel of ctaSelectors) {
        const el = document.querySelector(sel);
        if (el?.textContent?.trim()) { ctaText = el.textContent.trim(); break; }
      }

      return { heroTagline, heroSubtitle: heroSubtitle.substring(0, 300), ctaText };
    });

    console.log(`   📢 Tagline: "${hero.heroTagline || '(not found)'}"`);
    console.log(`   📝 Subtitle: "${(hero.heroSubtitle || '(not found)').substring(0, 80)}..."`);
    console.log(`   🎯 CTA Text: "${hero.ctaText || '(not found)'}"`);

    // ─── 6. SOCIAL MEDIA DISCOVERY ───────────────────────────
    console.log(`\n🌐 Phase 6: Social Media Discovery`);
    const social = await page.evaluate(() => {
      const links = {};
      const patterns = {
        facebook: /facebook\.com\//i,
        instagram: /instagram\.com\//i,
        twitter: /(?:twitter|x)\.com\//i,
        linkedin: /linkedin\.com\//i,
        youtube: /youtube\.com\//i,
        tiktok: /tiktok\.com\//i,
        yelp: /yelp\.c(?:a|om)\//i,
        google: /(?:g\.page|google\.com\/maps|maps\.app\.goo)/i,
      };
      document.querySelectorAll('a[href]').forEach(a => {
        for (const [platform, regex] of Object.entries(patterns)) {
          if (!links[platform] && regex.test(a.href)) {
            links[platform] = a.href;
          }
        }
      });
      return links;
    });

    const socialCount = Object.keys(social).length;
    console.log(`   Found ${socialCount} social profile${socialCount !== 1 ? 's' : ''}: ${Object.keys(social).join(', ') || 'none'}`);

    // ─── 7. CAPTURE REFERENCE SCREENSHOT ─────────────────────
    console.log(`\n📸 Phase 7: Capturing Reference Screenshot`);
    const screenshotDir = path.join(process.cwd(), 'output', 'visual-benchmarks');
    if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir, { recursive: true });
    const slug = domain.replace(/[^a-z0-9]/gi, '-');
    const screenshotPath = path.join(screenshotDir, `${slug}-brand-reference.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`   Saved: ${screenshotPath}`);

    // ─── 8. ASSEMBLE PROFILE ─────────────────────────────────
    console.log(`\n📦 Phase 8: Assembling Target Profile`);

    // Map discovered fonts to our supported font library
    const FONT_LIBRARY = ['Montserrat', 'Playfair Display', 'Space Grotesk', 'Outfit', 'Plus Jakarta Sans', 'Roboto', 'Inter', 'Source Sans 3', 'DM Sans', 'Manrope', 'Source Serif 4'];
    function matchFont(discovered, fallback) {
      if (!discovered) return fallback;
      // Exact match
      const exact = FONT_LIBRARY.find(f => f.toLowerCase() === discovered.toLowerCase());
      if (exact) return exact;
      // Partial match
      const partial = FONT_LIBRARY.find(f => discovered.toLowerCase().includes(f.toLowerCase().split(' ')[0]));
      if (partial) return partial;
      return fallback;
    }

    const shortName = identity.name.split(/\s+/)[0];
    const profile = {
      name: identity.name,
      legalName: `${identity.name} Inc.`,
      shortName: shortName,
      slug: slug,
      domain: domain,
      websiteUrl: url,
      phone: contacts.phone,
      phoneRaw: contacts.phoneRaw,
      email: contacts.email,
      hqAddress: contacts.address,
      logoSymbol: identity.name[0]?.toUpperCase() || 'M',
      logoUrl: (identity.logoUrl && identity.logoUrl !== '__SVG_INLINE__') ? identity.logoUrl : '',
      faviconUrl: identity.faviconUrl || '',
      heroTagline: hero.heroTagline ? hero.heroTagline.toUpperCase() : `${identity.name.toUpperCase()} — PREMIUM SERVICE`,
      heroSubtitle: hero.heroSubtitle || identity.metaDescription || `Professional services by ${identity.name}.`,
      rankingClaim: `Trusted by thousands — ${identity.name}`,
      ctaText: hero.ctaText || 'Get Your Free Estimate',
      pageTitle: identity.pageTitle || `${identity.name} | Professional Service`,
      metaDescription: identity.metaDescription,
      theme: {
        primary: paletteResult.palette,
        secondary: paletteResult.triad.secondary,
        tertiary: paletteResult.triad.tertiary,
        palette: paletteResult.triad,
        designTokens: {
          colorPalette: paletteResult.palette,
          colorTriad: paletteResult.triad,
          fonts: {
            heading: matchFont(typography.headingFont, 'Montserrat'),
            body: matchFont(typography.bodyFont, 'Inter'),
          },
          discoveredFonts: {
            heading: typography.headingFont || null,
            body: typography.bodyFont || null,
          },
          animation: { speed: '0.2s', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
          borderRadius: { card: '16px', button: '8px', badge: '9999px' },
        },
      },
      layout: {
        variants: {},
        sectionsEnabled: {
          hero_quote_calculator: true,
          how_it_works: true,
          trust_signals: true,
          service_niches: true,
          gta_routes: true,
          supplies_and_storage: true,
          referral_program: true,
          blog_page: true,
        },
      },
      social: social,
      brandVibes: {
        architecture: paletteResult.totalSampled > 50 ? "Content-Dense Classic" : "Minimalist Corporate",
        chromaticIntensity: paletteResult.chromaticCount > 10 ? "Vibrant HSL Triad" : "Subdued Monolithic",
        improvementCategory: "UI/UX Pro Max Upgrade — High-Contrast Glassmorphic & Neomorphic Conversion Console",
      },
      _extraction: {
        extractedAt: new Date().toISOString(),
        sourceUrl: url,
        paletteScores: paletteResult.scores,
        colorSampleCount: paletteResult.totalSampled,
      },
    };

    // Capture Authoritative Reference Screenshot for comparative evaluation
    try {
      const refDir = path.join(process.cwd(), 'output', 'references');
      if (!fs.existsSync(refDir)) fs.mkdirSync(refDir, { recursive: true });
      const refScreenshotPath = path.join(refDir, `${domain.replace(/\.[^/.]+$/, "")}-existing-reference.png`);
      await page.screenshot({ path: refScreenshotPath, fullPage: true });
      profile._extraction.referenceScreenshot = refScreenshotPath;
      console.log(`📸 Captured existing website reference screenshot: ${refScreenshotPath}`);
    } catch (e) {
      console.log(`⚠️ Reference screenshot capture skipped: ${e.message.split('\n')[0]}`);
    }

    // Write output
    const parentDir = path.dirname(outputPath);
    if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(profile, null, 2), 'utf8');

    console.log(`\n${'═'.repeat(70)}`);
    console.log(`✅ BRAND INTELLIGENCE EXTRACTION COMPLETE`);
    console.log(`   📄 Profile written to: ${outputPath}`);
    console.log(`   📛 Brand: ${profile.name}`);
    console.log(`   🎨 Palette: ${profile.theme.primary}`);
    console.log(`   🔠 Fonts: ${profile.theme.designTokens.fonts.heading} / ${profile.theme.designTokens.fonts.body}`);
    console.log(`   📱 Phone: ${profile.phone || 'N/A'}`);
    console.log(`   📧 Email: ${profile.email || 'N/A'}`);
    console.log(`   🔗 Logo: ${profile.logoUrl ? 'Found' : 'Will use symbol fallback'}`);
    console.log(`${'═'.repeat(70)}\n`);

  } catch (err) {
    console.error(`\n❌ Extraction failed: ${err.message}`);
    console.error(err.stack);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

extractBrand();
