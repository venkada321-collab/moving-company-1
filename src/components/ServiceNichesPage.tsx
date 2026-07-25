import React, { useState } from 'react';
import { Building2, Music, Truck, PackageCheck, CheckCircle2, Shield, ArrowRight, HelpCircle, FileText } from 'lucide-react';
import { SERVICE_NICHES } from '../data/mockData';
import { GEO, LEGAL } from '../config';

interface ServiceNichesPageProps {
  onSelectNicheForEstimate: (nicheId: string) => void;
  onOpenCOIModal: () => void;
}

export const ServiceNichesPage: React.FC<ServiceNichesPageProps> = ({ onSelectNicheForEstimate, onOpenCOIModal }) => {
  const [activeNicheId, setActiveNicheId] = useState<string>('condo-moves');

  const selectedNiche = SERVICE_NICHES.find(n => n.id === activeNicheId) || SERVICE_NICHES[0];

  return (
    <div className="py-12 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            SPECIALIZED MOVING NICHES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit']">
            TAILORED CARE FOR <span className="text-amber-400">EVERY {GEO.regionName} SERVICE NICHE</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Select a service category below to view detailed equipment specs, high-rise policies, pricing tiers, and expert tips.
          </p>
        </div>

        {/* Niche Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {SERVICE_NICHES.map((niche) => {
            const isActive = niche.id === activeNicheId;
            return (
              <button
                key={niche.id}
                type="button"
                onClick={() => setActiveNicheId(niche.id)}
                className={`p-4 rounded-2xl border text-left transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 motion-reduce:transition-none ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 font-bold border-amber-400 shadow-xl shadow-amber-400/20'
                    : 'bg-[#131927] text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="mb-2">
                  {niche.id === 'condo-moves' ? (
                    <Building2 className={`w-6 h-6 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} aria-hidden="true" />
                  ) : niche.id === 'piano-moves' ? (
                    <Music className={`w-6 h-6 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} aria-hidden="true" />
                  ) : niche.id === 'long-distance' ? (
                    <Truck className={`w-6 h-6 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} aria-hidden="true" />
                  ) : (
                    <PackageCheck className={`w-6 h-6 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} aria-hidden="true" />
                  )}
                </div>
                <div className="text-sm font-extrabold font-['Outfit'] line-clamp-1">{niche.name}</div>
                <div className={`text-[11px] mt-1 ${isActive ? 'text-slate-900 font-semibold' : 'text-amber-400'}`}>
                  From ${niche.baseRate}/hr
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Niche Main Landing View */}
        <div className="bg-[#131927] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Top Title Bar */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-amber-400/10 text-amber-400 font-bold text-xs px-3 py-1 rounded-full border border-amber-400/20">
                  DEDICATED LANDING PAGE
                </span>
                <span className="text-xs text-slate-300 font-semibold">• {selectedNiche.extraFees}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
                {selectedNiche.name}
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {selectedNiche.id === 'condo-moves' && (
                <button
                  type="button"
                  onClick={onOpenCOIModal}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-colors min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 motion-reduce:transition-none"
                >
                  <Shield className="w-4 h-4" aria-hidden="true" />
                  Issue {LEGAL.coiAmountShort} Condo COI
                </button>
              )}

              <button
                type="button"
                onClick={() => onSelectNicheForEstimate(selectedNiche.id)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <span>Book This Niche</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Description & Key Stats Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {selectedNiche.description}
              </p>

              {/* Feature Check List */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider font-['Outfit'] text-amber-400">
                  Included Standards & Equipment Specs:
                </h3>
                {selectedNiche.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#1c2438] p-3.5 rounded-xl border border-slate-700/80">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs text-slate-200 font-medium leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Key Stats & Expert Tips */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Stat Cards */}
              <div className="grid grid-cols-3 gap-3 bg-[#1c2438] p-4 rounded-2xl border border-slate-700">
                {selectedNiche.stats.map((st, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg sm:text-xl font-black text-amber-400 font-['Outfit']">{st.value}</div>
                    <div className="text-[10px] font-semibold text-slate-300 mt-0.5 leading-tight">{st.label}</div>
                  </div>
                ))}
              </div>

              {/* Expert Moving Tips Box */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-amber-400" aria-hidden="true" />
                  Expert Moving Tips for {selectedNiche.name}:
                </div>
                <ul className="space-y-2 text-xs text-slate-300">
                  {selectedNiche.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* COI Banner inside Condo view */}
              {selectedNiche.id === 'condo-moves' && (
                <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-xs space-y-2">
                  <div className="font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                    Instant COI Generator Active
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Need a {LEGAL.coiAmount} Certificate of Insurance sent directly to your concierge at {GEO.sampleCondoAddresses}?
                  </p>
                  <button
                    type="button"
                    onClick={onOpenCOIModal}
                    className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 text-xs block min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    Open Instant COI Request Form →
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
