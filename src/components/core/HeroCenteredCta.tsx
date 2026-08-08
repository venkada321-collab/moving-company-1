import React, { useState } from 'react';
import { Shield, Star, Award, MapPin, Calendar, Phone, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { BRAND, GEO, PRICING } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroCenteredCta: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [fromLocation, setFromLocation] = useState('Toronto / GTA');
  const [toLocation, setToLocation] = useState('Destination City');
  const [selectedSize, setSelectedSize] = useState('2bed');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote: QuoteRequest = {
      fromZip: fromLocation,
      fromAddress: fromLocation,
      toZip: toLocation,
      toAddress: toLocation,
      moveDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      size: selectedSize as any,
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Valued Client',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 450, max: 750 });
  };

  return (
    <div id="hero-quote-calculator" className="relative bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-hidden pt-32 lg:pt-40 pb-24">
      {/* Decorative ambient gradient backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/40 via-neutral-950 to-neutral-950 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Trust Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs sm:text-sm font-medium mb-8 shadow-lg">
          <Sparkles className="w-4 h-4 text-primary-400" />
          <span>{BRAND.rankingClaim}</span>
        </div>

        {/* Massive Centered Typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6 font-['var(--font-heading)']">
          {BRAND.heroTagline || BRAND.name}
        </h1>
        
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-neutral-300 mb-12 font-['var(--font-body)'] leading-relaxed">
          {BRAND.heroSubtitle || "Professional, fully licensed, and stress-free relocation solutions tailored to your exacting standards."}
        </p>

        {/* Centralized Quick Consultation Desk Card */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900/90 border border-neutral-800 p-6 sm:p-8 rounded-[var(--radius-card)] backdrop-blur-xl shadow-2xl mb-16">
          <form onSubmit={handleQuickSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="text-left">
              <label className="block text-xs uppercase font-semibold text-neutral-400 mb-2">From Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-primary-400" />
                <input 
                  type="text" 
                  value={fromLocation}
                  onChange={(e) => setFromLocation(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-950 border border-neutral-800 rounded-[var(--radius-button)] text-neutral-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs uppercase font-semibold text-neutral-400 mb-2">To Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-5 h-5 text-neutral-900 dark:text-neutral-500" />
                <input 
                  type="text" 
                  value={toLocation}
                  onChange={(e) => setToLocation(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-neutral-950 border border-neutral-800 rounded-[var(--radius-button)] text-neutral-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            <div className="text-left">
              <label className="block text-xs uppercase font-semibold text-neutral-400 mb-2">Move Size</label>
              <select 
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full px-4 py-3 bg-white dark:bg-neutral-950 border border-neutral-800 rounded-[var(--radius-button)] text-neutral-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors h-[50px]"
              >
                <option value="studio">Studio Apartment</option>
                <option value="1bed">1 Bedroom Condo</option>
                <option value="2bed">2 Bedroom Home / High-Rise</option>
                <option value="3bed+">3-4 Bedroom House</option>
                <option value="estate">Executive Estate / Office</option>
              </select>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800/80">
            <div className="flex items-center gap-2 text-sm text-neutral-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>{MICROCOPY.reassurances?.priceGuarantee || "Transparent flat-rate billing. No hidden fees."}</span>
            </div>
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a 
                href={`tel:${BRAND.phoneRaw || BRAND.phone}`} 
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-[var(--radius-button)] transition-all duration-[var(--anim-speed)]"
              >
                <Phone className="w-4 h-4 text-primary-400" />
                <span>Call {BRAND.phone}</span>
              </a>
              <button 
                type="submit" 
                onClick={handleQuickSubmit}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-black font-extrabold rounded-[var(--radius-button)] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-[var(--anim-speed)]"
              >
                <span>{MICROCOPY.buttons?.getQuote || "Request Instant Quote"}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full Width Assurance Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-neutral-900 text-left text-neutral-400">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-primary-400 shrink-0" />
            <div>
              <h4 className="text-neutral-900 dark:text-white font-semibold text-sm">Licensed & Insured</h4>
              <p className="text-xs text-neutral-900 dark:text-neutral-500">Full cargo liability coverage</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Star className="w-6 h-6 text-primary-400 fill-primary-400 shrink-0" />
            <div>
              <h4 className="text-neutral-900 dark:text-white font-semibold text-sm">Top Rated Fleet</h4>
              <p className="text-xs text-neutral-900 dark:text-neutral-500">Verified 5-star customer reviews</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Award className="w-6 h-6 text-primary-400 shrink-0" />
            <div>
              <h4 className="text-neutral-900 dark:text-white font-semibold text-sm">Vetted Crews</h4>
              <p className="text-xs text-neutral-900 dark:text-neutral-500">Trained professional movers</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <h4 className="text-neutral-900 dark:text-white font-semibold text-sm">Zero Surprise Tolls</h4>
              <p className="text-xs text-neutral-900 dark:text-neutral-500">Guaranteed fixed price estimates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
