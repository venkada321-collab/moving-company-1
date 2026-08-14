import React from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { BRAND, GEO } from '../../../config';
import { MICROCOPY } from '../../../config/microcopy';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberVideo: React.FC<HeroProps> = () => {
  return (
    <div id="hero-quote-calculator" className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-black overflow-hidden">
      
      {/* HTML5 Video Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 z-10 mix-blend-multiply"></div>
        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 z-10"></div>
        
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          {/* Stock video of barbershop */}
          <source src="https://cdn.coverr.co/videos/coverr-barber-cutting-hair-with-scissors-2591/1080p.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Geo Tag */}
        <div className="mb-8 flex items-center justify-center gap-2 text-primary-400 text-sm font-bold tracking-[0.2em] uppercase">
          <PlayCircle className="w-4 h-4 animate-pulse" />
          {GEO.regionName} Barbershop Experience
        </div>
        
        {/* Hero Text */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-8 font-['var(--font-heading)'] drop-shadow-2xl">
          {BRAND.heroTagline || "Mastery in Motion."}
        </h1>
        
        <p className="text-lg md:text-2xl text-neutral-300 mb-12 max-w-2xl font-medium leading-relaxed font-['var(--font-body)']">
          {BRAND.heroSubtitle || "Watch our master barbers at work, or experience it for yourself. Book your chair today."}
        </p>
        
        {/* Booking CTA */}
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
          <button className="px-10 py-5 bg-primary-500 hover:bg-primary-600 text-black font-black text-xl tracking-wider uppercase rounded-none transition-all duration-300 hover:scale-105 shadow-[0_0_30px_rgba(var(--color-primary-500),0.3)] btn-atomic-primary group flex items-center justify-center gap-3">
            Book Appointment <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
