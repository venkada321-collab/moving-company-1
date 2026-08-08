import React, { useState } from 'react';
import { Truck, Phone, Menu, X, ArrowUpRight, Award, ShieldCheck, Tag, Gift, MapPin, Box } from 'lucide-react';
import { BRAND, GEO, LEGAL, LAYOUT } from '../../config';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const HeaderStandard: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCOIModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'quote', label: 'Home & Estimate', icon: Tag, enabled: true },
    { id: 'niches', label: 'Service Niches', icon: Truck, enabled: LAYOUT.sectionsEnabled.service_niches },
    { id: 'routes', label: `${GEO.regionName} Routes`, icon: MapPin, enabled: LAYOUT.sectionsEnabled.gta_routes },
    { id: 'how-it-works', label: 'How It Works', icon: ShieldCheck, enabled: LAYOUT.sectionsEnabled.how_it_works },
    { id: 'supplies-storage', label: 'Supplies & Storage', icon: Box, enabled: LAYOUT.sectionsEnabled.supplies_and_storage },
    { id: 'blog', label: `${GEO.regionName} Blog`, icon: Award, enabled: LAYOUT.sectionsEnabled.blog_page },
    { id: 'referral', label: `Referral (${BRAND.referralGetAmount})`, icon: Gift, highlight: true, enabled: LAYOUT.sectionsEnabled.referral_program },
  ].filter(item => item.enabled !== false);

  return (
    <header className="sticky top-0 bg-zinc-900/60/95 backdrop-blur-md border-b border-zinc-800 shadow-sm text-white z-50 transition-all">
      {/* Top micro bar */}
      <div className="bg-primary-400 border-b border-primary-500/30 py-1.5 px-4 text-xs font-semibold text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-neutral-950 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-950"></span>
              </span>
              Dispatch Active in {GEO.regionName}
            </span>
            <span className="hidden md:inline opacity-70" aria-hidden="true">•</span>
            <span className="hidden md:inline font-bold">
              Guaranteed {LEGAL.coiAmountShort} Condo Certificate of Insurance (COI) within {LEGAL.coiDeliverySLAShort}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button 
              type="button"
              onClick={onOpenCOIModal}
              className="min-h-[44px] text-white hover:text-zinc-200 underline underline-offset-2 flex items-center gap-1 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1"
            >
              Request Free Condo COI <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <span className="opacity-50" aria-hidden="true">|</span>
            <a href={`tel:${BRAND.phoneRaw}`} className="min-h-[44px] flex items-center gap-1 text-white hover:text-zinc-200 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-md px-1">
              <Phone className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button 
          type="button"
          onClick={() => setActiveTab('quote')}
          className="flex items-center gap-2.5 text-left group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-xl p-1"
          aria-label={BRAND.headerAriaLabel}
        >
          {BRAND.logoUrl ? (
            <img src={BRAND.logoUrl} alt={BRAND.name} className="h-10 sm:h-12 w-auto max-w-[240px] object-contain group-hover:opacity-95 transition-opacity" />
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-primary-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform" aria-hidden="true">
                {BRAND.logoSymbol}
              </div>
              <div>
                <div className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5 font-['var(--font-heading)']">
                  {BRAND.nameUpper.split(' ')[0]} <span className="text-primary-600">{BRAND.nameUpper.split(' ').slice(1).join(' ')}</span>
                </div>
                <div className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">
                  {GEO.regionFull} • 100% Insured
                </div>
              </div>
            </>
          )}
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 text-zinc-300 p-1.5 rounded-xl shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isActive
                    ? 'bg-primary-400 text-white shadow-md shadow-primary-500/20 font-extrabold'
                    : item.highlight
                    ? 'text-primary-600 hover:bg-primary-50 font-bold'
                    : 'text-zinc-300 hover:text-black hover:bg-zinc-800 font-semibold'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-primary-600' : 'text-neutral-500'}`} aria-hidden="true" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Header Action CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setActiveTab('quote');
              const el = document.getElementById('hero-quote-calculator');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group min-h-[44px] bg-neutral-950 hover:bg-neutral-800 text-primary-400 px-4 py-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            <span>Instant Quote</span>
            <div className="w-5 h-5 rounded-full bg-primary-400/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
              <ArrowUpRight className="w-3.5 h-3.5 text-primary-400" />
            </div>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 shadow-sm text-white hover:text-black flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900/60 border-b border-l border-zinc-800 shadow-2xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2 text-white">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full min-h-[44px] px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isActive
                    ? 'bg-primary-400 text-white font-extrabold shadow-sm'
                    : 'text-zinc-300 hover:text-black hover:bg-zinc-800'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-primary-600'}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-50" aria-hidden="true" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenCOIModal();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-primary-50 border border-zinc-800 text-white text-xs font-bold text-center flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 hover:bg-primary-100"
            >
              <ShieldCheck className="w-4 h-4 text-primary-600" aria-hidden="true" />
              Request Condo COI ({LEGAL.coiAmountShort} Guarantee)
            </button>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-neutral-950 text-primary-400 text-xs font-extrabold uppercase text-center flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 hover:bg-neutral-900 shadow-lg"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              Call Dispatch: {BRAND.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
