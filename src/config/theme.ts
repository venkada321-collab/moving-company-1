// ============================================================
// THEME CONFIG — Kratos Moving
// UI/UX Pro Max Aesthetic: amber (Major) + black (Minor)
// ============================================================

export const THEME = {
  colors: {
    primary: "amber",
    secondary: "black",
  },
  backgrounds: {
    page: "#ffffff",
    section: "#fffbeb",
    card: '#ffffff',
    cardAlt: "#fef3c7",
    sectionAlt: "#f8fafc",
    heroOverlay: "#fffcf5",
    footerBottom: "#09090b",
  },
  focus: {
    ringColor: "#d97706",
    selectionBg: "#fbbf24",
    selectionText: '#000000',
  },
  fonts: {
    heading: 'Montserrat',
    body: 'Inter',
    googleFontsUrl:
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap',
  },
} as const;
