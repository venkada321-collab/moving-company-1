import React from 'react';
import { X, CheckCircle2, Calendar, MapPin, Truck, ShieldCheck, Printer, Download, Sparkles, Phone } from 'lucide-react';
import { QuoteRequest } from '../../types';
import { SERVICE_NICHES, PACKING_SUPPLIES, STORAGE_OPTIONS } from '../../data/mockData';
import { BRAND, GEO, LEGAL } from '../../config';

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
      className="fixed inset-0 z-50 bg-white dark:bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-confirmation-title"
    >
      <div className="bg-white dark:bg-zinc-900/60 text-neutral-900 dark:text-white border-2 border-primary-300 rounded-3xl shadow-2xl shadow-primary-950/20 max-w-3xl w-full overflow-hidden relative flex flex-col">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] p-2 rounded-full bg-white dark:bg-black/10 hover:bg-white dark:bg-black/20 text-black flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black z-10 transition-colors"
          aria-label="Close confirmation modal"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        {/* Success Banner Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-primary-400 to-primary-300 p-8 text-black text-center space-y-2">
          <div className="bg-white dark:bg-black text-primary-400 rounded-full shadow-lg mx-auto mb-4 w-16 h-16 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-black/80 bg-white dark:bg-zinc-900/60/30 px-3 py-1 rounded-full inline-block mb-1">
            ESTIMATE GUARANTEED & LOCKED
          </span>
          <h3 id="booking-confirmation-title" className="text-2xl sm:text-3xl font-black text-black font-['Montserrat',sans-serif]">
            QUOTE CONFIRMED #{refCode}
          </h3>
          <p className="text-sm font-medium text-black/80 max-w-md mx-auto">
            A confirmation receipt has been sent to <span className="text-black font-extrabold">{quote.details.email}</span>. Our {GEO.regionName} dispatch coordinator will contact you shortly to confirm elevator access windows.
          </p>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Quote Summary Details Box */}
          <div className="bg-primary-50/70 border border-zinc-800 rounded-2xl p-6 text-xs text-zinc-200 space-y-4">
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between pb-4 border-b border-zinc-800">
              <div>
                <div className="text-[10px] text-neutral-900 dark:text-neutral-500 font-bold uppercase mb-1">Customer Name</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">{quote.details.fullName}</div>
              </div>
              <div className="sm:text-right">
                <div className="text-[10px] text-neutral-900 dark:text-neutral-500 font-bold uppercase mb-1">Move Date</div>
                <div className="text-sm font-bold text-primary-700 flex items-center sm:justify-end gap-1">
                  <Calendar className="w-4 h-4" /> {quote.details.moveDate}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-zinc-300">
              <div>
                <div className="text-[10px] text-neutral-900 dark:text-neutral-500 font-bold uppercase mb-1">Pickup Location</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">{quote.details.fromZip} � {quote.details.fromAddress}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-900 dark:text-neutral-500 font-bold uppercase mb-1">Destination Location</div>
                <div className="text-sm font-bold text-neutral-900 dark:text-white">{quote.details.toZip} � {quote.details.toAddress}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 space-y-3">
              <div className="flex justify-between items-center text-sm text-zinc-300">
                <span>Selected Niche Care:</span>
                <span className="font-bold text-neutral-900 dark:text-white">{selectedNiche?.name || 'Standard Local Move'}</span>
              </div>

              <div className="flex justify-between items-center text-sm text-zinc-300">
                <span>{LEGAL.coiAmountShort} Condo COI Guarantee:</span>
                <span className="font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Issued Free ($0)</span>
              </div>

              {selectedStorage && (
                <div className="flex justify-between items-center text-sm text-zinc-300">
                  <span>Vault Storage Addition:</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{selectedStorage.name} (50% Promo)</span>
                </div>
              )}

              {/* Show supply items if chosen */}
              {Object.keys(quote.details.packingSupplies).some(id => (quote.details.packingSupplies[id] || 0) > 0) && (
                <div className="border-t border-zinc-800 pt-3 mt-3">
                  <p className="font-bold text-primary-700 mb-2 text-sm">Packed Supplies Upgrades:</p>
                  <div className="space-y-1.5 pl-2 text-zinc-300 text-sm">
                    {Object.keys(quote.details.packingSupplies).map(id => {
                      const qty = quote.details.packingSupplies[id] || 0;
                      if (qty === 0) return null;
                      const item = PACKING_SUPPLIES.find(p => p.id === id);
                      return <p key={id} className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-primary-500" /> {item?.name} (Qty: {qty})</p>;
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Guaranteed Price Banner */}
            <div className="bg-white dark:bg-zinc-900/60 p-4 sm:p-5 rounded-xl border border-primary-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <div>
                <div className="text-[10px] text-neutral-900 dark:text-neutral-500 font-bold uppercase mb-1">Total All-Inclusive Estimate</div>
                <div className="text-sm text-emerald-600 font-bold">Includes Crew, Truck, Fuel & COI</div>
              </div>
              <div className="text-3xl font-black text-black font-['Montserrat',sans-serif]">
                ${quote.estimate.min} � ${quote.estimate.max}
              </div>
            </div>

          </div>

          {/* Next Steps */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wide">Next Steps</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary-700 bg-primary-100 p-2 rounded-xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm shadow-sm border border-zinc-800/50">1</span>
                <p className="text-zinc-300 text-sm mt-1 leading-relaxed">Check your email for the detailed PDF receipt and move preparation guide.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-700 bg-primary-100 p-2 rounded-xl font-bold flex-shrink-0 w-8 h-8 flex items-center justify-center text-sm shadow-sm border border-zinc-800/50">2</span>
                <p className="text-zinc-300 text-sm mt-1 leading-relaxed">A dispatch coordinator will call to confirm elevator access windows and building requirements.</p>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-4 pt-6 border-t border-zinc-800">
            <a
              href={`tel:${BRAND.phoneRaw}`}
              className="w-full sm:w-auto bg-white dark:bg-black hover:bg-neutral-800 text-primary-400 font-extrabold rounded-xl shadow-lg shadow-black/20 py-3 px-6 text-sm flex items-center justify-center gap-2 transition-all"
            >
              <Phone className="w-4 h-4" />
              Call {BRAND.phoneVanity}
            </a>

            <button
              onClick={() => {
                alert(`Booking #${refCode} saved! Printable receipt downloaded.`);
                onClose();
              }}
              className="w-full sm:w-auto bg-primary-400 hover:bg-primary-500 text-black font-extrabold rounded-xl shadow-lg shadow-primary-500/20 py-3 px-6 text-sm uppercase flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Receipt</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
