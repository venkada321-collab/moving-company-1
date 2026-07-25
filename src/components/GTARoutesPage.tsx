import React, { useState } from 'react';
import { MapPin, Navigation, Clock, DollarSign, ArrowRight, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEO_ROUTES } from '../data/mockData';
import { GEO } from '../config';

interface GTARoutesPageProps {
  onSelectRouteForEstimate: (from: string, to: string) => void;
}

export const GTARoutesPage: React.FC<GTARoutesPageProps> = ({ onSelectRouteForEstimate }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(SEO_ROUTES[0].id);

  const activeRoute = SEO_ROUTES.find(r => r.id === selectedRouteId) || SEO_ROUTES[0];

  return (
    <div className="py-12 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            {GEO.regionName} & ONTARIO CORRIDOR ROUTES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit']">
            POPULAR <span className="text-amber-400">{GEO.regionFull.toUpperCase()}</span> & LONG-DISTANCE ROUTES
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Compare average completion times, highway toll routing ({GEO.highways}), and real client costs across Southern Ontario & interprovincial corridors.
          </p>
        </div>

        {/* Route Selector Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {SEO_ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-5 rounded-3xl border text-left transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 motion-reduce:transition-none ${
                  isSelected
                    ? 'bg-amber-400/10 border-amber-400 text-white shadow-xl shadow-amber-400/10'
                    : 'bg-[#131927] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-2">
                  <span className="bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-700">
                    {route.distance} km ({Math.round(route.distance * 0.621)} mi)
                  </span>
                  <span className="text-slate-300">Est. ~{route.estHours} Hours</span>
                </div>

                <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-white font-['Outfit'] mb-1">
                  <span>{route.fromCity}</span>
                  <ArrowRight className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
                  <span>{route.toCity}</span>
                </div>

                <div className="text-xs font-bold text-amber-400/90 mt-2">
                  Avg Rate: {route.avgCostRange}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Route Spotlight Panel */}
        <div className="bg-[#131927] border border-slate-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-2">
                <Navigation className="w-4 h-4" aria-hidden="true" />
                ROUTE EXPLORER DETAILS
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white font-['Outfit'] flex flex-wrap items-center gap-3">
                <span>{activeRoute.fromCity}</span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400 shrink-0" aria-hidden="true" />
                <span>{activeRoute.toCity}</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onSelectRouteForEstimate(activeRoute.fromCity, activeRoute.toCity)}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20 shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <span>Book This Exact Route</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side details */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                {activeRoute.description}
              </p>

              {/* Route Highlights */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider font-['Outfit']">
                  Route Optimization & Special Logistics:
                </h3>
                {activeRoute.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#1c2438] p-3.5 rounded-xl border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs text-slate-200 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side route stats & story */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Route Metric Cards */}
              <div className="grid grid-cols-3 gap-3 bg-[#1c2438] p-4 rounded-2xl border border-slate-700 text-center">
                <div>
                  <div className="text-lg font-black text-white font-['Outfit']">{activeRoute.distance} km</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase mt-1">Distance</div>
                </div>
                <div>
                  <div className="text-lg font-black text-amber-400 font-['Outfit']">~{activeRoute.estHours} hrs</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase mt-1">Est. Completion</div>
                </div>
                <div>
                  <div className="text-lg font-black text-emerald-400 font-['Outfit']">{activeRoute.avgCostRange}</div>
                  <div className="text-[10px] text-slate-300 font-bold uppercase mt-1">Est. Cost Range</div>
                </div>
              </div>

              {/* Client Story snippet on this route */}
              {activeRoute.testimonials.length > 0 && (
                <div className="bg-slate-900 border border-slate-700 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full">
                      Verified Client Story
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" aria-hidden="true" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 italic leading-relaxed">
                    "{activeRoute.testimonials[0].text}"
                  </p>

                  <div className="text-xs font-bold text-white pt-2 border-t border-slate-800">
                    {activeRoute.testimonials[0].author} • <span className="text-slate-300 font-normal">{activeRoute.testimonials[0].date}</span>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
