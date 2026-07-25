import React, { useState } from 'react';
import { Star, ShieldCheck, Award, Quote, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { TESTIMONIALS, AWARDS } from '../data/mockData';
import { GEO, LEGAL } from '../config';

export const TrustSignals: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);

  const filters = ['All', 'Condo & High-Rise Move', 'Piano & Heavy Instrument', 'White-Glove Packing', 'Long-Distance Express'];

  const filteredTestimonials = selectedFilter === 'All' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.serviceType === selectedFilter);

  const currentTestimonial = filteredTestimonials[activeTestimonialIdx % filteredTestimonials.length] || TESTIMONIALS[0];

  return (
    <section className="py-20 bg-[#0b0f19] border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" aria-hidden="true" /> VERIFIED TRUST & REPUTATION
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit']">
            TRUSTED BY <span className="text-amber-400">{LEGAL.totalMoves} {GEO.regionName} RESIDENTS</span> & CONDO BOARDS
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Read verified reviews from homeowners, condo concierges, and musicians across {GEO.subRegions}.
          </p>
        </div>

        {/* Awards Ticker Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {AWARDS.map((award) => (
            <div
              key={award.id}
              className="bg-[#131927] border border-slate-800 hover:border-amber-400/40 rounded-2xl p-5 text-center transition-all motion-reduce:transition-none group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform motion-reduce:transition-none motion-reduce:group-hover:transform-none" aria-hidden="true">{award.logo}</div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full inline-block mb-1.5">
                {award.badgeText}
              </span>
              <h4 className="text-sm font-extrabold text-white font-['Outfit']">{award.title}</h4>
              <div className="text-[11px] text-slate-300 mt-0.5">{award.organization}</div>
              <div className="text-[10px] font-bold text-slate-400 mt-1">{award.year}</div>
            </div>
          ))}
        </div>

        {/* Main Trust Highlight Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131927] border border-slate-700/80 rounded-3xl p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
          
          {/* Left Column: Google Rating Score */}
          <div className="lg:col-span-4 bg-slate-900/90 border border-slate-700 rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400" aria-hidden="true" />
              ))}
            </div>
            <div className="text-5xl font-black text-white font-['Outfit']">{LEGAL.starRatingDisplay}</div>
            <div className="text-xs font-bold text-amber-400 mt-1">VERIFIED HIGH-RATING SCORE</div>
            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Based on {LEGAL.reviewCount} combined reviews on {LEGAL.reviewPlatforms}.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center gap-3 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle className="w-4 h-4" aria-hidden="true" /> {LEGAL.wsibCovered}
              </span>
              <span className="text-slate-600">•</span>
              <span>{`${LEGAL.coiAmountShort} COI Bonded`}</span>
            </div>
          </div>

          {/* Right Column: Featured Testimonial Slider */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
              {filters.map((f) => (
                <button
                  type="button"
                  key={f}
                  onClick={() => {
                    setSelectedFilter(f);
                    setActiveTestimonialIdx(0);
                  }}
                  className={`px-3.5 py-1.5 min-h-[44px] rounded-full text-xs font-bold whitespace-nowrap transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    selectedFilter === f
                      ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                      : 'bg-slate-800/60 text-slate-300 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Testimonial Quote Card */}
            <div className="bg-[#1c2438]/80 border border-slate-700/80 rounded-2xl p-6 relative">
              <Quote className="w-10 h-10 text-amber-400/20 absolute top-4 right-4" aria-hidden="true" />

              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 mb-3">
                <span className="bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                  {currentTestimonial.serviceType}
                </span>
                <span className="text-slate-300 font-normal">• {currentTestimonial.location}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-100 font-medium italic leading-relaxed mb-6">
                "{currentTestimonial.text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-700/80">
                <div className="flex items-center gap-3">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-amber-400"
                  />
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      {currentTestimonial.author}
                      {currentTestimonial.verified && (
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" aria-hidden="true" /> Verified {GEO.regionName} Move
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-300">{currentTestimonial.role} • {currentTestimonial.date}</div>
                  </div>
                </div>

                {/* Arrow Navigation */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTestimonialIdx(prev => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Previous Testimonial"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTestimonialIdx(prev => (prev + 1) % filteredTestimonials.length)}
                    className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    aria-label="Next Testimonial"
                  >
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Security & Insurance Guarantees Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300">
          <div className="flex items-start gap-3 bg-[#131927] p-5 rounded-2xl border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">{LEGAL.damageFreeGuarantee}</h4>
              <p className="text-xs text-slate-300 mt-1">Full replacement value protection option with zero deductible hassle.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#131927] p-5 rounded-2xl border border-slate-800">
            <Award className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">{LEGAL.backgroundChecked}</h4>
              <p className="text-xs text-slate-300 mt-1">Every mover is directly employed, drug-tested, and professionally trained.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-[#131927] p-5 rounded-2xl border border-slate-800">
            <Star className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h4 className="text-sm font-bold text-white font-['Outfit']">Fast Free Condo COI</h4>
              <p className="text-xs text-slate-300 mt-1">Direct PDF transmission to your property manager with {LEGAL.coiAmountShort} liability coverage.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
