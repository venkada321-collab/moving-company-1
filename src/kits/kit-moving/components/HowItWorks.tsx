import React from 'react';
import { CalendarCheck, ShieldCheck, Truck, Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { GEO, LEGAL } from '../../../config';
import { THEME } from '../../../config/theme';
import { LAYOUT } from '../../../config/layout';
import { HowItWorksAccordion } from './HowItWorksAccordion';
import { HowItWorksTimeline } from './HowItWorksTimeline';

interface HowItWorksProps {
  onStartEstimate: () => void;
  onOpenCOIModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartEstimate, onOpenCOIModal }) => {
  if (LAYOUT.variants.howItWorks === 'accordion-protocol') {
    return <HowItWorksAccordion onStartEstimate={onStartEstimate} onOpenCOIModal={onOpenCOIModal} />;
  }

  if (LAYOUT.variants.howItWorks === 'timeline-horizontal') {
    return <HowItWorksTimeline onStartEstimate={onStartEstimate} onOpenCOIModal={onOpenCOIModal} />;
  }

  const steps = [
    {
      number: '01',
      title: 'Instant Estimate & Date Lock',
      subtitle: 'Transparent Pricing Model',
      description: `Use our online calculator to select your ${GEO.regionName} addresses, move size, and optional packing supplies. Lock in your exact hourly or corridor rate with no surprise fees.`,
      icon: CalendarCheck,
      badge: 'Zero Hidden Fees',
      highlights: ['3D Volume Estimator', 'Flexible Rescheduling', 'Instant Price Ceiling']
    },
    {
      number: '02',
      title: 'Condo COI & Pre-Move Check',
      subtitle: '100% High-Rise Compliance',
      description: `We generate a custom ${LEGAL.coiAmount} Certificate of Insurance (COI) directly to your condo concierge or property manager within 15 minutes.`,
      icon: ShieldCheck,
      badge: `${LEGAL.coiDeliverySLAShort} COI Delivery`,
      highlights: [`${LEGAL.coiAmountShort} Property Coverage`, 'Elevator Padding Included', 'Dock Clearance Check'],
      action: { label: 'Request COI Early', onClick: onOpenCOIModal }
    },
    {
      number: '03',
      title: 'White-Glove Packing & Loading',
      subtitle: 'Surgical Care for Heirlooms',
      description: `Our background-checked, uniformed ${GEO.regionName} crew lays down neoprene carpet runners, door jamb guards, and wraps every furniture piece in double-layered quilted pads.`,
      icon: Truck,
      badge: 'Pro Uniformed Crew',
      highlights: ['Floor & Wall Guards', 'Wardrobe Garment Boxes', 'Disassembly & Wrapping']
    },
    {
      number: '04',
      title: 'GPS Transit & Unpack Delivery',
      subtitle: 'Direct Dedicated Transit',
      description: `Follow your truck in real time via smartphone GPS link across the ${GEO.highways}. We unload each box into designated rooms and complete a post-move inspection.`,
      icon: Sparkles,
      badge: 'Real-Time GPS Link',
      highlights: ['Dedicated Non-Stop Truck', 'Reassembly & Room Routing', '100% Satisfaction Check']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white via-primary-50/30 to-white text-white border-y border-primary-100 relative overflow-hidden">
      {/* Halo Lab subtle decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-primary-700 font-bold text-xs tracking-widest uppercase bg-primary-50 px-4 py-1.5 rounded-full border border-zinc-800/50 shadow-sm">
              RELIABLE & PREDICTABLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-5 tracking-tight font-['Montserrat',sans-serif]">
              HOW IT WORKS IN <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">4 SIMPLE STEPS</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md leading-relaxed font-medium">
            From strict downtown {GEO.cities[0]} high-rise elevator slots to long-distance corridor deliveries, here is how we guarantee a stress-free move.
          </p>
        </div>

        {/* Layout Split: 4 Steps (Left) + Custom Art (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: 4 Step Cards Grid */}
          <div className="lg:col-span-7 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-zinc-900/60 border border-zinc-800/60 hover:border-primary-300 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/10 hover:-translate-y-1.5 group"
                >
                  <div>
                    {/* Step Top Bar */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-4xl font-black text-neutral-200 group-hover:text-primary-200 transition-colors duration-300 font-['Montserrat',sans-serif]">
                        {step.number}
                      </span>
                      <div className="w-12 h-12 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-center text-primary-500 group-hover:bg-primary-50 group-hover:border-zinc-800 transition-all duration-300 shadow-sm">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                    </div>

                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-primary-700 bg-primary-50 border border-zinc-800/50 px-3 py-1 rounded-full inline-block mb-4">
                      {step.badge}
                    </span>

                    <h3 className="text-lg font-extrabold text-white mb-1 font-['Montserrat',sans-serif]">
                      {step.title}
                    </h3>
                    <div className="text-xs font-bold text-primary-600 mb-3">{step.subtitle}</div>

                    <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-medium">
                      {step.description}
                    </p>
                  </div>

                  <div>
                    {/* Highlights Bullet points */}
                    <div className="pt-4 border-t border-primary-100 space-y-2 mb-4">
                      {step.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-zinc-300 font-semibold">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" aria-hidden="true" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    {step.action && (
                      <button
                        type="button"
                        onClick={step.action.onClick}
                        className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-black hover:bg-neutral-800 text-primary-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-black motion-reduce:transition-none"
                      >
                        <span>{step.action.label}</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Custom Art Block */}
          <div className="lg:col-span-5 xl:col-span-4 h-full min-h-[500px] relative hidden lg:block rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={THEME.customArt?.howItWorks || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"}
              alt="Professional Moving Crew"
              className="content-art-layer how-it-works-art absolute inset-0 w-full h-full object-cover"
            />
            {/* Soft gradient overlay to blend into the section */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 via-transparent to-transparent mix-blend-multiply" />
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-primary-900/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black text-primary-400 font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/20 border border-black" aria-hidden="true">
              <Zap className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white font-['Montserrat',sans-serif]">
                Ready to Experience {GEO.regionLabel} Smooth Mover?
              </h4>
              <p className="text-xs text-zinc-400 font-medium mt-1">
                Lock your move date in under 3 minutes with zero cancellation penalties.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartEstimate}
            className="bg-primary-400 hover:bg-primary-500 text-black px-8 py-3.5 min-h-[44px] rounded-2xl font-extrabold text-sm uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20 hover:scale-105 transition-all motion-reduce:transition-none motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-primary-500"
          >
            <span>CALCULATE ESTIMATE NOW</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
};
