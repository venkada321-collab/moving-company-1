import React, { useState } from 'react';
import { Shield, ArrowRight, MapPin, Search } from 'lucide-react';
import { BRAND } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroSlideoutExecutive: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote: QuoteRequest = {
      fromZip: fromLocation || 'Toronto',
      fromAddress: fromLocation || 'Toronto',
      toZip: toLocation || 'Vancouver',
      toAddress: toLocation || 'Vancouver',
      moveDate: new Date().toISOString().split('T')[0],
      size: '2bed',
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Executive Client',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 800, max: 1500 });
  };

  return (
    <div id="hero-quote-calculator" className="relative min-h-[85vh] bg-white dark:bg-neutral-950 flex items-center overflow-hidden">
      {/* Heavy dark luxury background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 to-neutral-950">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary-900/10 blur-[150px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-0 lg:px-8 relative z-10 flex flex-col lg:flex-row h-full">
        
        {/* Left: Luxury Editorial Typography */}
        <div className="flex-1 py-20 px-8 lg:px-12 flex flex-col justify-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 dark:text-white mb-6 font-['var(--font-heading)'] leading-[1.1]">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">Premium</span> Relocation.
            <br /> Without Compromise.
          </h1>
          <p className="text-lg text-neutral-400 font-['var(--font-body)'] mb-10 max-w-xl font-light">
            {BRAND.heroSubtitle || "Executive white-glove moving services tailored for high-value estates, fine art, and complex transitions."}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              <div className="w-12 h-12 rounded-full border-2 border-neutral-950 bg-neutral-800" />
              <div className="w-12 h-12 rounded-full border-2 border-neutral-950 bg-neutral-700" />
              <div className="w-12 h-12 rounded-full border-2 border-neutral-950 bg-primary-900 flex items-center justify-center text-xs font-bold text-primary-400">4.9+</div>
            </div>
            <div className="text-sm text-neutral-900 dark:text-neutral-500 uppercase tracking-widest font-semibold">
              Trusted by {BRAND.rankingClaim}
            </div>
          </div>
        </div>

        {/* Right: Slide-out Executive Drawer Panel */}
        <div className="w-full lg:w-[480px] bg-white text-neutral-950 lg:rounded-l-[var(--radius-card)] shadow-[[-20px_0_50px_rgba(0,0,0,0.5)]] flex flex-col min-h-full">
          <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <div className="w-12 h-1 bg-primary-500 mb-6" />
              <h2 className="text-2xl font-bold font-['var(--font-heading)'] mb-2">Request an Audit</h2>
              <p className="text-neutral-900 dark:text-neutral-500 text-sm">Speak directly with an executive logistics coordinator.</p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-400">Current Residence</label>
                <div className="flex items-center border-b-2 border-neutral-200 focus-within:border-primary-500 transition-colors py-2">
                  <MapPin className="w-5 h-5 text-neutral-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Enter city or postal code"
                    value={fromLocation}
                    onChange={e => setFromLocation(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-neutral-900 font-medium placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-400">Destination</label>
                <div className="flex items-center border-b-2 border-neutral-200 focus-within:border-primary-500 transition-colors py-2">
                  <Search className="w-5 h-5 text-neutral-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Enter destination"
                    value={toLocation}
                    onChange={e => setToLocation(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-neutral-900 font-medium placeholder:font-normal"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-8 flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-950 hover:bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold rounded-[var(--radius-button)] transition-all group"
              >
                <span>{MICROCOPY.buttons?.getQuote || "Initiate Consultation"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              <Shield className="w-4 h-4 text-primary-500" />
              Fully Bonded & Insured
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
