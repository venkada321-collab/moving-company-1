import React from 'react';
import { Gift, Share2 } from 'lucide-react';
import { BRAND, MICROCOPY } from '../../../config';

const referralSeed = Math.floor(Math.random() * 1000000);
const referralImageUrl = "/images/cleaning_referral_art_1786411409601.png";

export const ReferralProgram: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="w-20 h-20 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-8">
          <Gift className="w-10 h-10" />
        </div>

        <h2 className="text-3xl md:text-5xl font-bold font-['var(--font-heading)'] mb-6 text-neutral-900 dark:text-white">
          Refer a Friend, Get {BRAND.referralGetAmount}
        </h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto">
          Love our cleaning service? Share the secret to a spotless home with your friends and neighbors, and earn credits towards your next clean.
        </p>

        {/* Custom Art for Referral */}
        <div className="w-full max-w-lg mx-auto h-48 rounded-[var(--radius-card)] border border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center mb-10 overflow-hidden relative shadow-sm">
          <img src={referralImageUrl} alt={MICROCOPY.images?.referral || "Referral Program"} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <button className="inline-flex items-center justify-center px-8 py-4 bg-primary-500 hover:bg-primary-600 text-black font-bold rounded-[var(--radius-button)] transition-colors text-lg">
          Generate My Referral Link
        </button>
      </div>
    </section>
  );
};
