// ============================================================
// LAYOUT & MODULAR COMPONENT ARCHITECTURE CONFIG — Kratos Moving
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
    hero: "calculator-split",
    reviews: "grid-carousel",
    footer: "multi-column",
  },
} as const;
