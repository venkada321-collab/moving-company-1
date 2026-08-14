// ============================================================
// THEME & DESIGN TOKENS CONFIG — Metropolitan Movers
// UI/UX Pro Max Aesthetic: slate (Major) + amber (Minor)
// ============================================================

import config from './variants.json';

export type MotionProfile = "snappy-tech" | "luxury-smooth" | "playful-bounce";
export type StructuralParadigm = 'SplitScreenSaaS' | 'LuxuryEditorial' | 'NeoBrutalist' | 'CinematicTrust';

function getParadigmFromUrl(): StructuralParadigm {
  if (typeof window === 'undefined') return (config.theme?.paradigm as StructuralParadigm) || 'SplitScreenSaaS';

  // 1. Check URL Hash (e.g. #LuxuryEditorial)
  const hash = window.location.hash.replace(/^#/, '');
  const hashMatch = hash.replace(/^paradigm=/, '');
  if (['SplitScreenSaaS', 'LuxuryEditorial', 'NeoBrutalist', 'CinematicTrust'].includes(hashMatch)) {
    return hashMatch as StructuralParadigm;
  }

  // 2. Check Query Parameter (e.g. ?paradigm=LuxuryEditorial)
  const params = new URLSearchParams(window.location.search);
  const paramParadigm = params.get('paradigm');
  if (paramParadigm && ['SplitScreenSaaS', 'LuxuryEditorial', 'NeoBrutalist', 'CinematicTrust'].includes(paramParadigm)) {
    return paramParadigm as StructuralParadigm;
  }

  return (config.theme?.paradigm as StructuralParadigm) || 'SplitScreenSaaS';
}

export const THEME = {
  paradigm: getParadigmFromUrl(),
  colors: {
    primary: config.theme?.colors?.primary || "slate",
    secondary: config.theme?.colors?.secondary || "amber",
    semantic: {
      success: "#059669",
      warning: "#d97706",
      error: "#e11d48",
      info: "#0284c7",
    }
  },
  backgrounds: {
    page: config.theme?.backgrounds?.page || "#09090b",
    section: config.theme?.backgrounds?.section || "#18181b",
    card: config.theme?.backgrounds?.card || '#18181b',
    cardAlt: config.theme?.backgrounds?.cardAlt || "#27272a",
    sectionAlt: config.theme?.backgrounds?.sectionAlt || "#09090b",
    heroOverlay: config.theme?.backgrounds?.heroOverlay || "#000000",
    footerBottom: config.theme?.backgrounds?.footerBottom || "#09090b",
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
    profile: (config.theme?.animation?.profile as MotionProfile) || "snappy-tech",
    speed: "0.2s",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    hoverScale: "scale(1.01)",
  },
  dividerStyle: {
    type: (config.theme as any)?.dividerStyle?.type || "soft-wave",
    color: (config.theme as any)?.dividerStyle?.color || "#fffbeb",
  },
  focus: {
    ringColor: "#d97706",
    selectionBg: "#fbbf24",
    selectionText: '#000000',
  },
  fonts: {
    heading: config.theme?.fonts?.heading || "Montserrat",
    body: config.theme?.fonts?.body || "Inter",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap",
  },
  customArt: {
    howItWorks: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    serviceNiches: "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80",
    storage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
    referral: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&q=80",
  },
  hybrid: {
    atmosphericCanvas: "ice-white-glass",
    logoTreatment: "monochrome-luxury-black" as "authentic-full-color" | "monochrome-luxury-white" | "monochrome-luxury-black",
  }
} as const;
