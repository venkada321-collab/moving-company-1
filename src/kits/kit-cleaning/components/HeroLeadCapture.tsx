import React, { useState } from 'react';
import { Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { BRAND, PRICING, MICROCOPY } from '../../../config';

interface HeroProps {
  onQuoteSubmitted: (quote: any, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroLeadCapture: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [propertySize, setPropertySize] = useState('2bed');
  const [cleaningType, setCleaningType] = useState('standard');
  const [frequency, setFrequency] = useState('biweekly');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote = { propertySize, cleaningType, frequency };
    onQuoteSubmitted(dummyQuote, { min: 150, max: 250 });
  };

  return (
    <div id="hero-quote-calculator" className="relative bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden pt-32 lg:pt-40 pb-24">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/10 via-neutral-950/5 to-neutral-950/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy & Custom Art Placeholder */}
        <div className="text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{BRAND.rankingClaim || "Top Rated Cleaning Service"}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6 font-['var(--font-heading)']">
            {BRAND.heroTagline || "Spotless Spaces. Stress-Free Living."}
          </h1>
          
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 font-['var(--font-body)'] leading-relaxed">
            {BRAND.heroSubtitle || "Professional, fully vetted cleaners tailored to your exacting standards."}
          </p>

          {/* Custom Art */}
          <div className="w-full h-48 sm:h-64 bg-neutral-100 dark:bg-neutral-900 rounded-[var(--radius-card)] border border-neutral-200 dark:border-neutral-800 flex items-center justify-center mb-8 overflow-hidden relative shadow-inner">
            <img src="/images/cleaning_hero_art_1786411388295.png" alt={MICROCOPY.images?.hero || "Professional Service"} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="flex flex-wrap gap-4 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Fully Insured</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Vetted Staff</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Eco-Friendly Options</div>
          </div>
        </div>

        {/* Right Side: Calculator Form */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 rounded-[var(--radius-card)] shadow-2xl relative">
          <h3 className="text-2xl font-bold mb-6 font-['var(--font-heading)']">Get Your Free Estimate</h3>
          
          <form onSubmit={handleQuickSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Property Size</label>
              <select 
                value={propertySize}
                onChange={(e) => setPropertySize(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-[var(--radius-button)] focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="studio">Studio / 1 Bedroom</option>
                <option value="2bed">2-3 Bedroom Home</option>
                <option value="4bed+">4+ Bedroom Estate</option>
                <option value="commercial">Commercial / Office</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Cleaning Type</label>
              <select 
                value={cleaningType}
                onChange={(e) => setCleaningType(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-[var(--radius-button)] focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="standard">Standard Cleaning</option>
                <option value="deep">Deep / Spring Cleaning</option>
                <option value="move">Move-In / Move-Out</option>
                <option value="post-construction">Post Construction</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">Frequency</label>
              <select 
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-[var(--radius-button)] focus:outline-none focus:border-primary-500 transition-colors"
              >
                <option value="one-time">One-Time Clean</option>
                <option value="monthly">Monthly</option>
                <option value="biweekly">Bi-Weekly (Most Popular)</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-black font-bold rounded-[var(--radius-button)] transition-all"
              >
                <span>Calculate Instant Price</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center text-xs text-neutral-500 mt-4 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> No credit card required. Secure and private.
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
