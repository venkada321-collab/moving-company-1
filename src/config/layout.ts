// ============================================================
// LAYOUT & MODULAR COMPONENT ARCHITECTURE CONFIG — PROFEESIONAL MOVING SERVICES
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
export type NavVariant = "sticky-standard" | "transparent-overlay" | "centered-split" | "floating-pill-glass" | "dual-ribbon-bar" | "transparent-scroll-morph" | "brutalist-border-box" | "promo-ticker-nav" | "asymmetry-cta-dominant" | string;
export type HeroVariant = "calculator-split" | "centered-cta" | "compact-banner" | "interactive-step-quiz" | "slideout-executive-drawer" | "neomorphic-command-console" | "brutalist-tariff-ledger" | "glass-floating-widget" | string;
export type HeroBackground = "clean-minimal" | "geometric-mesh" | "dark-gradient-overlay" | "cyberpunk-grid-blueprint" | "floating-radial-blobs" | "luxury-editorial-ivory" | "logistics-radar-grid" | "floating-media-collage" | "architectural-arch-split" | "ambient-3d-glassmorphism" | "brutalist-diagonal-marquee" | "social-proof-orbit" | string;
export type ServicesVariant = "icon-grid" | "horizontal-cards" | "accordion-panels" | string;
export type HowItWorksVariant = "cards-grid" | "timeline-horizontal" | "accordion-protocol" | string;
export type SuppliesVariant = "cards-catalog" | "pricing-table" | "minimal-list" | string;
export type ReviewsVariant = "cards-grid" | "stats-ribbon" | "grid-carousel" | "stats-ribbon-ticker" | "brutalist-monospaced-audit" | "luxury-editorial-carousel" | "masonry-waterfall-deck" | "split-verification-portal" | string;
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
    uiProfile: "modern-standard" as UIPersonality,
    nav: "floating-pill-glass" as NavVariant,
    hero: "calculator-split" as HeroVariant,
    heroBackground: "geometric-mesh" as HeroBackground,
    services: "icon-grid" as ServicesVariant,
    howItWorks: "cards-grid" as HowItWorksVariant,
    supplies: "cards-catalog" as SuppliesVariant,
    reviews: "stats-ribbon-ticker" as ReviewsVariant,
    footer: "saas-mega-directory" as FooterVariant,
  },
} as const;
