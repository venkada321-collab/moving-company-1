import React from 'react';
import { ArrowRight, MapPin, Clock } from 'lucide-react';
import { BRAND, GEO } from '../../../config';
import { MICROCOPY } from '../../../config/microcopy';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberGlass: React.FC<HeroProps> = () => {
  return (
    <div id="hero-quote-calculator" className="relative w-full h-[95vh] min-h-[700px] flex items-center justify-center bg-neutral-900 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2000&auto=format&fit=crop" 
          alt={`${GEO.regionName} Barbershop`} 
          className="w-full h-full object-cover opacity-80 blur-sm scale-105"
        />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Typography */}
        <div className="text-white drop-shadow-lg">
          <div className="mb-6 inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-bold tracking-widest uppercase">
            {GEO.regionName} LOCATIONS
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[1.1] mb-6 font-['var(--font-heading)']">
            {BRAND.heroTagline || "The Modern Standard."}
          </h1>
          <p className="text-lg md:text-2xl text-neutral-200 mb-8 max-w-lg font-medium leading-relaxed font-['var(--font-body)']">
            {BRAND.heroSubtitle || "Expert grooming in a curated environment. Book your chair and experience the difference."}
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-400">
              <MapPin className="w-5 h-5" /> 3 Locations
            </div>
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary-400">
              <Clock className="w-5 h-5" /> Open 7 Days
            </div>
          </div>
        </div>

        {/* Right Glass Widget */}
        <div className="w-full max-w-md mx-auto lg:ml-auto bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 rounded-[var(--radius-card)] p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white font-['var(--font-heading)'] mb-2">Book Appointment</h2>
            <p className="text-neutral-300 text-sm">Select a service to see availability.</p>
          </div>

          <div className="space-y-4">
            <button className="w-full p-4 bg-white/5 border border-white/10 hover:bg-primary-500/20 hover:border-primary-500 text-left text-white rounded-[var(--radius-button)] transition-all font-bold">
              Signature Haircut <span className="text-primary-400 text-sm font-normal float-right">45 mins</span>
            </button>
            <button className="w-full p-4 bg-white/5 border border-white/10 hover:bg-primary-500/20 hover:border-primary-500 text-left text-white rounded-[var(--radius-button)] transition-all font-bold">
              Haircut & Beard Trim <span className="text-primary-400 text-sm font-normal float-right">60 mins</span>
            </button>
            <button className="w-full p-4 bg-white/5 border border-white/10 hover:bg-primary-500/20 hover:border-primary-500 text-left text-white rounded-[var(--radius-button)] transition-all font-bold">
              The Royal Shave <span className="text-primary-400 text-sm font-normal float-right">45 mins</span>
            </button>
          </div>

          <button className="w-full mt-8 py-4 bg-primary-500 hover:bg-primary-600 text-black font-bold text-lg rounded-[var(--radius-button)] transition-all flex items-center justify-center gap-2 btn-atomic-primary">
            Continue to Schedule <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
