import React, { useState } from 'react';
import { ArrowRight, Box, Calendar, MapPin, Sparkles } from 'lucide-react';
import { BRAND } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroGlassWidget: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [fromZip, setFromZip] = useState('');
  const [toZip, setToZip] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote: QuoteRequest = {
      fromZip: fromZip || 'City',
      fromAddress: fromZip || 'City',
      toZip: toZip || 'City',
      toAddress: toZip || 'City',
      moveDate: new Date().toISOString().split('T')[0],
      size: '2bed',
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Glass Client',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 750, max: 1200 });
  };

  return (
    <div id="hero-quote-calculator" className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 via-zinc-950 to-zinc-900 mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />
      </div>

      {/* Floating Ethereal Widget */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        {/* Left Copy */}
        <div className="flex-1 text-center lg:text-left text-neutral-900 dark:text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium tracking-wide text-zinc-300">{BRAND.rankingClaim}</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-['var(--font-heading)'] leading-tight">
            {BRAND.heroTagline || BRAND.name}
          </h1>
          <p className="text-lg text-zinc-400 font-['var(--font-body)'] max-w-xl mx-auto lg:mx-0">
            {BRAND.heroSubtitle || "Seamless, transparent, and completely stress-free moving services designed for your lifestyle."}
          </p>
        </div>

        {/* Right Glass Widget */}
        <div className="w-full max-w-md bg-white/5 dark:bg-white/5 border border-white/10 backdrop-blur-2xl p-8 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600" />
          
          <h3 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 font-['var(--font-heading)']">
            Calculate your move
          </h3>
          
          <form onSubmit={handleQuickSubmit} className="space-y-5">
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text" 
                value={fromZip}
                onChange={(e) => setFromZip(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 border border-white/10 rounded-xl text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-primary-400 focus:bg-white dark:bg-black/40 transition-all backdrop-blur-sm"
                placeholder="Moving from (Postal/City)"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input 
                type="text" 
                value={toZip}
                onChange={(e) => setToZip(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 border border-white/10 rounded-xl text-neutral-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-primary-400 focus:bg-white dark:bg-black/40 transition-all backdrop-blur-sm"
                placeholder="Moving to (Postal/City)"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <select className="w-full pl-12 pr-4 py-4 bg-white dark:bg-black/20 border border-white/10 rounded-xl text-neutral-900 dark:text-white appearance-none focus:outline-none focus:border-primary-400 focus:bg-white dark:bg-black/40 transition-all backdrop-blur-sm">
                <option value="asap" className="bg-white dark:bg-zinc-900">As soon as possible</option>
                <option value="this-month" className="bg-white dark:bg-zinc-900">Sometime this month</option>
                <option value="next-month" className="bg-white dark:bg-zinc-900">Next month or later</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 hover:bg-primary-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(var(--color-primary-500),0.3)]"
            >
              <span>{MICROCOPY.buttons?.getQuote || "Get Instant Estimate"}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>
          
          <p className="text-center text-xs text-neutral-900 dark:text-zinc-500 mt-6 flex justify-center items-center gap-2">
            <Box className="w-4 h-4" /> 100% Free & No Obligation
          </p>
        </div>

      </div>
    </div>
  );
};
