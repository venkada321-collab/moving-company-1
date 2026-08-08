// ============================================================
// THEME & DESIGN TOKENS CONFIG — Kratos Moving
// UI/UX Pro Max Aesthetic: amber (Major) + black (Minor)
// ============================================================

export type MotionProfile = "snappy-tech" | "luxury-smooth" | "playful-bounce";
export type StructuralParadigm = 'SplitScreenSaaS' | 'LuxuryEditorial' | 'NeoBrutalist' | 'CinematicTrust';

export const THEME = {
  paradigm: 'LuxuryEditorial' as StructuralParadigm,
  colors: {
    primary: "amber",
    secondary: "stone",
    semantic: {
      success: "#059669",
      warning: "#d97706",
      error: "#e11d48",
      info: "#0284c7",
    }
  },
  backgrounds: {
    page: "#fafaf9",
    section: "#f5f5f4",
    card: '#ffffff',
    cardAlt: "#fafaf9",
    sectionAlt: "#ffffff",
    heroOverlay: "#000000",
    footerBottom: "#1c1917",
  },
  borderRadius: {
    card: "32px",
    button: "9999px",
    badge: "9999px",
    input: "16px",
  },
  shadows: {
    card: "0 25px 50px -12px rgba(0, 0, 0, 0.08)",
    hover: "0 35px 60px -15px rgba(0, 0, 0, 0.12)",
    button: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
  },
  animation: {
    profile: "luxury-smooth" as MotionProfile,
    speed: "400ms",
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
    heading: "Playfair Display",
    body: "Inter",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&display=swap",
  },
  customArt: {
    howItWorks: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    serviceNiches: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80",
    storage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    referral: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80",
  },
} as const;
