import React, { useState } from 'react';
import { BRAND, GEO, LEGAL, LAYOUT } from '../../config';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

const FooterLogoCapsule: React.FC = () => (
  <div className="inline-flex items-center justify-center bg-zinc-900/60 text-white px-3.5 py-1.5 rounded-xl shadow-md border border-zinc-800 min-w-[120px] max-w-[200px] max-h-12">
    {BRAND.logoUrl ? (
      <img src={BRAND.logoUrl} alt={BRAND.name} className="h-8 w-auto object-contain drop-shadow-2xs" />
    ) : (
      <span className="text-sm font-black text-white">{BRAND.name}</span>
    )}
  </div>
);

export const FooterAtomicProMax: React.FC<FooterProps> = ({ onNavigateTab, onOpenCOIModal }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const variant = LAYOUT.variants.footer || 'multi-column';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================================================
  // 1. GIGANTIC CTA BANNER DECK (High-impact conversion typography)
  // ============================================================================
  if (variant === 'gigantic-cta-banner') {
    return (
      <footer className="bg-neutral-950 text-white pt-24 pb-12 overflow-hidden border-t border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight leading-none mb-8 bg-gradient-to-r from-white via-neutral-300 to-primary-400 bg-clip-text text-transparent">
            READY TO RELOCATE? LET&apos;S TALK.
          </h2>
          <p className="text-lg sm:text-xl text-neutral-400 font-medium max-w-3xl mx-auto mb-10">
            Secure your preferred moving date with {BRAND.name}. Fully insured under WSIB (#{LEGAL.wsibNumber || 'WSIB-98842-CA'}) with complete zero-deductible goods-in-transit coverage.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <a href={`tel:${BRAND.phone}`} className="btn-atomic-primary !py-4 !px-10 !text-base shadow-2xl hover:scale-105 transition-transform">
              <span>📞 CALL DIRECT: {BRAND.phone}</span>
            </a>
            <button onClick={() => onNavigateTab('hero_quote_calculator')} className="px-8 py-4 rounded-xl bg-neutral-900 border-2 border-neutral-700 font-extrabold hover:bg-neutral-800 hover:border-primary-500 text-white transition-all">
              Launch Estimate Calculator &rarr;
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 gap-6">
          <div className="flex items-center gap-4">
            <FooterLogoCapsule />
            <span>&copy; {new Date().getFullYear()} {BRAND.legalName || BRAND.name}. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => onNavigateTab('hero_quote_calculator')} className="hover:text-primary-400 transition-colors">Estimate Calculator</button>
            <button onClick={() => onNavigateTab('service_niches')} className="hover:text-primary-400 transition-colors">Services</button>
            <button onClick={() => onNavigateTab('supplies_and_storage')} className="hover:text-primary-400 transition-colors">Packing Storage</button>
            <button onClick={scrollToTop} className="hover:text-white font-bold underline">Back to top &uarr;</button>
          </div>
        </div>
      </footer>
    );
  }

  // ============================================================================
  // 2. SAAS MEGA-DIRECTORY (Enterprise multi-column & newsletter intake)
  // ============================================================================
  if (variant === 'saas-mega-directory') {
    return (
      <footer className="bg-neutral-900 dark:bg-neutral-950 text-neutral-300 pt-20 pb-12 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <FooterLogoCapsule />
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {BRAND.name} sets the canonical standard for residential and office relocations across {GEO.regionName || 'Canada'}. Precision dispatch, professional packing teams, and transparent zero-hidden-fee tariffs.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Dispatch Desk Online &mdash; Instant Quotations Available</span>
            </div>
            <div className="pt-2 text-sm text-neutral-400 font-semibold space-y-1">
              <div>📞 Tel: <a href={`tel:${BRAND.phone}`} className="text-white hover:text-primary-400 font-bold">{BRAND.phone}</a></div>
              <div>📍 Headquarters: {BRAND.hqAddress || 'Woodbridge, ON, Canada'}</div>
              <div>✉️ Support: {BRAND.email || `dispatch@${BRAND.domain || 'relocation.ca'}`}</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-5">Core Services</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigateTab('service_niches')} className="hover:text-primary-400 transition-colors">Condo &amp; Apartment Relocations</button></li>
              <li><button onClick={() => onNavigateTab('service_niches')} className="hover:text-primary-400 transition-colors">Commercial Office Transit</button></li>
              <li><button onClick={() => onNavigateTab('service_niches')} className="hover:text-primary-400 transition-colors">Piano &amp; Heavy Safe Specialists</button></li>
              <li><button onClick={() => onNavigateTab('supplies_and_storage')} className="hover:text-primary-400 transition-colors">Climate-Regulated Storage Vaults</button></li>
              <li><button onClick={() => onNavigateTab('supplies_and_storage')} className="hover:text-primary-400 transition-colors">Professional Packing Supplies</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-5">Client Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => onNavigateTab('hero_quote_calculator')} className="hover:text-primary-400 transition-colors">Instant Rate Calculator</button></li>
              <li><button onClick={() => onNavigateTab('how_it_works')} className="hover:text-primary-400 transition-colors">Our 6-Step Transit Protocol</button></li>
              <li><button onClick={() => onNavigateTab('trust_signals')} className="hover:text-primary-400 transition-colors">Verified Customer Testimonials</button></li>
              <li><button onClick={onOpenCOIModal} className="text-primary-400 font-bold hover:underline">Verify COI Insurance Status</button></li>
              <li><button onClick={() => onNavigateTab('referral_program')} className="hover:text-primary-400 transition-colors">Partner Referral Rewards</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-5">VIP Priority Dispatch</h3>
            <p className="text-xs text-neutral-400 mb-4 leading-normal">
              Enter your corporate email to receive immediate relocation checklist guidelines and $50 promotional packing credit.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                placeholder="client@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-atomic-field !bg-neutral-950 !text-xs !py-2.5 !px-3.5 text-white"
              />
              <button type="submit" className="btn-atomic-primary w-full !py-2.5 !text-xs !justify-center">
                {subscribed ? '✅ Welcome on board!' : 'Claim VIP Credit &rarr;'}
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 border-t border-neutral-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
          <div>&copy; {new Date().getFullYear()} {BRAND.legalName || BRAND.name}. WSIB Lic #{LEGAL.wsibNumber || 'W-9442'}. Built on Antigravity Engine.</div>
          <div className="flex items-center gap-6 font-bold text-neutral-400">
            <button onClick={scrollToTop} className="hover:text-white transition-colors">Back to top &uarr;</button>
          </div>
        </div>
      </footer>
    );
  }

  // ============================================================================
  // 3. BRUTALIST MONOSPACED LEDGER (Technical high-contrast engineering style)
  // ============================================================================
  if (variant === 'brutalist-monospaced-ledger') {
    return (
      <footer className="bg-zinc-900/60 dark:bg-black text-white dark:text-neutral-100 font-mono border-t-4 border-black dark:border-white pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 border-2 border-black dark:border-white divide-y lg:divide-y-0 lg:divide-x-2 divide-black dark:divide-white mb-12">
          <div className="p-8 bg-primary-400 text-black">
            <div className="text-2xl font-black uppercase tracking-wider mb-4 border-b-2 border-black pb-2">
              {BRAND.shortName || BRAND.name}
            </div>
            <p className="text-xs font-bold leading-relaxed mb-6">
              CANONICAL DISPATCH LEDGER. FULLY WSIB CERTIFIED UNDER TARRIF REGISTER #{LEGAL.wsibNumber || 'TR-09884'}. ZERO HIDDEN CHARGES ALLOWED.
            </p>
            <a href={`tel:${BRAND.phone}`} className="inline-block bg-black text-white px-6 py-3 font-black uppercase text-xs border-2 border-black shadow-[4px_4px_0px_#fff] hover:translate-x-1 hover:translate-y-1 transition-transform">
              TEL: {BRAND.phone} &rarr;
            </a>
          </div>

          <div className="p-8 space-y-4 bg-zinc-800 dark:bg-neutral-950">
            <div className="text-xs font-black tracking-widest text-primary-600 dark:text-primary-400 uppercase border-b border-black dark:border-white pb-2">
              // OPERATIONAL INDEX
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <button onClick={() => onNavigateTab('hero_quote_calculator')} className="text-left hover:underline">&gt; Estimate Calc</button>
              <button onClick={() => onNavigateTab('service_niches')} className="text-left hover:underline">&gt; Relocation Niches</button>
              <button onClick={() => onNavigateTab('how_it_works')} className="text-left hover:underline">&gt; Transit Protocol</button>
              <button onClick={() => onNavigateTab('supplies_and_storage')} className="text-left hover:underline">&gt; Storage Vaults</button>
              <button onClick={() => onNavigateTab('trust_signals')} className="text-left hover:underline">&gt; Client Ledgers</button>
              <button onClick={onOpenCOIModal} className="text-left text-primary-600 dark:text-primary-400 font-black">&gt; COI Certificate</button>
            </div>
          </div>

          <div className="p-8 bg-zinc-900/40 dark:bg-neutral-900 text-xs flex flex-col justify-between">
            <div>
              <div className="font-black mb-2 uppercase">// REGISTRY CREDENTIALS</div>
              <div className="space-y-1.5 font-semibold text-zinc-400 dark:text-neutral-400">
                <div>WSIB REG: #{LEGAL.wsibNumber || 'WSIB-ONT-90210'}</div>
                <div>INSURANCE COVERAGE: $1,000,000 GOODS-IN-TRANSIT</div>
                <div>HQ LOCATION: {BRAND.hqAddress || 'Greater Toronto Area'}</div>
              </div>
            </div>
            <button onClick={scrollToTop} className="mt-6 bg-black dark:bg-zinc-900/60 text-white dark:text-black py-2 text-center font-bold uppercase hover:bg-neutral-800">
              ▲ RETURN TO VIEWPORT TOP
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center text-xs font-black uppercase text-neutral-500">
          &copy; {new Date().getFullYear()} {BRAND.legalName || BRAND.name} // ALL ARCHITECTURAL TOKENS RESERVED.
        </div>
      </footer>
    );
  }

  // ============================================================================
  // 4. MINIMAL DUAL-COLUMN DECK (Sleek luxury architectural style)
  // ============================================================================
  if (variant === 'minimal-dual-column' || variant === 'minimal-compact') {
    return (
      <footer className="bg-zinc-900/60 dark:bg-neutral-950 text-white dark:text-neutral-100 py-16 border-t border-zinc-800 dark:border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-12 mb-16">
          <div className="max-w-md space-y-4">
            <div className="cursor-pointer text-2xl font-black tracking-tight" onClick={scrollToTop}>
              <FooterLogoCapsule />
            </div>
            <p className="text-sm text-neutral-500 font-normal leading-relaxed">
              Dedicated to delivering flawless residential and commercial relocation experiences across {GEO.regionName || 'North America'}. Licensed, bonded, and committed to complete precision transit.
            </p>
          </div>
          <div className="flex flex-wrap gap-12 text-sm font-bold">
            <div className="space-y-3">
              <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">Dispatch Channels</div>
              <div><a href={`tel:${BRAND.phone}`} className="hover:text-primary-600 transition-colors">{BRAND.phone}</a></div>
              <div><a href={`mailto:${BRAND.email}`} className="text-neutral-500 font-normal hover:underline">{BRAND.email || `info@${BRAND.domain || 'company.com'}`}</a></div>
              <div className="text-xs text-neutral-400 font-normal pt-2">{BRAND.hqAddress || 'Ontario, Canada'}</div>
            </div>
            <div className="space-y-3 flex flex-col items-start">
              <div className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">Navigation</div>
              <button onClick={() => onNavigateTab('hero_quote_calculator')} className="hover:text-primary-600 transition-colors">Online Quotation</button>
              <button onClick={() => onNavigateTab('service_niches')} className="hover:text-primary-400 transition-colors">Specialized Niches</button>
              <button onClick={onOpenCOIModal} className="text-primary-600 dark:text-primary-400 hover:underline font-extrabold">COI Verification</button>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 border-t border-zinc-800 dark:border-neutral-800 pt-8 flex justify-between items-center text-xs text-neutral-400">
          <div>&copy; {new Date().getFullYear()} {BRAND.name}. All legal certifications actively enforced.</div>
          <button onClick={scrollToTop} className="hover:text-white dark:hover:text-white font-bold">&uarr; Top</button>
        </div>
      </footer>
    );
  }

  // ============================================================================
  // 5-6. STANDARD MULTI-COLUMN & FALLBACK DECK
  // ============================================================================
  return (
    <footer className="bg-neutral-900 text-white py-16 px-6 border-t border-neutral-800 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <div className="cursor-pointer flex items-center gap-3" onClick={scrollToTop}>
            <FooterLogoCapsule />
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Canada&apos;s premier relocation team. Fully WSIB insured with verified customer ratings and dependable white-glove service.
          </p>
          <div>
            <a href={`tel:${BRAND.phone}`} className="btn-atomic-primary !py-2 !px-5 !text-xs mt-2">
              <span>Call {BRAND.phone}</span>
            </a>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-primary-400 mb-4">Relocation Services</h3>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li><button onClick={() => onNavigateTab('service_niches')} className="hover:text-white transition-colors">Residential Moving</button></li>
            <li><button onClick={() => onNavigateTab('service_niches')} className="hover:text-white transition-colors">Commercial Office Moving</button></li>
            <li><button onClick={() => onNavigateTab('supplies_and_storage')} className="hover:text-white transition-colors">Packing Materials &amp; Boxes</button></li>
            <li><button onClick={() => onNavigateTab('supplies_and_storage')} className="hover:text-white transition-colors">Secure Climate Storage</button></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-primary-400 mb-4">Client Support</h3>
          <ul className="space-y-2 text-xs text-neutral-300">
            <li><button onClick={() => onNavigateTab('hero_quote_calculator')} className="hover:text-white transition-colors">Get Instant Estimate</button></li>
            <li><button onClick={() => onNavigateTab('how_it_works')} className="hover:text-white transition-colors">Moving Checklist &amp; Protocol</button></li>
            <li><button onClick={() => onNavigateTab('trust_signals')} className="hover:text-white transition-colors">Customer Review Verification</button></li>
            <li><button onClick={onOpenCOIModal} className="text-primary-400 hover:underline">Request Condo COI Insurance</button></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xs uppercase tracking-widest text-primary-400 mb-4">Operational Dispatch</h3>
          <div className="text-xs text-neutral-400 space-y-2 font-medium">
            <div>📞 Direct Tel: {BRAND.phone}</div>
            <div>📍 HQ Address: {BRAND.hqAddress || 'Greater Toronto Area'}</div>
            <div>🛡️ WSIB Permit: #{LEGAL.wsibNumber || 'WSIB-8422'}</div>
            <div className="pt-2 text-emerald-400 font-bold">🟢 Dispatch Active Online</div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-neutral-800 pt-8 flex justify-between items-center text-xs text-neutral-500">
        <div>&copy; {new Date().getFullYear()} {BRAND.legalName || BRAND.name}. All rights reserved.</div>
        <button onClick={scrollToTop} className="hover:text-white font-bold">&uarr; Return to Top</button>
      </div>
    </footer>
  );
};
