import React from 'react';
import { CalendarCheck, ShieldCheck, Truck, Sparkles, CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import { GEO, LEGAL } from '../config';

interface HowItWorksProps {
  onStartEstimate: () => void;
  onOpenCOIModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartEstimate, onOpenCOIModal }) => {
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
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-white via-amber-50/30 to-white text-neutral-900 border-y border-amber-100 relative overflow-hidden">
      {/* Halo Lab subtle decorative background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-black font-bold text-xs tracking-widest uppercase bg-amber-400 px-3 py-1 rounded-full border border-amber-500/20 shadow-sm">
              RELIABLE & PREDICTABLE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 mt-4 tracking-tight font-['Outfit']">
              HOW IT WORKS IN <span className="bg-amber-400 text-black px-3 py-1 rounded-lg inline-block mt-2 sm:mt-0">4 SIMPLE STEPS</span>
            </h2>
          </div>
          <p className="text-neutral-600 text-sm max-w-md leading-relaxed font-medium">
            From strict downtown {GEO.cities[0]} high-rise elevator slots to long-distance corridor deliveries, here is how we guarantee a stress-free move.
          </p>
        </div>

        {/* 4 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white border border-amber-200 hover:border-amber-400 rounded-3xl p-6 flex flex-col justify-between transition-all hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none shadow-xl shadow-amber-900/5 group"
              >
                <div>
                  {/* Step Top Bar */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-neutral-300 group-hover:text-amber-400 transition-colors motion-reduce:transition-none font-['Outfit']">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-black border border-black flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all motion-reduce:transition-none shadow-md">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-black bg-amber-400 px-2.5 py-0.5 rounded-full inline-block mb-3 shadow-sm">
                    {step.badge}
                  </span>

                  <h3 className="text-lg font-extrabold text-neutral-900 mb-1 font-['Outfit']">
                    {step.title}
                  </h3>
                  <div className="text-xs font-bold text-amber-600 mb-3">{step.subtitle}</div>

                  <p className="text-xs text-neutral-600 leading-relaxed mb-6 font-medium">
                    {step.description}
                  </p>
                </div>

                <div>
                  {/* Highlights Bullet points */}
                  <div className="pt-4 border-t border-amber-100 space-y-2 mb-4">
                    {step.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-700 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {step.action && (
                    <button
                      type="button"
                      onClick={step.action.onClick}
                      className="w-full py-2.5 px-3 min-h-[44px] rounded-xl bg-black hover:bg-neutral-800 text-amber-400 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-black motion-reduce:transition-none"
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

        {/* Bottom CTA Banner */}
        <div className="mt-12 bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-900/5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black text-amber-400 font-black text-xl flex items-center justify-center shrink-0 shadow-lg shadow-black/20 border border-black" aria-hidden="true">
              <Zap className="w-7 h-7" aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-lg font-black text-neutral-900 font-['Outfit']">
                Ready to Experience {GEO.regionLabel} Smooth Mover?
              </h4>
              <p className="text-xs text-neutral-600 font-medium mt-1">
                Lock your move date in under 3 minutes with zero cancellation penalties.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onStartEstimate}
            className="bg-amber-400 hover:bg-amber-500 text-black px-8 py-3.5 min-h-[44px] rounded-2xl font-extrabold text-sm uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 transition-all motion-reduce:transition-none motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:ring-amber-500"
          >
            <span>CALCULATE ESTIMATE NOW</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

      </div>
    </section>
  );
};
