import React, { useState } from 'react';
import { Gift, Copy, Check, Share2, DollarSign, Users, Sparkles, Send, ArrowRight, PartyPopper } from 'lucide-react';
import { BRAND, GEO } from '../config';

export const ReferralProgram: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>(BRAND.referralDefaultCode);
  const [copied, setCopied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) return;
    const cleanName = userName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    const code = `REF-${cleanName}${BRAND.referralGiveAmount}`;
    setGeneratedCode(code);
    setSubmitted(true);
  };

  const shareableUrl = `${BRAND.websiteUrl}/r/${generatedCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 via-white to-amber-50/50 py-16 px-4 text-neutral-900 border-y border-amber-200">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-black rounded-3xl p-8 md:p-12 shadow-2xl shadow-amber-500/20 border border-amber-400/50 text-center md:text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/10 border border-black/20 text-black text-xs font-bold uppercase tracking-widest mb-3">
            <Gift className="w-3.5 h-3.5" aria-hidden="true" /> {BRAND.referralProgramName}
          </div>
          <h2 className="text-black font-black text-5xl md:text-6xl tracking-tight font-['Montserrat',sans-serif]">
            GIVE ${BRAND.referralGiveAmount}, <span className="text-neutral-900">GET ${BRAND.referralGetAmount} CASH BACK</span>
          </h2>
          <p className="mt-3 text-neutral-900 font-bold max-w-2xl md:mx-0 mx-auto text-lg">
            Know someone moving in {GEO.cities.slice(0, 3).join(', ')}, or {GEO.cities[3]}? Send them ${BRAND.referralGiveAmount} off their move and collect ${BRAND.referralGetAmount} direct e-Transfer reward when they complete their booking.
          </p>
        </div>

        {/* Main Interactive Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden">
          
          {/* Left Form: Code Generator */}
          <div className="lg:col-span-7 bg-white border-2 border-amber-300 rounded-2xl p-6 shadow-lg text-neutral-900 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                STEP 1: CREATE YOUR CUSTOM REFERRAL LINK
              </span>
              <h3 className="text-2xl font-black text-neutral-900 font-['Montserrat',sans-serif]">
                Generate Your Unique Ambassador Code
              </h3>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="referral-user-name" className="text-xs font-semibold text-neutral-700">Your Full Name</label>
                  <input
                    id="referral-user-name"
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 font-mono p-3 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="referral-user-email" className="text-xs font-semibold text-neutral-700">Your Email (for ${BRAND.referralGetAmount} e-Transfer)</label>
                  <input
                    id="referral-user-email"
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full bg-neutral-50 border border-neutral-300 text-neutral-900 font-mono p-3 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 min-h-[44px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-black hover:bg-neutral-900 text-amber-400 font-black px-6 py-3 rounded-xl shadow-lg uppercase tracking-wider flex items-center justify-center gap-2 w-full sm:w-auto min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-colors motion-reduce:transition-none"
              >
                <span>Generate My ${BRAND.referralGetAmount} Link</span>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            {/* Generated Code Display Box */}
            {submitted && (
              <div className="mt-6 bg-amber-50/50 border border-amber-200 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300 motion-reduce:animate-none">
                <div className="flex items-center justify-between text-xs font-bold text-amber-700">
                  <span className="flex items-center gap-1.5">
                    <PartyPopper className="w-4 h-4 text-amber-600" aria-hidden="true" />
                    YOUR REFERRAL CODE IS READY!
                  </span>
                  <span className="text-green-600">100% Active</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full bg-neutral-50 border border-neutral-300 p-3 rounded-xl font-mono text-sm text-neutral-900 font-bold break-all min-h-[44px] flex items-center">
                    {shareableUrl}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied referral link to clipboard' : 'Copy referral link to clipboard'}
                    className="w-full sm:w-auto bg-black hover:bg-neutral-900 text-amber-400 font-black px-6 py-3 rounded-xl shadow-lg uppercase flex items-center justify-center gap-2 shrink-0 transition-all motion-reduce:transition-none min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                    <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-neutral-600 font-medium">
                  Share this link on WhatsApp, iMessage, or Instagram. Anyone using this code receives ${BRAND.referralGiveAmount} off instantly!
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Earnings Tracker Mockup & Rules */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-amber-200 shadow-xl shadow-amber-900/5 text-neutral-900 hover:border-amber-400 transition-all space-y-6">
            <h4 className="text-lg font-bold text-neutral-900 font-['Montserrat',sans-serif] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-500" aria-hidden="true" />
              How the ${BRAND.referralGetAmount} Reward Works
            </h4>

            <div className="space-y-4 text-sm text-neutral-700">
              <div className="flex items-start gap-4">
                <div className="bg-black text-amber-400 font-black w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md shrink-0" aria-hidden="true">1</div>
                <div className="pt-1">
                  <div className="font-bold text-neutral-900">Share Your Link</div>
                  <div className="mt-1 text-xs">Send your custom code to friends, family, or {GEO.regionName} neighbors.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-amber-400 font-black w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md shrink-0" aria-hidden="true">2</div>
                <div className="pt-1">
                  <div className="font-bold text-neutral-900">Friend Saves ${BRAND.referralGiveAmount} Instantly</div>
                  <div className="mt-1 text-xs">They apply your code during checkout for an automatic ${BRAND.referralGiveAmount} price reduction.</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-black text-amber-400 font-black w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md shrink-0" aria-hidden="true">3</div>
                <div className="pt-1">
                  <div className="font-bold text-neutral-900">You Get ${BRAND.referralGetAmount} e-Transfer</div>
                  <div className="mt-1 text-xs">Once their move completes, ${BRAND.referralGetAmount} is deposited directly to your {GEO.paymentMethod}.</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-200 text-xs text-neutral-600 text-center font-bold">
              Unlimited referrals allowed! Top ambassadors earn over {BRAND.referralTopEarning}.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
