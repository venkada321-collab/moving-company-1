import React, { useState } from 'react';
import { CalendarCheck, ShieldCheck, Truck, Sparkles, CheckCircle2, ChevronRight, ArrowUpRight } from 'lucide-react';
import { GEO, LEGAL, BRAND } from '../../../config';

interface HowItWorksProps {
  onStartEstimate: () => void;
  onOpenCOIModal: () => void;
}

export const HowItWorksAccordion: React.FC<HowItWorksProps> = ({ onStartEstimate, onOpenCOIModal }) => {
  const [selectedStep, setSelectedStep] = useState(0);

  const steps = [
    {
      number: 'Phase 01',
      title: 'Automated Cost Calculator & Reservation',
      subtitle: 'All-Inclusive Tariff Guarantee',
      description: `Utilize our executive scheduling console to set your ${GEO.regionName} origins and destinations. Lock in a guaranteed maximum price ceiling with zero unexpected travel surcharges.`,
      icon: CalendarCheck,
      highlights: ['Digital Volume Analysis', 'Zero Rescheduling Penalties', 'Guaranteed Rate Cap']
    },
    {
      number: 'Phase 02',
      title: 'Property Management Certificate Assurance',
      subtitle: 'Executive Skyscraper Compliance',
      description: `We instantaneously file our official ${LEGAL.coiAmountShort} Certificate of Insurance (COI) directly with your property manager, ensuring flawless loading dock and elevator clearances.`,
      icon: ShieldCheck,
      highlights: [`${LEGAL.coiAmountShort} Liability Protection`, 'Custom Concierge Filing in 15 Mins', 'Elevator Interior Protective Wraps'],
      actionLabel: 'Verify COI Coverage',
      onAction: onOpenCOIModal
    },
    {
      number: 'Phase 03',
      title: 'Turnkey Boxing & Custom Wrapping',
      subtitle: 'Specialized Cushioning for Fine Assets',
      description: `Our full-time, vetted ${BRAND.shortName} specialists install neoprene floor pathways and encase every furniture piece inside multi-layered quilted transit blanketing.`,
      icon: Truck,
      highlights: ['Wall & Jamb Corner Protectors', 'Custom Wardrobe Garment Closets', 'Full Component Disassembly']
    },
    {
      number: 'Phase 04',
      title: 'Satellite Tracking & Unpacking Assistance',
      subtitle: 'Express Highway Routing to Destination',
      description: `Monitor your vehicle in real-time across ${GEO.regionName} thoroughfares. Upon arrival, our crew delivers each container to its designated room and reassembles all furnishings.`,
      icon: Sparkles,
      highlights: ['Dedicated Exclusive Vehicle', 'Room-by-Room Placement', 'Final Quality Inspection']
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-neutral-950 text-white border-y border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-primary-400 block mb-3">
            {BRAND.shortName} Executive Protocol
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight uppercase font-['var(--font-heading)']">
            Relocation Executed in Four Phased Stages
          </h2>
        </div>

        {/* Interactive Protocol Workspace (No Standard Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Phase Selector Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = selectedStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedStep(idx)}
                  className={`w-full text-left p-6 rounded-[var(--radius-card)] transition-all flex items-center justify-between border ${
                    isActive
                      ? 'bg-primary-500/10 border-primary-500 text-white shadow-xl translate-x-1'
                      : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${isActive ? 'bg-primary-500 text-white font-black' : 'bg-neutral-800 text-neutral-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className={`text-xs font-mono font-bold uppercase ${isActive ? 'text-primary-400' : 'text-neutral-500'}`}>
                        {step.number}
                      </span>
                      <h3 className="text-base font-bold tracking-tight mt-0.5">{step.title}</h3>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${isActive ? 'text-primary-400 translate-x-1' : 'text-zinc-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Detailed Stage Preview Panel */}
          <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 p-8 sm:p-12 rounded-[var(--radius-card)] shadow-2xl relative overflow-hidden min-h-[380px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-6">
                <div>
                  <span className="text-sm font-mono uppercase text-primary-400 font-extrabold">{steps[selectedStep].number} Specification</span>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1">{steps[selectedStep].title}</h3>
                  <p className="text-neutral-400 text-sm font-semibold mt-0.5">{steps[selectedStep].subtitle}</p>
                </div>
              </div>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed">
                {steps[selectedStep].description}
              </p>

              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-wider text-neutral-500 font-bold mb-3">Protocol Deliverables</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {steps[selectedStep].highlights.map((item, idx) => (
                    <div key={idx} className="bg-neutral-950/60 border border-neutral-800 p-4 rounded-[var(--radius-button)] flex flex-col justify-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary-400 shrink-0" />
                      <span className="text-xs font-bold text-neutral-200">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-neutral-800 mt-8 flex flex-wrap items-center justify-between gap-4">
              {steps[selectedStep].actionLabel ? (
                <button
                  onClick={steps[selectedStep].onAction}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-400 text-white font-black text-xs uppercase tracking-wider rounded-[var(--radius-button)] inline-flex items-center gap-2 transition-transform hover:scale-[1.02]"
                >
                  <span>{steps[selectedStep].actionLabel}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={onStartEstimate}
                  className="px-6 py-3 bg-zinc-900/60 hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-[var(--radius-button)] inline-flex items-center gap-2"
                >
                  <span>Initiate Rate Calculation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
