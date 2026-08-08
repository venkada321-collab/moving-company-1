// ============================================================
// THEME & DESIGN TOKENS CONFIG — Moving Company Mississauga | Advance Moving
// UI/UX Pro Max Aesthetic: red (Major) + blue (Minor)
// ============================================================

export type MotionProfile = "snappy-tech" | "luxury-smooth" | "playful-bounce";
export type StructuralParadigm = 'SplitScreenSaaS' | 'LuxuryEditorial' | 'NeoBrutalist' | 'CinematicTrust';

export const THEME = {
  paradigm: 'SplitScreenSaaS' as StructuralParadigm,
  colors: {
    primary: "red",
    secondary: "blue",
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
    card: "16px",
    button: "8px",
    badge: "9999px",
    input: "12px",
  },
  shadows: {
    card: "0 20px 25px -5px rgba(245, 158, 11, 0.12), 0 8px 10px -6px rgba(245, 158, 11, 0.08)",
    hover: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    button: "0 10px 15px -3px rgba(0, 0, 0, 0.15)",
  },
  animation: {
    profile: "snappy-tech" as MotionProfile,
    speed: "0.2s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
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
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap",
    },
    customArt: {
      howItWorks: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
      serviceNiches: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80",
      storage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
      referral: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80",
    },
    hybrid: {
      atmosphericCanvas: "slate-executive",
      logoTreatment: "authentic-full-color" as "authentic-full-color" | "monochrome-luxury-white" | "monochrome-luxury-black",
    }
} as const;
