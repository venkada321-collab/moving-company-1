import React from 'react';
import { BRAND, GEO } from '../../../config';

export const HeroLeadCapture: React.FC = () => {
  return (
    <section id="hero_lead_capture" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center bg-neutral-950 dark:bg-black overflow-hidden">
      {/* Background Overlay / Image Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=2074&auto=format&fit=crop" 
          alt="Barbershop Background" 
          className="w-full h-full object-cover opacity-60 grayscale"
        />
      </div>

      <div className="relative z-20 text-center px-4 max-w-[800px] mx-auto flex flex-col items-center">
        <div className="mb-6 inline-block">
          <span className="px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-bold tracking-widest uppercase backdrop-blur-sm">
            {GEO.regionName}'s Premier Barbershop
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1.1] mb-6 font-heading drop-shadow-2xl max-w-[700px]">
          {BRAND.heroTagline || `The Best Fade in ${GEO.regionName}.`}
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-300 mb-10 max-w-[600px] font-medium leading-relaxed">
          {BRAND.heroSubtitle || "More than just a haircut. It's an armor upgrade. Step into our chair and walk out ready to conquer the world."}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-black font-bold text-lg rounded-none transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(var(--color-primary-500),0.4)]">
            BOOK APPOINTMENT
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg rounded-none transition-all duration-300">
            VIEW SERVICES
          </button>
        </div>
        
        <div className="mt-12 flex items-center gap-2 text-neutral-400 text-sm font-semibold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Walk-ins Welcome Today
        </div>
      </div>
    </section>
  );
};
