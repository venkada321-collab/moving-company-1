import React, { useState, useMemo } from 'react';
import { 
  Building2, Building, Home, Castle, Music, Briefcase, Truck, PackageCheck, MapPin, Calendar, ArrowRight, 
  CheckCircle2, Plus, Minus, Tag, Shield, Star, Award, ChevronRight, Sparkles, AlertCircle, FileText, Lightbulb
} from 'lucide-react';
import { BRAND, GEO, LEGAL, PRICING } from '../config';
import { SERVICE_NICHES, PACKING_SUPPLIES, STORAGE_OPTIONS } from '../data/mockData';
import { QuoteRequest } from '../types';

interface HeroQuoteCalculatorProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

const GTA_NEIGHBORHOODS = GEO.neighborhoods.map(n => ({
  zip: n.postal,
  name: n.name
}));

const MOVE_SIZES = [
  { id: 'studio', label: 'Studio Apartment', estHours: 2.5, movers: 2, icon: Building2 },
  { id: '1bed', label: '1 Bedroom Condo', estHours: 3.5, movers: 2, icon: Building },
  { id: '2bed', label: '2 Bedroom High-Rise', estHours: 4.5, movers: 3, icon: Building2 },
  { id: '3bed+', label: '3-4 Bed House / Townhome', estHours: 6.5, movers: 4, icon: Home },
  { id: 'estate', label: 'Executive Estate (4000+ sq ft)', estHours: 8.5, movers: 5, icon: Castle },
  { id: 'piano', label: 'Piano or Heavy Specialty Item', estHours: 3.0, movers: 3, icon: Music },
  { id: 'office', label: 'Commercial Office Space', estHours: 6.0, movers: 4, icon: Briefcase },
];

export const HeroQuoteCalculator: React.FC<HeroQuoteCalculatorProps> = ({ onQuoteSubmitted, onOpenCOIModal }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [quoteForm, setQuoteForm] = useState<QuoteRequest>({
    fromZip: 'M5V',
    fromAddress: GEO.defaultFromAddress,
    toZip: 'L5B',
    toAddress: GEO.defaultToAddress,
    moveDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    size: '2bed',
    serviceNicheId: 'condo-moves',
    packingSupplies: { 'starter-pack-kit': 1 },
    storageOptionId: null,
    fullName: '',
    email: '',
    phone: '',
    promoCode: PRICING.promoCodes.welcome.code,
    referralCode: ''
  });

  const [discountApplied, setDiscountApplied] = useState<number>(PRICING.defaultPromoDiscount); // default promo discount
  const [discountMessage, setDiscountMessage] = useState<string>(`✓ $${PRICING.defaultPromoDiscount} ${GEO.regionName} Welcome Promo Applied!`);

  // Handle supply count changes
  const handleSupplyQtyChange = (supplyId: string, delta: number) => {
    setQuoteForm(prev => {
      const currentQty = prev.packingSupplies[supplyId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      return {
        ...prev,
        packingSupplies: {
          ...prev.packingSupplies,
          [supplyId]: newQty
        }
      };
    });
  };

  // Calculate live estimate
  const liveEstimate = useMemo(() => {
    const selectedSize = MOVE_SIZES.find(s => s.id === quoteForm.size) || MOVE_SIZES[1];
    const selectedNiche = SERVICE_NICHES.find(n => n.id === quoteForm.serviceNicheId) || SERVICE_NICHES[0];

    // Base hourly labor cost
    const baseRate = selectedNiche.baseRate;
    const hourlyLabor = selectedSize.estHours * baseRate;

    // Truck & Fuel flat fee
    const isLongDistance = quoteForm.serviceNicheId === 'long-distance' || quoteForm.toZip === 'K2K' || quoteForm.toZip === 'H3B';
    const truckFuelFee = isLongDistance ? PRICING.longDistanceTruckFee : PRICING.localTruckFee;

    // Packing supplies sum
    let suppliesCost = 0;
    Object.keys(quoteForm.packingSupplies).forEach((supplyId) => {
      const qty = quoteForm.packingSupplies[supplyId] || 0;
      const item = PACKING_SUPPLIES.find(p => p.id === supplyId);
      if (item && qty > 0) {
        suppliesCost += item.price * qty;
      }
    });

    // Storage cost sum
    let storageCost = 0;
    if (quoteForm.storageOptionId) {
      const storeItem = STORAGE_OPTIONS.find(s => s.id === quoteForm.storageOptionId);
      if (storeItem) {
        storageCost = storeItem.pricePerMonth * 0.5; // First month 50% promo
      }
    }

    const subtotal = hourlyLabor + truckFuelFee + suppliesCost + storageCost;
    const totalAfterDiscount = Math.max(100, subtotal - discountApplied);

    const min = Math.round(totalAfterDiscount * PRICING.estimateMinMultiplier);
    const max = Math.round(totalAfterDiscount * PRICING.estimateMaxMultiplier);

    return {
      min,
      max,
      hourlyLabor: Math.round(hourlyLabor),
      truckFuelFee,
      suppliesCost: Math.round(suppliesCost),
      storageCost: Math.round(storageCost),
      movers: selectedSize.movers,
      estHours: selectedSize.estHours,
      isLongDistance
    };
  }, [quoteForm, discountApplied]);

  // Apply promo
  const handleApplyPromo = () => {
    const code = quoteForm.promoCode.trim().toUpperCase();
    if (code === PRICING.promoCodes.welcome.code || code === PRICING.promoCodes.vip.code || code.startsWith('REF')) {
      setDiscountApplied(PRICING.defaultPromoDiscount);
      setDiscountMessage(`✓ $${PRICING.defaultPromoDiscount} Promo / Referral discount applied!`);
    } else if (code === PRICING.promoCodes.loyalty.code) {
      setDiscountApplied(PRICING.promoCodes.loyalty.discount);
      setDiscountMessage(`✓ $${PRICING.promoCodes.loyalty.discount} VIP Moving Credit applied!`);
    } else if (code === '') {
      setDiscountApplied(0);
      setDiscountMessage('');
    } else {
      setDiscountApplied(PRICING.gtaDiscount);
      setDiscountMessage(`✓ Special $${PRICING.gtaDiscount} ${GEO.regionName} discount code accepted!`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.fullName || !quoteForm.email || !quoteForm.phone) {
      alert('Please fill out your Name, Email, and Phone number to lock in your quote.');
      return;
    }
    onQuoteSubmitted(quoteForm, { min: liveEstimate.min, max: liveEstimate.max });
  };

  return (
    <section id="hero-quote-calculator" className="relative pt-8 pb-16 overflow-hidden">
      {/* Halo Lab signature dark subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19] via-[#111726] to-[#0b0f19] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Trust Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            {BRAND.rankingClaim}
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            {`${LEGAL.starRating}/5 Rating (${LEGAL.reviewCount} Google & HomeStars Reviews)`}
          </div>
          <button 
            onClick={onOpenCOIModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
          >
            <Shield className="w-3.5 h-3.5" />
            {`Free ${LEGAL.coiAmountShort} Condo COI Issued in ${LEGAL.coiDeliverySLAShort}`}
          </button>
        </div>

        {/* Hero Title Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1] font-['Outfit']">
            {BRAND.heroTagline.split(' WHITE-GLOVE')[0]} <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              WHITE-GLOVE MOVING
            </span> & RELOCATION
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {BRAND.heroSubtitle}
          </p>
        </div>

        {/* The Interactive Quote / Estimate Tool Box */}
        <div className="bg-[#131927] border border-slate-700/80 rounded-3xl shadow-2xl shadow-slate-950/80 p-5 sm:p-8 lg:p-10 relative">
          
          {/* Top Step Selector Tabs */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-5 mb-8 overflow-x-auto no-scrollbar gap-2">
            {[
              { step: 1, title: '1. Locations & Date', sub: `${GEO.regionName} Addresses` },
              { step: 2, title: '2. Move Size & Niche', sub: 'Home, Condo, Piano' },
              { step: 3, title: '3. Supplies & Storage', sub: 'Upsell Bundles' },
              { step: 4, title: '4. Contact & Lock Quote', sub: 'Instant Guarantee' },
            ].map((s) => (
              <button
                key={s.step}
                onClick={() => setCurrentStep(s.step)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all min-w-fit ${
                  currentStep === s.step
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20'
                    : currentStep > s.step
                    ? 'bg-slate-800/80 text-amber-400 border border-amber-400/30 font-medium'
                    : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  currentStep === s.step
                    ? 'bg-slate-950 text-amber-400'
                    : currentStep > s.step
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {currentStep > s.step ? '✓' : s.step}
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold whitespace-nowrap">{s.title}</div>
                  <div className="text-[10px] opacity-80 font-medium">{s.sub}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Form Grid: Left Inputs / Right Instant Estimate Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDE: Interactive Form Inputs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* STEP 1: Locations & Date */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      Move Origin & Destination
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold">Step 1 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pickup Postal / Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="fromZip" className="text-xs font-semibold text-slate-300">Moving From ({GEO.regionName} Pickup)</label>
                      <select
                        id="fromZip"
                        value={quoteForm.fromZip}
                        onChange={(e) => {
                          const matched = GTA_NEIGHBORHOODS.find(n => n.zip === e.target.value);
                          setQuoteForm(prev => ({
                            ...prev,
                            fromZip: e.target.value,
                            fromAddress: matched ? `Building in ${matched.name}` : prev.fromAddress
                          }));
                        }}
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                      >
                        {GTA_NEIGHBORHOODS.map(n => (
                          <option key={n.zip} value={n.zip}>
                            {n.zip} — {n.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Destination Postal / Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="toZip" className="text-xs font-semibold text-slate-300">Moving To (Destination)</label>
                      <select
                        id="toZip"
                        value={quoteForm.toZip}
                        onChange={(e) => {
                          const matched = GTA_NEIGHBORHOODS.find(n => n.zip === e.target.value);
                          setQuoteForm(prev => ({
                            ...prev,
                            toZip: e.target.value,
                            toAddress: matched ? `Destination in ${matched.name}` : prev.toAddress
                          }));
                        }}
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                      >
                        {GTA_NEIGHBORHOODS.map(n => (
                          <option key={n.zip} value={n.zip}>
                            {n.zip} — {n.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Specific Address Line Input */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fromAddress" className="text-xs font-semibold text-slate-400">Street Address & Unit / Floor</label>
                      <input
                        id="fromAddress"
                        type="text"
                        value={quoteForm.fromAddress}
                        onChange={(e) => setQuoteForm(p => ({ ...p, fromAddress: e.target.value }))}
                        placeholder={`e.g. ${GEO.placeholderFrom}`}
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="toAddress" className="text-xs font-semibold text-slate-400">Destination Street Address</label>
                      <input
                        id="toAddress"
                        type="text"
                        value={quoteForm.toAddress}
                        onChange={(e) => setQuoteForm(p => ({ ...p, toAddress: e.target.value }))}
                        placeholder={`e.g. ${GEO.placeholderTo}`}
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Move Date Selector */}
                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="moveDate" className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      Target Move Date
                    </label>
                    <input
                      id="moveDate"
                      type="date"
                      value={quoteForm.moveDate}
                      onChange={(e) => setQuoteForm(p => ({ ...p, moveDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full sm:w-1/2 bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-400 font-medium"
                    />
                    <p className="text-[11px] text-amber-400/90 font-medium mt-1 flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" aria-hidden="true" /> Tip: Mid-month moves ({PRICING.midMonthRange}) enjoy an extra {PRICING.midMonthDiscount * 100}% rate reduction!
                    </p>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20"
                    >
                      Next: Choose Move Size <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Move Size & Niche */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
                      <Building2 className="w-5 h-5 text-amber-400" />
                      Select Property Size & Service Care
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold">Step 2 of 4</span>
                  </div>

                  {/* Property Size Selector Cards */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-2.5 block">Property Size</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {MOVE_SIZES.map((size) => {
                        const isSelected = quoteForm.size === size.id;
                        const SizeIcon = size.icon;
                        return (
                          <button
                            key={size.id}
                            type="button"
                            onClick={() => setQuoteForm(p => ({ ...p, size: size.id }))}
                            className={`p-3 min-h-[44px] rounded-2xl text-left border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 text-white shadow-md shadow-amber-400/10'
                                : 'bg-[#1c2438]/60 border-slate-700/80 text-slate-300 hover:border-slate-600'
                            }`}
                            aria-pressed={isSelected}
                          >
                            <SizeIcon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} aria-hidden="true" />
                            <div className="text-xs font-bold text-white">{size.label}</div>
                            <div className="text-[10px] text-slate-300 mt-1">
                              ~{size.estHours} hrs • {size.movers} Movers
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Service Niche Selection */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 mb-2.5 block">Specialized Niche Care</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_NICHES.map((niche) => {
                        const isSelected = quoteForm.serviceNicheId === niche.id;
                        return (
                          <button
                            key={niche.id}
                            type="button"
                            onClick={() => setQuoteForm(p => ({ ...p, serviceNicheId: niche.id }))}
                            className={`p-3.5 rounded-2xl text-left border flex items-start gap-3 transition-all ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 text-white'
                                : 'bg-[#1c2438]/60 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <div className={`p-2 rounded-xl text-xs font-bold ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>
                              {niche.id === 'condo-moves' ? '🏙️' : niche.id === 'piano-moves' ? '🎹' : niche.id === 'long-distance' ? '🚚' : '📦'}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-white flex items-center justify-between">
                                {niche.name}
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                                {niche.description}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-xs text-slate-400 hover:text-white font-semibold"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20"
                    >
                      Next: Add Supplies & Storage <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Upsells (Supplies & Storage) */}
              {currentStep === 3 && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
                      <Tag className="w-5 h-5 text-amber-400" />
                      Baked-in Upsells: Packing Supplies & Storage Vaults
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold">Step 3 of 4</span>
                  </div>

                  {/* Packing Supplies Upsell List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-300">Popular Moving Supply Bundles</label>
                      <span className="text-[11px] text-amber-400">Delivered directly to your door prior to move day</span>
                    </div>

                    <div className="space-y-2.5">
                      {PACKING_SUPPLIES.slice(0, 4).map((supply) => {
                        const qty = quoteForm.packingSupplies[supply.id] || 0;
                        return (
                          <div
                            key={supply.id}
                            className="bg-[#1c2438]/80 border border-slate-700/80 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white">{supply.name}</span>
                                {supply.popular && (
                                  <span className="bg-amber-400/20 text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-400">{supply.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-amber-400">${supply.price.toFixed(2)}</span>
                              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-700">
                                <button
                                  type="button"
                                  onClick={() => handleSupplyQtyChange(supply.id, -1)}
                                  className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 flex items-center justify-center text-xs font-bold"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-white">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => handleSupplyQtyChange(supply.id, 1)}
                                  className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 hover:bg-amber-300 flex items-center justify-center text-xs font-bold"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Climate Controlled Storage Vault Upsell */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-slate-300">Need Secure {GEO.regionName} Vault Storage?</label>
                      <span className="text-[11px] text-emerald-400 font-semibold">🎉 {PRICING.storagePromoPercent}% OFF First {PRICING.storagePromoDays} Days</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setQuoteForm(p => ({ ...p, storageOptionId: p.storageOptionId === null ? 'storage-5x10' : null }))}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          quoteForm.storageOptionId === null
                            ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                            : 'bg-slate-900/40 border-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold text-slate-300">No Storage Needed</div>
                        <div className="text-[10px] text-slate-500 mt-1">Direct move to new home</div>
                      </button>

                      {STORAGE_OPTIONS.slice(0, 2).map((st) => {
                        const isSelected = quoteForm.storageOptionId === st.id;
                        return (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => setQuoteForm(p => ({ ...p, storageOptionId: isSelected ? null : st.id }))}
                            className={`p-3 rounded-2xl border text-left transition-all ${
                              isSelected
                                ? 'bg-amber-400/10 border-amber-400 text-white'
                                : 'bg-[#1c2438]/80 border-slate-700 text-slate-300 hover:border-slate-600'
                            }`}
                          >
                            <div className="text-xs font-bold text-white flex items-center justify-between">
                              {st.name}
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <div className="text-[11px] text-amber-400 font-bold mt-1">
                              ${(st.pricePerMonth * 0.5).toFixed(0)}/mo <span className="line-through text-slate-500 text-[10px]">${st.pricePerMonth}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{st.idealFor}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-slate-400 hover:text-white font-semibold"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-400/20"
                    >
                      Next: Contact & Lock Quote <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Contact & Final Submit */}
              {currentStep === 4 && (
                <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 font-['Outfit']">
                      <FileText className="w-5 h-5 text-amber-400" />
                      Enter Contact Details to Guarantee Price
                    </h3>
                    <span className="text-xs text-slate-400 font-semibold">Step 4 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-slate-300">Full Name *</label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={quoteForm.fullName}
                        onChange={(e) => setQuoteForm(p => ({ ...p, fullName: e.target.value }))}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="s.jenkins@example.com"
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-slate-300">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder={GEO.phonePlaceholder}
                        className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Promo Code Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="promoCode" className="text-xs font-semibold text-slate-300">Promo / Referral Code</label>
                      <div className="flex gap-2">
                        <input
                          id="promoCode"
                          type="text"
                          value={quoteForm.promoCode}
                          onChange={(e) => setQuoteForm(p => ({ ...p, promoCode: e.target.value }))}
                          placeholder={`e.g. ${PRICING.promoCodes.welcome.code}`}
                          className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white uppercase focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="bg-slate-800 hover:bg-slate-700 text-amber-400 px-3 py-2 rounded-xl text-xs font-bold"
                        >
                          Apply
                        </button>
                      </div>
                      {discountMessage && (
                        <p className="text-[11px] text-emerald-400 font-semibold">{discountMessage}</p>
                      )}
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
                    <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-300">
                      <span className="font-bold text-white">{LEGAL.noPriceSurprises.split(' — ')[0]}:</span> {LEGAL.noPriceSurprises.split(' — ')[1]}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-slate-400 hover:text-white font-semibold"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-amber-400/25 hover:scale-[1.02] transition-transform"
                    >
                      <span>CONFIRM & GET INSTANT QUOTE</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* RIGHT SIDE: Real-Time Dynamic Estimate Summary Panel */}
            <div aria-live="polite" className="lg:col-span-5 bg-[#1a2133] border border-amber-500/30 rounded-3xl p-6 relative overflow-hidden shadow-xl">
              {/* Background badge icon */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div>
                  <span className="text-[10px] tracking-widest text-amber-400 font-extrabold uppercase">
                    ESTIMATE CALCULATOR
                  </span>
                  <h4 className="text-xl font-extrabold text-white font-['Outfit']">
                    Estimated Cost Range
                  </h4>
                </div>
                <div className="bg-amber-400/20 text-amber-300 p-2 rounded-xl">
                  <Tag className="w-5 h-5" />
                </div>
              </div>

              {/* Big Price Range Display */}
              <div className="my-6 text-center bg-slate-900/80 rounded-2xl p-5 border border-slate-700/80">
                <div className="text-xs text-slate-400 font-semibold mb-1">TOTAL ALL-INCLUSIVE ESTIMATE</div>
                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 font-['Outfit']">
                  ${liveEstimate.min} – ${liveEstimate.max}
                </div>
                <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Includes Truck, Fuel & Full {LEGAL.coiAmountShort} COI Protection
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Estimated Labor (~{liveEstimate.estHours} hrs x {liveEstimate.movers} Movers):</span>
                  <span className="font-bold text-white">${liveEstimate.hourlyLabor}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Dispatch, Fuel & Highway Truck Fee:</span>
                  <span className="font-bold text-white">${liveEstimate.truckFuelFee}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Certificate of Insurance (COI) Issuance:</span>
                  <span className="font-bold text-emerald-400">FREE ($0)</span>
                </div>

                {liveEstimate.suppliesCost > 0 && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Packing Supplies Bundles:</span>
                    <span className="font-bold text-white">+${liveEstimate.suppliesCost}</span>
                  </div>
                )}

                {liveEstimate.storageCost > 0 && (
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Storage Vault (Month 1 50% Off):</span>
                    <span className="font-bold text-white">+${liveEstimate.storageCost}</span>
                  </div>
                )}

                {discountApplied > 0 && (
                  <div className="flex items-center justify-between text-emerald-400 font-bold pt-1 border-t border-slate-800">
                    <span>Promo Discount Applied:</span>
                    <span>-${discountApplied}</span>
                  </div>
                )}
              </div>

              {/* Trust Badges bottom */}
              <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>No Stair Surcharges or Elevator Waiting Penalties</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{LEGAL.replacementValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{LEGAL.gpsTracking}</span>
                </div>
              </div>

              {/* COI Quick Trigger Button */}
              <button
                type="button"
                onClick={onOpenCOIModal}
                className="w-full mt-5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                Need COI Sent To Your Condo Concierge Now?
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
