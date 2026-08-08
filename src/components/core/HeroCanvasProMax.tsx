import React from 'react';
import { MapPin, ShieldCheck, Star, Truck, Box, Navigation, Award, Compass, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { GEO, BRAND, LEGAL } from '../../config';

interface HeroCanvasProMaxProps {
  variant?: string;
}

export const HeroCanvasProMax: React.FC<HeroCanvasProMaxProps> = ({ variant = 'logistics-radar-grid' }) => {
  // We handle both legacy background tokens and our rich 6 new interactive canvas compositions
  
  if (variant === 'logistics-radar-grid') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-white dark:bg-neutral-950 text-emerald-400">
        {/* Animated Radar Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#052e16_1px,transparent_1px),linear-gradient(to_bottom,#052e16_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        
        {/* Rotating Radar Sweep Simulation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-emerald-500/20 shadow-[0_0_100px_rgba(16,185,129,0.1)_inset]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-emerald-500/30 border-dashed animate-[spin_40s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] rounded-full border border-emerald-500/40" />

        {/* Floating Telemetry City Nodes */}
        <div className="absolute top-1/4 left-1/4 animate-bounce duration-1000 hidden md:flex items-center gap-2 bg-white dark:bg-neutral-900/90 border border-emerald-500/50 px-3 py-1.5 rounded-full shadow-lg pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono font-bold text-neutral-900 dark:text-white uppercase">{GEO.regionName} Dispatch Node 01</span>
        </div>

        <div className="absolute bottom-1/3 right-1/4 animate-pulse hidden md:flex items-center gap-2 bg-white dark:bg-neutral-900/90 border border-emerald-500/50 px-3 py-1.5 rounded-full shadow-lg pointer-events-auto">
          <Truck className="w-3.5 h-3.5 text-primary-400" />
          <span className="text-[11px] font-mono font-bold text-neutral-200 uppercase">Unit #409 • highway express active</span>
        </div>

        <div className="absolute top-1/3 right-1/6 hidden lg:flex items-center gap-2 bg-white dark:bg-black/80 border border-neutral-700 p-3 rounded-2xl max-w-xs pointer-events-auto">
          <Navigation className="w-6 h-6 text-primary-400 shrink-0 animate-spin duration-[10000ms]" />
          <div>
            <div className="text-[10px] font-mono text-emerald-400 font-bold">REAL-TIME TARIFF ROUTING</div>
            <div className="text-xs text-neutral-300 font-semibold">Zero congestion surcharges locked in {GEO.regionName}.</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'floating-media-collage') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-gradient-to-b from-neutral-100 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
        {/* Decorative background gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px]" />

        {/* Italian Arch Framed Photography Mask (Left Side) */}
        <div className="absolute top-12 left-6 w-56 h-80 rounded-t-[100px] rounded-b-3xl border-4 border-white dark:border-neutral-800 shadow-2xl overflow-hidden hidden xl:block pointer-events-auto transform -rotate-3 hover:rotate-0 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80" 
            alt="White glove moving professional" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <span className="text-[11px] font-extrabold text-neutral-900 dark:text-white uppercase tracking-wider">★ White-Glove Certified</span>
          </div>
        </div>

        {/* Capsule Framed Mask (Right Side) */}
        <div className="absolute top-24 right-8 w-64 h-72 rounded-[40px] border-4 border-white dark:border-neutral-800 shadow-2xl overflow-hidden hidden xl:block pointer-events-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80" 
            alt="Secure storage and packing" 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3 bg-white dark:bg-zinc-900/60 text-black text-[10px] font-black px-2.5 py-1 rounded-full shadow">
            $2M COI Bonded
          </div>
          <div className="absolute bottom-3 left-3 bg-white dark:bg-black/80 backdrop-blur-md text-primary-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-neutral-700">
            {LEGAL.reviewCount}+ Moves Done
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'architectural-arch-split') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white flex justify-between">
        {/* Left Side: Architectural Lines & Editorial Grain */}
        <div className="w-1/2 h-full border-r border-neutral-800 relative hidden lg:block">
          <div className="absolute top-20 left-12 font-serif text-zinc-200 text-6xl opacity-30 font-black">
            EST. 2026
          </div>
          <div className="absolute bottom-20 left-12 max-w-xs p-5 bg-white dark:bg-neutral-900/90 border border-neutral-800 shadow-2xl rounded-2xl pointer-events-auto backdrop-blur-md">
            <div className="flex items-center gap-2 text-primary-400 font-black text-sm mb-1">
              <Star className="w-4 h-4 fill-primary-400" /> Executive Standard
            </div>
            <p className="text-xs text-neutral-300 font-medium">
              Tailored logistics architecture for high-value estates across {GEO.regionName}. Zero subcontracting guarantee.
            </p>
          </div>
        </div>

        {/* Right Side: Towering Italian Arch Frame */}
        <div className="w-1/2 h-full relative hidden lg:flex items-center justify-center p-12">
          <div className="w-96 h-[85%] rounded-t-[200px] rounded-b-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative border-8 border-white dark:border-neutral-900 pointer-events-auto">
            <img 
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
              alt="Luxury residence relocation" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 text-neutral-900 dark:text-white">
              <div className="text-xs font-mono text-primary-400 uppercase tracking-widest font-bold">FLAT-RATE GUARANTEE</div>
              <div className="text-sm font-extrabold">{BRAND.heroSubtitle.substring(0, 70)}...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'ambient-3d-glassmorphism') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-slate-950 text-neutral-900 dark:text-white">
        {/* Floating HSL ambient plasma orbs */}
        <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/5 w-96 h-96 bg-primary-500/30 rounded-full blur-[120px] animate-pulse duration-700" />
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-emerald-500/20 rounded-full blur-[90px]" />

        {/* Suspended Frosted Acrylic Glass Cards */}
        <div className="absolute top-20 left-10 hidden xl:flex flex-col gap-2 p-5 rounded-3xl bg-white dark:bg-zinc-900/60/10 dark:bg-zinc-900/60/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] max-w-xs pointer-events-auto transform -rotate-3 hover:rotate-0 transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase bg-white dark:bg-zinc-900/60/20 text-neutral-900 dark:text-white px-2.5 py-0.5 rounded-full">Telemetry Active</span>
            <span className="text-xs font-black text-emerald-300">● 99.8% SLA</span>
          </div>
          <div className="text-xs text-neutral-900 dark:text-white/90 font-medium">
            Dedicated climate-controlled trucks currently patrolling highway arterial routes in {GEO.regionName}.
          </div>
        </div>

        <div className="absolute bottom-12 right-12 hidden xl:flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-zinc-900/60/10 dark:bg-zinc-900/60/5 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto transform rotate-2 hover:rotate-0 transition-all duration-300">
          <div className="w-12 h-12 rounded-2xl bg-primary-400 text-black flex items-center justify-center font-black text-xl shrink-0">
            ⚡
          </div>
          <div>
            <div className="text-xs font-bold uppercase text-primary-300">Instant Digital Bond</div>
            <div className="text-sm font-black text-neutral-900 dark:text-white">Condo COI Issued in {LEGAL.coiDeliverySLAShort}</div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'brutalist-diagonal-marquee') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-amber-300 dark:bg-neutral-900 flex flex-col justify-between opacity-20">
        {/* Infinite Industrial Ticker Stripe 1 */}
        <div className="w-[150%] bg-white dark:bg-black text-neutral-900 dark:text-white py-3 transform -rotate-6 -translate-x-12 flex whitespace-nowrap text-sm font-mono font-black tracking-widest overflow-hidden shadow-2xl">
          <div className="animate-[marquee_25s_linear_infinite] flex gap-8">
            <span>⚠️ LIVE DISPATCH RATE IN EFFECT</span>
            <span>✦ ZERO FUEL SURCHARGES OR STAIR FEES ✦</span>
            <span>🛡️ $2,000,000 FULL REPLACEMENT VALUATION INCLUDED</span>
            <span>📍 WSIB BONDED CARRIER IN {GEO.regionName.toUpperCase()}</span>
            <span>⚠️ LIVE DISPATCH RATE IN EFFECT</span>
            <span>✦ ZERO FUEL SURCHARGES OR STAIR FEES ✦</span>
          </div>
        </div>

        <div className="w-[150%] bg-white dark:bg-black text-neutral-900 dark:text-white py-3 transform rotate-6 -translate-x-12 flex whitespace-nowrap text-sm font-mono font-black tracking-widest overflow-hidden shadow-2xl">
          <div className="animate-[marquee_30s_linear_infinite_reverse] flex gap-8">
            <span>📦 CERTIFIED PACKING & WOODEN CRATING</span>
            <span>🏢 CONDO HIGH-RISE ELEVATOR RESERVATION READY</span>
            <span>🚚 REAL-TIME SATELLITE GPS FLEET TELEMETRY</span>
            <span>💎 100% SATISFACTION GUARANTEED TARIFFS</span>
            <span>📦 CERTIFIED PACKING & WOODEN CRATING</span>
            <span>🏢 CONDO HIGH-RISE ELEVATOR RESERVATION READY</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'social-proof-orbit') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-slate-900 text-neutral-900 dark:text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-neutral-950 to-black opacity-80" />

        {/* Orbiting Customer Review Pills */}
        <div className="absolute top-16 left-1/6 hidden md:flex items-center gap-3 bg-white dark:bg-neutral-900/90 border border-neutral-700 p-3.5 rounded-2xl shadow-2xl pointer-events-auto transform -rotate-2 hover:rotate-0 transition-transform max-w-xs">
          <div className="w-9 h-9 rounded-full bg-emerald-500 text-black font-extrabold flex items-center justify-center shrink-0">
            4.9★
          </div>
          <div>
            <div className="text-[11px] text-neutral-300 italic font-medium">&ldquo;Flawless move, zero breakages!&rdquo;</div>
            <div className="text-[10px] font-bold text-primary-400 mt-0.5">✔ Sarah M. • Toronto Condo</div>
          </div>
        </div>

        <div className="absolute top-28 right-1/6 hidden md:flex items-center gap-3 bg-white dark:bg-neutral-900/90 border border-neutral-700 p-3.5 rounded-2xl shadow-2xl pointer-events-auto transform rotate-3 hover:rotate-0 transition-transform max-w-xs">
          <div className="w-9 h-9 rounded-full bg-primary-400 text-black font-extrabold flex items-center justify-center shrink-0">
            COI
          </div>
          <div>
            <div className="text-[11px] text-neutral-300 font-semibold">Condo COI Approved within 12 Mins</div>
            <div className="text-[10px] font-bold text-emerald-400 mt-0.5">✔ Property Mgr Verified</div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/4 hidden lg:flex items-center gap-3 bg-white dark:bg-neutral-900/90 border border-neutral-700 p-3.5 rounded-2xl shadow-2xl pointer-events-auto transform -rotate-1 hover:rotate-0 transition-transform">
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
          <div>
            <div className="text-[11px] font-bold text-neutral-900 dark:text-white">Voted Top White-Glove Carrier 2026</div>
            <div className="text-[10px] text-neutral-400 font-medium">HomeStars & Google Business Excellence</div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback to minimal ambient background if basic token is used
  return null;
};
