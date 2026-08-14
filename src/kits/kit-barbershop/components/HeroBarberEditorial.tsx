import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND, GEO } from '../../../config';

interface HeroProps {
  onQuoteSubmitted?: (quote: any, totalEstimate: any) => void;
  onOpenCOIModal?: () => void;
}

export const HeroBarberEditorial: React.FC<HeroProps> = () => {
  const services = [
    { name: "Haircuts", price: "$40" },
    { name: "Beard Trimming", price: "$35" },
    { name: "Shaving", price: "$30" },
    { name: "Hair Styling", price: "$50" },
    { name: "Facial Treatments", price: "$65", isHighlight: true },
    { name: "Grooming Packages", price: "$75" }
  ];

  return (
    <div id="hero-quote-calculator" className="relative w-full h-[100vh] min-h-[800px] bg-transparent overflow-hidden flex items-center justify-center font-sans text-[#eae6dd] transition-colors duration-500">

      {/* Layer 10: The Massive 3D Typography */}
      <h1 className="absolute top-40 left-8 md:left-16 max-w-[50vw] text-left text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.85] z-10 text-[#eae6dd] opacity-90 select-none font-['var(--font-heading)'] break-words">
        {BRAND.name}
      </h1>

      {/* City SEO (Small & Elegant at the top left) */}
      <div className="absolute top-32 left-8 md:left-16 z-20 text-[#eae6dd] opacity-70 text-sm font-bold tracking-[0.3em] uppercase font-sans">
        {GEO.regionName} HQ // Premium Grooming
      </div>

      {/* Layer 0: The Subject Image (Placed behind the text) */}
      <img
        src="https://unsplash.com/photos/5st86wYikQQ/download?w=1200"
        alt="Gentleman Barber"
        className="absolute bottom-0 left-4 lg:left-[15%] h-[80vh] w-[600px] object-cover object-top z-0 drop-shadow-[20px_0_50px_rgba(0,0,0,0.5)] grayscale contrast-125"
      />



      {/* Layer 20: The Services Menu Menu */}
      <div className="absolute right-4 lg:right-24 top-1/2 -translate-y-1/2 z-20 w-[300px] md:w-[400px] bg-[#1e293b]/80 backdrop-blur-md p-6 rounded-3xl lg:bg-transparent lg:backdrop-blur-none lg:p-0 text-[#eae6dd]">
        <ul className="flex flex-col">
          {services.map((service, idx) => (
            <li key={idx} className="flex items-center justify-between py-5 border-b border-slate-700/50 text-lg md:text-xl font-light tracking-wide group">
              <span>{service.name}</span>
              {service.isHighlight ? (
                <button className="px-6 py-2 bg-[#b88645] hover:bg-[#a6773a] text-white text-sm font-bold tracking-widest flex items-center gap-2 transition-all">
                  BOOK <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span>{service.price}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};
