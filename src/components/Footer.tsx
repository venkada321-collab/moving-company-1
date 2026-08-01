import React, { useState } from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Check } from 'lucide-react';
import { BRAND, GEO, LEGAL, PRICING } from '../config';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onOpenCOIModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="relative overflow-hidden text-xs">
      <div className="bg-gradient-to-b from-slate-50 via-amber-50/30 to-white border-t border-amber-200/80 text-neutral-900 py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          {/* Top Newsletter & Quote Ribbon */}
          <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black rounded-3xl shadow-xl p-8 sm:p-12 border border-amber-500/30 mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-2">
              <span className="text-[10px] font-extrabold text-black uppercase tracking-widest bg-black/10 px-3 py-1 rounded-full">
                {GEO.regionName} MOVING NEWSLETTER
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black font-['Montserrat',sans-serif]">
                Subscribe for Moving Checklists & {PRICING.newsletterPromoLabel}
              </h3>
              <p className="text-xs text-neutral-900 font-medium">
                Get monthly high-rise elevator booking hacks and packing checklists straight to your inbox.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <label htmlFor="newsletter-email" className="sr-only">
                  Subscribe to Newsletter
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-white text-neutral-900 border border-neutral-300 focus:border-black rounded-xl p-3.5 placeholder:text-neutral-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 min-h-[44px]"
                />
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-amber-400 font-black rounded-xl px-6 py-3.5 shadow-lg text-xs uppercase shrink-0 transition-all motion-reduce:transition-none min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-amber-300 flex items-center justify-center gap-1.5"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4" aria-hidden="true" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    'Subscribe Free'
                  )}
                </button>
              </form>
            </div>

          </div>

          {/* Directory Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-6">
            
            {/* Brand Col */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-black font-black text-lg flex items-center justify-center" aria-hidden="true">
                  {BRAND.logoSymbol}
                </div>
                <div className="font-extrabold text-lg text-black font-['Montserrat',sans-serif]">
                  {BRAND.nameUpper.split(' ')[0]} <span className="text-amber-600">{BRAND.nameUpper.split(' ')[1]}</span>
                </div>
              </div>

              <p className="text-neutral-600 font-medium text-xs leading-relaxed max-w-sm">
                {GEO.regionFull}’s top-rated moving and white-glove relocation agency. Fully licensed, bonded {LEGAL.coiAmountShort} liability insurance, and WSIB certified.
              </p>

              <div className="space-y-2 pt-1 font-semibold text-neutral-700">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                  <a href={`tel:${BRAND.phoneRaw}`} className="hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center transition-colors motion-reduce:transition-none">{BRAND.phone}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center transition-colors motion-reduce:transition-none">{BRAND.email}</a>
                </div>
                <div className="flex items-center gap-2 text-neutral-600 font-medium text-[11px]">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" aria-hidden="true" />
                  <span>Headquarters: {BRAND.hqAddress}</span>
                </div>
              </div>
            </div>

            {/* Service Niches links */}
            <div className="space-y-3">
              <h4 className="text-black font-extrabold tracking-wider mb-4 text-xs uppercase font-['Montserrat',sans-serif]">
                Service Niches
              </h4>
              <ul className="space-y-2 text-neutral-600 font-medium">
                <li>
                  <button type="button" onClick={() => onNavigateTab('niches')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    Condo & High-Rise Moves
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('niches')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    Piano & Fine Instruments
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('niches')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    Long-Distance Corridor
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('niches')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    Full White-Glove Packing
                  </button>
                </li>
                <li>
                  <button type="button" onClick={onOpenCOIModal} className="text-emerald-600 font-bold hover:underline inline-flex items-center gap-1 min-h-[44px] py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" /> Request {LEGAL.coiAmountShort} COI
                  </button>
                </li>
              </ul>
            </div>

            {/* GTA Route Directories */}
            <div className="space-y-3">
              <h4 className="text-black font-extrabold tracking-wider mb-4 text-xs uppercase font-['Montserrat',sans-serif]">
                Top {GEO.regionName} Routes
              </h4>
              <ul className="space-y-2 text-neutral-600 font-medium">
                {GEO.footerRoutes.map((route, idx) => (
                  <li key={idx}>
                    <button type="button" onClick={() => onNavigateTab('routes')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                      {route.from} ➔ {route.to}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Resources */}
            <div className="space-y-3">
              <h4 className="text-black font-extrabold tracking-wider mb-4 text-xs uppercase font-['Montserrat',sans-serif]">
                Resources & Program
              </h4>
              <ul className="space-y-2 text-neutral-600 font-medium">
                <li>
                  <button type="button" onClick={() => onNavigateTab('how-it-works')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    How It Works
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('supplies-storage')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    Packing Supplies Catalog
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('supplies-storage')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    Climate Storage Vaults
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('blog')} className="hover:text-amber-600 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded min-h-[44px] inline-flex items-center py-2">
                    GTA Moving Guides & Blog
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigateTab('referral')} className="text-amber-600 font-bold hover:underline min-h-[44px] inline-flex items-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded">
                    Referral Club (${BRAND.referralGetAmount} Give/Get)
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="bg-black text-slate-400 border-t border-neutral-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 <span className="text-amber-400 font-bold">{BRAND.legalName}</span> All rights reserved. Registered under {LEGAL.registrationBody}.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">{`${LEGAL.wsibLabel} ${LEGAL.wsibNumber}`}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

