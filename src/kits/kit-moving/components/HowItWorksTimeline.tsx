import React from 'react';
import { CalendarCheck, ShieldCheck, Truck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { GEO, LEGAL } from '../../../config';
import { LAYOUT } from '../../../config/layout';

interface HowItWorksProps {
  onStartEstimate: () => void;
  onOpenCOIModal: () => void;
}

export const HowItWorksTimeline: React.FC<HowItWorksProps> = ({ onStartEstimate, onOpenCOIModal }) => {
  const steps = [
    {
      number: '01',
      title: 'Instant Estimate & Date Lock',
      description: `Use our online calculator to select your ${GEO.regionName} addresses, move size, and optional packing supplies. Lock in your exact hourly or corridor rate with no surprise fees.`,
      icon: CalendarCheck,
      badge: 'Zero Hidden Fees'
    },
    {
      number: '02',
      title: 'Condo COI & Pre-Move Check',
      description: `Moving into a strict condo? Our dispatch generates your customized Certificate of Insurance (COI) instantly for your property manager.`,
      icon: ShieldCheck,
      badge: `WSIB #${LEGAL.wsibNumber}`,
      onClick: onOpenCOIModal,
      clickable: true
    },
    {
      number: '03',
      title: 'White-Glove Execution',
      description: `Our vetted fleet arrives. Standard operating procedure includes full blanket wrapping, mattress bags, and floor runners to protect your estate.`,
      icon: Truck,
      badge: 'Fully Equipped Fleet'
    }
  ];

  return (
    <div className="py-24 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-neutral-900 dark:text-white border-b border-zinc-200 dark:border-zinc-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 dark:from-primary-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 font-bold text-xs uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> Relocation Protocol
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 font-['var(--font-heading)']">
            OUR TIMELINE <span className="text-primary-500">TO STRESS-FREE</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-neutral-500 dark:text-zinc-400 font-['var(--font-body)']">
            A linear approach to complex logistics. See exactly how we execute your move from the first click to the final box.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-1 bg-zinc-200 dark:bg-zinc-800" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.number} className="relative group">
                
                {/* Node */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white dark:bg-zinc-900 border-4 border-zinc-100 dark:border-neutral-200 dark:border-zinc-800 flex items-center justify-center mb-8 relative z-10 shadow-xl group-hover:border-primary-500 transition-colors duration-500 cursor-default">
                    <step.icon className="w-10 h-10 text-primary-500" />
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-neutral-100 dark:bg-black text-neutral-900 dark:text-white dark:text-black font-bold flex items-center justify-center shadow-lg font-mono">
                      {step.number}
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                    {step.badge}
                  </div>

                  <h3 className="text-2xl font-bold mb-4 font-['var(--font-heading)']">{step.title}</h3>
                  <p className="text-zinc-600 dark:text-neutral-500 dark:text-zinc-400 leading-relaxed max-w-sm mb-6">
                    {step.description}
                  </p>

                  {step.clickable && (
                    <button 
                      onClick={step.onClick}
                      className="text-primary-600 hover:text-primary-500 font-bold flex items-center gap-2 underline underline-offset-4 decoration-2 decoration-primary-200 hover:decoration-primary-500 transition-colors"
                    >
                      Generate COI Now <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <button 
            onClick={onStartEstimate}
            className="inline-flex items-center gap-3 px-10 py-5 bg-white dark:bg-black dark:bg-white text-neutral-900 dark:text-white dark:text-black hover:bg-primary-500 hover:text-black dark:hover:bg-primary-500 rounded-[var(--radius-button)] font-extrabold text-lg transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-primary-500/30"
          >
            Start the Protocol <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};
