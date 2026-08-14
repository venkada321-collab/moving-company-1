import React, { useState } from 'react';
import { Shield, ArrowRight, Calendar, Scissors } from 'lucide-react';
import { BRAND, GEO } from '../../../config';
import { MICROCOPY } from '../../../config/microcopy';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberExecutive: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [service, setService] = useState('');
  const [date, setDate] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuoteSubmitted) {
      onQuoteSubmitted({}, { min: 40, max: 120 });
    }
  };

  return (
    <div id="hero-quote-calculator" className="relative min-h-[85vh] pt-24 lg:pt-32 pb-12 bg-white dark:bg-neutral-950 flex items-center overflow-hidden">
      {/* Heavy dark luxury background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 z-10" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary-900/20 blur-[150px] mix-blend-screen pointer-events-none z-20" />
        <img 
          src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop" 
          alt={`${GEO.regionName} Barbershop`} 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-0 lg:px-8 relative z-10 flex flex-col lg:flex-row h-full">
        
        {/* Left: Luxury Editorial Typography */}
        <div className="flex-1 py-20 px-8 lg:px-12 flex flex-col justify-center max-w-3xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-neutral-900 dark:text-white mb-6 font-['var(--font-heading)'] leading-[1.1]">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-white">{GEO.regionName}'s</span>
            <br /> Premier Grooming.
          </h1>
          <p className="text-lg text-neutral-400 font-['var(--font-body)'] mb-10 max-w-xl font-light">
            {BRAND.heroSubtitle || MICROCOPY.hero?.proclamation || "Exacting standards and classic techniques tailored for the modern gentleman."}
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
              <h2 className="text-2xl font-bold font-['var(--font-heading)'] mb-2">Book an Appointment</h2>
              <p className="text-neutral-900 dark:text-neutral-500 text-sm">Secure your time with a master barber.</p>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-6">
              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-400">Service Type</label>
                <div className="flex items-center border-b-2 border-neutral-200 focus-within:border-primary-500 transition-colors py-2">
                  <Scissors className="w-5 h-5 text-neutral-400 mr-3" />
                  <input 
                    type="text" 
                    placeholder="e.g. Haircut & Royal Shave"
                    value={service}
                    onChange={e => setService(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-neutral-900 font-medium placeholder:font-normal"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase font-bold tracking-wider text-neutral-400">Preferred Date</label>
                <div className="flex items-center border-b-2 border-neutral-200 focus-within:border-primary-500 transition-colors py-2">
                  <Calendar className="w-5 h-5 text-neutral-400 mr-3" />
                  <input 
                    type="date" 
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full bg-transparent focus:outline-none text-neutral-900 font-medium placeholder:font-normal"
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full mt-8 flex items-center justify-between px-6 py-4 bg-white dark:bg-neutral-950 hover:bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white font-bold rounded-[var(--radius-button)] transition-all group btn-atomic-primary"
              >
                <span>{MICROCOPY.buttons?.getQuote || "Confirm Booking"}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest">
              <Shield className="w-4 h-4 text-primary-500" />
              Sanitation Certified & Licensed
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
