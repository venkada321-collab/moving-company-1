import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroQuoteCalculator } from './components/HeroQuoteCalculator';
import { HowItWorks } from './components/HowItWorks';
import { TrustSignals } from './components/TrustSignals';
import { ServiceNichesPage } from './components/ServiceNichesPage';
import { GTARoutesPage } from './components/GTARoutesPage';
import { SuppliesAndStoragePage } from './components/SuppliesAndStoragePage';
import { BlogPage } from './components/BlogPage';
import { ReferralProgram } from './components/ReferralProgram';
import { COIModal } from './components/COIModal';
import { BookingConfirmationModal } from './components/BookingConfirmationModal';
import { Footer } from './components/Footer';
import { SectionDivider } from './components/SectionDivider';
import { THEME } from './config/theme';
import { LAYOUT, SectionId } from './config/layout';
import { QuoteRequest } from './types';

export default function App() {
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
      const el = document.getElementById('hero-quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Modular dynamic renderer for primary landing page components
  const renderHomeSection = (sectionId: SectionId, index: number) => {
    if (!LAYOUT.sectionsEnabled[sectionId]) return null;

    let component: React.ReactNode = null;
    switch (sectionId) {
      case 'hero_quote_calculator':
        component = (
          <HeroQuoteCalculator
            key="hero"
            onQuoteSubmitted={handleQuoteSubmitted}
            onOpenCOIModal={() => setIsCOIModalOpen(true)}
          />
        );
        break;
      case 'how_it_works':
        component = (
          <HowItWorks
            key="how_it_works"
            onStartEstimate={scrollToCalculator}
            onOpenCOIModal={() => setIsCOIModalOpen(true)}
          />
        );
        break;
      case 'trust_signals':
        component = (
          <TrustSignals key="trust" />
        );
        break;
      default:
        return null;
    }

    return (
      <React.Fragment key={sectionId}>
        {index > 0 && <SectionDivider className="my-2" />}
        {component}
      </React.Fragment>
    );
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif]">
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
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-amber-400 focus:text-black focus:font-extrabold focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-black min-h-[44px] flex items-center"
      >
        Skip to main content
      </a>

      {/* Header with Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCOIModal={() => setIsCOIModalOpen(true)}
      />

      {/* Main View Router & Modular Engine */}
      <main id="main-content" tabIndex={-1} className="bg-gradient-to-b from-white via-amber-50/20 to-white">
        {activeTab === 'quote' && (
          <div className="flex flex-col">
            {LAYOUT.sectionOrder
              .filter(id => ['hero_quote_calculator', 'how_it_works', 'trust_signals'].includes(id))
              .map((sectionId, idx) => renderHomeSection(sectionId, idx))}
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
      </main>

      {/* Footer */}
      <Footer
        onNavigateTab={setActiveTab}
        onOpenCOIModal={() => setIsCOIModalOpen(true)}
      />

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
