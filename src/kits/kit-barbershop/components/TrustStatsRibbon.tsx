import React from 'react';
import { BRAND } from '../../../config';

export const TrustStatsRibbon: React.FC = () => {
  return (
    <section id="trust_signals" className="py-12 bg-primary-500 text-black w-full border-y-4 border-black dark:border-neutral-900">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-black/10">
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black font-heading mb-1">4.9/5</span>
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Google Reviews</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black font-heading mb-1">10k+</span>
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Cuts Delivered</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black font-heading mb-1">#1</span>
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Rated in City</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl md:text-5xl font-black font-heading mb-1">15+</span>
            <span className="text-sm font-bold uppercase tracking-widest opacity-80">Years Mastered</span>
          </div>
        </div>
      </div>
    </section>
  );
};
