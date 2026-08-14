import React from 'react';
import { BRAND, GEO } from '../../../config';

export const FooterBarbershop: React.FC<{ navLinks: { id: string; label: string }[], onNavigateTab: (id: string) => void }> = ({ navLinks, onNavigateTab }) => {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-neutral-900 relative z-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 text-black flex items-center justify-center font-black text-2xl font-heading rounded-sm">
                {BRAND.logoSymbol}
              </div>
              <span className="text-white font-black text-2xl tracking-widest uppercase">
                {BRAND.name}
              </span>
            </div>
            <p className="text-neutral-400 max-w-sm leading-relaxed mb-4">
              {BRAND.metaDescription}
            </p>
            <div className="text-primary-400 text-sm font-bold tracking-widest uppercase mb-8">
              Proudly Serving {GEO.regionName} & The Surrounding Area
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-primary-500 hover:text-black hover:border-primary-500 cursor-pointer transition-colors font-bold text-xs">IG</div>
              <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center hover:bg-primary-500 hover:text-black hover:border-primary-500 cursor-pointer transition-colors font-bold text-xs">FB</div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-primary-500 mb-6">Explore</h4>
            <ul className="space-y-4">
              {navLinks.slice(0, 5).map(link => (
                <li key={link.id}>
                  <button onClick={() => onNavigateTab(link.id)} className="text-neutral-400 hover:text-white transition-colors uppercase text-sm tracking-wider">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-widest text-primary-500 mb-6">Contact</h4>
            <ul className="space-y-4 text-neutral-400 text-sm">
              <li>{BRAND.hqAddress}</li>
              <li>{BRAND.phone}</li>
              <li>{BRAND.email}</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-neutral-900 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-semibold text-neutral-600 uppercase tracking-widest">
          <p>&copy; {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.</p>
          <p>Designed by White-Label Pro Max</p>
        </div>
      </div>
    </footer>
  );
};
