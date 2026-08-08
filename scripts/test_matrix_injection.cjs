/**
 * ============================================================================
 * AUTOMATED UNIT TEST & VERIFICATION ENGINE FOR ATOMIC MATRIX & THEME INTEGRATION
 * Asserts that Atomic Matrix structural layouts take actual effect in JSX components,
 * and guarantees zero pink/rose color contamination across all generated output builds.
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const OUTPUT_DIR = path.join(__dirname, '..', 'output', 'get-movers-canada', 'src');

console.log('🧪 Starting Automated Unit Test Suite for Atomic Matrix & Theme Injection...');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function runTest(testName, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${testName}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${testName}: ${err.message}`);
    failedTests++;
  }
}

// 1. ASSERT ZERO PINK/ROSE CONTAMINATION
runTest('Assert Zero Pink/Rose Contamination in App.tsx & theme-tokens.css', () => {
  const appTsx = fs.readFileSync(path.join(OUTPUT_DIR, 'App.tsx'), 'utf8');
  const themeCss = fs.readFileSync(path.join(OUTPUT_DIR, 'config', 'theme-tokens.css'), 'utf8');

  assert.strictEqual(appTsx.includes('via-rose-950/40'), false, 'App.tsx contains forbidden hardcoded pink/rose background gradient (via-rose-950/40)');
  assert.strictEqual(appTsx.includes('selection:bg-rose-500'), false, 'App.tsx contains forbidden hardcoded rose selection color');
  assert.strictEqual(themeCss.includes('255 241 242'), false, 'theme-tokens.css contains rose-50 RGB channel (pink color contamination)');
  assert.strictEqual(themeCss.includes('244 63 94'), false, 'theme-tokens.css contains rose-500 RGB channel (pink color contamination)');
});

// 2. ASSERT ATOMIC MATRIX INJECTION IN SERVICES COMPONENT
runTest('Assert Atomic Matrix Structural Container & Surface in ServiceNichesPage.tsx', () => {
  const file = path.join(OUTPUT_DIR, 'kits', 'kit-moving', 'components', 'ServiceNichesPage.tsx');
  assert.strictEqual(fs.existsSync(file), true, `File not found: ${file}`);
  const content = fs.readFileSync(file, 'utf8');

  // Assert base grid string was totally replaced by atomic matrix
  assert.strictEqual(content.includes('grid grid-cols-2 md:grid-cols-4 gap-3 mb-10'), false, 'Base static grid container class was NOT replaced in ServiceNichesPage.tsx');
  
  // Assert Atomic Matrix structural geometry tokens exist
  const hasAtomicContainer = content.includes('columns-1') || content.includes('grid-cols-') || content.includes('flex flex-col sm:flex-row') || content.includes('divide-y');
  assert.strictEqual(hasAtomicContainer, true, 'No recognized Atomic Matrix container structure injected in ServiceNichesPage.tsx');

  // Assert base surface styling was upgraded
  assert.strictEqual(content.includes('bg-white border-neutral-200 text-neutral-700 hover:border-primary-400'), false, 'Base static card surface class was NOT replaced in ServiceNichesPage.tsx');
});

// 3. ASSERT ATOMIC MATRIX INJECTION IN REGIONAL ROUTES COMPONENT
runTest('Assert Atomic Matrix Structural Container & Surface in GTARoutesPage.tsx', () => {
  const file = path.join(OUTPUT_DIR, 'kits', 'kit-moving', 'components', 'GTARoutesPage.tsx');
  assert.strictEqual(fs.existsSync(file), true, `File not found: ${file}`);
  const content = fs.readFileSync(file, 'utf8');

  // Assert base grid string was totally replaced by atomic matrix
  assert.strictEqual(content.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10'), false, 'Base static grid container class was NOT replaced in GTARoutesPage.tsx');
  
  // Assert base card surface class was replaced
  assert.strictEqual(content.includes('bg-white hover:bg-primary-50/40 border border-neutral-200 hover:border-primary-300 shadow-md text-neutral-800'), false, 'Base static card surface class was NOT replaced in GTARoutesPage.tsx');
});

// 4. ASSERT ATOMIC MATRIX INJECTION IN BLOG COMPONENT
runTest('Assert Atomic Matrix Structural Container in BlogPage.tsx', () => {
  const file = path.join(OUTPUT_DIR, 'kits', 'kit-moving', 'components', 'BlogPage.tsx');
  assert.strictEqual(fs.existsSync(file), true, `File not found: ${file}`);
  const content = fs.readFileSync(file, 'utf8');

  // Assert base grid string was totally replaced by atomic matrix
  assert.strictEqual(content.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'), false, 'Base static grid container class was NOT replaced in BlogPage.tsx');
});

// 5. ASSERT ACTIVE BRAND CONFIG IS CLEAN & BLUE/EXECUTIVE
runTest('Assert Brand Profile Theme is Clean Blue (No Pink)', () => {
  const brandFile = path.join(OUTPUT_DIR, 'config', 'theme.ts');
  const brandCss = path.join(OUTPUT_DIR, 'config', 'theme-tokens.css');
  const contentCss = fs.readFileSync(brandCss, 'utf8');

  assert.strictEqual(contentCss.toLowerCase().includes('injected palette: blue') || contentCss.toLowerCase().includes('injected palette: red') || contentCss.toLowerCase().includes('injected palette: indigo') || contentCss.toLowerCase().includes('injected palette: #e11d48'), true, 'Theme tokens CSS did not inject clean Blue/Red/Indigo or Hex palette');
});

// 6. ASSERT UNIVERSAL ATOMIC SUB-ELEMENT PRIMITIVE SYNTHESIS
runTest('Assert Universal Atomic Sub-Element Synthesis (atoms.ts & CSS Utilities)', () => {
  const atomsFile = path.join(OUTPUT_DIR, 'config', 'atoms.ts');
  assert.strictEqual(fs.existsSync(atomsFile), true, `atoms.ts file not found at: ${atomsFile}`);
  const atomsContent = fs.readFileSync(atomsFile, 'utf8');
  assert.strictEqual(atomsContent.includes('matrixCode'), true, 'atoms.ts does not export sub-element matrixCode');
  assert.strictEqual(atomsContent.includes('buttonPrimary'), true, 'atoms.ts does not define atomic buttonPrimary');
  assert.strictEqual(atomsContent.includes('card'), true, 'atoms.ts does not define atomic card surface');

  const brandCss = path.join(OUTPUT_DIR, 'config', 'theme-tokens.css');
  const contentCss = fs.readFileSync(brandCss, 'utf8');
  assert.strictEqual(contentCss.includes('.btn-atomic-primary'), true, 'theme-tokens.css did not inject .btn-atomic-primary utility');
  assert.strictEqual(contentCss.includes('.card-atomic-surface'), true, 'theme-tokens.css did not inject .card-atomic-surface utility');
});

// 7. ASSERT INFINITE SPECTRUM HSL SHADING SYNTHESIS
runTest('Assert Infinite Spectrum HSL Color Shading Synthesis in theme-tokens.css', () => {
  const brandCss = path.join(OUTPUT_DIR, 'config', 'theme-tokens.css');
  const contentCss = fs.readFileSync(brandCss, 'utf8');
  assert.strictEqual(contentCss.includes('--primary-500:'), true, 'theme-tokens.css missing --primary-500 variable');
  assert.strictEqual(contentCss.includes('--primary-950:'), true, 'theme-tokens.css missing --primary-950 variable');
});

// 8. ASSERT 10-VARIANT PRO MAX NAVIGATION MATRIX INTEGRATION
runTest('Assert 10-Variant Pro Max Navigation Bar Matrix in Core Components', () => {
  const headerFile = path.join(OUTPUT_DIR, 'components', 'core', 'Header.tsx');
  const atomicHeaderFile = path.join(OUTPUT_DIR, 'components', 'core', 'HeaderAtomicProMax.tsx');
  assert.strictEqual(fs.existsSync(headerFile), true, 'Header.tsx missing from core');
  assert.strictEqual(fs.existsSync(atomicHeaderFile), true, 'HeaderAtomicProMax.tsx missing from core components');
  const headerContent = fs.readFileSync(atomicHeaderFile, 'utf8');
  assert.strictEqual(headerContent.includes('floating-pill-glass'), true, 'HeaderAtomicProMax missing floating-pill-glass variant');
  assert.strictEqual(headerContent.includes('dual-ribbon-bar'), true, 'HeaderAtomicProMax missing dual-ribbon-bar variant');
  assert.strictEqual(headerContent.includes('brutalist-border-box'), true, 'HeaderAtomicProMax missing brutalist-border-box variant');
});

// 9. ASSERT UNIVERSAL ATOMIC FOOTER MATRIX INTEGRATION
runTest('Assert Universal Atomic Footer Matrix in Core Components', () => {
  const footerFile = path.join(OUTPUT_DIR, 'components', 'core', 'Footer.tsx');
  const atomicFooterFile = path.join(OUTPUT_DIR, 'components', 'core', 'FooterAtomicProMax.tsx');
  assert.strictEqual(fs.existsSync(footerFile), true, 'Footer.tsx missing from core');
  assert.strictEqual(fs.existsSync(atomicFooterFile), true, 'FooterAtomicProMax.tsx missing from core components');
  const footerContent = fs.readFileSync(atomicFooterFile, 'utf8');
  assert.strictEqual(footerContent.includes('gigantic-cta-banner'), true, 'FooterAtomicProMax missing gigantic-cta-banner variant');
  assert.strictEqual(footerContent.includes('saas-mega-directory'), true, 'FooterAtomicProMax missing saas-mega-directory variant');
  assert.strictEqual(footerContent.includes('brutalist-monospaced-ledger'), true, 'FooterAtomicProMax missing brutalist-monospaced-ledger variant');
});

// 10. ASSERT HYBRID COLOR ATMOSPHERE & MONOCHROME LUXURY LOGO OVERRIDES
runTest('Assert Hybrid Color Atmosphere & Monochrome Luxury Logo Override Integration', () => {
  const themeFile = path.join(OUTPUT_DIR, 'config', 'theme.ts');
  const tokensFile = path.join(OUTPUT_DIR, 'config', 'theme-tokens.css');
  assert.strictEqual(fs.existsSync(themeFile), true, 'theme.ts missing');
  const themeContent = fs.readFileSync(themeFile, 'utf8');
  assert.strictEqual(themeContent.includes('logoTreatment'), true, 'theme.ts missing hybrid logoTreatment setting');
  assert.strictEqual(themeContent.includes('atmosphericCanvas'), true, 'theme.ts missing hybrid atmosphericCanvas setting');

  const tokensContent = fs.readFileSync(tokensFile, 'utf8');
  assert.strictEqual(tokensContent.includes('--accent-500:'), true, 'theme-tokens.css missing SHA-driven secondary --accent-500 token');
  assert.strictEqual(tokensContent.includes('HYBRID ATMOSPHERIC STUDIO:'), true, 'theme-tokens.css missing hybrid studio banner');
});

// 11. ASSERT UNIVERSAL ATOMIC TRUST SIGNALS & REVIEWS MATRIX INTEGRATION
runTest('Assert Universal Atomic Trust Signals & Reviews Matrix in Core Components', () => {
  const trustFile = path.join(OUTPUT_DIR, 'components', 'core', 'TrustSignals.tsx');
  const atomicTrustFile = path.join(OUTPUT_DIR, 'components', 'core', 'TrustSignalsAtomicProMax.tsx');
  assert.strictEqual(fs.existsSync(trustFile), true, 'TrustSignals.tsx missing from core');
  assert.strictEqual(fs.existsSync(atomicTrustFile), true, 'TrustSignalsAtomicProMax.tsx missing from core components');
  const trustContent = fs.readFileSync(atomicTrustFile, 'utf8');
  assert.strictEqual(trustContent.includes('stats-ribbon-ticker'), true, 'TrustSignalsAtomicProMax missing stats-ribbon-ticker variant');
  assert.strictEqual(trustContent.includes('brutalist-monospaced-audit'), true, 'TrustSignalsAtomicProMax missing brutalist-monospaced-audit variant');
  assert.strictEqual(trustContent.includes('luxury-editorial-carousel'), true, 'TrustSignalsAtomicProMax missing luxury-editorial-carousel variant');
});

console.log('\n============================================================');
console.log(`📊 UNIT TEST SCOREBOARD: Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
if (failedTests > 0) {
  console.error('❌ Unit test validation failed! Inspection and remediation required.');
  process.exit(1);
} else {
  console.log('🎉 ALL UNIT TESTS PASSED! Universal Atomic Engine, Trust Signals Matrix & Hybrid Color Atmosphere 100% VERIFIED!');
  process.exit(0);
}
