import React, { useState } from 'react';
import { Building2, Music, Truck, PackageCheck, CheckCircle2, Shield, ArrowRight, HelpCircle, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { SERVICE_NICHES } from '../../../data/mockData';
import { GEO, LEGAL, BRAND } from '../../../config';
import { THEME } from '../../../config/theme';
import { LAYOUT } from '../../../config/layout';

interface ServiceNichesPageProps {
  onSelectNicheForEstimate: (nicheId: string) => void;
  onOpenCOIModal: () => void;
}

export const ServiceNichesPage: React.FC<ServiceNichesPageProps> = ({ onSelectNicheForEstimate, onOpenCOIModal }) => {
  const [activeNicheId, setActiveNicheId] = useState<string>('condo-moves');
  const [openAccordionId, setOpenAccordionId] = useState<string>('condo-moves');
  
  let servicesVariant = LAYOUT.variants.services || 'icon-grid';

  // POLYMORPHIC PARADIGM OVERRIDE
  if (THEME.paradigm === 'SplitScreenSaaS') {
    servicesVariant = 'icon-grid';
  } else if (THEME.paradigm === 'LuxuryEditorial') {
    servicesVariant = 'accordion-panels';
  } else if (THEME.paradigm === 'NeoBrutalist') {
    servicesVariant = 'horizontal-cards';
  } else if (THEME.paradigm === 'CinematicTrust') {
    servicesVariant = 'icon-grid';
  }
  
  const selectedNiche = SERVICE_NICHES.find(n => n.id === activeNicheId) || SERVICE_NICHES[0];

  return (
    <div className="py-12 border-b border-neutral-200 dark:border-zinc-800" style={{ backgroundColor: THEME.backgrounds.sectionAlt, color: (THEME.colors.primary as string) === 'white' ? 'black' : 'inherit' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 border border-neutral-200 dark:border-zinc-800 text-primary-700 text-xs font-bold uppercase tracking-widest mb-3">
            SPECIALIZED MOVING NICHES
          </div>
          <h2 className="heading-scale animate-paradigm-entrance" style={{ fontFamily: 'var(--font-heading)' }}>
            TAILORED CARE FOR <span className="text-primary-600 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">EVERY {GEO.regionName} SERVICE NICHE</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 dark:text-zinc-400">
            Explore our specialized moving capabilities, high-rise building protocols, and transparent base rates.
          </p>
        </div>

        {/* VARIANT 1: STANDARD ICON GRID & DEDICATED VIEW */}
        {servicesVariant === 'icon-grid' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 -space-y-4 md:space-y-0 md:-space-x-4 hover:space-x-0 transition-all duration-500 w-full mb-10">
              {SERVICE_NICHES.map((niche) => {
                const isActive = niche.id === activeNicheId;
                return (
                  <button
                    key={niche.id}
                    type="button"
                    onClick={() => setActiveNicheId(niche.id)}
                    className={`p-4 rounded-2xl border text-left transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white ${
                      isActive
                        ? 'bg-white dark:bg-black text-primary-400 font-bold border-black shadow-lg'
                        : 'bg-neutral-50 dark:bg-zinc-900 border-neutral-200 dark:border-zinc-800 text-neutral-600 dark:text-zinc-300 hover:border-primary-400'
                    }`}
                  >
                    <div className="mb-2">
                      {niche.id === 'condo-moves' ? (
                        <Building2 className={`w-6 h-6 ${isActive ? 'text-primary-400' : 'text-neutral-600 dark:text-neutral-400'}`} aria-hidden="true" />
                      ) : niche.id === 'piano-moves' ? (
                        <Music className={`w-6 h-6 ${isActive ? 'text-primary-400' : 'text-neutral-600 dark:text-neutral-400'}`} aria-hidden="true" />
                      ) : niche.id === 'long-distance' ? (
                        <Truck className={`w-6 h-6 ${isActive ? 'text-primary-400' : 'text-neutral-600 dark:text-neutral-400'}`} aria-hidden="true" />
                      ) : (
                        <PackageCheck className={`w-6 h-6 ${isActive ? 'text-primary-400' : 'text-neutral-600 dark:text-neutral-400'}`} aria-hidden="true" />
                      )}
                    </div>
                    <div className="text-sm font-extrabold font-['Montserrat',sans-serif] line-clamp-1">{niche.name}</div>
                    <div className={`text-[11px] mt-1 ${isActive ? 'text-primary-400/90 font-semibold' : 'text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400'}`}>
                      From ${niche.baseRate}/hr
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Niche Main Landing View */}
            <div className="bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-sm p-6 sm:p-10 shadow-2xl shadow-primary-900/10 space-y-8 text-neutral-900 dark:text-white">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-primary-100">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white dark:bg-black text-primary-400 font-bold text-xs px-3 py-1 rounded-full border border-black">
                      DEDICATED LANDING PAGE
                    </span>
                    <span className="text-xs text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 dark:text-zinc-400 font-semibold">• {selectedNiche.extraFees}</span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                    {selectedNiche.name}
                  </h2>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {selectedNiche.id === 'condo-moves' && (
                    <button
                      type="button"
                      onClick={onOpenCOIModal}
                      className="bg-white dark:bg-black text-primary-400 hover:bg-neutral-800 px-5 py-3 rounded-2xl text-xs font-extrabold flex items-center gap-2 transition-colors min-h-[44px] shadow-lg shadow-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                    >
                      <Shield className="w-4 h-4" aria-hidden="true" />
                      Issue {LEGAL.coiAmountShort} Condo COI
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onSelectNicheForEstimate(selectedNiche.id)}
                    className="bg-primary-400 hover:bg-primary-500 text-black px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary-500/20 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 transition-all"
                  >
                    <span>Book This Niche</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedNiche.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                      Included Standards & Equipment Specs:
                    </h3>
                    {selectedNiche.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 bg-primary-50/50 p-3.5 rounded-xl border border-neutral-200 dark:border-zinc-800">
                        <div className="bg-primary-100 p-1 rounded-full shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-primary-600" aria-hidden="true" />
                        </div>
                        <span className="text-xs text-neutral-600 dark:text-zinc-300 font-medium leading-normal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 space-y-6">
                  <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-primary-100/80 to-primary-50 p-6 rounded-2xl border border-primary-300 text-neutral-900 dark:text-white shadow-sm">
                    {selectedNiche.stats.map((st, i) => (
                      <div key={i} className="text-center">
                        <div className="text-lg sm:text-xl font-black text-black" style={{ fontFamily: 'var(--font-heading)' }}>{st.value}</div>
                        <div className="text-[10px] font-bold text-primary-950/70 mt-0.5 leading-tight">{st.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-primary-50/60 border border-neutral-200 dark:border-zinc-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-primary-700 uppercase tracking-wider">
                      <HelpCircle className="w-4 h-4 text-primary-600" aria-hidden="true" />
                      Expert Moving Tips for {selectedNiche.name}:
                    </div>
                    <ul className="space-y-2 text-xs text-neutral-600 dark:text-zinc-300">
                      {selectedNiche.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary-600 font-bold mt-0.5">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedNiche.id === 'condo-moves' && (
                    <div className="bg-white dark:bg-black border border-black p-4 rounded-2xl text-xs space-y-2 shadow-xl">
                      <div className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary-400" aria-hidden="true" />
                        Instant COI Generator Active
                      </div>
                      <p className="text-neutral-300 text-[11px]">
                        Need a {LEGAL.coiAmount} Certificate of Insurance sent directly to your concierge at {GEO.sampleCondoAddresses}?
                      </p>
                      <button
                        type="button"
                        onClick={onOpenCOIModal}
                        className="text-primary-400 hover:text-primary-300 font-bold underline underline-offset-2 text-xs block min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                      >
                        Open Instant COI Request Form →
                      </button>
                    </div>
                  )}

                  {/* Contextual Niche Art */}
                  <div className="mt-6 rounded-2xl overflow-hidden h-64 relative border border-neutral-200 dark:border-zinc-800 shadow-xl hidden sm:block">
                    <img 
                      src={THEME.customArt?.serviceNiches || "https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&q=80"}
                      alt={selectedNiche.name}
                      className="content-art-layer niche-art absolute inset-0 w-full h-full object-cover"
                    />
                  </div>

                </div>
              </div>
            </div>
          </>
        )}

        {/* VARIANT 2: HORIZONTAL CONCIERGE CARDS */}
        {servicesVariant === 'horizontal-cards' && (
          <div className="space-y-8">
            {SERVICE_NICHES.map((niche, idx) => (
              <div key={niche.id} className="bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 rounded-sm p-8 sm:p-10 shadow-xl flex flex-col lg:flex-row gap-8 items-center text-neutral-900 dark:text-white">
                <div className={`w-full lg:w-3/5 space-y-4 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-primary-400 text-black font-black text-xs">
                      From ${niche.baseRate}/hr
                    </span>
                    <span className="text-xs text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 font-bold">{niche.extraFees}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>{niche.name}</h3>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-zinc-300 leading-relaxed">{niche.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                    {niche.features.slice(0, 4).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-zinc-200 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`w-full lg:w-2/5 bg-neutral-100 dark:bg-neutral-950 text-neutral-900 dark:text-white rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-6 shadow-xl ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-primary-400 uppercase tracking-wider">Concierge Guarantee</div>
                    <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Equipped for premium {GEO.regionName} routes with full cargo protection.</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectNicheForEstimate(niche.id)}
                      className="w-full min-h-[44px] bg-primary-400 hover:bg-primary-300 text-black font-extrabold rounded-xl py-3 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
                    >
                      <span>Reserve Team</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    {niche.id === 'condo-moves' && (
                      <button
                        type="button"
                        onClick={onOpenCOIModal}
                        className="min-h-[44px] px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-primary-400 font-bold rounded-xl text-xs"
                      >
                        COI
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VARIANT 3: EXPANDABLE ACCORDION PANELS */}
        {servicesVariant === 'accordion-panels' && (
          <div className="max-w-4xl mx-auto space-y-4">
            {SERVICE_NICHES.map((niche) => {
              const isOpen = openAccordionId === niche.id;
              return (
                <div key={niche.id} className="bg-white dark:bg-zinc-950 border border-neutral-200 dark:border-zinc-800 hover:border-primary-300 rounded-2xl overflow-hidden transition-all shadow-md">
                  <button
                    type="button"
                    onClick={() => setOpenAccordionId(isOpen ? '' : niche.id)}
                    className={`w-full p-6 text-left flex items-center justify-between gap-4 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${isOpen ? 'bg-white dark:bg-black text-primary-400 font-bold' : 'bg-white dark:bg-zinc-950 text-neutral-900 dark:text-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${isOpen ? 'bg-primary-400 text-black' : 'bg-primary-100 text-primary-800'}`}>
                        {niche.name[0]}
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-black" style={{ fontFamily: 'var(--font-heading)' }}>{niche.name}</h3>
                        <div className={`text-xs ${isOpen ? 'text-neutral-700 dark:text-neutral-300 font-normal' : 'text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400'}`}>Base Rate: ${niche.baseRate}/hr • {niche.extraFees}</div>
                      </div>
                    </div>
                    {isOpen ? <ChevronUp className="w-6 h-6 text-primary-400" /> : <ChevronDown className="w-6 h-6 text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-6 sm:p-8 bg-neutral-50 dark:bg-zinc-900 border-t border-neutral-200 dark:border-zinc-800 space-y-6 text-neutral-900 dark:text-white">
                      <p className="text-sm text-neutral-600 dark:text-zinc-300 leading-relaxed font-medium">{niche.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {niche.features.map((f, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs bg-white dark:bg-zinc-900/60 p-3 rounded-xl border border-neutral-200 dark:border-zinc-800 font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-end gap-4 pt-4 border-t border-neutral-200 dark:border-zinc-800">
                        {niche.id === 'condo-moves' && (
                          <button
                            type="button"
                            onClick={onOpenCOIModal}
                            className="min-h-[44px] px-5 py-2.5 bg-white dark:bg-black text-primary-400 rounded-xl font-bold text-xs flex items-center gap-2"
                          >
                            <Shield className="w-4 h-4" />
                            Request Condo COI
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => onSelectNicheForEstimate(niche.id)}
                          className="min-h-[44px] px-6 py-2.5 bg-primary-400 hover:bg-primary-500 text-black font-black rounded-xl text-xs uppercase tracking-wider flex items-center gap-2"
                        >
                          <span>Select This Service</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};
