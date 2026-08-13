import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { BRAND, GEO, LEGAL, LAYOUT } from '../../config';
import { MICROCOPY } from '../../config/microcopy';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const HeaderMinimal: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenCOIModal }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero_lead_capture', label: 'Rate Calculator', enabled: true },
    { id: 'core_services', label: 'Core Services', enabled: LAYOUT.sectionsEnabled.core_services },
    { id: 'service_areas', label: `${GEO.regionName} Network`, enabled: LAYOUT.sectionsEnabled.service_areas },
    { id: 'how_it_works', label: 'Our Protocol', enabled: LAYOUT.sectionsEnabled.how_it_works },
    { id: 'supplemental_services', label: 'Supplemental Services', enabled: LAYOUT.sectionsEnabled.supplemental_services },
    { id: 'referral_program', label: `Refer Rewards (${BRAND.referralGetAmount})`, enabled: LAYOUT.sectionsEnabled.referral_program }
  ].filter(item => item.enabled !== false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 lg:px-8 pointer-events-none">
      {/* Floating Glassmorphic Capsule Navbar — NO TOP ANNOUNCEMENT BAR */}
      <nav className={`max-w-6xl mx-auto rounded-2xl pointer-events-auto transition-all duration-300 ${
        scrolled ? 'bg-white dark:bg-neutral-950/95 shadow-2xl border border-neutral-200 dark:border-neutral-800/80 py-3 px-6' : 'bg-neutral-50 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200 dark:border-neutral-800 py-4 px-6 shadow-xl'
      }`}>
        <div className="flex items-center justify-between gap-6">
          
          {/* Minimalist Typographic Logo (No Block Symbol Box) */}
          <button
            type="button"
            onClick={() => setActiveTab('quote')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            aria-label={BRAND.headerAriaLabel || "Home"}
          >
            {BRAND.logoUrl ? (
              <div className="bg-white/95 dark:bg-zinc-900/95 px-3 py-1.5 rounded-xl shadow-md flex items-center justify-center max-w-[200px] hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors">
                <img src={BRAND.logoUrl} alt={BRAND.name} className="h-7 sm:h-8 w-auto object-contain" />
              </div>
            ) : (
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-wider uppercase font-['var(--font-heading)'] group-hover:text-primary-400 transition-colors">
                  {BRAND.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-600 dark:text-neutral-400 font-semibold">
                  {GEO.regionName} Certified Service Provider
                </span>
              </div>
            )}
          </button>

          {/* Clean Underlined Text Links (No Icons, No Pill Box Backgrounds) */}
          <div className="hidden xl:flex items-center gap-7">
            {navLinks.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs uppercase tracking-wider transition-all relative py-1 ${
                    isActive ? 'text-primary-400 font-extrabold' : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:text-white font-medium'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-full" />}
                </button>
              );
            })}
          </div>

          {/* Executive Action Area */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenCOIModal}
              className="text-xs text-neutral-700 dark:text-neutral-300 hover:text-primary-400 font-semibold inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-neutral-800/50 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>COI ({LEGAL.coiAmountShort})</span>
            </button>

            <a
              href={`tel:${BRAND.phoneRaw || BRAND.phone}`}
              className="px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-neutral-900 dark:text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <Phone className="w-3.5 h-3.5 fill-neutral-950" />
              <span>{BRAND.phone}</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="xl:hidden p-2 text-neutral-900 dark:text-white hover:text-primary-400 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Flyout */}
        {mobileOpen && (
          <div className="xl:hidden pt-6 pb-4 border-t border-neutral-200 dark:border-neutral-800 mt-4 space-y-3">
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`block w-full text-left py-2 px-3 rounded-lg text-sm font-bold uppercase tracking-wider ${
                  activeTab === item.id ? 'bg-primary-500/20 text-primary-400' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
              <a
                href={`tel:${BRAND.phoneRaw || BRAND.phone}`}
                className="w-full py-3 bg-primary-500 text-neutral-900 dark:text-white font-black uppercase text-center rounded-lg flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4 fill-neutral-950" />
                <span>Call {BRAND.phone}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
