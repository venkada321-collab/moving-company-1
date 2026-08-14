import React, { useState } from 'react';
import { Terminal, ChevronRight, Calendar, Shield } from 'lucide-react';
import { BRAND, GEO } from '../../../config';
import { MICROCOPY } from '../../../config/microcopy';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberNeomorphic: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [commandStr, setCommandStr] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onQuoteSubmitted) {
      onQuoteSubmitted({}, { min: 45, max: 95 });
    }
  };

  return (
    <div id="hero-quote-calculator" className="relative min-h-[90vh] bg-[#e0e5ec] dark:bg-[#1a1e23] text-neutral-800 dark:text-neutral-200 flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#e0e5ec]/80 dark:bg-[#1a1e23]/90 z-10 backdrop-blur-[2px]" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-500/10 dark:bg-primary-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen z-20" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen z-20" />
        <img 
          src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2000&auto=format&fit=crop" 
          alt="Barbershop" 
          className="w-full h-full object-cover opacity-60 grayscale"
        />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 font-['var(--font-heading)']">
            {BRAND.heroTagline || `${GEO.regionName} Precision`}
          </h1>
          <p className="text-lg md:text-xl font-['var(--font-body)'] opacity-80 max-w-2xl mx-auto font-bold text-primary-500">
            {BRAND.heroSubtitle || "Grooming calculated with absolute perfection."}
          </p>
        </div>

        {/* Neomorphic Console */}
        <div className="rounded-[var(--radius-card)] p-2 bg-[#e0e5ec] dark:bg-[#1a1e23] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] dark:shadow-[9px_9px_16px_rgba(0,0,0,0.6),-9px_-9px_16px_rgba(40,45,50,0.5)] border border-white/20 dark:border-white/5 transition-all">
          <div className="bg-white dark:bg-neutral-900 rounded-[calc(var(--radius-card)-0.5rem)] p-6 shadow-inner font-mono relative overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs text-neutral-900 dark:text-neutral-500 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> booking-engine.exe
              </span>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div className="text-primary-400 font-bold mb-2">&gt; Initializing schedule matrix...</div>
              <div className="text-neutral-300 mb-6">Enter preferred service or barber name to begin booking sequence:</div>
              
              <div className="flex items-center bg-white dark:bg-neutral-950 p-4 rounded-[var(--radius-button)] border border-neutral-800 focus-within:border-primary-500 focus-within:shadow-[0_0_15px_rgba(var(--color-primary-500),0.3)] transition-all">
                <ChevronRight className="w-5 h-5 text-primary-500 mr-2" />
                <input 
                  type="text" 
                  value={commandStr}
                  onChange={e => setCommandStr(e.target.value)}
                  placeholder="e.g. Skin Fade @ 2PM"
                  className="bg-transparent w-full focus:outline-none text-neutral-900 dark:text-white font-mono placeholder:text-neutral-700"
                  autoFocus
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit" 
                  className="flex items-center gap-3 px-8 py-3 bg-primary-500 hover:bg-primary-400 text-black font-bold font-sans rounded-[var(--radius-button)] transition-colors btn-atomic-primary"
                >
                  <Calendar className="w-5 h-5" />
                  EXECUTE BOOKING
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center flex justify-center items-center gap-2 text-sm font-semibold opacity-60">
          <Shield className="w-4 h-4" />
          End-to-End Encryption & Verified Appointments
        </div>
      </div>
    </div>
  );
};
