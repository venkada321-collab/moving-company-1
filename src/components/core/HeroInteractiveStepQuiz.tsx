import React, { useState } from 'react';
import { Shield, ArrowRight, ArrowLeft, Home, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { BRAND } from '../../config';
import { MICROCOPY } from '../../config/microcopy';
import { QuoteRequest } from '../../types';

interface HeroProps {
  onQuoteSubmitted: (quote: QuoteRequest, totalEstimate: { min: number; max: number }) => void;
  onOpenCOIModal: () => void;
}

export const HeroInteractiveStepQuiz: React.FC<HeroProps> = ({ onQuoteSubmitted }) => {
  const [step, setStep] = useState(1);
  const [fromLocation, setFromLocation] = useState('Toronto / GTA');
  const [toLocation, setToLocation] = useState('Destination City');
  const [selectedSize, setSelectedSize] = useState('2bed');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    const dummyQuote: QuoteRequest = {
      fromZip: fromLocation,
      fromAddress: fromLocation,
      toZip: toLocation,
      toAddress: toLocation,
      moveDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
      size: selectedSize as any,
      serviceNicheId: 'residential',
      packingSupplies: {},
      storageOptionId: null,
      fullName: 'Valued Client',
      email: '',
      phone: '',
      promoCode: '',
      referralCode: ''
    };
    onQuoteSubmitted(dummyQuote, { min: 450, max: 750 });
  };

  return (
    <div id="hero-quote-calculator" className="relative bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-20 lg:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Value Proposition */}
        <div className="text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            <span>{BRAND.rankingClaim}</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight font-['var(--font-heading)'] leading-tight">
            {BRAND.heroTagline || BRAND.name}
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 font-['var(--font-body)'] max-w-lg">
            {BRAND.heroSubtitle || "Take our 30-second quiz to get an instant, guaranteed flat-rate estimate tailored to your move."}
          </p>
          <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-sm text-neutral-900 dark:text-zinc-500 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-500" />
              Fully licensed, bonded, and insured.
            </p>
          </div>
        </div>

        {/* Right: Interactive Step Quiz */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-[var(--radius-card)] shadow-2xl relative overflow-hidden">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1.5 bg-zinc-100 dark:bg-zinc-800 w-full">
            <div 
              className="h-full bg-primary-500 transition-all duration-500 ease-out" 
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          <div className="mb-8 mt-2">
            <h3 className="text-2xl font-bold font-['var(--font-heading)']">
              {step === 1 && "Where are we moving?"}
              {step === 2 && "How large is the move?"}
              {step === 3 && "Final details"}
            </h3>
            <p className="text-neutral-900 dark:text-zinc-500 text-sm mt-1">Step {step} of 3</p>
          </div>

          <form onSubmit={handleQuickSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <label className="block text-sm font-semibold mb-2">Moving From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                    <input 
                      type="text" 
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[var(--radius-button)] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Moving To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                    <input 
                      type="text" 
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-[var(--radius-button)] focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                <label className="block text-sm font-semibold mb-2">Select Property Size</label>
                <div className="grid grid-cols-2 gap-3">
                  {['studio', '1bed', '2bed', '3bed+'].map(size => (
                    <div 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`cursor-pointer border p-4 rounded-[var(--radius-button)] flex flex-col items-center gap-2 transition-all ${selectedSize === size ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-zinc-200 dark:border-zinc-800 hover:border-primary-300'}`}
                    >
                      <Home className="w-6 h-6" />
                      <span className="text-sm font-semibold">{size.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-6">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold">You're all set!</h4>
                <p className="text-neutral-900 dark:text-zinc-500">Click below to generate your instant guaranteed estimate.</p>
              </div>
            )}

            <div className="flex justify-between items-center pt-6">
              {step > 1 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 text-neutral-900 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-neutral-900 dark:text-zinc-50 font-medium flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              ) : (
                <div /> // spacer
              )}
              
              <button 
                type="submit" 
                className="px-8 py-3 bg-primary-500 hover:bg-primary-600 text-black font-extrabold rounded-[var(--radius-button)] flex items-center gap-2 transition-all shadow-lg hover:shadow-primary-500/25"
              >
                {step < 3 ? 'Continue' : (MICROCOPY.buttons?.getQuote || "Get Instant Quote")}
                {step < 3 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
