import React from 'react';
import { X, CheckCircle2, Calendar, MapPin, Truck, ShieldCheck, Printer, Download, Sparkles, Phone } from 'lucide-react';
import { QuoteRequest } from '../types';
import { SERVICE_NICHES, PACKING_SUPPLIES, STORAGE_OPTIONS } from '../data/mockData';
import { BRAND, GEO, LEGAL } from '../config';

interface BookingConfirmationModalProps {
  quote: {
    details: QuoteRequest;
    estimate: { min: number; max: number };
  } | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({ quote, onClose }) => {
  if (!quote) return null;

  const refCode = `${BRAND.bookingRefPrefix}-${Math.floor(10000 + Math.random() * 90000)}`;
  const selectedNiche = SERVICE_NICHES.find(s => s.id === quote.details.serviceNicheId);
  const selectedStorage = STORAGE_OPTIONS.find(st => st.id === quote.details.storageOptionId);

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-confirmation-title"
    >
      <div className="bg-[#131927] border border-amber-400/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Close confirmation modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full inline-block">
            ESTIMATE GUARANTEED & LOCKED
          </span>
          <h3 id="booking-confirmation-title" className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            QUOTE CONFIRMED #{refCode}
          </h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            A confirmation receipt has been sent to <span className="text-amber-400 font-bold">{quote.details.email}</span>. Our {GEO.regionName} dispatch coordinator will contact you shortly to confirm elevator access windows.
          </p>
        </div>

        {/* Itemized Confirmation Receipt Card */}
        <div className="bg-[#1c2438] border border-slate-700/80 rounded-2xl p-5 space-y-4 text-xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-700">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Customer Name</div>
              <div className="text-sm font-bold text-white">{quote.details.fullName}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Move Date</div>
              <div className="text-sm font-bold text-amber-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {quote.details.moveDate}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Pickup Location</div>
              <div className="text-xs font-bold text-white">{quote.details.fromZip} — {quote.details.fromAddress}</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Destination Location</div>
              <div className="text-xs font-bold text-white">{quote.details.toZip} — {quote.details.toAddress}</div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-700/80 space-y-2">
            <div className="flex justify-between text-slate-300">
              <span>Selected Niche Care:</span>
              <span className="font-bold text-white">{selectedNiche?.name || 'Standard Local Move'}</span>
            </div>

            <div className="flex justify-between text-slate-300">
              <span>{LEGAL.coiAmountShort} Condo COI Guarantee:</span>
              <span className="font-bold text-emerald-400">Issued Free ($0)</span>
            </div>

            {selectedStorage && (
              <div className="flex justify-between text-slate-300">
                <span>Vault Storage Addition:</span>
                <span className="font-bold text-white">{selectedStorage.name} (50% Promo)</span>
              </div>
            )}

            {/* Show supply items if chosen */}
            {Object.keys(quote.details.packingSupplies).some(id => (quote.details.packingSupplies[id] || 0) > 0) && (
              <div className="border-t border-slate-700/60 pt-2 text-[11px]">
                <p className="font-bold text-amber-400 mb-1">Packed Supplies Upgrades:</p>
                <div className="space-y-0.5 pl-2 text-slate-300">
                  {Object.keys(quote.details.packingSupplies).map(id => {
                    const qty = quote.details.packingSupplies[id] || 0;
                    if (qty === 0) return null;
                    const item = PACKING_SUPPLIES.find(p => p.id === id);
                    return <p key={id}>• {item?.name} (Qty: {qty})</p>;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Guaranteed Price Banner */}
          <div className="bg-slate-900 p-4 rounded-xl border border-amber-400/30 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Total All-Inclusive Estimate</div>
              <div className="text-xs text-emerald-400 font-bold">Includes Crew, Truck, Fuel & COI</div>
            </div>
            <div className="text-2xl font-black text-amber-400 font-['Outfit']">
              ${quote.estimate.min} – ${quote.estimate.max}
            </div>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <a
            href={`tel:${BRAND.phoneRaw}`}
            className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            {BRAND.phoneVanity}
          </a>

          <button
            onClick={() => {
              alert(`Booking #${refCode} saved! Printable receipt downloaded.`);
              onClose();
            }}
            className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 px-8 py-3 rounded-xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
};
