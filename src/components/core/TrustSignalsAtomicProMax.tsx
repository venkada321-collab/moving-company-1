import React, { useState } from 'react';
import { Star, ShieldCheck, Award, Quote, CheckCircle, ArrowLeft, ArrowRight, Shield, TrendingUp, Users } from 'lucide-react';
import { TESTIMONIALS, AWARDS } from '../../data/mockData';
import { GEO, LEGAL, BRAND, LAYOUT } from '../../config';

export const TrustSignalsAtomicProMax: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const variant = LAYOUT.variants.reviews || 'cards-grid';

  const filters = ['All', 'Condo & High-Rise Move', 'Piano & Heavy Instrument', 'White-Glove Packing', 'Long-Distance Express'];
  const filteredTestimonials = selectedFilter === 'All' 
    ? TESTIMONIALS 
    : TESTIMONIALS.filter(t => t.serviceType === selectedFilter);
  const currentTestimonial = filteredTestimonials[activeTestimonialIdx % filteredTestimonials.length] || TESTIMONIALS[0];

  const handleNext = () => setActiveTestimonialIdx((prev) => (prev + 1) % filteredTestimonials.length);
  const handlePrev = () => setActiveTestimonialIdx((prev) => (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length);

  // ============================================================================
  // 1. STATS RIBBON TICKER (SaaS Social Proof & Numerical Domination)
  // ============================================================================
  if (variant === 'stats-ribbon' || variant === 'stats-ribbon-ticker') {
    return (
      <section className="py-20 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white relative overflow-hidden border-t border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="badge-atomic-pill !bg-primary-500/20 !text-primary-400 !border-primary-500/30 mb-4 inline-block">
              ⚡ LIVE QUANTITATIVE REPUTATION LEDGER
            </span>
            <h2 className="text-3xl sm:text-6xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-primary-400 bg-clip-text text-transparent">
              TRUST BY THE NUMBERS ACROSS {GEO.regionName?.toUpperCase()}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="card-atomic-surface !bg-white dark:bg-neutral-900/90 !p-8 text-center border !border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-primary-500/50 transition-all">
              <div className="text-4xl sm:text-5xl font-black text-primary-400 mb-2">4.9★</div>
              <div className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Verified Rating ({LEGAL.reviewCount}+ reviews)</div>
            </div>
            <div className="card-atomic-surface !bg-white dark:bg-neutral-900/90 !p-8 text-center border !border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-primary-500/50 transition-all">
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 mb-2">{LEGAL.totalMoves}+</div>
              <div className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Flawless Relocations</div>
            </div>
            <div className="card-atomic-surface !bg-white dark:bg-neutral-900/90 !p-8 text-center border !border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-primary-500/50 transition-all">
              <div className="text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white mb-2">100%</div>
              <div className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">WSIB &amp; COI Insured</div>
            </div>
            <div className="card-atomic-surface !bg-white dark:bg-neutral-900/90 !p-8 text-center border !border-neutral-200 dark:border-neutral-800 rounded-3xl hover:border-primary-500/50 transition-all">
              <div className="text-4xl sm:text-5xl font-black text-primary-300 mb-2">$0</div>
              <div className="text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">Transit Damage Deductible</div>
            </div>
          </div>

          {/* Interactive Marquee Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.slice(0, 3).map((t, idx) => (
              <div key={idx} className="p-6 flex flex-col justify-between bg-white dark:bg-neutral-950/80 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
                <div>
                  <div className="flex text-amber-400 mb-4">{'★'.repeat(t.rating)}</div>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed italic mb-6">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200 dark:border-neutral-800 pt-4">
                  <div>
                    <div className="font-extrabold text-sm text-neutral-900 dark:text-white">{t.author}</div>
                    <div className="text-xs text-primary-400 font-medium">{t.location} • {t.serviceType}</div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================================
  // 2. BRUTALIST MONOSPACED AUDIT (Technical Assurance & Inspection Stamps)
  // ============================================================================
  if (variant === 'brutalist-monospaced-audit') {
    return (
      <section className="py-20 bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 font-mono border-t-4 border-b-4 border-black dark:border-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-2 border-black dark:border-white p-8 mb-12 bg-primary-400 text-black">
            <div className="text-xs font-black uppercase tracking-widest mb-2">// LEGAL REPUTATION &amp; AUDIT LEDGER</div>
            <h2 className="text-2xl sm:text-5xl font-black uppercase tracking-tight mb-4">
              ASSURANCES VERIFIED: {BRAND.name}
            </h2>
            <p className="text-sm font-bold">
              REGISTRY STATUS: WSIB ACTIVE ({LEGAL.wsibNumber || 'TR-09884-CA'}) // INSURANCE BOND: $5,000,000 COI COVERAGE // RATING INDEX: 4.98/5.0
            </p>
          </div>

          {/* Awards Ledger Table */}
          <div className="mb-12 border-2 border-black dark:border-white divide-y-2 divide-black dark:divide-white">
            <div className="bg-zinc-800 dark:bg-neutral-50 dark:bg-neutral-900 p-4 font-black text-xs uppercase flex justify-between">
              <span>CERTIFICATE REGISTER / RECOGNITIONS</span>
              <span>VERIFIED ISSUER STATUS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-black dark:divide-white text-xs">
              {AWARDS.slice(0, 4).map((award, i) => (
                <div key={i} className="p-5 flex items-center justify-between bg-white dark:bg-zinc-900/60 dark:bg-white dark:bg-neutral-950">
                  <div>
                    <div className="font-black text-primary-600 dark:text-primary-400 text-sm">{award.title}</div>
                    <div className="text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 dark:text-zinc-400 dark:text-neutral-600 dark:text-neutral-400 font-semibold">{award.organization} &bull; {award.year}</div>
                  </div>
                  <span className="border border-black dark:border-white px-2.5 py-1 font-extrabold bg-neutral-200 dark:bg-neutral-800 text-[10px]">
                    {award.badgeText}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Monospaced Quotations Deck */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TESTIMONIALS.slice(0, 4).map((t, index) => (
              <div key={index} className="border-2 border-black dark:border-white p-6 bg-neutral-50 dark:bg-zinc-900/40 dark:bg-neutral-50 dark:bg-neutral-900 shadow-[6px_6px_0px_#000] dark:shadow-[6px_6px_0px_#fff] relative">
                <div className="text-xs font-black text-primary-600 dark:text-primary-400 uppercase mb-2">
                  // CLIENT FILE #{index + 104} &bull; {t.serviceType.toUpperCase()}
                </div>
                <p className="text-sm font-bold mb-6 leading-relaxed">&quot;{t.text}&quot;</p>
                <div className="border-t border-black dark:border-white pt-4 flex justify-between items-center text-xs font-extrabold">
                  <span>► {t.author.toUpperCase()} ({t.location})</span>
                  <span className="bg-emerald-300 text-black px-2 py-0.5">✔ WSIB VERIFIED</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================================
  // 3. LUXURY EDITORIAL CAROUSEL (High-end Magazine Concierge Style)
  // ============================================================================
  if (variant === 'luxury-editorial-carousel' || variant === 'grid-carousel') {
    return (
      <section className="py-28 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-950/20 via-transparent to-black pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="text-xs font-extrabold uppercase tracking-[0.25em] text-primary-400 mb-3">Verified Client Experiences</div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
              What Our {GEO.regionName} Clients Say
            </h2>
          </div>

          {/* Main Hero Testimonial Stage */}
          <div className="bg-white dark:bg-neutral-950/90 p-10 sm:p-16 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-2xl relative mb-12 backdrop-blur-2xl text-neutral-900 dark:text-white">
            <Quote className="w-16 h-16 text-primary-500/20 absolute top-8 left-8 pointer-events-none" />
            <div className="relative z-10 text-center space-y-8">
              <div className="inline-flex items-center gap-1 text-amber-400 text-xl justify-center">
                {'★'.repeat(currentTestimonial.rating)}
              </div>
              <p className="text-lg sm:text-2xl font-medium text-neutral-100 italic leading-relaxed max-w-3xl mx-auto">
                &ldquo;{currentTestimonial.text}&rdquo;
              </p>
              <div>
                <h3 className="text-xl font-black text-neutral-900 dark:text-white">{currentTestimonial.author}</h3>
                <p className="text-xs text-primary-400 font-extrabold uppercase tracking-widest mt-1">
                  {currentTestimonial.location} &bull; {currentTestimonial.serviceType}
                </p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-10 border-t border-neutral-200 dark:border-neutral-800 pt-6">
              <button onClick={handlePrev} className="p-3 rounded-full bg-neutral-50 dark:bg-black hover:bg-neutral-800 text-white border border-neutral-700 transition-colors flex items-center gap-2 text-xs font-bold px-5">
                <ArrowLeft className="w-4 h-4" /> Previous Review
              </button>
              <div className="text-xs text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 font-bold">
                {activeTestimonialIdx + 1} of {filteredTestimonials.length}
              </div>
              <button onClick={handleNext} className="p-3 rounded-full bg-neutral-50 dark:bg-black hover:bg-neutral-800 text-white border border-neutral-700 transition-colors flex items-center gap-2 text-xs font-bold px-5">
                Next Review <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bottom Trust Badge Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-neutral-600 dark:text-neutral-400">
            {AWARDS.map((a, i) => (
              <div key={i} className="bg-white dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-200 dark:border-neutral-800/80 p-4 rounded-2xl flex flex-col items-center justify-center">
                <span className="text-xl mb-1">{a.logo}</span>
                <span className="font-extrabold text-neutral-700 dark:text-neutral-300 text-xs">{a.title}</span>
                <span className="text-[10px] text-primary-400">{a.badgeText} ({a.year})</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ============================================================================
  // 4-6. CARDS-GRID & SPLIT PORTAL FALLBACK (Standard High-Converting Wall)
  // ============================================================================
  return (
    <section className="py-20 bg-slate-50 dark:bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 relative overflow-hidden border-t border-neutral-200 dark:border-zinc-800 dark:border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="badge-atomic-pill mb-3 inline-flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" /> VERIFIED REPUTATION &amp; LICENSING
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight font-heading">
            TRUSTED BY <span className="text-primary-600 dark:text-primary-400">{LEGAL.totalMoves} {GEO.regionName?.toUpperCase()} RESIDENTS</span> &amp; BUSINESSES
          </h2>
          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 dark:text-zinc-400 dark:text-neutral-600 dark:text-neutral-400 font-medium">
            Inspect our recent verified customer reviews, condo concierge feedback, and active insurance credentials.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setSelectedFilter(f); setActiveTestimonialIdx(0); }}
              className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all ${
                selectedFilter === f ? 'btn-atomic-primary shadow-lg' : 'bg-white dark:bg-zinc-900/60 dark:bg-neutral-50 dark:bg-neutral-900 text-neutral-600 dark:text-zinc-300 dark:text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-zinc-800 dark:border-neutral-200 dark:border-neutral-800 hover:border-primary-500'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Reviews Wall Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTestimonials.map((item, index) => (
            <div key={index} className="card-atomic-surface !p-6 sm:!p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 shadow-md">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-400 text-sm">{'★'.repeat(item.rating)}</div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    Verified Transit
                  </span>
                </div>
                <p className="text-sm text-neutral-600 dark:text-zinc-300 dark:text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 italic">&ldquo;{item.text}&rdquo;</p>
              </div>
              <div className="border-t border-neutral-100 dark:border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-sm text-neutral-900 dark:text-white dark:text-neutral-900 dark:text-white">{item.author}</h4>
                  <p className="text-xs font-semibold text-primary-600 dark:text-primary-400">{item.location} &bull; {item.serviceType}</p>
                </div>
                <CheckCircle className="w-5 h-5 text-primary-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Awards Badges Deck */}
        <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white p-8 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
          <div className="text-center mb-8">
            <h3 className="text-lg sm:text-xl font-extrabold">Official Industry Recognitions &amp; Insurance Status</h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">WSIB Licensed &bull; $1,000,000+ Zero-Deductible Cargo Insurance &bull; BBB Accredited</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {AWARDS.map((award) => (
              <div key={award.id} className="bg-white dark:bg-neutral-950 p-5 rounded-2xl text-center border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/50 transition-colors">
                <div className="text-3xl mb-2">{award.logo}</div>
                <span className="text-[10px] font-black uppercase tracking-wider text-black bg-primary-400 px-2 py-0.5 rounded-full inline-block mb-2">
                  {award.badgeText}
                </span>
                <h4 className="text-sm font-black text-neutral-900 dark:text-white">{award.title}</h4>
                <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">{award.organization} &bull; {award.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
