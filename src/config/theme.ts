// ============================================================
// THEME CONFIG — Kratos Moving
// Kratos uses a dark/gold/bronze aesthetic
// ============================================================

export const THEME = {
  // Primary accent color
  colors: {
    primary: 'amber',       // Gold/bronze accent matching Kratos brand
    secondary: 'emerald',   // Success states
  },

  // Background hex codes (dark theme)
  backgrounds: {
    page: '#0b0f19',
    section: '#131927',
    card: '#1c2438',
    cardAlt: '#1a2033',
    sectionAlt: '#0e1422',
    heroOverlay: '#111726',
    footerBottom: '#080b13',
  },

  // Focus & selection
  focus: {
    ringColor: '#fbbf24',
    selectionBg: '#fbbf24',
    selectionText: '#000000',
  },

  // Typography (matching Kratos' font stack)
  fonts: {
    heading: 'Montserrat',
    body: 'Inter',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap',
  },
} as const;
