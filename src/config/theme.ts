// ============================================================
// THEME CONFIG — Kratos Moving
// Kratos Light & Warm Aesthetic: Amber & White (Major) + Black (Minor)
// ============================================================

export const THEME = {
  // Primary accent & brand color (Amber & White dominant, with Black secondary/contrast)
  colors: {
    primary: 'amber',       // Major accent color (buttons, highlights, badges, warm gradients)
    secondary: 'black',     // Minor accent color (high-contrast text, secondary buttons, strong contrast accents)
  },

  // Background hex codes (White & Amber major theme)
  backgrounds: {
    page: '#ffffff',          // Crisp white primary background
    section: '#fffbeb',       // Warm light amber tint (amber-50) for section container differentiation
    card: '#ffffff',          // Pure white elevated cards with soft shadow
    cardAlt: '#fef3c7',       // Amber-100 feature card background
    sectionAlt: '#f8fafc',    // Clean slate-50 background for content breaks
    heroOverlay: '#fffcf5',   // Soft warm amber-white ambient overlay
    footerBottom: '#09090b',  // Black (minor color) anchoring footer
  },

  // Focus & selection
  focus: {
    ringColor: '#d97706',     // amber-600 hex for sharp visibility on white and light backgrounds
    selectionBg: '#fbbf24',   // Amber text selection background
    selectionText: '#000000', // Black selection text
  },

  // Typography (matching Kratos' font stack)
  fonts: {
    heading: 'Montserrat',
    body: 'Inter',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap',
  },
} as const;
