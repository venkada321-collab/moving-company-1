import React, { useState, useEffect } from 'react';
import { Header } from './components/core/Header';
import { HeroCenteredCta } from './components/core/HeroCenteredCta';
import { HeroCompactBanner } from './components/core/HeroCompactBanner';
import { HeroInteractiveStepQuiz } from './components/core/HeroInteractiveStepQuiz';
import { HeroSlideoutExecutive } from './components/core/HeroSlideoutExecutive';
import { HeroNeomorphicConsole } from './components/core/HeroNeomorphicConsole';
import { HeroBrutalistLedger } from './components/core/HeroBrutalistLedger';
import { HeroGlassWidget } from './components/core/HeroGlassWidget';
import { TrustSignals } from './components/core/TrustSignals';
import { TrustStatsRibbon as CoreTrustStatsRibbon } from './components/core/TrustStatsRibbon';
import { TrustSignalsAtomicProMax } from './components/core/TrustSignalsAtomicProMax';
import { BookingConfirmationModal } from './components/core/BookingConfirmationModal';
import { Footer } from './components/core/Footer';
import { SectionDivider } from './components/core/SectionDivider';
import { THEME } from './config/theme';
import { LAYOUT, SectionId } from './config/layout';
import { QuoteRequest } from './types';
import { NicheComponents, NicheConfig } from './kits/kit-barbershop/index.tsx';
import { BRAND } from './config/brand';

const COLOR_SCALES: Record<string, Record<string, string>> = {
  amber: { "50": "255 251 235", "100": "254 243 199", "200": "253 230 138", "300": "252 211 77", "400": "251 191 36", "500": "245 158 11", "600": "217 119 6", "700": "180 83 9", "800": "146 64 14", "900": "120 53 15", "950": "69 26 3" },
  slate: { "50": "248 250 252", "100": "241 245 249", "200": "226 232 240", "300": "203 213 225", "400": "148 163 184", "500": "100 116 139", "600": "71 85 105", "700": "51 65 85", "800": "30 41 59", "900": "15 23 42", "950": "2 6 23" },
  emerald: { "50": "236 253 245", "100": "209 250 229", "200": "167 243 208", "300": "110 231 183", "400": "52 211 153", "500": "16 185 129", "600": "5 150 105", "700": "4 120 87", "800": "6 95 70", "900": "6 78 59", "950": "2 44 34" },
  indigo: { "50": "238 242 255", "100": "224 231 255", "200": "199 210 254", "300": "165 180 252", "400": "129 140 248", "500": "99 102 241", "600": "79 70 229", "700": "67 56 202", "800": "55 48 163", "900": "49 46 129", "950": "30 27 75" },
  rose: { "50": "255 241 242", "100": "255 228 230", "200": "254 205 211", "300": "253 164 175", "400": "251 113 133", "500": "244 63 94", "600": "225 29 72", "700": "190 18 60", "800": "159 18 57", "900": "136 19 55", "950": "76 5 25" },
  blue: { "50": "239 246 255", "100": "219 234 254", "200": "191 219 254", "300": "147 197 253", "400": "96 165 250", "500": "59 130 246", "600": "37 99 235", "700": "29 78 216", "800": "30 64 175", "900": "30 58 138", "950": "23 37 84" },
  violet: { "50": "245 243 255", "100": "237 233 254", "200": "221 214 254", "300": "196 181 253", "400": "167 139 250", "500": "139 92 246", "600": "124 58 237", "700": "109 40 217", "800": "91 33 182", "900": "76 29 149", "950": "46 16 101" }
};

const CoreComponents = {
  HeroCenteredCta,
  HeroCompactBanner,
  HeroInteractiveStepQuiz,
  HeroSlideoutExecutive,
  HeroNeomorphicConsole,
  HeroBrutalistLedger,
  HeroGlassWidget,
  TrustSignals,
  TrustStatsRibbon: CoreTrustStatsRibbon,
  TrustSignalsAtomicProMax,
  BookingConfirmationModal,
  Footer,
  SectionDivider,
  Header
};

export default function App() {
  const navLinks = NicheConfig.getNavLinks();
  const isAuditAllMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('audit') === 'all';
  const [activeTab, setActiveTab] = useState<string>('quote');
  const [isCOIModalOpen, setIsCOIModalOpen] = useState<boolean>(false);
  const [submittedQuote, setSubmittedQuote] = useState<{
    details: QuoteRequest;
    estimate: { min: number; max: number };
  } | null>(null);

  useEffect(() => {
    document.title = BRAND.pageTitle || BRAND.name;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', BRAND.metaDescription || '');
    const icon = document.querySelector("link[rel~='icon']");
    if (icon) icon.setAttribute('href', BRAND.faviconUrl || BRAND.logoUrl || '');

    // Dynamic Google Fonts Loader
    const headingFont = THEME.fonts.heading.replace(/ /g, '+');
    const bodyFont = THEME.fonts.body.replace(/ /g, '+');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@300;400;500;600;700;800;900&family=${bodyFont}:wght@300;400;500;600;700&family=Permanent+Marker&display=swap`;
    
    if (!document.querySelector(`link[href="${fontUrl}"]`)) {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    }
  }, []);

  const handleQuoteSubmitted = (quote: QuoteRequest, estimate: { min: number; max: number }) => {
    setSubmittedQuote({ details: quote, estimate });
  };

  const scrollToCalculator = () => {
    setActiveTab('quote');
    setTimeout(() => {
      const el = document.getElementById('hero_lead_capture') || document.getElementById('hero-quote-calculator');
      if (el) {
        const topPos = el.getBoundingClientRect().top + window.scrollY - 85;
        window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  const handleUniversalNavigation = (targetId: string) => {
    setActiveTab('quote');
    setTimeout(() => {
      if (targetId === 'hero_lead_capture' || targetId === 'quote') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const topPos = el.getBoundingClientRect().top + window.scrollY - 85;
          window.scrollTo({ top: Math.max(0, topPos), behavior: 'smooth' });
        }
      }
    }, 50);
  };

  // Modular dynamic renderer for primary landing page components
  const renderHomeSection = (sectionId: SectionId | string, index: number) => {
    if (sectionId in LAYOUT.sectionsEnabled && !(LAYOUT.sectionsEnabled as any)[sectionId]) return null;

    let component: React.ReactNode = null;
    let sectionTag = sectionId;

    // Runtime Check: verify component exists in registries
    let ResolvedComponent: any = null;

    if (sectionId === 'hero_lead_capture') {
      sectionTag = 'hero';
      ResolvedComponent = (NicheComponents as any).HeroRouterBarbershop;
      if (!ResolvedComponent) {
        const heroMap: Record<string, any> = {
          'centered-cta': CoreComponents.HeroCenteredCta,
          'compact-banner': CoreComponents.HeroCompactBanner,
          'interactive-step-quiz': CoreComponents.HeroInteractiveStepQuiz,
          'slideout-executive-drawer': CoreComponents.HeroSlideoutExecutive,
          'neomorphic-command-console': CoreComponents.HeroNeomorphicConsole,
          'brutalist-tariff-ledger': CoreComponents.HeroBrutalistLedger,
          'glass-floating-widget': CoreComponents.HeroGlassWidget,
        };
        ResolvedComponent = heroMap[LAYOUT.variants.hero] || CoreComponents.HeroCenteredCta;
      }
      
      if (ResolvedComponent) component = <ResolvedComponent key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
    } else if (sectionId === 'core_services') {
      sectionTag = 'services';
      ResolvedComponent = (NicheComponents as any).CoreServicesGrid || (NicheComponents as any).CoreServicesPage;
      if (ResolvedComponent) component = <ResolvedComponent key="services" onSelectNicheForEstimate={scrollToCalculator} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
    } else if (sectionId === 'how_it_works') {
      sectionTag = 'process';
      ResolvedComponent = (NicheComponents as any).HowItWorks;
      if (ResolvedComponent) component = <ResolvedComponent key="how_it_works" onStartEstimate={scrollToCalculator} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
    } else if (sectionId === 'supplemental_services') {
      sectionTag = 'supplies';
      ResolvedComponent = (NicheComponents as any).SupplementalServicesPage;
      if (ResolvedComponent) component = <ResolvedComponent key="supplies" onAddSupplyToEstimate={scrollToCalculator} onSelectStorageForEstimate={scrollToCalculator} />;
    } else if (sectionId === 'trust_signals') {
      sectionTag = 'trust';
      ResolvedComponent = (NicheComponents as any).TrustRouterBarbershop;
      if (!ResolvedComponent) {
        if (LAYOUT.variants.reviews === 'brutalist-monospaced-audit') ResolvedComponent = CoreComponents.TrustSignalsAtomicProMax;
        else if (LAYOUT.variants.reviews === 'luxury-editorial-carousel') ResolvedComponent = (CoreComponents as any).TrustSignalsEditorial;
        else ResolvedComponent = (NicheComponents as any).TrustStatsRibbon || CoreComponents.TrustStatsRibbon;
      }
      if (ResolvedComponent) component = <ResolvedComponent key="trust" onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
    } else if (sectionId === 'blog' || sectionId === 'blog_page') {
      sectionTag = 'blog';
      ResolvedComponent = (NicheComponents as any).BlogPage;
      if (ResolvedComponent) component = <ResolvedComponent key="blog" />;
    } else if (sectionId === 'referral_program') {
      sectionTag = 'referral';
      ResolvedComponent = (NicheComponents as any).ReferralProgram;
      if (ResolvedComponent) component = <ResolvedComponent key="referral" />;
    } else if (sectionId === 'service_areas') {
      sectionTag = 'routes';
      ResolvedComponent = (NicheComponents as any).ServiceAreasPage;
      if (ResolvedComponent) component = <ResolvedComponent key="routes" onSelectRouteForEstimate={scrollToCalculator} />;
    } else if (sectionId === 'team_roster') {
      sectionTag = 'team';
      ResolvedComponent = (NicheComponents as any).TeamBarberRoster;
      if (ResolvedComponent) component = <ResolvedComponent key="team" />;
    } else if (sectionId === 'lookbook_gallery') {
      sectionTag = 'gallery';
      ResolvedComponent = (NicheComponents as any).LookbookGallery;
      if (ResolvedComponent) component = <ResolvedComponent key="gallery" />;
    } else if (sectionId === 'vip_membership') {
      sectionTag = 'vip';
      ResolvedComponent = (NicheComponents as any).VIPMembershipCards;
      if (ResolvedComponent) component = <ResolvedComponent key="vip" />;
    } else if (sectionId === 'location_hours') {
      sectionTag = 'location';
      ResolvedComponent = (NicheComponents as any).LocationAndHours;
      if (ResolvedComponent) component = <ResolvedComponent key="location" />;
    } else if (sectionId === 'contact_conversion') {
      sectionTag = 'contact';
      ResolvedComponent = (NicheComponents as any).ContactConversion;
      if (ResolvedComponent) component = <ResolvedComponent key="contact" />;
    }

    if (!ResolvedComponent) {
      console.warn(`⚠️ Runtime Config Check Failed: Component for section '${sectionId}' not found.`);
      return null;
    }

    return (
      <div key={sectionId} id={sectionId} data-section={sectionTag}>
        {index > 0 && THEME.paradigm !== 'HeritageLuxury' && <SectionDivider className="my-2" />}
        {component}
      </div>
    );
  };

  const pageBg = THEME.backgrounds.page as string;
  const canvas = THEME.hybrid?.atmosphericCanvas as string | undefined;
  const isDarkMode = canvas === 'obsidian-midnight' || ['#09090b', '#000000', '#0a0a0a', '#111111', '#121212', '#0f0f0f', '#1e293b'].includes(pageBg?.toLowerCase() || '');
  const primaryColorScale = COLOR_SCALES[THEME.colors.primary] || COLOR_SCALES['slate'];

  return (
    <div 
      className={`min-h-screen font-body paradigm-${THEME.paradigm} bg-atmosphere selection:bg-primary-500 selection:text-zinc-950 ${isDarkMode ? 'dark text-neutral-900 dark:text-zinc-50' : 'text-zinc-900'}`}
      style={{ backgroundColor: THEME.backgrounds.page }}
    >
      <style id="runtime-design-tokens">{`
        :root {
          --radius-card: ${THEME.borderRadius.card};
          --radius-button: ${THEME.borderRadius.button};
          --radius-badge: ${THEME.borderRadius.badge};
          --anim-speed: ${THEME.animation.speed};
          --anim-easing: ${THEME.animation.easing};
          --font-heading: "${THEME.fonts.heading}", sans-serif;
          --font-body: "${THEME.fonts.body}", sans-serif;
          --section-bg: ${THEME.backgrounds.section};
          --card-bg: ${THEME.backgrounds.card};
          ${Object.entries(primaryColorScale).map(([weight, rgb]) => `--primary-${weight}: ${rgb};`).join('\n          ')}
        }
        /* Dynamic Theme Background Overrides */
        .dark .dark\\:bg-neutral-950, 
        .dark .dark\\:bg-black,
        .dark .dark\\:bg-zinc-950,
        .dark .bg-black { 
          background-color: var(--section-bg) !important; 
        }
        
        .dark .bg-black\\/95 {
          background-color: var(--section-bg) !important;
          opacity: 0.95;
        }
        
        .dark .dark\\:bg-neutral-900, 
        .dark .dark\\:bg-zinc-900,
        .dark .bg-neutral-900 { 
          background-color: var(--card-bg) !important; 
        }
      `}</style>

      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary-400 focus:text-black focus:font-extrabold focus:rounded-lg focus:shadow-lg min-h-[44px] flex items-center">
        Skip to main content
      </a>

      <div data-section="nav">
        {(() => {
          const NicheHeader = (NicheComponents as any).HeaderBarbershop;
          return NicheHeader ? (
            <NicheHeader activeTab={activeTab} setActiveTab={handleUniversalNavigation} navLinks={navLinks} />
          ) : (
            <Header activeTab={activeTab} setActiveTab={handleUniversalNavigation} onOpenCOIModal={() => setIsCOIModalOpen(true)} navLinks={navLinks} />
          );
        })()}
      </div>

      <main id="main-content" tabIndex={-1} style={{ backgroundColor: THEME.backgrounds.page }}>
        <div className="flex flex-col">
          {LAYOUT.sectionOrder
            ? LAYOUT.sectionOrder.map((sectionId, idx) => renderHomeSection(sectionId, idx))
            : Object.keys((NicheConfig.getNavLinks as any)() || {}).map((sectionId, idx) => renderHomeSection(sectionId, idx))
          }
          {/* Also inject BookingWidget globally for barbershop */}
          {(() => {
            const BookingWidget = (NicheComponents as any).BookingIntegrationWidget;
            return BookingWidget ? <BookingWidget /> : null;
          })()}
        </div>
      </main>

      <div data-section="footer">
        {(() => {
          const NicheFooter = (NicheComponents as any).FooterBarbershop;
          return NicheFooter ? (
            <NicheFooter onNavigateTab={handleUniversalNavigation} navLinks={navLinks} />
          ) : (
            <Footer onNavigateTab={handleUniversalNavigation} onOpenCOIModal={() => setIsCOIModalOpen(true)} navLinks={navLinks} />
          );
        })()}
      </div>

      <BookingConfirmationModal quote={submittedQuote} onClose={() => setSubmittedQuote(null)} />
    </div>
  );
}
