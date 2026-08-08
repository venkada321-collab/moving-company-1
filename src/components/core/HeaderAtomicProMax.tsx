import React, { useState, useEffect } from 'react';
import { LAYOUT, BRAND, THEME } from '../../config';
import { Phone, Menu, X, Shield, Sparkles, MapPin } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

const LogoCapsule: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`flex items-center gap-3 bg-neutral-900 text-white px-4 py-2 rounded-2xl shadow-lg border border-neutral-700 hover:border-primary-400 transition-all cursor-pointer ${compact ? 'py-1.5 px-3' : ''}`}>
      <div className="w-8 h-8 rounded-xl bg-primary-500 text-white flex items-center justify-center font-black font-mono text-base shrink-0 shadow-inner overflow-hidden">
        {BRAND.logoUrl && !imgError ? (
          <img 
            src={BRAND.logoUrl} 
            alt={BRAND.name} 
            onError={() => setImgError(true)}
            className="w-full h-full object-contain rounded-xl bg-zinc-900/60 p-0.5" 
          />
        ) : (
          <span>{BRAND.logoSymbol || BRAND.name?.[0] || '★'}</span>
        )}
      </div>
      <span className={`font-black tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px] sm:max-w-[220px] ${compact ? 'text-sm' : 'text-base'}`}>
        {BRAND.shortName || BRAND.name}
      </span>
    </div>
  );
};

export const HeaderAtomicProMax: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCOIModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const variant = LAYOUT.variants.nav || 'sticky-standard';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero_quote_calculator', label: 'Home' },
    { id: 'service_niches', label: 'Services' },
    { id: 'how_it_works', label: 'Our Process' },
    { id: 'supplies_and_storage', label: 'Storage & Boxes' },
    { id: 'trust_signals', label: 'Reviews' },
    { id: 'blog', label: 'Resources' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  // ============================================================================
  // 1. FLOATING GLASSMORPHIC PILL (SaaS & Ultra-Modern)
  // ============================================================================
  if (variant === 'floating-pill-glass') {
    return (
      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 flex justify-center pointer-events-none">
        <div className="pointer-events-auto w-full max-w-6xl rounded-full bg-neutral-900/95 dark:bg-neutral-950/95 text-white backdrop-blur-xl border border-neutral-700 shadow-2xl px-6 py-2.5 flex items-center justify-between transition-all duration-300 hover:border-primary-400/50">
          <div onClick={() => handleNavClick('hero_quote_calculator')}>
            <LogoCapsule compact />
          </div>
          <nav className="hidden md:flex items-center gap-1 bg-neutral-800/80 rounded-full px-4 py-1.5 border border-neutral-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1 rounded-full text-xs font-black transition-all ${activeTab === link.id ? 'bg-primary-500 text-[color:var(--primary-contrast-text)] shadow-lg scale-105' : 'text-neutral-200 hover:text-white hover:bg-neutral-700/60'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href={`tel:${BRAND.phone}`} className="hidden sm:flex items-center gap-2 text-xs font-black px-5 py-2.5 rounded-full bg-zinc-900/60 text-white hover:bg-primary-400 transition-colors shadow-md">
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>{BRAND.phone}</span>
            </a>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>
    );
  }

  // ============================================================================
  // 2. DUAL-RIBBON EXECUTIVE BAR (Corporate & Medical Standard)
  // ============================================================================
  if (variant === 'dual-ribbon-bar') {
    return (
      <header className="sticky top-0 z-50 w-full bg-neutral-900 text-white shadow-2xl flex flex-col border-b border-neutral-800">
        <div className="bg-black text-neutral-300 px-6 py-2 flex justify-between items-center text-xs font-bold tracking-wide border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-black uppercase">Dispatch Active</span>
            <span className="hidden sm:inline text-neutral-500">|</span>
            <span className="hidden sm:inline">Licensed & WSIB Bonded Carrier</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-neutral-400">📍 {BRAND.hqAddress || 'Regional Operations'}</span>
            <button onClick={onOpenCOIModal} className="text-primary-400 hover:text-primary-300 font-extrabold flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-primary-400" /> Verify COI
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full px-6 py-3 flex justify-between items-center">
          <div onClick={() => handleNavClick('hero_quote_calculator')}>
            <LogoCapsule />
          </div>
          <nav className="hidden lg:flex items-center gap-8 text-sm font-black tracking-tight text-neutral-200">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`hover:text-primary-400 transition-colors uppercase ${activeTab === link.id ? 'text-primary-400 underline decoration-2 underline-offset-8' : ''}`}>
                {link.label}
              </button>
            ))}
          </nav>
          <a href={`tel:${BRAND.phone}`} className="px-6 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-[color:var(--primary-contrast-text)] font-black text-xs uppercase shadow-lg inline-flex items-center gap-2">
            <Phone className="w-4 h-4 fill-current" />
            <span>Call {BRAND.phone}</span>
          </a>
        </div>
      </header>
    );
  }

  // ============================================================================
  // 3. TRANSPARENT SCROLL MORPH (Always contained in rich dark frosted glass)
  // ============================================================================
  if (variant === 'transparent-scroll-morph' || variant === 'transparent-overlay') {
    return (
      <header className={`sticky top-0 z-50 w-full transition-all duration-300 px-6 py-3 bg-neutral-950/90 text-white backdrop-blur-xl border-b border-neutral-800 shadow-2xl ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => handleNavClick('hero_quote_calculator')}>
            <LogoCapsule />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold text-neutral-200">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`hover:text-primary-400 transition-colors ${activeTab === link.id ? 'text-primary-400 font-black' : ''}`}>
                {link.label}
              </button>
            ))}
          </nav>
          <a href={`tel:${BRAND.phone}`} className="px-6 py-2.5 rounded-2xl bg-primary-500 text-[color:var(--primary-contrast-text)] font-black text-xs hover:bg-primary-600 transition-all shadow-xl inline-flex items-center gap-2">
            <Phone className="w-4 h-4 fill-current" />
            <span>{BRAND.phone}</span>
          </a>
        </div>
      </header>
    );
  }

  // ============================================================================
  // 4. BRUTALIST BOX HEADER (High contrast clean border tiles, ZERO square brackets)
  // ============================================================================
  if (variant === 'brutalist-border-box') {
    return (
      <header className="sticky top-0 z-50 bg-zinc-900/60 text-white dark:bg-black dark:text-white border-b-4 border-black dark:border-white px-6 py-4 font-mono shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div onClick={() => handleNavClick('hero_quote_calculator')}>
            <LogoCapsule />
          </div>
          <nav className="hidden lg:flex items-center gap-3 text-xs font-extrabold uppercase">
            {navLinks.map((link) => (
              <button 
                key={link.id} 
                onClick={() => handleNavClick(link.id)} 
                className={`px-3.5 py-1.5 rounded-none border-2 border-transparent hover:border-black dark:hover:border-white transition-colors ${activeTab === link.id ? 'bg-black text-white dark:bg-zinc-900/60 dark:text-black border-black dark:border-white font-black' : 'text-white dark:text-neutral-200 hover:bg-zinc-800 dark:hover:bg-neutral-900'}`}
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <a href={`tel:${BRAND.phone}`} className="bg-black text-white dark:bg-zinc-900/60 dark:text-black px-5 py-2.5 font-black text-xs border-2 border-black dark:border-white shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#fff] hover:translate-x-1 hover:translate-y-1 transition-transform inline-flex items-center gap-2">
              <Phone className="w-4 h-4 fill-current" />
              <span>TEL: {BRAND.phone}</span>
            </a>
          </div>
        </div>
      </header>
    );
  }

  // ============================================================================
  // 5. PROMO TICKER MARQUEE DECK
  // ============================================================================
  if (variant === 'promo-ticker-nav') {
    return (
      <header className="sticky top-0 z-50 bg-neutral-900 text-white shadow-2xl">
        <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-700 text-[color:var(--primary-contrast-text)] text-xs font-black py-1.5 px-4 text-center overflow-hidden uppercase tracking-widest flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VOTED #1 WHITE-GLOVE RELOCATION CARRIER • WSIB BONDED & INSURED • ZERO STAIR SURCHARGES</span>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center border-b border-neutral-800">
          <div onClick={() => handleNavClick('hero_quote_calculator')}>
            <LogoCapsule />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold text-neutral-200">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`hover:text-primary-400 transition-colors ${activeTab === link.id ? 'text-primary-400 underline underline-offset-4 decoration-2' : ''}`}>
                {link.label}
              </button>
            ))}
          </nav>
          <button onClick={onOpenCOIModal} className="px-5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-primary-400 font-bold text-xs border border-neutral-700 transition-colors shadow-sm inline-flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary-400" />
            <span>Verify Insurance Bond</span>
          </button>
        </div>
      </header>
    );
  }

  // ============================================================================
  // 6. ASYMMETRIC CONVERSION DECK (40% Solid CTA Action Box)
  // ============================================================================
  if (variant === 'asymmetry-cta-dominant') {
    return (
      <header className="sticky top-0 z-50 w-full flex bg-neutral-900 text-white shadow-2xl border-b border-neutral-800">
        <div className="w-full lg:w-3/5 px-6 py-3 flex items-center justify-between">
          <div onClick={() => handleNavClick('hero_quote_calculator')}>
            <LogoCapsule />
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-neutral-200">
            {navLinks.slice(0, 4).map((link) => (
              <button key={link.id} onClick={() => handleNavClick(link.id)} className={`hover:text-primary-400 transition-colors ${activeTab === link.id ? 'text-primary-400 font-black' : ''}`}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="hidden lg:flex w-2/5 bg-primary-500 text-[color:var(--primary-contrast-text)] px-8 py-3 items-center justify-between font-black uppercase tracking-tight shadow-xl">
          <span className="text-xs">Instant Dispatch Terminal &rarr;</span>
          <a href={`tel:${BRAND.phone}`} className="text-xs bg-neutral-950 text-white px-5 py-2.5 rounded-xl hover:bg-black transition-colors shadow-md inline-flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 fill-current text-primary-400" />
            <span>{BRAND.phone}</span>
          </a>
        </div>
      </header>
    );
  }

  // ============================================================================
  // 7-10. STANDARD EXECUTIVE DECK (Fallback & centered-split / minimal / standard)
  // ============================================================================
  return (
    <header className="sticky top-0 z-50 bg-neutral-900/95 text-white backdrop-blur-md border-b border-neutral-800 shadow-xl px-6 py-3.5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div onClick={() => handleNavClick('hero_quote_calculator')}>
          <LogoCapsule />
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-extrabold text-neutral-200">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors hover:text-primary-400 ${activeTab === link.id ? 'text-primary-400 font-black border-b-2 border-primary-500 pb-1' : ''}`}
            >
              {link.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href={`tel:${BRAND.phone}`} className="px-6 py-2.5 rounded-xl bg-primary-500 text-[color:var(--primary-contrast-text)] hover:bg-primary-600 font-black text-xs shadow-lg transition-all inline-flex items-center gap-2">
            <Phone className="w-4 h-4 fill-current" />
            <span>Call {BRAND.phone}</span>
          </a>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};
