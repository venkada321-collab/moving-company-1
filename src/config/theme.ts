// ============================================================
// THEME & DESIGN TOKENS CONFIG — Kratos Moving
// UI/UX Pro Max Aesthetic: amber (Major) + black (Minor)
// ============================================================

export const THEME = {
  colors: {
    primary: "amber",
    secondary: "black",
    semantic: {
      success: "#059669",
      warning: "#d97706",
      error: "#e11d48",
      info: "#0284c7",
    }
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
  borderRadius: {
    card: "24px",
    button: "16px",
    badge: "9999px",
    input: "12px",
  },
  shadows: {
    card: "0 20px 25px -5px rgba(245, 158, 11, 0.12)",
    hover: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    button: "0 10px 15px -3px rgba(0, 0, 0, 0.15)",
  },
  animation: {
    speed: "200ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    hoverScale: "scale(1.01)",
  },
  dividerStyle: {
    type: "soft-wave",
    color: "#fffbeb",
  },
  focus: {
    ringColor: "#d97706",
    selectionBg: "#fbbf24",
    selectionText: '#000000',
  },
  fonts: {
    heading: "Montserrat",
    body: "Inter",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap",
  },
} as const;
