import React from 'react';
import { MICROCOPY } from '../../../config';
import { X, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

const coiSeed = Math.floor(Math.random() * 1000000);
const coiImageUrl = "/images/cleaning_certificate_1786411440045.png";

interface COIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const COIModal: React.FC<COIModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 rounded-[var(--radius-card)] shadow-2xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">100% Satisfaction Guarantee</h2>
          <p className="text-neutral-600 dark:text-neutral-400">Fully Licensed, Bonded, and Insured.</p>
        </div>

        {/* Custom Art for Certificate */}
        <div className="w-full h-32 rounded-xl mb-6 flex items-center justify-center overflow-hidden border border-amber-200 dark:border-amber-900/50 shadow-sm relative">
          <img src={coiImageUrl} alt={MICROCOPY.images?.coi || "Insurance Certificate"} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-6">
          We carry comprehensive liability insurance to protect your property and our staff. If you are not completely satisfied with our service, let us know within 24 hours and we will re-clean the area for free.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-[var(--radius-button)] transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
};
