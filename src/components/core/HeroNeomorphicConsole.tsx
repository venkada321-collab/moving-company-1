import React, { useState } from 'react';
import { Terminal, ChevronRight, Calculator, Shield } from 'lucide-react';
import { BRAND } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroNeomorphicConsole: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [commandStr, setCommandStr] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote: QuoteRequest = {
      fromZip: commandStr || 'Origin',
      fromAddress: commandStr || 'Origin',
      toZip: 'Destination',
      toAddress: 'Destination',
      moveDate: new Date().toISOString().split('T')[0],
      size: '2bed',
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Console User',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 650, max: 950 });
  };

  return (
    <div id="hero-quote-calculator" className="relative min-h-[90vh] bg-[#e0e5ec] dark:bg-[#1a1e23] text-neutral-800 dark:text-neutral-200 flex items-center justify-center py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-500/10 dark:bg-primary-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <div className="max-w-4xl w-full mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 font-['var(--font-heading)']">
            {BRAND.heroTagline || BRAND.name}
          </h1>
          <p className="text-lg md:text-xl font-['var(--font-body)'] opacity-80 max-w-2xl mx-auto">
            {BRAND.heroSubtitle || "Logistics calculated with absolute precision."}
          </p>
        </div>

        {/* Neomorphic Console */}
        <div className="rounded-[var(--radius-card)] p-2 bg-[#e0e5ec] dark:bg-[#1a1e23] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] dark:shadow-[9px_9px_16px_rgba(0,0,0,0.6),-9px_-9px_16px_rgba(40,45,50,0.5)] border border-white/20 dark:border-white/5 transition-all">
          <div className="bg-neutral-900 rounded-[calc(var(--radius-card)-0.5rem)] p-6 shadow-inner font-mono relative overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 mb-6 border-b border-neutral-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-xs text-neutral-500 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> quote-engine.exe
              </span>
            </div>

            <form onSubmit={handleQuickSubmit} className="space-y-4">
              <div className="text-primary-400 font-bold mb-2">&gt; Initializing estimation matrix...</div>
              <div className="text-neutral-300 mb-6">Enter origin postal code or city to begin route calculation:</div>
              
              <div className="flex items-center bg-neutral-950 p-4 rounded-[var(--radius-button)] border border-neutral-800 focus-within:border-primary-500 focus-within:shadow-[0_0_15px_rgba(var(--color-primary-500),0.3)] transition-all">
                <ChevronRight className="w-5 h-5 text-primary-500 mr-2" />
                <input 
                  type="text" 
                  value={commandStr}
                  onChange={e => setCommandStr(e.target.value)}
                  placeholder="e.g. M5V 2H1"
                  className="bg-transparent w-full focus:outline-none text-white font-mono placeholder:text-neutral-700"
                  autoFocus
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button 
                  type="submit" 
                  className="flex items-center gap-3 px-8 py-3 bg-primary-500 hover:bg-primary-400 text-black font-bold font-sans rounded-[var(--radius-button)] transition-colors"
                >
                  <Calculator className="w-5 h-5" />
                  EXECUTE CALCULATION
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 text-center flex justify-center items-center gap-2 text-sm font-semibold opacity-60">
          <Shield className="w-4 h-4" />
          End-to-End Encryption & Verified Logistics
        </div>
      </div>
    </div>
  );
};
