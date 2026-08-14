import React, { useState } from 'react';
import { ArrowRight, Scissors, Calendar } from 'lucide-react';
import { BRAND, GEO } from '../../../config';
import { MICROCOPY } from '../../../config/microcopy';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberBrutalist: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [service, setService] = useState('');
  const [barber, setBarber] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuoteSubmitted) {
      onQuoteSubmitted({}, { min: 40, max: 80 });
    }
  };

  return (
    <div id="hero-quote-calculator" className="relative bg-black text-black border-b-8 border-black font-['var(--font-body)'] min-h-[80vh] flex flex-col justify-center pt-32 pb-16 overflow-hidden">
      
      {/* Brutalist Image Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply" />
        <img 
          src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2000&auto=format&fit=crop" 
          alt="Barbershop" 
          className="w-full h-full object-cover opacity-70 grayscale contrast-125"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Brutalist Header Block */}
        <div className="border-4 border-black p-6 md:p-12 mb-8 bg-primary-400 shadow-[8px_8px_0_0_#000]">
          <div className="inline-block bg-white dark:bg-black text-neutral-900 dark:text-white font-mono uppercase px-3 py-1 text-xs font-bold mb-6">
            EST. {new Date().getFullYear()} // {GEO.regionName} HQ
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {BRAND.heroTagline || "HEAVYWEIGHT GROOMING."}
          </h1>
          <p className="text-xl md:text-2xl font-bold max-w-3xl">
            {BRAND.heroSubtitle || "Raw, unfiltered barbering. We handle the clippers, you handle the rest."}
          </p>
        </div>

        {/* Ledger Form Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 border-4 border-black p-8 bg-white shadow-[8px_8px_0_0_#000]">
            <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">BOOKING LEDGER</h2>
            <form onSubmit={handleQuickSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono font-bold uppercase flex items-center gap-2">
                    <Scissors className="w-5 h-5" /> SELECT SERVICE
                  </label>
                  <input 
                    type="text" 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-zinc-100 border-2 border-black p-4 font-mono focus:outline-none focus:bg-primary-100 uppercase"
                    placeholder="e.g. FADE & BEARD"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono font-bold uppercase flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> SELECT BARBER
                  </label>
                  <input 
                    type="text" 
                    value={barber}
                    onChange={(e) => setBarber(e.target.value)}
                    className="w-full bg-zinc-100 border-2 border-black p-4 font-mono focus:outline-none focus:bg-primary-100 uppercase"
                    placeholder="ANY AVAILABLE"
                  />
                </div>
              </div>

              <div className="pt-6 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm font-mono font-bold uppercase">
                  {BRAND.rankingClaim}
                </div>
                <button 
                  type="submit" 
                  className="w-full md:w-auto bg-white dark:bg-black text-neutral-900 dark:text-white hover:bg-primary-500 hover:text-black border-4 border-black font-black uppercase px-8 py-4 text-xl flex items-center justify-center gap-3 transition-colors btn-atomic-primary"
                >
                  {MICROCOPY.buttons?.getQuote || "LOCK IN BOOKING"}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="border-4 border-black p-6 bg-zinc-100 shadow-[8px_8px_0_0_#000] flex-1">
              <div className="font-mono font-bold border-b-4 border-black pb-2 mb-4">SHOP STATUS</div>
              <ul className="space-y-4 font-mono text-sm font-bold uppercase">
                <li className="flex justify-between border-b-2 border-zinc-300 pb-2">
                  <span>SHOP:</span> <span className="text-emerald-600">OPEN</span>
                </li>
                <li className="flex justify-between border-b-2 border-zinc-300 pb-2">
                  <span>BARBERS:</span> <span>STATIONED</span>
                </li>
                <li className="flex justify-between border-b-2 border-zinc-300 pb-2">
                  <span>SANITATION:</span> <span>BARBICIDE CERT</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>WALK-INS:</span> <span>ACCEPTED</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
