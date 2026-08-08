import React, { useState } from 'react';
import { Phone, Menu, X, ShieldCheck, Mail, MapPin } from 'lucide-react';
import { BRAND, GEO, LEGAL, LAYOUT } from '../../config';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const HeaderSplit: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCOIModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const allLinks = [
    { id: 'hero_quote_calculator', label: 'Estimator', enabled: true },
    { id: 'service_niches', label: 'Services', enabled: LAYOUT.sectionsEnabled.service_niches },
    { id: 'gta_routes', label: 'Routes & Network', enabled: LAYOUT.sectionsEnabled.gta_routes },
    { id: 'how_it_works', label: 'Safety Protocol', enabled: LAYOUT.sectionsEnabled.how_it_works },
    { id: 'supplies_and_storage', label: 'Vault Storage', enabled: LAYOUT.sectionsEnabled.supplies_and_storage },
    { id: 'referral_program', label: `Refer Rewards`, enabled: LAYOUT.sectionsEnabled.referral_program },
  ].filter(item => item.enabled !== false);

  const midpoint = Math.ceil(allLinks.length / 2);
  const leftLinks = allLinks.slice(0, midpoint);
  const rightLinks = allLinks.slice(midpoint);

  return (
    <header className="bg-zinc-900/60 border-b border-zinc-800 shadow-sm relative z-50 text-white">
      {/* Corporate Editorial Contact Header Strip */}
      <div className="bg-neutral-900 text-neutral-300 py-2 px-4 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 font-mono">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-primary-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Licensed {LEGAL.wsibLabel}: #{LEGAL.wsibNumber}
            </span>
            <span className="hidden md:inline text-zinc-400">|</span>
            <span className="hidden sm:inline">Coverage: {LEGAL.coiAmountShort} Liability</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onOpenCOIModal} className="text-white underline font-sans hover:text-primary-400 transition-colors">
              Request Certificate of Insurance
            </button>
            <a href={`tel:${BRAND.phoneRaw || BRAND.phone}`} className="inline-flex items-center gap-1 font-bold text-white hover:text-primary-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-primary-400" />
              <span>{BRAND.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Symmetrical Dual-Wing Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-8">
        
        {/* Desktop Left Wing Navigation */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-end">
          {leftLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors py-1 ${
                activeTab === item.id ? 'text-white font-black border-b-2 border-primary-500' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Majestic Centered Brand Identity */}
        <button
          onClick={() => setActiveTab('quote')}
          className="text-center group focus:outline-none flex flex-col items-center shrink-0 mx-2"
        >
          {BRAND.logoUrl ? (
            <img src={BRAND.logoUrl} alt={BRAND.name} className="h-11 sm:h-14 w-auto max-w-[260px] object-contain mx-auto group-hover:opacity-95 transition-opacity" />
          ) : (
            <div className="text-2xl sm:text-3xl font-black tracking-tight uppercase font-['var(--font-heading)'] group-hover:text-primary-600 transition-colors">
              {BRAND.name}
            </div>
          )}
          <div className="text-[9px] tracking-[0.25em] text-neutral-500 font-extrabold uppercase mt-0.5">
            {GEO.regionName} • Executive Relocations
          </div>
        </button>

        {/* Desktop Right Wing Navigation & Quick Call CTA */}
        <div className="hidden lg:flex items-center gap-6 flex-1 justify-start">
          <nav className="flex items-center gap-6">
            {rightLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors py-1 ${
                  activeTab === item.id ? 'text-white font-black border-b-2 border-primary-500' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          
          <button
            onClick={() => setActiveTab('quote')}
            className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-md shadow transition-transform hover:scale-[1.02] shrink-0"
          >
            Calculate Rate
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white focus:outline-none"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900/60 border-t border-zinc-800 px-6 py-6 space-y-3">
          {allLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left py-2 px-4 rounded-lg text-sm font-bold uppercase ${
                activeTab === item.id ? 'bg-primary-50 text-white' : 'text-zinc-300 hover:bg-zinc-900/40'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2">
            <a
              href={`tel:${BRAND.phoneRaw || BRAND.phone}`}
              className="w-full py-3 bg-neutral-950 text-white font-bold text-xs uppercase text-center rounded-lg shadow"
            >
              Call Dispatch: {BRAND.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
