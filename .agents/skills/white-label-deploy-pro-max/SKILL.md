---
name: white-label-deploy-pro-max
description: Encapsulates end-to-end automated workflows for target website intelligence extraction, modular template cloning and asset substitution, UI/UX Pro Max design compliance enforcement, zero-error compile testing, GitHub repository provisioning, and live Vercel production edge deployment. Activate this skill whenever the user desires to clone, white-label, re-theme, or deploy a modern web application template based on target website elements.
---

# 🚀 White-Label Deploy Pro Max — Automated Web Extraction, Customization & Deployment System

This authoritative operational protocol defines an end-to-end, deterministic AI engine for transforming target website assets into production-grade, state-of-the-art live web applications on Vercel and GitHub using the **Antigravity Modular Web Template**.

---

## Phase 1: Target Website Intelligence Extraction & Asset Profiling

When tasked with replicating, modernizing, or white-labeling a target company or competitor website:

1. **Information Retrieval:** Use `read_url_content`, web search, or browser inspection tools to scrape and analyze the target website.
2. **Core Data Extraction:** Extract the following essential business and aesthetic parameters:
   * **Brand Identity:** Company Name, Legal Corporation Name, Short/Abbreviated Name, Logo Symbol or Monogram.
   * **Contact Directory:** Telephone number (formatted & raw digits), Email address, Headquarters physical address, Operating regions/cities.
   * **SEO & Positioning:** Page title, Meta descriptions, Hero Tagline, Primary value proposition subtitle, Customer review volume, ranking claims.
   * **Color Architecture:** Observe the target brand's visual identity to establish a high-contrast **Major Color Theme** (e.g., Warm Amber & White, Corporate Navy & Slate, Luxury Emerald & Gold) and an anchoring **Minor Contrast Accent** (e.g., Deep Black, Vivid Orange, Slate Graphite).
3. **Generate Asset Profile JSON:** Formulate an extracted profile JSON following the standardized schema (refer to `examples/target-profile.sample.json` in the template):

```json
{
  "name": "Target Company Name",
  "legalName": "Target Corporation Inc.",
  "shortName": "TargetBrand",
  "logoSymbol": "T",
  "domain": "targetdomain.com",
  "websiteUrl": "https://www.targetdomain.com",
  "phone": "(800) 555-1234",
  "email": "info@targetdomain.com",
  "hqAddress": "123 Innovation Blvd, Toronto, ON",
  "heroTagline": "INDUSTRY LEADING PREMIUM SERVICE",
  "theme": {
    "primary": "amber",
    "secondary": "black",
    "bgPage": "#ffffff"
  }
}
```

---

## Phase 2: Master Template Cloning & Automated Modular Substitution

The official master repository template is maintained on GitHub at:
👉 `https://github.com/venkada321-collab/moving-company-1.git`

1. **Clone Master Template:** In a fresh directory inside the workspace (`~/.gemini/antigravity/scratch/<new-project-name>`), execute:
   ```powershell
   git clone https://github.com/venkada321-collab/moving-company-1.git .
   Remove-Item -Recurse -Force .git  # Strip template git metadata for clean initialization
   npm install
   ```
2. **Execute Modular Substitution Engine:** Save the extracted profile to a file (e.g., `target-profile.json`) and run the built-in templatized replacement script:
   ```powershell
   node scripts/populate_template.cjs target-profile.json
   ```
   * *Mechanism:* This engine instantly overwrites `src/config/brand.ts`, `src/config/theme.ts`, and updates hardcoded mock references across `src/data/mockData.ts` without risking code syntax or logic truncation.

---

## Phase 3: UI/UX Pro Max Integration & Design Standards Compliance

All generated or modified application components **MUST** adhere strictly to integrated **UI/UX Pro Max** standards to guarantee visual excellence, WCAG accessibility, and premium feel:

### 1. Architectural Color & Contrast Hierarchy
* **Major vs. Minor Harmony:** Avoid plain, uncalibrated default web colors. Employ curated HSL / Tailwind color palettes with intentional balance (e.g., *White & Warm Amber dominant Major background layers* contrasted against *Solid Black minor structural accents & CTAs*).
* **High Contrast (WCAG AA Compliance):** All text elements must achieve a minimum **4.5:1 contrast ratio** against their background. Never place dark text on dark backgrounds or light gray on white cards.
  * *Rule:* Use `text-neutral-900` or `text-black` on light cards; keep light text (`text-amber-400`, `text-white`) strictly isolated inside high-contrast anchor elements like Black buttons, solid dark badges, or dark footer bars.

### 2. Ergonomics & Accessibility
* **Touch Targets (WCAG 2.5.5):** All interactive elements (buttons, inputs, links, dropdowns, tabs) **MUST** have a minimum computed dimensions of **44x44px** (`min-h-[44px] min-w-[44px] py-3.5 px-6`).
* **Keyboard Navigation & Focus:** Never strip focus styles (`outline-none` without replacement). Every interactive input or CTA must utilize crisp focus indicators (e.g., `focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2`).
* **Semantic Aria Structure:** Ensure every dialog, button, and image includes explicit `aria-label`, `aria-labelledby`, and `aria-hidden` declarations as demonstrated in `COIModal.tsx` and `Header.tsx`.

### 3. Dynamic Micro-Interactions & Premium Aesthetics
* **Dynamic Hover States:** Interfaces must feel responsive and tactile. Apply subtle lift transformations, color reversibility, and soft shadows (`hover:scale-[1.01] hover:shadow-2xl transition-all duration-200`).
* **Glassmorphism & Gradients:** Elevate cards and hero banners using soft ambient gradients (`bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400`, `backdrop-blur-md bg-white/95`) rather than basic solid containers. Zero MVP or amateur layouts permitted.

---

## Phase 4: Compilation Verification & Strict Quality Assurance

Never attempt to deploy unverified code. Prior to staging:

1. **Execute Strict TypeScript & Vite Compiler Checks:**
   ```powershell
   npm run build
   ```
   * *Validation:* This runs `tsc && vite build`. Ensure zero TypeScript syntax or type-checking exceptions exist (e.g., resolve explicit `useState<string>(...)` typing when importing literal `as const` config attributes).
2. **Local Verification:** Briefly launch `npm run dev` in the background to allow interactive browser verification if required.

---

## Phase 5: Automated GitHub Provisioning & Vercel Live Edge Deployment

Once compile testing completes with zero errors:

### 1. Secure Secret & Token Isolation
* Verify that `.gitignore` contains explicit exclusion entries for `.env*` and `mcp_config.json` to prevent leaking API access tokens during git commits.

### 2. Provision & Push to GitHub
* Initialize a fresh Git repository, stage all customized template files, and push to the designated GitHub repository:
   ```powershell
   git init; git add -A; git commit -m "feat: initial production build for <Brand Name>"; git branch -M main
   git remote add origin https://github.com/venkada321-collab/<new-repository-name>.git
   git push -u origin main --force
   ```

### 3. Live Vercel Edge Production Deployment
* Invoke Vercel's automated cloud build pipeline via Command/PowerShell using the user's Vercel token:
   ```powershell
   npx --yes vercel@latest deploy --prod --yes --token <VERCEL_TOKEN>
   ```
* Schedule a 25-second check timer using `schedule` to allow Vercel's cloud build engines to compile and propagate edge assets.
* Retrieve and present the final live production URLs (`https://<new-project>.vercel.app`) directly to the user in a cleanly formatted GitHub markdown presentation!
