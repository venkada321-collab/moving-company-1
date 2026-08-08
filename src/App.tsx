import React, { useState } from 'react';
import { Header } from './components/core/Header';
import { HeroQuoteCalculator } from './kits/kit-moving/components/HeroQuoteCalculator';
import { HeroCenteredCta } from './components/core/HeroCenteredCta';
import { HeroCompactBanner } from './components/core/HeroCompactBanner';
import { HeroInteractiveStepQuiz } from './components/core/HeroInteractiveStepQuiz';
import { HeroSlideoutExecutive } from './components/core/HeroSlideoutExecutive';
import { HeroNeomorphicConsole } from './components/core/HeroNeomorphicConsole';
import { HeroBrutalistLedger } from './components/core/HeroBrutalistLedger';
import { HeroGlassWidget } from './components/core/HeroGlassWidget';
import { HowItWorks } from './kits/kit-moving/components/HowItWorks';
import { TrustSignals } from './components/core/TrustSignals';
import { TrustStatsRibbon } from './components/core/TrustStatsRibbon';
import { TrustSignalsAtomicProMax } from './components/core/TrustSignalsAtomicProMax';
import { ServiceNichesPage } from './kits/kit-moving/components/ServiceNichesPage';
import { GTARoutesPage } from './kits/kit-moving/components/GTARoutesPage';
import { SuppliesAndStoragePage } from './kits/kit-moving/components/SuppliesAndStoragePage';
import { BlogPage } from './kits/kit-moving/components/BlogPage';
import { ReferralProgram } from './kits/kit-moving/components/ReferralProgram';
import { COIModal } from './kits/kit-moving/components/COIModal';
import { BookingConfirmationModal } from './components/core/BookingConfirmationModal';
import { Footer } from './components/core/Footer';
import { SectionDivider } from './components/core/SectionDivider';
import { THEME } from './config/theme';
import { LAYOUT, SectionId } from './config/layout';
import { QuoteRequest } from './types';

export default function App() {
  const isAuditAllMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('audit') === 'all';
  const [activeTab, setActiveTab] = useState<string>('quote');
  const [isCOIModalOpen, setIsCOIModalOpen] = useState<boolean>(false);
  const [submittedQuote, setSubmittedQuote] = useState<{
    details: QuoteRequest;
    estimate: { min: number; max: number };
  } | null>(null);

  const handleQuoteSubmitted = (quote: QuoteRequest, estimate: { min: number; max: number }) => {
    setSubmittedQuote({ details: quote, estimate });
  };

  const scrollToCalculator = () => {
    setActiveTab('quote');
    setTimeout(() => {
      const el = document.getElementById('hero_quote_calculator') || document.getElementById('hero-quote-calculator');
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
      if (targetId === 'hero_quote_calculator' || targetId === 'quote') {
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
    let sectionTag = '';

    switch (sectionId) {
      case 'hero_quote_calculator':
        sectionTag = 'hero';
        if (LAYOUT.variants.hero === 'centered-cta') {
          component = <HeroCenteredCta key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else if (LAYOUT.variants.hero === 'compact-banner') {
          component = <HeroCompactBanner key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else if (LAYOUT.variants.hero === 'interactive-step-quiz') {
          component = <HeroInteractiveStepQuiz key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else if (LAYOUT.variants.hero === 'slideout-executive-drawer') {
          component = <HeroSlideoutExecutive key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else if (LAYOUT.variants.hero === 'neomorphic-command-console') {
          component = <HeroNeomorphicConsole key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else if (LAYOUT.variants.hero === 'brutalist-tariff-ledger') {
          component = <HeroBrutalistLedger key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else if (LAYOUT.variants.hero === 'glass-floating-widget') {
          component = <HeroGlassWidget key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        } else {
          component = <HeroQuoteCalculator key="hero" onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        }
        break;
      case 'service_niches':
        sectionTag = 'services';
        component = <ServiceNichesPage key="services" onSelectNicheForEstimate={scrollToCalculator} onOpenCOIModal={() => setIsCOIModalOpen(true)} />;
        break;
      case 'how_it_works':
        sectionTag = 'process';
        component = (
          <HowItWorks
            key="how_it_works"
            onStartEstimate={scrollToCalculator}
            onOpenCOIModal={() => setIsCOIModalOpen(true)}
          />
        );
        break;
      case 'supplies_and_storage':
        sectionTag = 'supplies';
        component = <SuppliesAndStoragePage key="supplies" onAddSupplyToEstimate={scrollToCalculator} onSelectStorageForEstimate={scrollToCalculator} />;
        break;
      case 'trust_signals':
        sectionTag = 'reviews';
        if (LAYOUT.variants.reviews === 'stats-ribbon' || LAYOUT.variants.reviews === 'stats-ribbon-ticker') {
          component = <TrustStatsRibbon key="trust-ribbon" />;
        } else if (LAYOUT.variants.reviews === 'brutalist-monospaced-audit' || LAYOUT.variants.reviews === 'luxury-editorial-carousel') {
          component = <TrustSignalsAtomicProMax key="trust" />;
        } else {
          component = <TrustSignals key="trust" />;
        }
        break;
      case 'blog':
        sectionTag = 'blog';
        component = <BlogPage key="blog" />;
        break;
      case 'referral_program':
        sectionTag = 'referral';
        component = <ReferralProgram key="referral" />;
        break;
      default:
        return null;
    }

    return (
      <div key={sectionId} id={sectionId} data-section={sectionTag}>
        {index > 0 && <SectionDivider className="my-2" />}
        {component}
      </div>
    );
  };

  const pageBg = THEME.backgrounds.page as string;
  const canvas = THEME.hybrid?.atmosphericCanvas as string | undefined;
  const isDarkMode = canvas === 'obsidian-midnight' || pageBg === '#09090b' || pageBg === '#000000';

  return (
    <div 
      className={`min-h-screen font-body bg-atmosphere selection:bg-primary-500 selection:text-zinc-950 ${isDarkMode ? 'text-zinc-50' : 'text-zinc-900'}`}
      style={{ backgroundColor: THEME.backgrounds.page }}
    >
      {/* Dynamic Design Token Injection — Controls Geometry, Physics, and Font Stacks Globally */}
      <style id="runtime-design-tokens">{`
        :root {
          --radius-card: ${THEME.borderRadius.card};
          --radius-button: ${THEME.borderRadius.button};
          --radius-badge: ${THEME.borderRadius.badge};
          --anim-speed: ${THEME.animation.speed};
          --anim-easing: ${THEME.animation.easing};
          --font-heading: "${THEME.fonts.heading}", sans-serif;
          --font-body: "${THEME.fonts.body}", sans-serif;
        }
      `}</style>

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-primary-400 focus:text-black focus:font-extrabold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[44px] flex items-center"
      >
        Skip to main content
      </a>

      {/* Header with Navigation */}
      <div data-section="nav">
        <Header
          activeTab={activeTab}
          setActiveTab={handleUniversalNavigation}
          onOpenCOIModal={() => setIsCOIModalOpen(true)}
        />
      </div>

      {/* Main View Router & Modular Engine */}
      <main id="main-content" tabIndex={-1} style={{ backgroundColor: THEME.backgrounds.page }}>
        {isAuditAllMode ? (
          /* Single-Page Blueprint Dump Mode (?audit=all) — Renders every single component sequentially for thorough automated testing */
          <div className="flex flex-col gap-8 py-4">
            <div data-section="hero">
              {LAYOUT.variants.hero === 'centered-cta' ? (
                <HeroCenteredCta onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : LAYOUT.variants.hero === 'compact-banner' ? (
                <HeroCompactBanner onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : LAYOUT.variants.hero === 'interactive-step-quiz' ? (
                <HeroInteractiveStepQuiz onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : LAYOUT.variants.hero === 'slideout-executive-drawer' ? (
                <HeroSlideoutExecutive onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : LAYOUT.variants.hero === 'neomorphic-command-console' ? (
                <HeroNeomorphicConsole onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : LAYOUT.variants.hero === 'brutalist-tariff-ledger' ? (
                <HeroBrutalistLedger onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : LAYOUT.variants.hero === 'glass-floating-widget' ? (
                <HeroGlassWidget onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              ) : (
                <HeroQuoteCalculator onQuoteSubmitted={handleQuoteSubmitted} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
              )}
            </div>
            <SectionDivider />
            <div data-section="routes">
              <ServiceNichesPage onSelectNicheForEstimate={scrollToCalculator} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
            </div>
            <SectionDivider />
            <div data-section="process">
              <HowItWorks onStartEstimate={scrollToCalculator} onOpenCOIModal={() => setIsCOIModalOpen(true)} />
            </div>
            <SectionDivider />
            <div data-section="services">
              <GTARoutesPage onSelectRouteForEstimate={scrollToCalculator} />
            </div>
            <SectionDivider />
            <div data-section="supplies">
              <SuppliesAndStoragePage onAddSupplyToEstimate={scrollToCalculator} onSelectStorageForEstimate={scrollToCalculator} />
            </div>
            <SectionDivider />
            <div data-section="reviews">
              {(LAYOUT.variants.reviews === 'stats-ribbon' || LAYOUT.variants.reviews === 'stats-ribbon-ticker') ? <TrustStatsRibbon /> : 
               (LAYOUT.variants.reviews === 'brutalist-monospaced-audit' || LAYOUT.variants.reviews === 'luxury-editorial-carousel') ? <TrustSignalsAtomicProMax /> : 
               <TrustSignals />}
            </div>
            <SectionDivider />
            <div data-section="blog">
              <BlogPage />
            </div>
            <SectionDivider />
            <div data-section="referral">
              <ReferralProgram />
            </div>
          </div>
        ) : (
          /* Normal Interactive Tab Routing Mode */
          <>
            {activeTab === 'quote' && (
              <div className="flex flex-col">
                {['hero_quote_calculator', 'service_niches', 'how_it_works', 'supplies_and_storage', 'trust_signals', 'blog']
                  .map((sectionId, idx) => renderHomeSection(sectionId as SectionId, idx))}
              </div>
            )}

            {activeTab === 'niches' && LAYOUT.sectionsEnabled.service_niches && (
              <ServiceNichesPage
                onSelectNicheForEstimate={() => scrollToCalculator()}
                onOpenCOIModal={() => setIsCOIModalOpen(true)}
              />
            )}

            {activeTab === 'routes' && LAYOUT.sectionsEnabled.gta_routes && (
              <GTARoutesPage
                onSelectRouteForEstimate={() => scrollToCalculator()}
              />
            )}

            {activeTab === 'how-it-works' && LAYOUT.sectionsEnabled.how_it_works && (
              <>
                <HowItWorks
                  onStartEstimate={() => scrollToCalculator()}
                  onOpenCOIModal={() => setIsCOIModalOpen(true)}
                />
                <SectionDivider />
                <TrustSignals />
              </>
            )}

            {activeTab === 'supplies-storage' && LAYOUT.sectionsEnabled.supplies_and_storage && (
              <SuppliesAndStoragePage
                onAddSupplyToEstimate={() => scrollToCalculator()}
                onSelectStorageForEstimate={() => scrollToCalculator()}
              />
            )}

            {activeTab === 'blog' && LAYOUT.sectionsEnabled.blog_page && (
              <BlogPage />
            )}

            {activeTab === 'referral' && LAYOUT.sectionsEnabled.referral_program && (
              <ReferralProgram />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <div data-section="footer">
        <Footer
          onNavigateTab={handleUniversalNavigation}
          onOpenCOIModal={() => setIsCOIModalOpen(true)}
        />
      </div>

      {/* Condo Certificate of Insurance (COI) Instant Modal */}
      <COIModal
        isOpen={isCOIModalOpen}
        onClose={() => setIsCOIModalOpen(false)}
      />

      {/* Booking Confirmation Receipt Modal */}
      <BookingConfirmationModal
        quote={submittedQuote}
        onClose={() => setSubmittedQuote(null)}
      />
    </div>
  );
}
