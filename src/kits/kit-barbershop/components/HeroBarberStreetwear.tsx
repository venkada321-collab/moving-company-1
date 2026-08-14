import React from 'react';
import { ArrowRight, Globe } from 'lucide-react';
import { BRAND, GEO } from '../../../config';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberStreetwear: React.FC<HeroProps> = ({ onOpenCOIModal }) => {
  const services = [
    "HAIRCUTS",
    "BEARD TRIMS",
    "SHAVES",
    "LINE UPS",
    "STYLING"
  ];

  return (
    <div id="hero-quote-calculator" className="relative w-full h-[100vh] min-h-[850px] bg-[#0a0a0a] overflow-hidden font-sans text-[#eae6dd]">
      
      {/* Background Texture (Subtle Noise) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stucco.png")' }} />

      {/* Brutalist Top Corners */}
      <div className="absolute top-28 left-8 text-xs font-mono tracking-widest text-[#eae6dd]/70 uppercase z-40 hidden md:block">
        ESTD<br/>1996
      </div>
      <div className="absolute top-28 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.2em] text-[#eae6dd]/50 uppercase z-40">
        PREMIUM BARBERSHOP
      </div>
      <div className="absolute top-28 right-8 text-xs font-mono tracking-widest text-[#eae6dd]/70 text-right uppercase z-40 hidden md:block">
        {GEO.regionName}<br/>CANADA
      </div>

      {/* Layer 0: The Massive 3D Typography */}
      <h1 className="absolute top-40 left-1/2 -translate-x-1/2 w-[95vw] text-center text-[22vw] md:text-[18vw] font-black tracking-tighter leading-[0.75] z-0 text-[#eae6dd] select-none font-['var(--font-heading)'] flex justify-between uppercase">
        {GEO.regionName.split('').map((char, i) => (
          <span key={i}>{char}</span>
        ))}
      </h1>

      {/* Layer 5: Accent Text */}
      <div className="absolute top-[30%] md:top-[42%] left-1/2 -translate-x-1/2 z-0 font-['var(--font-heading)'] text-xl md:text-2xl text-[#b81d1d] font-bold tracking-[0.3em] uppercase select-none text-center">
        FADES
      </div>

      {/* Services Menu (Centered) */}
      <div className="absolute top-[36%] md:top-[50%] left-1/2 -translate-x-1/2 z-50 text-center bg-neutral-950/80 backdrop-blur-sm px-6 py-4 md:px-8 md:py-6 border-t-2 border-[#b81d1d] w-[90%] md:w-fit shadow-xl">
        <div className="text-[#b81d1d] text-[10px] font-mono tracking-widest mb-3 md:mb-4">SERVICES</div>
        <ul className="flex flex-col gap-1 md:gap-2">
          {services.map((service, idx) => (
            <li key={idx} className="text-xs md:text-base font-sans tracking-widest uppercase text-white/90 hover:text-white cursor-default whitespace-nowrap">
              {service}
            </li>
          ))}
        </ul>
      </div>

      {/* Layer 10: The Subject Image */}
      <img 
        src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200&auto=format&fit=crop" 
        alt="Streetwear Barber" 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[85vh] md:h-[90vh] object-cover object-top z-10 drop-shadow-[0_0_30px_rgba(0,0,0,0.8)] contrast-125 brightness-90 grayscale-[20%]"
        style={{ 
          maskImage: 'radial-gradient(ellipse 60% 80% at 50% 100%, black 50%, transparent 100%)', 
          WebkitMaskImage: 'radial-gradient(ellipse 60% 80% at 50% 100%, black 50%, transparent 100%)' 
        }}
      />
      
      {/* Brutalist Elements: Left Side */}
      <div className="absolute bottom-24 left-8 md:left-16 z-30 flex flex-col gap-8">


        {/* Real Cuts Block */}
        <div>
          <div className="text-xs font-mono tracking-widest uppercase mb-4">
            REAL CUTS.<br/>REAL PEOPLE.
            <div className="w-8 h-[1px] bg-[#eae6dd]/50 mt-2"></div>
          </div>
          <div className="flex gap-2">
            <div className="w-12 h-16 bg-neutral-800 border border-neutral-700 relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all" alt="cut" />
            </div>
            <div className="w-12 h-16 bg-neutral-800 border border-neutral-700 relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all" alt="cut" />
            </div>
            <div className="w-12 h-16 bg-neutral-800 border border-neutral-700 relative group overflow-hidden">
              <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all" alt="cut" />
              {/* Red Crosshair Overlay */}
              <div className="absolute -bottom-2 -right-2 text-[#b81d1d] text-2xl font-['Permanent_Marker']">X</div>
            </div>
          </div>
        </div>

        {/* Walk Ins Badge */}
        <div className="w-24 h-24 rounded-full border-[1px] border-[#eae6dd]/30 flex flex-col items-center justify-center text-[10px] text-center font-mono tracking-widest relative">
          WALK-INS<br/>WELCOME
          <Globe className="w-6 h-6 mt-1 opacity-50" />
          <svg className="absolute -bottom-1 -right-4 w-12 h-4 overflow-visible" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 L100,0" fill="none" stroke="#b81d1d" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Barcode */}
        <div className="mt-4">
          <div className="flex gap-[2px] h-10 opacity-70">
            <div className="w-1 bg-[#eae6dd]"></div><div className="w-[1px] bg-[#eae6dd]"></div><div className="w-2 bg-[#eae6dd]"></div><div className="w-[1px] bg-[#eae6dd]"></div><div className="w-1 bg-[#eae6dd]"></div><div className="w-[2px] bg-[#eae6dd]"></div><div className="w-3 bg-[#eae6dd]"></div><div className="w-[1px] bg-[#eae6dd]"></div><div className="w-1 bg-[#eae6dd]"></div><div className="w-[3px] bg-[#eae6dd]"></div><div className="w-1 bg-[#eae6dd]"></div><div className="w-[1px] bg-[#eae6dd]"></div><div className="w-2 bg-[#eae6dd]"></div>
          </div>
          <div className="text-[10px] font-mono tracking-widest mt-1 opacity-70">19 - 96 -86</div>
        </div>

      </div>

      {/* Brutalist Elements: Right Side */}
      <div className="absolute bottom-24 right-8 md:right-16 z-30 flex flex-col items-end gap-16">
        
        {/* Brutalist CTA */}
        <div className="relative group cursor-pointer" onClick={onOpenCOIModal}>
          <div className="absolute -top-6 -left-6 text-[#b81d1d] font-['Permanent_Marker'] text-2xl rotate-12">*</div>
          <div className="border border-[#eae6dd]/30 px-6 py-4 flex items-center justify-between gap-8 group-hover:bg-[#eae6dd] group-hover:text-[#0a0a0a] transition-all">
            <span className="text-xs font-mono tracking-widest">BOOK YOUR CUT</span>
            <ArrowRight className="w-5 h-5 opacity-50 group-hover:opacity-100" />
          </div>
          {/* Scribble Hover */}
          <svg className="absolute -bottom-2 right-0 w-[80%] h-4 overflow-visible opacity-0 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 20" preserveAspectRatio="none">
            <path d="M0,10 Q50,0 100,10" fill="none" stroke="#b81d1d" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>

        {/* Hours */}
        <div className="text-right mt-8">
          <div className="text-[#b81d1d] text-[10px] font-mono tracking-widest mb-2">OPEN DAILY</div>
          <div className="text-xl font-mono tracking-widest">10AM - 9PM</div>
          <div className="text-[10px] font-mono opacity-50 mt-1 uppercase">HQ: {GEO.cityName}, {GEO.regionName}</div>
        </div>

      </div>

      {/* Crosshairs */}
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-[#eae6dd]/30"></div>
      <div className="absolute top-1/2 left-8 w-4 h-[1px] bg-[#eae6dd]/30"></div>
      <div className="absolute top-1/2 right-8 w-4 h-[1px] bg-[#eae6dd]/30"></div>
      
    </div>
  );
};
