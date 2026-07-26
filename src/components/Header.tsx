import React, { useState } from 'react';
import { Truck, Phone, Menu, X, ArrowUpRight, Award, ShieldCheck, Tag, Gift, MapPin, Box } from 'lucide-react';
import { BRAND, GEO, LEGAL } from '../config';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCOIModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'quote', label: 'Estimate Tool', icon: Tag },
    { id: 'niches', label: 'Service Niches', icon: Truck },
    { id: 'routes', label: `${GEO.regionName} Routes`, icon: MapPin },
    { id: 'how-it-works', label: 'How It Works', icon: ShieldCheck },
    { id: 'supplies-storage', label: 'Supplies & Storage', icon: Box },
    { id: 'blog', label: `${GEO.regionName} Blog`, icon: Award },
    { id: 'referral', label: `Referral ($${BRAND.referralGetAmount})`, icon: Gift, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-sm text-neutral-900">
      {/* Top micro bar */}
      <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 border-b border-amber-500/30 py-1.5 px-4 text-xs font-semibold text-black">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
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
              className="min-h-[44px] text-black hover:text-neutral-800 underline underline-offset-2 flex items-center gap-1 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md px-1"
            >
              Request Free Condo COI <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <span className="opacity-50" aria-hidden="true">|</span>
            <a href={`tel:${BRAND.phoneRaw}`} className="min-h-[44px] flex items-center gap-1 text-black hover:text-neutral-800 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-md px-1">
              <Phone className="w-3.5 h-3.5 text-black" aria-hidden="true" />
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          type="button"
          onClick={() => setActiveTab('quote')}
          className="flex items-center gap-2.5 text-left group min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-xl p-1"
          aria-label={BRAND.headerAriaLabel}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform" aria-hidden="true">
            {BRAND.logoSymbol}
          </div>
          <div>
            <div className="font-extrabold text-lg sm:text-xl tracking-tight text-neutral-900 flex items-center gap-1.5 font-['Outfit']">
              {BRAND.nameUpper.split(' ')[0]} <span className="text-amber-500">{BRAND.nameUpper.split(' ').slice(1).join(' ')}</span>
            </div>
            <div className="text-[10px] tracking-widest text-neutral-500 uppercase font-bold">
              {GEO.regionFull} • 100% Insured
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1 bg-white p-1.5 rounded-xl border border-amber-200 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isActive
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/20 font-extrabold'
                    : item.highlight
                    ? 'text-amber-600 hover:bg-amber-50 font-bold'
                    : 'text-neutral-700 hover:text-black hover:bg-amber-50 font-semibold'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : item.highlight ? 'text-amber-600' : 'text-neutral-500'}`} aria-hidden="true" />
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
            className="group min-h-[44px] bg-black hover:bg-neutral-900 text-amber-400 px-4 py-2.5 rounded-full font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <span>Instant Quote</span>
            <div className="w-5 h-5 rounded-full bg-amber-400/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden min-h-[44px] min-w-[44px] p-2.5 rounded-lg bg-white border border-amber-200 shadow-sm text-neutral-900 hover:text-black flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-l border-amber-200 shadow-2xl px-4 py-4 space-y-2 animate-in slide-in-from-top-2">
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
                className={`w-full min-h-[44px] px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                  isActive
                    ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                    : 'text-neutral-700 hover:text-black hover:bg-amber-50'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-amber-600'}`} aria-hidden="true" />
                  <span>{item.label}</span>
                </div>
                <ArrowUpRight className="w-4 h-4 opacity-50" aria-hidden="true" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-amber-200 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onOpenCOIModal();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-amber-50 border border-amber-200 text-black text-xs font-bold text-center flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 hover:bg-amber-100"
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" aria-hidden="true" />
              Request Condo COI ({LEGAL.coiAmountShort} Guarantee)
            </button>
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-black text-amber-400 text-xs font-extrabold uppercase text-center flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 hover:bg-neutral-900 shadow-lg"
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

