// ============================================================
// LAYOUT & MODULAR COMPONENT ARCHITECTURE CONFIG — Metropolitan Movers
// ============================================================

export type SectionId =
  | 'hero_lead_capture'
  | 'how_it_works'
  | 'trust_signals'
  | 'core_services'
  | 'service_areas'
  | 'supplemental_services'
  | 'referral_program'
  | 'team_roster'
  | 'lookbook_gallery'
  | 'vip_membership'
  | 'location_hours'
  | 'contact_conversion'
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

import config from './variants.json';

export const LAYOUT = {
  sectionsEnabled: (config.layout?.sectionsEnabled || {
    "hero_lead_capture": true,
    "how_it_works": true,
    "trust_signals": true,
    "core_services": true,
    "service_areas": true,
    "supplemental_services": true,
    "referral_program": true,
    "blog_page": true
  }) as Record<SectionId, boolean>,
  sectionOrder: (config.layout?.sectionOrder || [
    "hero_lead_capture",
    "how_it_works",
    "trust_signals",
    "core_services",
    "service_areas",
    "supplemental_services",
    "referral_program",
    "blog_page"
  ]) as SectionId[],
  variants: {
    uiProfile: (config.layout?.variants?.uiProfile || "modern-standard") as UIPersonality,
    nav: (config.layout?.variants?.nav || "floating-pill-glass") as NavVariant,
    hero: (config.layout?.variants?.hero || "calculator-split") as HeroVariant,
    heroBackground: (config.layout?.variants?.heroBackground || "geometric-mesh") as HeroBackground,
    services: (config.layout?.variants?.services || "icon-grid") as ServicesVariant,
    howItWorks: (config.layout?.variants?.howItWorks || "cards-grid") as HowItWorksVariant,
    supplies: (config.layout?.variants?.supplies || "cards-catalog") as SuppliesVariant,
    reviews: (config.layout?.variants?.reviews || "stats-ribbon-ticker") as ReviewsVariant,
    footer: (config.layout?.variants?.footer || "saas-mega-directory") as FooterVariant,
  },
} as const;
