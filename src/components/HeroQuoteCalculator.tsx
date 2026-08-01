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
      <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-white to-amber-50/40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Hero Trust Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black border border-neutral-800 text-amber-400 text-xs sm:text-sm font-black tracking-wide shadow-lg shadow-black/10">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{BRAND.rankingClaim}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-amber-400 text-black text-xs sm:text-sm font-extrabold shadow-md shadow-amber-900/5">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
            <span>{`${LEGAL.starRating}/5 Rating (${LEGAL.reviewCount} Google & HomeStars Reviews)`}</span>
          </div>
          <button 
            onClick={onOpenCOIModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/90 border-2 border-emerald-600 text-emerald-950 text-xs sm:text-sm font-black hover:bg-emerald-200 transition-colors shadow-md shadow-emerald-950/5"
          >
            <Shield className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{`Free ${LEGAL.coiAmountShort} Condo COI Issued in ${LEGAL.coiDeliverySLAShort}`}</span>
          </button>
        </div>

        {/* Hero Title Header */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.1] font-['Montserrat',sans-serif]">
            {BRAND.heroTagline.split(' WHITE-GLOVE')[0]} <br className="hidden sm:inline" />
            <span className="bg-amber-400 text-black px-4 py-1 rounded-2xl inline-block shadow-md font-black">WHITE-GLOVE MOVING</span> & RELOCATION
          </h1>
          <p className="mt-4 text-base sm:text-lg text-neutral-700 max-w-2xl mx-auto leading-relaxed">
            {BRAND.heroSubtitle}
          </p>
        </div>

        {/* The Interactive Quote / Estimate Tool Box */}
        <div className="bg-white border border-amber-200 rounded-3xl shadow-2xl shadow-amber-950/15 p-5 sm:p-8 lg:p-10 relative">
          
          {/* Top Step Selector Tabs */}
          <div className="flex items-center justify-between border-b border-amber-200/80 pb-5 mb-8 overflow-x-auto no-scrollbar gap-2">
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
                    ? 'bg-black text-amber-400 border border-black font-extrabold shadow-lg font-medium'
                    : 'bg-neutral-100/80 text-neutral-700 border border-neutral-200 hover:bg-amber-50 hover:text-black font-bold'
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black ${
                  currentStep === s.step
                    ? 'bg-slate-950 text-amber-400'
                    : currentStep > s.step
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-neutral-200 text-neutral-700'
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* LEFT SIDE: Interactive Form Inputs */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* STEP 1: Locations & Date */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 font-['Montserrat',sans-serif]">
                      <MapPin className="w-5 h-5 text-amber-400" />
                      Move Origin & Destination
                    </h3>
                    <span className="text-xs text-neutral-600 font-semibold">Step 1 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Pickup Postal / Area */}
                    <div className="space-y-1.5">
                      <label htmlFor="fromZip" className="text-xs font-semibold text-neutral-700">Moving From ({GEO.regionName} Pickup)</label>
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
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-3 text-sm text-neutral-900 focus:outline-none focus:border-amber-400 font-medium"
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
                      <label htmlFor="toZip" className="text-xs font-semibold text-neutral-700">Moving To (Destination)</label>
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
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-3 text-sm text-neutral-900 focus:outline-none focus:border-amber-400 font-medium"
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
                      <label htmlFor="fromAddress" className="text-xs font-semibold text-neutral-600">Street Address & Unit / Floor</label>
                      <input
                        id="fromAddress"
                        type="text"
                        value={quoteForm.fromAddress}
                        onChange={(e) => setQuoteForm(p => ({ ...p, fromAddress: e.target.value }))}
                        placeholder={`e.g. ${GEO.placeholderFrom}`}
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="toAddress" className="text-xs font-semibold text-neutral-600">Destination Street Address</label>
                      <input
                        id="toAddress"
                        type="text"
                        value={quoteForm.toAddress}
                        onChange={(e) => setQuoteForm(p => ({ ...p, toAddress: e.target.value }))}
                        placeholder={`e.g. ${GEO.placeholderTo}`}
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Move Date Selector */}
                  <div className="space-y-1.5 pt-2">
                    <label htmlFor="moveDate" className="text-xs font-semibold text-neutral-700 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      Target Move Date
                    </label>
                    <input
                      id="moveDate"
                      type="date"
                      value={quoteForm.moveDate}
                      onChange={(e) => setQuoteForm(p => ({ ...p, moveDate: e.target.value }))}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full sm:w-1/2 bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-3 text-sm text-neutral-900 focus:outline-none focus:border-amber-400 font-medium"
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
                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 font-['Montserrat',sans-serif]">
                      <Building2 className="w-5 h-5 text-amber-400" />
                      Select Property Size & Service Care
                    </h3>
                    <span className="text-xs text-neutral-600 font-semibold">Step 2 of 4</span>
                  </div>

                  {/* Property Size Selector Cards */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 mb-2.5 block">Property Size</label>
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
                                ? 'bg-amber-400/10 border-amber-400 text-neutral-900 shadow-md shadow-amber-400/10'
                                : 'bg-neutral-50 shadow-sm border-amber-200 text-neutral-700 hover:border-neutral-300'
                            }`}
                            aria-pressed={isSelected}
                          >
                            <SizeIcon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-amber-400' : 'text-neutral-600'}`} aria-hidden="true" />
                            <div className="text-xs font-bold text-neutral-900">{size.label}</div>
                            <div className="text-[10px] text-neutral-700 mt-1">
                              ~{size.estHours} hrs • {size.movers} Movers
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Service Niche Selection */}
                  <div>
                    <label className="text-xs font-semibold text-neutral-700 mb-2.5 block">Specialized Niche Care</label>
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
                                ? 'bg-amber-400/10 border-amber-400 text-neutral-900'
                                : 'bg-neutral-50 shadow-sm border-amber-200 text-neutral-700 hover:border-neutral-300'
                            }`}
                          >
                            <div className={`p-2 rounded-xl text-xs font-bold ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-neutral-200 text-neutral-800 font-bold'}`}>
                              {niche.id === 'condo-moves' ? '🏙️' : niche.id === 'piano-moves' ? '🎹' : niche.id === 'long-distance' ? '🚚' : '📦'}
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-bold text-neutral-900 flex items-center justify-between">
                                {niche.name}
                                {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                              </div>
                              <div className="text-[11px] text-neutral-600 mt-0.5 line-clamp-2">
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
                      className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold"
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
                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 font-['Montserrat',sans-serif]">
                      <Tag className="w-5 h-5 text-amber-400" />
                      Baked-in Upsells: Packing Supplies & Storage Vaults
                    </h3>
                    <span className="text-xs text-neutral-600 font-semibold">Step 3 of 4</span>
                  </div>

                  {/* Packing Supplies Upsell List */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-semibold text-neutral-700">Popular Moving Supply Bundles</label>
                      <span className="text-[11px] text-amber-400">Delivered directly to your door prior to move day</span>
                    </div>

                    <div className="space-y-2.5">
                      {PACKING_SUPPLIES.slice(0, 4).map((supply) => {
                        const qty = quoteForm.packingSupplies[supply.id] || 0;
                        return (
                          <div
                            key={supply.id}
                            className="bg-white shadow-sm border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between gap-3"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-neutral-900">{supply.name}</span>
                                {supply.popular && (
                                  <span className="bg-amber-400/20 text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                                    POPULAR
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-neutral-600">{supply.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-amber-400">${supply.price.toFixed(2)}</span>
                              <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-xl border border-amber-200">
                                <button
                                  type="button"
                                  onClick={() => handleSupplyQtyChange(supply.id, -1)}
                                  className="w-6 h-6 rounded-lg bg-neutral-200 text-neutral-800 hover:bg-amber-200 flex items-center justify-center text-xs font-bold"
                                >
                                  -
                                </button>
                                <span className="w-6 text-center text-xs font-bold text-neutral-900">{qty}</span>
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
                      <label className="text-xs font-semibold text-neutral-700">Need Secure {GEO.regionName} Vault Storage?</label>
                      <span className="text-[11px] text-emerald-400 font-semibold">🎉 {PRICING.storagePromoPercent}% OFF First {PRICING.storagePromoDays} Days</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setQuoteForm(p => ({ ...p, storageOptionId: p.storageOptionId === null ? 'storage-5x10' : null }))}
                        className={`p-3 rounded-2xl border text-left transition-all ${
                          quoteForm.storageOptionId === null
                            ? 'bg-white border-neutral-300 text-neutral-600'
                            : 'bg-white/80 border-neutral-200 text-neutral-600'
                        }`}
                      >
                        <div className="text-xs font-bold text-neutral-700">No Storage Needed</div>
                        <div className="text-[10px] text-neutral-500 mt-1">Direct move to new home</div>
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
                                ? 'bg-amber-400/10 border-amber-400 text-neutral-900'
                                : 'bg-white shadow-sm border-amber-200 text-neutral-700 hover:border-neutral-300'
                            }`}
                          >
                            <div className="text-xs font-bold text-neutral-900 flex items-center justify-between">
                              {st.name}
                              {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <div className="text-[11px] text-amber-400 font-bold mt-1">
                              ${(st.pricePerMonth * 0.5).toFixed(0)}/mo <span className="line-through text-neutral-500 text-[10px]">${st.pricePerMonth}</span>
                            </div>
                            <div className="text-[10px] text-neutral-600 mt-0.5">{st.idealFor}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold"
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
                    <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2 font-['Montserrat',sans-serif]">
                      <FileText className="w-5 h-5 text-amber-400" />
                      Enter Contact Details to Guarantee Price
                    </h3>
                    <span className="text-xs text-neutral-600 font-semibold">Step 4 of 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="text-xs font-semibold text-neutral-700">Full Name *</label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        value={quoteForm.fullName}
                        onChange={(e) => setQuoteForm(p => ({ ...p, fullName: e.target.value }))}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-semibold text-neutral-700">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm(p => ({ ...p, email: e.target.value }))}
                        placeholder="s.jenkins@example.com"
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-semibold text-neutral-700">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={quoteForm.phone}
                        onChange={(e) => setQuoteForm(p => ({ ...p, phone: e.target.value }))}
                        placeholder={GEO.phonePlaceholder}
                        className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3.5 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Promo Code Input */}
                    <div className="space-y-1.5">
                      <label htmlFor="promoCode" className="text-xs font-semibold text-neutral-700">Promo / Referral Code</label>
                      <div className="flex gap-2">
                        <input
                          id="promoCode"
                          type="text"
                          value={quoteForm.promoCode}
                          onChange={(e) => setQuoteForm(p => ({ ...p, promoCode: e.target.value }))}
                          placeholder={`e.g. ${PRICING.promoCodes.welcome.code}`}
                          className="w-full bg-white shadow-sm border border-amber-200 rounded-xl px-3 py-2 text-xs text-neutral-900 uppercase focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={handleApplyPromo}
                          className="bg-black hover:bg-neutral-900 text-amber-400 shadow-md px-3 py-2 rounded-xl text-xs font-bold"
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
                    <div className="text-xs text-neutral-700">
                      <span className="font-bold text-neutral-900">{LEGAL.noPriceSurprises.split(' — ')[0]}:</span> {LEGAL.noPriceSurprises.split(' — ')[1]}
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold"
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
            <div aria-live="polite" className="lg:col-span-6 bg-gradient-to-b from-white via-amber-50/60 to-amber-100/80 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-amber-950/15">
              {/* Background badge icon */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b-2 border-amber-300">
                <div>
                  <span className="text-xs tracking-wider text-amber-700 font-black uppercase">
                    ESTIMATE CALCULATOR
                  </span>
                  <h4 className="text-2xl font-black text-neutral-950 font-['Montserrat',sans-serif] mt-0.5">
                    Estimated Cost Range
                  </h4>
                </div>
                <div className="bg-amber-400 text-black p-3 rounded-2xl shadow-md border border-amber-500/30">
                  <Tag className="w-6 h-6 stroke-[2.5]" />
                </div>
              </div>

              {/* Big Price Range Display */}
              <div className="my-6 text-center bg-white rounded-2xl p-6 border-2 border-amber-400 shadow-xl shadow-amber-950/5">
                <div className="text-xs text-neutral-700 font-black uppercase tracking-wider mb-1.5">TOTAL ALL-INCLUSIVE ESTIMATE</div>
                <div className="text-4xl sm:text-5xl font-black text-black tracking-tight font-['Montserrat',sans-serif]">
                  ${liveEstimate.min} – ${liveEstimate.max}
                </div>
                <div className="text-xs text-emerald-800 font-black mt-2 flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2.5]" /> 
                  <span>Includes Truck, Fuel & Full {LEGAL.coiAmountShort} COI Protection</span>
                </div>
              </div>

              {/* Itemized Line Items */}
              <div className="space-y-4 text-xs sm:text-sm font-semibold pt-2 my-2">
                <div className="flex items-center justify-between text-neutral-800">
                  <span>Estimated Labor (~{liveEstimate.estHours} hrs x {liveEstimate.movers} Movers):</span>
                  <span className="font-black text-neutral-950 text-base">${liveEstimate.hourlyLabor}</span>
                </div>

                <div className="flex items-center justify-between text-neutral-800">
                  <span>Dispatch, Fuel & Highway Truck Fee:</span>
                  <span className="font-black text-neutral-950 text-base">${liveEstimate.truckFuelFee}</span>
                </div>

                <div className="flex items-center justify-between text-neutral-800">
                  <span>Certificate of Insurance (COI) Issuance:</span>
                  <span className="font-black text-emerald-700 text-base">FREE ($0)</span>
                </div>

                {liveEstimate.suppliesCost > 0 && (
                  <div className="flex items-center justify-between text-neutral-800">
                    <span>Packing Supplies Bundles:</span>
                    <span className="font-black text-neutral-950 text-base">+${liveEstimate.suppliesCost}</span>
                  </div>
                )}

                {liveEstimate.storageCost > 0 && (
                  <div className="flex items-center justify-between text-neutral-800">
                    <span>Storage Vault (Month 1 50% Off):</span>
                    <span className="font-black text-neutral-950 text-base">+${liveEstimate.storageCost}</span>
                  </div>
                )}

                {discountApplied > 0 && (
                  <div className="flex items-center justify-between text-emerald-800 font-black text-sm pt-2 border-t-2 border-amber-300">
                    <span>Promo Discount Applied:</span>
                    <span>-${discountApplied}</span>
                  </div>
                )}
              </div>

              {/* Trust Badges bottom */}
              <div className="mt-6 pt-4 border-t-2 border-amber-300 space-y-2.5 text-xs text-neutral-800 font-bold">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 stroke-[2.5]" />
                  <span>No Stair Surcharges or Elevator Waiting Penalties</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 stroke-[2.5]" />
                  <span>{LEGAL.replacementValue}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 stroke-[2.5]" />
                  <span>{LEGAL.gpsTracking}</span>
                </div>
              </div>

              {/* COI Quick Trigger Button */}
              <button
                type="button"
                onClick={onOpenCOIModal}
                className="w-full mt-6 py-3.5 px-4 rounded-2xl bg-black hover:bg-neutral-900 border-2 border-black text-amber-400 shadow-xl shadow-black/15 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 hover:scale-[1.01] transition-all"
              >
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>Need COI Sent To Your Condo Concierge Now?</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
