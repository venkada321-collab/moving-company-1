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

  const handleSelectNicheForEstimate = (nicheId: string) => {
    setActiveTab('quote');
    setTimeout(() => {
      const el = document.getElementById('hero-quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectRouteForEstimate = (from: string, to: string) => {
    setActiveTab('quote');
    setTimeout(() => {
      const el = document.getElementById('hero-quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleAddSupplyToEstimate = (supplyId: string) => {
    setActiveTab('quote');
    setTimeout(() => {
      const el = document.getElementById('hero-quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSelectStorageForEstimate = (storageId: string) => {
    setActiveTab('quote');
    setTimeout(() => {
      const el = document.getElementById('hero-quote-calculator');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-['Montserrat',sans-serif]">
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

      {/* Main View Router */}
      <main id="main-content" tabIndex={-1} className="bg-gradient-to-b from-white via-amber-50/20 to-white">
        {activeTab === 'quote' && (
          <>
            {/* Quote Calculator Front and Center in Hero */}
            <HeroQuoteCalculator
              onQuoteSubmitted={handleQuoteSubmitted}
              onOpenCOIModal={() => setIsCOIModalOpen(true)}
            />
            {/* 3-4 Step How It Works Section */}
            <HowItWorks
              onStartEstimate={() => {
                const el = document.getElementById('hero-quote-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenCOIModal={() => setIsCOIModalOpen(true)}
            />
            {/* Trust Signals: Ratings, Reviews, Awards, Testimonials */}
            <TrustSignals />
          </>
        )}

        {activeTab === 'niches' && (
          <ServiceNichesPage
            onSelectNicheForEstimate={handleSelectNicheForEstimate}
            onOpenCOIModal={() => setIsCOIModalOpen(true)}
          />
        )}

        {activeTab === 'routes' && (
          <GTARoutesPage
            onSelectRouteForEstimate={handleSelectRouteForEstimate}
          />
        )}

        {activeTab === 'how-it-works' && (
          <>
            <HowItWorks
              onStartEstimate={() => {
                setActiveTab('quote');
                setTimeout(() => {
                  const el = document.getElementById('hero-quote-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              onOpenCOIModal={() => setIsCOIModalOpen(true)}
            />
            <TrustSignals />
          </>
        )}

        {activeTab === 'supplies-storage' && (
          <SuppliesAndStoragePage
            onAddSupplyToEstimate={handleAddSupplyToEstimate}
            onSelectStorageForEstimate={handleSelectStorageForEstimate}
          />
        )}

        {activeTab === 'blog' && (
          <BlogPage />
        )}

        {activeTab === 'referral' && (
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
