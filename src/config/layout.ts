// ============================================================
// LAYOUT & MODULAR COMPONENT ARCHITECTURE CONFIG — Kratos Moving
// Defines Structural Variant Libraries across all key site modules
// ============================================================

export type SectionId = 
  | 'hero_quote_calculator'
  | 'how_it_works'
  | 'trust_signals'
  | 'service_niches'
  | 'gta_routes'
  | 'supplies_and_storage'
  | 'referral_program'
  | 'blog_page';

export type UIPersonality = "brutalist-high-contrast" | "soft-glassmorphic" | "luxury-minimalist" | "modern-standard" | string;
export type NavVariant = "sticky-standard" | "transparent-overlay" | "centered-split" | "floating-pill-glass" | "dual-ribbon-bar" | "transparent-scroll-morph" | "brutalist-border-box" | "promo-ticker-nav" | "asymmetry-cta-dominant" | "minimal-dual-deck" | string;
export type HeroVariant = "calculator-split" | "centered-cta" | "compact-banner" | "interactive-step-quiz" | "slideout-executive-drawer" | "neomorphic-command-console" | "brutalist-tariff-ledger" | "glass-floating-widget" | string;
export type HeroBackground = "clean-minimal" | "geometric-mesh" | "dark-gradient-overlay" | "cyberpunk-grid-blueprint" | "floating-radial-blobs" | "luxury-editorial-ivory" | string;
export type ServicesVariant = "icon-grid" | "horizontal-cards" | "accordion-panels" | string;
export type HowItWorksVariant = "cards-grid" | "timeline-horizontal" | "accordion-protocol" | string;
export type SuppliesVariant = "cards-catalog" | "pricing-table" | "minimal-list" | string;
export type ReviewsVariant = "cards-grid" | "stats-ribbon" | "grid-carousel" | "stats-ribbon-ticker" | "brutalist-monospaced-audit" | "luxury-editorial-carousel" | string;
export type FooterVariant = "multi-column" | "cta-banner" | "minimal-compact" | "gigantic-cta-banner" | "saas-mega-directory" | "brutalist-monospaced-ledger" | "minimal-dual-column" | string;

export const LAYOUT = {
  sectionsEnabled: {
    "hero_quote_calculator": true,
    "how_it_works": true,
    "trust_signals": true,
    "service_niches": true,
    "gta_routes": true,
    "supplies_and_storage": true,
    "referral_program": true,
    "blog_page": true
  } as Record<SectionId, boolean>,
  sectionOrder: [
    "hero_quote_calculator",
    "how_it_works",
    "trust_signals",
    "service_niches",
    "gta_routes",
    "supplies_and_storage",
    "referral_program",
    "blog_page"
  ] as SectionId[],
  variants: {
    uiProfile: "luxury-minimalist" as UIPersonality,
    nav: "floating-pill-glass" as NavVariant,
    hero: "glass-floating-widget" as HeroVariant,
    heroBackground: "luxury-editorial-ivory" as HeroBackground,
    services: "accordion-panels" as ServicesVariant,
    howItWorks: "accordion-protocol" as HowItWorksVariant,
    supplies: "cards-catalog" as SuppliesVariant,
    reviews: "luxury-editorial-carousel" as ReviewsVariant,
    footer: "minimal-dual-column" as FooterVariant,
  },
} as const;
