import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Send, Download } from 'lucide-react';
import { BRAND, GEO, LEGAL } from '../../../config';

interface COIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const COIModal: React.FC<COIModalProps> = ({ isOpen, onClose }) => {
  const [condoAddress, setCondoAddress] = useState<string>(GEO.defaultCondoAddress);
  const [condoCorp, setCondoCorp] = useState<string>(GEO.defaultCondoCorp);
  const [unitNumber, setUnitNumber] = useState<string>(GEO.defaultCondoUnit);
  const [conciergeEmail, setConciergeEmail] = useState<string>(GEO.defaultConciergeEmail);
  const [moveDate, setMoveDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [generated, setGenerated] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleGenerateCOI = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-white dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coi-modal-title"
    >
      <div className="bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 text-neutral-900 dark:text-white border-2 border-primary-300 rounded-3xl shadow-2xl shadow-primary-950/20 max-w-2xl w-full overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-400 via-primary-300 to-primary-400 p-6 text-black border-b border-primary-400 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-white dark:bg-neutral-50 dark:bg-zinc-900/60/40 text-primary-900 border border-primary-500/30">
              <ShieldCheck className="w-6 h-6" aria-hidden="true" />
            </div>
            <div>
              <h3 id="coi-modal-title" className="text-xl font-extrabold text-black font-['Montserrat',sans-serif]">
                Free {LEGAL.coiAmount} Condo Certificate of Insurance (COI)
              </h3>
              <p className="text-sm font-medium text-neutral-700 dark:text-zinc-200 mt-1">
                Directly transmitted to your {GEO.cities[0]} property management or concierge within 15 minutes.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] p-2 rounded-full text-neutral-700 dark:text-zinc-200 hover:text-black hover:bg-primary-500/20 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body Content & Form */}
        <div className="p-6 bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 text-neutral-700 dark:text-zinc-200 space-y-6">
          {!generated ? (
            <form onSubmit={handleGenerateCOI} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-600 dark:text-zinc-300 uppercase tracking-wider">Condo Building Address *</label>
                  <input
                    type="text"
                    required
                    value={condoAddress}
                    onChange={(e) => setCondoAddress(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-300 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 rounded-xl p-3 font-medium focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-600 dark:text-zinc-300 uppercase tracking-wider">Condo Corporation Name *</label>
                  <input
                    type="text"
                    required
                    value={condoCorp}
                    onChange={(e) => setCondoCorp(e.target.value)}
                    placeholder={`e.g. ${GEO.condoCorpPrefix} #1982`}
                    className="w-full bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-300 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 rounded-xl p-3 font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-600 dark:text-zinc-300 uppercase tracking-wider">Unit Number *</label>
                  <input
                    type="text"
                    required
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    className="w-full bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-300 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 rounded-xl p-3 font-medium focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-600 dark:text-zinc-300 uppercase tracking-wider">Concierge / Manager Email *</label>
                  <input
                    type="email"
                    required
                    value={conciergeEmail}
                    onChange={(e) => setConciergeEmail(e.target.value)}
                    placeholder="concierge@building.com"
                    className="w-full bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-300 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 rounded-xl p-3 font-medium focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-neutral-600 dark:text-zinc-300 uppercase tracking-wider">Reserved Elevator Date</label>
                <input
                  type="date"
                  required
                  value={moveDate}
                  onChange={(e) => setMoveDate(e.target.value)}
                  className="w-full sm:w-1/2 bg-white dark:bg-neutral-50 dark:bg-zinc-900/60 border border-neutral-300 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-400/20 rounded-xl p-3 font-medium focus:outline-none transition-all"
                />
              </div>

              {/* Information Badges / SLA Guarantee */}
              <div className="bg-primary-50 border border-neutral-200 dark:border-zinc-800 rounded-2xl p-4 text-neutral-700 dark:text-zinc-200 font-medium text-sm flex gap-3 items-start">
                <ShieldCheck className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-neutral-900 dark:text-white">Coverage Details:</span> {BRAND.name} carries {LEGAL.coiAmount} Commercial General Liability under policy {LEGAL.coiPolicyNumber}, issued by {LEGAL.coiInsurer} with WSIB clearance.
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-neutral-100 dark:bg-black hover:bg-neutral-800 text-primary-400 font-extrabold text-lg py-4 px-6 rounded-2xl shadow-xl shadow-black/15 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
              >
                <Send className="w-5 h-5" />
                <span>Transmit COI to Concierge Now</span>
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center py-6 animate-in fade-in duration-300">
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 border-4 border-green-200 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-extrabold text-neutral-900 dark:text-white font-['Montserrat',sans-serif]">
                CERTIFICATE OF INSURANCE TRANSMITTED!
              </h4>

              <p className="text-sm font-medium text-neutral-900 dark:text-neutral-500 dark:text-neutral-600 dark:text-neutral-400 dark:text-zinc-400 max-w-md mx-auto">
                An official PDF Certificate naming <span className="text-primary-600 font-bold">{condoCorp}</span> as Additional Insured has been emailed to <span className="text-neutral-900 dark:text-white font-bold">{conciergeEmail}</span>.
              </p>

              {/* Mock Certificate Preview Card */}
              <div className="bg-primary-50 border border-neutral-200 dark:border-zinc-800 p-5 rounded-2xl text-left text-xs font-mono space-y-1.5 text-neutral-600 dark:text-zinc-300 shadow-sm max-w-lg mx-auto">
                <div className="text-primary-700 font-bold text-sm mb-3 border-b border-neutral-200 dark:border-zinc-800 pb-2">CERTIFICATE OF LIABILITY INSURANCE {LEGAL.coiCertificateNumber}</div>
                <div><span className="font-semibold text-neutral-900 dark:text-white">INSURED:</span> {BRAND.legalName} ({LEGAL.coiAmount} {GEO.currency})</div>
                <div><span className="font-semibold text-neutral-900 dark:text-white">ADDITIONAL INSURED:</span> {condoCorp}</div>
                <div><span className="font-semibold text-neutral-900 dark:text-white">LOCATION:</span> {condoAddress} ({unitNumber})</div>
                <div><span className="font-semibold text-neutral-900 dark:text-white">DATE OF MOVE:</span> {moveDate}</div>
                <div className="text-green-600 pt-3 font-sans text-[11px] font-bold flex items-center gap-1.5">
                   <CheckCircle2 className="w-3.5 h-3.5" /> STATUS: Transmitted via Automated Insurance Portal
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => setGenerated(false)}
                  className="bg-zinc-800 hover:bg-neutral-200 text-neutral-700 dark:text-zinc-200 px-6 py-3 rounded-xl text-sm font-bold transition-colors border border-neutral-300"
                >
                  Edit Details
                </button>
                <button
                  onClick={onClose}
                  className="bg-neutral-100 dark:bg-black hover:bg-neutral-800 text-primary-400 px-8 py-3 rounded-xl text-sm font-extrabold uppercase shadow-lg shadow-black/10 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
