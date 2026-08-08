import React, { useState } from 'react';
import { Box, Check, Shield, Info, ArrowRight, Plus } from 'lucide-react';
import { PACKING_SUPPLIES, STORAGE_OPTIONS } from '../../../data/mockData';
import { BRAND, GEO } from '../../../config';

interface SuppliesTableProps {
  onSelectTab: (tab: string) => void;
}

export const SuppliesTable: React.FC<SuppliesTableProps> = ({ onSelectTab }) => {
  const [activeView, setActiveView] = useState<'supplies' | 'storage'>('supplies');

  return (
    <section className="py-24 bg-white dark:bg-zinc-900/60 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-neutral-200 dark:border-zinc-800 pb-8">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.2em] text-primary-600 block mb-2">
              {BRAND.name} Logistics Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase font-['var(--font-heading)']">
              Materials & Climate Storage Vaults
            </h2>
            <p className="text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 font-medium text-sm mt-2 max-w-xl">
              Professional-grade protective encasement materials and climate-regulated repository vaults available across {GEO.regionName}.
            </p>
          </div>

          <div className="flex bg-zinc-800 p-1 rounded-[var(--radius-button)] border border-neutral-300 self-start md:self-auto">
            <button
              onClick={() => setActiveView('supplies')}
              className={`px-6 py-2.5 rounded-[var(--radius-button)] text-xs font-bold uppercase transition-all ${
                activeView === 'supplies' ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow' : 'text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 hover:text-black'
              }`}
            >
              Packing Inventory
            </button>
            <button
              onClick={() => setActiveView('storage')}
              className={`px-6 py-2.5 rounded-[var(--radius-button)] text-xs font-bold uppercase transition-all ${
                activeView === 'storage' ? 'bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow' : 'text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 hover:text-black'
              }`}
            >
              Storage Vaults
            </button>
          </div>
        </div>

        {activeView === 'supplies' ? (
          <div className="bg-neutral-50 dark:bg-zinc-900/40 border border-neutral-200 dark:border-zinc-800 rounded-[var(--radius-card)] overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs uppercase font-bold tracking-wider">
                  <th className="py-4 px-6">Material Item / Bundle</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Specification & Purpose</th>
                  <th className="py-4 px-6 text-right">Unit Rate</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-sm font-semibold">
                {PACKING_SUPPLIES.map((item, index) => (
                  <tr key={item.id} className="hover:bg-white dark:bg-zinc-900/60 transition-colors">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.image}</span>
                        <div>
                          <span className="font-extrabold block text-neutral-900 dark:text-white">{item.name}</span>
                          <span className="text-[11px] text-primary-700 uppercase font-mono">{item.category} • Per {item.unit}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 hidden sm:table-cell text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 text-xs font-normal max-w-md">
                      {item.description}
                    </td>
                    <td className="py-5 px-6 text-right font-mono font-black text-lg text-neutral-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-5 px-6 text-right">
                      <button
                        onClick={() => onSelectTab('quote')}
                        className="px-4 py-2 bg-white dark:bg-neutral-900 hover:bg-primary-500 hover:text-neutral-900 dark:text-white text-neutral-900 dark:text-white text-xs uppercase font-black rounded-[var(--radius-button)] transition-colors inline-flex items-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Reserve</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORAGE_OPTIONS.map((vault) => (
              <div key={vault.id} className="bg-white dark:bg-zinc-900/60 border-2 border-neutral-200 dark:border-zinc-800 rounded-[var(--radius-card)] p-8 flex flex-col justify-between hover:border-primary-500 transition-colors shadow-lg">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 bg-primary-500/20 text-neutral-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {vault.dimensions}
                    </span>
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-2xl font-black mb-2">{vault.name}</h3>
                  <p className="text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 text-xs font-normal leading-relaxed mb-6">{vault.description}</p>
                  
                  <div className="bg-neutral-50 dark:bg-zinc-900/40 p-4 rounded-[var(--radius-button)] border border-neutral-200 dark:border-zinc-800 mb-6">
                    <span className="text-xs text-neutral-900 dark:text-neutral-500 block">Monthly Repossession Rate</span>
                    <span className="text-3xl font-black font-mono text-neutral-900 dark:text-white">${vault.pricePerMonth}</span>
                    <span className="text-xs font-semibold text-emerald-700 block mt-1">✓ First 30 Days 50% Off Promotion</span>
                  </div>

                  <ul className="space-y-2 mb-8 text-xs font-bold text-neutral-600 dark:text-zinc-300">
                    {vault.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelectTab('quote')}
                  className="w-full py-3.5 bg-white dark:bg-neutral-950 hover:bg-neutral-800 text-neutral-900 dark:text-white font-black text-xs uppercase tracking-wider rounded-[var(--radius-button)] shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book Vault Space</span>
                  <ArrowRight className="w-4 h-4 text-primary-400" />
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
