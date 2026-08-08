import React, { useState } from 'react';
import { Truck, Shield, Calendar, Phone, ArrowUpRight, Check, Star } from 'lucide-react';
import { BRAND, GEO } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroCompactBanner: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [moveSize, setMoveSize] = useState('2bed');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote: QuoteRequest = {
      fromZip: GEO.neighborhoods[0]?.postal || 'M5V',
      fromAddress: GEO.defaultFromAddress,
      toZip: GEO.neighborhoods[1]?.postal || 'L5B',
      toAddress: GEO.defaultToAddress,
      moveDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      size: moveSize as any,
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Corporate Client',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 490, max: 790 });
  };

  return (
    <div id="hero-quote-calculator" className="bg-neutral-900 border-b border-neutral-800 text-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Executive Proclamation */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-primary-950 border border-primary-800/60 text-primary-300 text-xs font-bold tracking-wider uppercase">
              <Truck className="w-4 h-4 text-primary-400" />
              <span>{BRAND.rankingClaim || "Professional Certified Logistics"}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight leading-tight text-white font-['var(--font-heading)']">
              {BRAND.heroTagline || `${BRAND.name} Relocation Logistics.`}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 max-w-2xl font-['var(--font-body)'] leading-relaxed">
              {BRAND.heroSubtitle || "Executing seamless residential and commercial relocations across the territory with uncompromising care and punctuality."}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center text-sm text-neutral-400">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Vetted Professionals
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Fully Insured Fleet
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" /> Transparent Rates
              </span>
            </div>

            <div className="pt-6 border-t border-neutral-800/80 flex items-center gap-6">
              <div>
                <span className="text-xs text-neutral-500 uppercase font-semibold block">Need Immediate Dispatch?</span>
                <a href={`tel:${BRAND.phoneRaw || BRAND.phone}`} className="text-xl sm:text-2xl font-bold text-white hover:text-primary-400 transition-colors inline-flex items-center gap-2 mt-1">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span>{BRAND.phone}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Quick Rate Deck */}
          <div className="lg:col-span-5">
            <div className="bg-neutral-950 border border-neutral-800 p-6 sm:p-8 rounded-[var(--radius-card)] shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-800">
                <h3 className="text-xl font-bold text-white">Instant Rate Estimator</h3>
                <span className="px-2.5 py-1 bg-neutral-900 text-primary-400 text-xs font-extrabold rounded">FAST ESTIMATE</span>
              </div>

              <form onSubmit={handleAction} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Select Relocation Scope</label>
                  <select
                    value={moveSize}
                    onChange={(e) => setMoveSize(e.target.value)}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-[var(--radius-button)] text-white font-medium focus:outline-none focus:border-primary-500 transition-all"
                  >
                    <option value="studio">Studio Apartment Move</option>
                    <option value="1bed">1 Bedroom Condo Relocation</option>
                    <option value="2bed">2 Bedroom High-Rise / Townhouse</option>
                    <option value="3bed+">3+ Bedroom Residential House</option>
                    <option value="office">Commercial Office Logistics</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Origin Postal</label>
                    <input type="text" defaultValue="M5V" className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-[var(--radius-button)] text-white font-mono text-sm focus:outline-none focus:border-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-400 mb-1.5">Destination</label>
                    <input type="text" defaultValue="L5B" className="w-full px-3 py-2.5 bg-neutral-900 border border-neutral-800 rounded-[var(--radius-button)] text-white font-mono text-sm focus:outline-none focus:border-primary-500" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-primary-500 hover:bg-primary-600 text-black font-black uppercase text-sm tracking-wide rounded-[var(--radius-button)] flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <span>{MICROCOPY.buttons?.getQuote || "Calculate Estimate Now"}</span>
                    <ArrowUpRight className="w-5 h-5" />
                  </button>
                </div>
              </form>

              <p className="mt-4 text-center text-xs text-neutral-500">
                🔒 {MICROCOPY.reassurances?.protectionClaim || "Guaranteed privacy & encrypted fixed rate accuracy."}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
