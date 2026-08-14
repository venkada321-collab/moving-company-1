import React from 'react';
import { Star, ShieldCheck, Award, TrendingUp } from 'lucide-react';
import { BRAND } from '../../../config';

export const TrustSignalsBarberBrutalist: React.FC = () => {
  return (
    <section className="bg-transparent text-neutral-900 dark:text-white border-y-8 border-neutral-900 dark:border-white font-['var(--font-body)'] py-20 relative overflow-hidden">
      
      {/* Background brutalist noise/grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b-4 border-neutral-900 dark:border-white pb-8">
          <div>
            <div className="inline-block bg-neutral-900 dark:bg-white text-white dark:text-black font-mono uppercase px-3 py-1 text-sm font-bold mb-4">
              INDUSTRY RECOGNIZED // VERIFIED REPUTATION
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-['var(--font-heading)']">
              AESTHETIC & PRECISION
            </h2>
          </div>
          <div className="text-right mt-6 md:mt-0 font-mono">
            <div className="text-4xl font-black">{BRAND.rating}/5.0</div>
            <div className="text-sm font-bold uppercase">{BRAND.reviewCount} CLIENT REVIEWS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Star className="w-8 h-8" />, title: "MASTER BARBERS", text: "Top 1% rated stylists in the region." },
            { icon: <ShieldCheck className="w-8 h-8" />, title: "SANITATION CERT", text: "Barbicide & health board certified." },
            { icon: <Award className="w-8 h-8" />, title: "AWARD WINNING", text: "Recognized for superior fading & styling." },
            { icon: <TrendingUp className="w-8 h-8" />, title: "CLIENT RETENTION", text: "95% of clients book a second visit." }
          ].map((signal, idx) => (
            <div key={idx} className="border-4 border-neutral-900 dark:border-white p-6 bg-white dark:bg-[#171717] shadow-[6px_6px_0_0_#171717] dark:shadow-[6px_6px_0_0_#ffffff] hover:-translate-y-2 hover:shadow-[12px_12px_0_0_#171717] dark:hover:shadow-[12px_12px_0_0_#ffffff] transition-all cursor-crosshair">
              <div className="bg-primary-500 w-16 h-16 flex items-center justify-center border-2 border-neutral-900 dark:border-white mb-6 text-black">
                {signal.icon}
              </div>
              <h3 className="text-xl font-black uppercase mb-2">{signal.title}</h3>
              <p className="font-bold text-sm text-zinc-600 dark:text-zinc-400">{signal.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
