import React from 'react';
import { Package, Shield, ArrowRight } from 'lucide-react';
import { PACKING_SUPPLIES, STORAGE_OPTIONS } from '../../../data/mockData';

interface SuppliesAndStoragePageProps {
  onAddSupplyToEstimate: (supplyId: string) => void;
  onSelectStorageForEstimate: (storageId: string) => void;
}

export const SuppliesMinimalList: React.FC<SuppliesAndStoragePageProps> = ({ 
  onAddSupplyToEstimate, 
  onSelectStorageForEstimate 
}) => {
  return (
    <div className="py-20 bg-white text-zinc-900 border-b border-zinc-200">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="mb-16">
          <h2 className="text-3xl font-black mb-4 font-['var(--font-heading)'] uppercase tracking-tight">
            Logistics & Materials Catalog
          </h2>
          <p className="text-zinc-500 max-w-2xl text-sm">
            High-grade industrial packing supplies and secure climate-controlled storage vaults. Add requirements to your estimate below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Packing Supplies List */}
          <div>
            <div className="flex items-center gap-2 mb-8 border-b-2 border-zinc-900 pb-4">
              <Package className="w-5 h-5 text-primary-500" />
              <h3 className="text-xl font-bold font-mono uppercase tracking-wider">Industrial Supplies</h3>
            </div>
            
            <ul className="space-y-4">
              {PACKING_SUPPLIES.map((supply) => (
                <li key={supply.id} className="flex items-center justify-between group py-2 border-b border-zinc-100 hover:border-primary-200 transition-colors">
                  <div>
                    <div className="font-bold">{supply.name}</div>
                    <div className="text-xs text-zinc-500 font-mono">SKU: {supply.id.toUpperCase()}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="font-mono">${supply.price.toFixed(2)}</span>
                    <button 
                      onClick={() => onAddSupplyToEstimate(supply.id)}
                      className="text-primary-600 hover:text-primary-500 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ADD <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Secure Storage Vaults List */}
          <div>
            <div className="flex items-center gap-2 mb-8 border-b-2 border-zinc-900 pb-4">
              <Shield className="w-5 h-5 text-primary-500" />
              <h3 className="text-xl font-bold font-mono uppercase tracking-wider">Secure Vaults</h3>
            </div>
            
            <ul className="space-y-4">
              {STORAGE_OPTIONS.map((storage) => (
                <li key={storage.id} className="flex flex-col sm:flex-row sm:items-center justify-between group py-3 border-b border-zinc-100 hover:border-primary-200 transition-colors gap-4">
                  <div>
                    <div className="font-bold flex items-center gap-2">
                      {storage.name}
                      {storage.features.includes('Climate Controlled') && (
                         <span className="text-[10px] bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-sm">CLIMATE</span>
                      )}
                    </div>
                    <div className="text-xs text-zinc-500 font-mono mt-1">{storage.description}</div>
                  </div>
                  <div className="flex items-center gap-6 text-sm shrink-0">
                    <span className="font-mono text-primary-600 font-bold">${storage.pricePerMonth}/mo</span>
                    <button 
                      onClick={() => onSelectStorageForEstimate(storage.id)}
                      className="px-3 py-1 bg-neutral-100 dark:bg-black text-white dark:text-black text-xs font-bold hover:bg-primary-500 hover:text-black transition-colors uppercase"
                    >
                      Reserve
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
