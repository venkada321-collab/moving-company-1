import React, { useState } from 'react';
import { ArrowRight, Box, Map } from 'lucide-react';
import { BRAND } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroBrutalistLedger: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [fromZip, setFromZip] = useState('');
  const [toZip, setToZip] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyQuote: QuoteRequest = {
      fromZip: fromZip || 'L5B',
      fromAddress: fromZip || 'L5B',
      toZip: toZip || 'M5V',
      toAddress: toZip || 'M5V',
      moveDate: new Date().toISOString().split('T')[0],
      size: '3bed+',
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Logistics Client',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 1200, max: 2100 });
  };

  return (
    <div id="hero-quote-calculator" className="bg-white text-black border-b-8 border-black font-['var(--font-body)'] min-h-[80vh] flex flex-col justify-center py-16">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* Brutalist Header Block */}
        <div className="border-4 border-black p-6 md:p-12 mb-8 bg-primary-400 shadow-[8px_8px_0_0_#000]">
          <div className="inline-block bg-white dark:bg-black text-neutral-900 dark:text-white font-mono uppercase px-3 py-1 text-xs font-bold mb-6">
            FRT-LOGISTICS-LEDGER // {new Date().getFullYear()}
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {BRAND.heroTagline || "HEAVY FREIGHT & RELO."}
          </h1>
          <p className="text-xl md:text-2xl font-bold max-w-3xl">
            {BRAND.heroSubtitle || "Raw, unfiltered shipping and relocation. We move the heavy things so you don't have to."}
          </p>
        </div>

        {/* Ledger Form Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 border-4 border-black p-8 bg-white shadow-[8px_8px_0_0_#000]">
            <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black pb-4">Tariff Request</h2>
            <form onSubmit={handleQuickSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-mono font-bold uppercase flex items-center gap-2">
                    <Map className="w-5 h-5" /> ORIGIN ZONE
                  </label>
                  <input 
                    type="text" 
                    value={fromZip}
                    onChange={(e) => setFromZip(e.target.value)}
                    className="w-full bg-zinc-100 border-2 border-black p-4 font-mono focus:outline-none focus:bg-primary-100 uppercase"
                    placeholder="ZIP/POSTAL"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-mono font-bold uppercase flex items-center gap-2">
                    <Map className="w-5 h-5" /> DESTINATION ZONE
                  </label>
                  <input 
                    type="text" 
                    value={toZip}
                    onChange={(e) => setToZip(e.target.value)}
                    className="w-full bg-zinc-100 border-2 border-black p-4 font-mono focus:outline-none focus:bg-primary-100 uppercase"
                    placeholder="ZIP/POSTAL"
                  />
                </div>
              </div>

              <div className="pt-6 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-sm font-mono font-bold">
                  {BRAND.rankingClaim}
                </div>
                <button 
                  type="submit" 
                  className="w-full md:w-auto bg-white dark:bg-black text-neutral-900 dark:text-white hover:bg-primary-500 hover:text-black border-4 border-black font-black uppercase px-8 py-4 text-xl flex items-center justify-center gap-3 transition-colors"
                >
                  {MICROCOPY.buttons?.getQuote || "DISPATCH ESTIMATE"}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-8">
            <div className="border-4 border-black p-6 bg-zinc-100 shadow-[8px_8px_0_0_#000] flex-1">
              <div className="font-mono font-bold border-b-4 border-black pb-2 mb-4">SYSTEM STATUS</div>
              <ul className="space-y-4 font-mono text-sm font-bold uppercase">
                <li className="flex justify-between border-b-2 border-zinc-300 pb-2">
                  <span>DISPATCH:</span> <span className="text-emerald-600">ONLINE</span>
                </li>
                <li className="flex justify-between border-b-2 border-zinc-300 pb-2">
                  <span>FLEET STATUS:</span> <span>DEPLOYED</span>
                </li>
                <li className="flex justify-between border-b-2 border-zinc-300 pb-2">
                  <span>WSIB COMPLIANT:</span> <span>YES</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span>INSURANCE:</span> <span>ACTIVE ($2M)</span>
                </li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
