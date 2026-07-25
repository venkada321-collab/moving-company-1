import React, { useState } from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, Send, Download } from 'lucide-react';
import { BRAND, GEO, LEGAL } from '../config';

interface COIModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const COIModal: React.FC<COIModalProps> = ({ isOpen, onClose }) => {
  const [condoAddress, setCondoAddress] = useState(GEO.defaultCondoAddress);
  const [condoCorp, setCondoCorp] = useState(GEO.defaultCondoCorp);
  const [unitNumber, setUnitNumber] = useState(GEO.defaultCondoUnit);
  const [conciergeEmail, setConciergeEmail] = useState(GEO.defaultConciergeEmail);
  const [moveDate, setMoveDate] = useState(new Date().toISOString().split('T')[0]);
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const handleGenerateCOI = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerated(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="coi-modal-title"
    >
      <div className="bg-[#131927] border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <ShieldCheck className="w-6 h-6" aria-hidden="true" />
          </div>
          <div>
            <h3 id="coi-modal-title" className="text-xl font-black text-white font-['Outfit']">
              Free {LEGAL.coiAmount} Condo Certificate of Insurance (COI)
            </h3>
            <p className="text-xs text-slate-300">
              Directly transmitted to your {GEO.cities[0]} property management or concierge within 15 minutes.
            </p>
          </div>
        </div>

        {!generated ? (
          <form onSubmit={handleGenerateCOI} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Condo Building Address *</label>
                <input
                  type="text"
                  required
                  value={condoAddress}
                  onChange={(e) => setCondoAddress(e.target.value)}
                  className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Condo Corporation Name (TSCC / PSCC #) *</label>
                <input
                  type="text"
                  required
                  value={condoCorp}
                  onChange={(e) => setCondoCorp(e.target.value)}
                  placeholder={`e.g. ${GEO.condoCorpPrefix} #1982`}
                  className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Unit Number *</label>
                <input
                  type="text"
                  required
                  value={unitNumber}
                  onChange={(e) => setUnitNumber(e.target.value)}
                  className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Concierge / Property Manager Email *</label>
                <input
                  type="email"
                  required
                  value={conciergeEmail}
                  onChange={(e) => setConciergeEmail(e.target.value)}
                  placeholder="concierge@building.com"
                  className="w-full bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Reserved Elevator Date</label>
              <input
                type="date"
                required
                value={moveDate}
                onChange={(e) => setMoveDate(e.target.value)}
                className="w-full sm:w-1/2 bg-[#1c2438] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-300">
              <span className="font-bold text-amber-400">Coverage Details:</span> {BRAND.name} carries {LEGAL.coiAmount} Commercial General Liability under policy {LEGAL.coiPolicyNumber}, issued by {LEGAL.coiInsurer} with WSIB clearance.
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
              <span>TRANSMIT COI TO CONCIERGE NOW</span>
            </button>
          </form>
        ) : (
          <div className="space-y-6 text-center py-4 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h4 className="text-2xl font-black text-white font-['Outfit']">
              CERTIFICATE OF INSURANCE TRANSMITTED!
            </h4>

            <p className="text-xs text-slate-300 max-w-md mx-auto">
              An official PDF Certificate naming <span className="text-amber-400 font-bold">{condoCorp}</span> as Additional Insured has been emailed to <span className="text-white font-bold">{conciergeEmail}</span>.
            </p>

            {/* Mock Certificate Preview Card */}
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl text-left text-xs font-mono space-y-1 text-slate-300">
              <div className="text-amber-400 font-bold">CERTIFICATE OF LIABILITY INSURANCE {LEGAL.coiCertificateNumber}</div>
              <div>INSURED: {BRAND.legalName} ({LEGAL.coiAmount} {GEO.currency})</div>
              <div>ADDITIONAL INSURED: {condoCorp}</div>
              <div>LOCATION: {condoAddress} ({unitNumber})</div>
              <div>DATE OF MOVE: {moveDate}</div>
              <div className="text-emerald-400 pt-1 font-sans text-[10px] font-bold">STATUS: Transmitted via Automated Insurance Portal</div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setGenerated(false)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold"
              >
                Edit Details
              </button>
              <button
                onClick={onClose}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black uppercase"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
