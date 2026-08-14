import React, { useState, useEffect } from 'react';
import { Instagram, Twitter } from 'lucide-react';
import { BRAND } from '../../../config';
import { LAYOUT } from '../../../config/layout';

export const HeaderBarbershop: React.FC<{ navLinks: { id: string; label: string }[], activeTab: string, setActiveTab: (id: string) => void }> = ({ navLinks, activeTab, setActiveTab }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isCentered = LAYOUT.variants.nav === 'centered-split';
  const isPill = LAYOUT.variants.nav === 'floating-pill-glass';
  const isEditorial = LAYOUT.variants.nav === 'editorial';

  let containerClass = "max-w-[1400px] mx-auto px-6 flex items-center justify-between";
  if (isCentered) containerClass = "max-w-[1400px] mx-auto px-6 flex items-center justify-center gap-12 relative";
  if (isEditorial) containerClass = "max-w-[1600px] mx-auto px-8 flex items-center justify-between relative";
  
  let headerClass = `fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-6'}`;
  
  const isStreetwearHero = LAYOUT.variants.hero === 'streetwear-poster';
  if (isStreetwearHero) {
    headerClass = `fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-2 border-b border-white/5 translate-y-0 opacity-100' : 'bg-transparent py-6 translate-y-0 opacity-100'}`;
  }

  if (isPill) {
    headerClass = `fixed left-1/2 -translate-x-1/2 top-4 w-[95%] max-w-7xl z-50 transition-all duration-300 rounded-full border border-white/10 bg-black/60 backdrop-blur-xl ${scrolled ? 'py-2 shadow-2xl' : 'py-4'}`;
  }
  if (isEditorial) {
    headerClass = `absolute top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`;
  }

  return (
    <header className={headerClass}>
      <div className={containerClass}>
        <div className={`flex items-center gap-3 cursor-pointer ${isCentered ? 'absolute left-6' : ''}`} onClick={() => setActiveTab('hero_lead_capture')}>
          {isEditorial ? (
            <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-full shadow-lg">
              <span className="font-bold text-xl">✂</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 bg-primary-500 text-black flex items-center justify-center font-black text-xl font-heading rounded-sm">
                {BRAND.logoSymbol}
              </div>
              <span className="text-white font-black text-xl tracking-widest uppercase hidden sm:block">
                {BRAND.shortName}
              </span>
            </>
          )}
        </div>

        <nav className={`hidden lg:flex items-center ${isEditorial ? 'gap-12 absolute left-1/2 -translate-x-1/2' : 'gap-8'} ${isCentered && !isEditorial ? '' : ''}`}>
          {navLinks.filter(l => l.id !== 'hero_lead_capture').map(link => (
            <button 
              key={link.id} 
              onClick={() => setActiveTab(link.id)}
              className={isEditorial 
                ? `text-sm transition-colors font-sans tracking-wide whitespace-nowrap ${activeTab === link.id ? 'text-white font-medium' : 'text-neutral-300 hover:text-white font-light'}`
                : `text-sm font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === link.id ? 'text-primary-500' : 'text-neutral-400 hover:text-white'}`
              }
            >
              {link.label}
            </button>
          ))}
          {isEditorial && (
            <button 
              onClick={() => setActiveTab('hero_lead_capture')}
              className="text-sm transition-colors font-sans tracking-wide text-neutral-300 hover:text-white font-light whitespace-nowrap"
            >
              Book Appointment
            </button>
          )}
        </nav>

        {isEditorial ? (
          <div className="hidden lg:flex items-center gap-6 text-white">
            <Instagram className="w-5 h-5 cursor-pointer hover:text-primary-400 transition-colors" />
            <Twitter className="w-5 h-5 cursor-pointer hover:text-primary-400 transition-colors" />
          </div>
        ) : (
          <button 
            onClick={() => setActiveTab('hero_lead_capture')}
            className={`btn-atomic-primary ${isCentered ? 'absolute right-6' : ''}`}
          >
            Book Now
          </button>
        )}
      </div>
    </header>
  );
};
