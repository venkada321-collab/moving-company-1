import React, { useState } from 'react';
import { MapPin, Navigation, Clock, DollarSign, ArrowRight, Star, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SEO_ROUTES } from '../../../data/mockData';
import { GEO } from '../../../config';

interface GTARoutesPageProps {
  onSelectRouteForEstimate: (from: string, to: string) => void;
}

export const GTARoutesPage: React.FC<GTARoutesPageProps> = ({ onSelectRouteForEstimate }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>(SEO_ROUTES[0].id);

  const activeRoute = SEO_ROUTES.find(r => r.id === selectedRouteId) || SEO_ROUTES[0];

  return (
    <div className="bg-zinc-900/60 text-white min-h-[600px] py-12 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-100 border border-primary-300 text-primary-900 text-xs font-bold uppercase tracking-widest mb-3">
            {GEO.regionName} & ONTARIO CORRIDOR ROUTES
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-['Montserrat',sans-serif]">
            POPULAR <span className="text-primary-600">{GEO.regionFull.toUpperCase()}</span> & LONG-DISTANCE ROUTES
          </h2>
          <p className="mt-3 text-sm text-zinc-400">
            Compare average completion times, highway toll routing ({GEO.highways}), and real client costs across Southern Ontario & interprovincial corridors.
          </p>
        </div>

        {/* Route Selector Cards Grid */}
        <div className="flex flex-wrap md:flex-nowrap justify-between gap-4 p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/60 dark:bg-slate-900/60 mb-10">
          {SEO_ROUTES.map((route) => {
            const isSelected = route.id === selectedRouteId;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedRouteId(route.id)}
                className={`p-5 rounded-3xl border text-left transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white focus-visible:ring-offset-2 motion-reduce:transition-none ${
                  isSelected
                    ? 'bg-gradient-to-br from-primary-100 via-primary-50 to-white border-2 border-primary-400 shadow-xl shadow-primary-500/10 text-white'
                    : 'bg-zinc-900/60 hover:bg-primary-50/40 border border-zinc-800 hover:border-primary-300 shadow-md text-zinc-200'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <span className="bg-primary-100 text-primary-900 px-2.5 py-1 rounded-lg border border-zinc-800">
                    {route.distance} km ({Math.round(route.distance * 0.621)} mi)
                  </span>
                  <span className="opacity-80 font-semibold">Est. ~{route.estHours} Hours</span>
                </div>

                <div className="flex items-center gap-2 text-sm sm:text-base font-black text-current font-['Montserrat',sans-serif] mb-1">
                  <span>{route.fromCity}</span>
                  <ArrowRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-primary-600' : 'text-primary-500'}`} aria-hidden="true" />
                  <span>{route.toCity}</span>
                </div>

                <div className={`text-xs font-bold mt-2 ${isSelected ? 'text-primary-600' : 'opacity-80'}`}>
                  Avg Rate: {route.avgCostRange}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Route Spotlight Panel */}
        <div className="bg-zinc-900/60 rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-2xl shadow-primary-900/10 text-white space-y-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-primary-600 mb-2">
                <Navigation className="w-4 h-4" aria-hidden="true" />
                ROUTE EXPLORER DETAILS
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-black font-['Montserrat',sans-serif] flex flex-wrap items-center gap-3">
                <span>{activeRoute.fromCity}</span>
                <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-primary-500 shrink-0" aria-hidden="true" />
                <span>{activeRoute.toCity}</span>
              </h2>
            </div>

            <button
              type="button"
              onClick={() => onSelectRouteForEstimate(activeRoute.fromCity, activeRoute.toCity)}
              className="bg-primary-400 hover:bg-primary-500 text-black px-6 py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-primary-500/20 shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white"
            >
              <span>Book This Exact Route</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side details */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {activeRoute.description}
              </p>

              {/* Route Highlights */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-primary-600 uppercase tracking-wider font-['Montserrat',sans-serif]">
                  Route Optimization & Special Logistics:
                </h3>
                {activeRoute.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 bg-primary-50/50 p-3.5 rounded-xl border border-zinc-800">
                    <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-xs text-zinc-300 font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side route stats & story */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Route Metric Cards */}
              <div className="grid grid-cols-3 gap-3 bg-primary-50/50 p-4 rounded-2xl border border-zinc-800 text-center">
                <div>
                  <div className="text-lg font-black text-black font-['Montserrat',sans-serif]">{activeRoute.distance} km</div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Distance</div>
                </div>
                <div>
                  <div className="text-lg font-black text-primary-600 font-['Montserrat',sans-serif]">~{activeRoute.estHours} hrs</div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Est. Completion</div>
                </div>
                <div>
                  <div className="text-lg font-black text-emerald-600 font-['Montserrat',sans-serif]">{activeRoute.avgCostRange}</div>
                  <div className="text-[10px] text-zinc-400 font-bold uppercase mt-1">Est. Cost Range</div>
                </div>
              </div>

              {/* Client Story snippet on this route */}
              {activeRoute.testimonials.length > 0 && (
                <div className="bg-primary-50/60 border-l-4 border-primary-400 p-4 rounded-r-xl text-zinc-300 italic space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-primary-900 bg-primary-200 px-2.5 py-0.5 rounded-full not-italic">
                      Verified Client Story
                    </span>
                    <div className="flex text-primary-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-primary-500" aria-hidden="true" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 italic leading-relaxed">
                    "{activeRoute.testimonials[0].text}"
                  </p>

                  <div className="text-xs font-bold text-black pt-2 border-t border-zinc-800 not-italic">
                    {activeRoute.testimonials[0].author} • <span className="text-zinc-400 font-normal">{activeRoute.testimonials[0].date}</span>
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
