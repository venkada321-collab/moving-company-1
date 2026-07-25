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
    <div className="py-12 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Gift className="w-3.5 h-3.5" aria-hidden="true" /> {BRAND.referralProgramName}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit']">
            GIVE ${BRAND.referralGiveAmount}, <span className="text-amber-400">GET ${BRAND.referralGetAmount} CASH BACK</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Know someone moving in {GEO.cities.slice(0, 3).join(', ')}, or {GEO.cities[3]}? Send them ${BRAND.referralGiveAmount} off their move and collect ${BRAND.referralGetAmount} direct e-Transfer reward when they complete their booking.
          </p>
        </div>

        {/* Main Interactive Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#131927] border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Left Form: Code Generator */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                STEP 1: CREATE YOUR CUSTOM REFERRAL LINK
              </span>
              <h3 className="text-2xl font-black text-white font-['Outfit']">
                Generate Your Unique Ambassador Code
              </h3>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="referral-user-name" className="text-xs font-semibold text-slate-300">Your Full Name</label>
                  <input
                    id="referral-user-name"
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="referral-user-email" className="text-xs font-semibold text-slate-300">Your Email (for ${BRAND.referralGetAmount} e-Transfer)</label>
                  <input
                    id="referral-user-email"
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#131927] transition-colors motion-reduce:transition-none"
              >
                <span>Generate My ${BRAND.referralGetAmount} Link</span>
                <Sparkles className="w-4 h-4" aria-hidden="true" />
              </button>
            </form>

            {/* Generated Code Display Box */}
            {submitted && (
              <div className="mt-6 bg-slate-900 border border-amber-400/40 rounded-2xl p-5 space-y-3 animate-in fade-in duration-300 motion-reduce:animate-none">
                <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                  <span className="flex items-center gap-1.5">
                    <PartyPopper className="w-4 h-4 text-amber-400" aria-hidden="true" />
                    YOUR REFERRAL CODE IS READY!
                  </span>
                  <span className="text-emerald-400">100% Active</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <div className="w-full bg-[#1c2438] border border-slate-700 px-4 py-3 rounded-xl font-mono text-sm text-amber-300 font-bold break-all min-h-[44px] flex items-center">
                    {shareableUrl}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label={copied ? 'Copied referral link to clipboard' : 'Copy referral link to clipboard'}
                    className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-xl font-extrabold text-xs uppercase flex items-center justify-center gap-2 shrink-0 transition-all motion-reduce:transition-none min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                  >
                    {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
                    <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
                  </button>
                </div>

                <p className="text-[11px] text-slate-300">
                  Share this link on WhatsApp, iMessage, or Instagram. Anyone using this code receives ${BRAND.referralGiveAmount} off instantly!
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Earnings Tracker Mockup & Rules */}
          <div className="lg:col-span-5 bg-[#1c2438] border border-slate-700 rounded-2xl p-6 space-y-6">
            <h4 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-400" aria-hidden="true" />
              How the ${BRAND.referralGetAmount} Reward Works
            </h4>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0" aria-hidden="true">1</div>
                <div>
                  <div className="font-bold text-white">Share Your Link</div>
                  <div>Send your custom code to friends, family, or {GEO.regionName} neighbors.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0" aria-hidden="true">2</div>
                <div>
                  <div className="font-bold text-white">Friend Saves ${BRAND.referralGiveAmount} Instantly</div>
                  <div>They apply your code during checkout for an automatic ${BRAND.referralGiveAmount} price reduction.</div>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center shrink-0" aria-hidden="true">3</div>
                <div>
                  <div className="font-bold text-white">You Get ${BRAND.referralGetAmount} e-Transfer</div>
                  <div>Once their move completes, ${BRAND.referralGetAmount} is deposited directly to your {GEO.paymentMethod}.</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700 text-[11px] text-slate-300 text-center font-medium">
              Unlimited referrals allowed! Top ambassadors earn over {BRAND.referralTopEarning}.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

