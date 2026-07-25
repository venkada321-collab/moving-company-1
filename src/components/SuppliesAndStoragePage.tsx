import React, { useState } from 'react';
import { Box, Shield, ShoppingCart, CheckCircle2, ArrowRight, Sparkles, Tag, Plus, Minus, Shirt, Utensils, Layers, Bed, Package, Home } from 'lucide-react';
import { PACKING_SUPPLIES, STORAGE_OPTIONS } from '../data/mockData';
import { GEO, PRICING } from '../config';

interface SuppliesAndStoragePageProps {
  onAddSupplyToEstimate: (supplyId: string) => void;
  onSelectStorageForEstimate: (storageId: string) => void;
}

export const SuppliesAndStoragePage: React.FC<SuppliesAndStoragePageProps> = ({ 
  onAddSupplyToEstimate, 
  onSelectStorageForEstimate 
}) => {
  const [activeTab, setActiveTab] = useState<'supplies' | 'storage'>('supplies');
  const [selectedSupplyFilter, setSelectedSupplyFilter] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const filteredSupplies = selectedSupplyFilter === 'all'
    ? PACKING_SUPPLIES
    : PACKING_SUPPLIES.filter(s => s.category === selectedSupplyFilter);

  const handleAddClick = (id: string) => {
    onAddSupplyToEstimate(id);
    setAddedItems(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const renderSupplyIcon = (id: string) => {
    switch (id) {
      case 'wardrobe-box':
        return <Shirt className="w-8 h-8 text-amber-400" aria-hidden="true" />;
      case 'dish-pack':
        return <Utensils className="w-8 h-8 text-amber-400" aria-hidden="true" />;
      case 'bubble-wrap-large':
        return <Layers className="w-8 h-8 text-amber-400" aria-hidden="true" />;
      case 'mattress-bag-king':
        return <Bed className="w-8 h-8 text-amber-400" aria-hidden="true" />;
      case 'starter-pack-kit':
        return <Package className="w-8 h-8 text-amber-400" aria-hidden="true" />;
      case 'house-bundle-kit':
        return <Home className="w-8 h-8 text-amber-400" aria-hidden="true" />;
      default:
        return <Package className="w-8 h-8 text-amber-400" aria-hidden="true" />;
    }
  };

  return (
    <div className="py-12 bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
            PACKING SUPPLIES & VAULT STORAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-['Outfit']">
            PREMIUM PACKING & <span className="text-amber-400">CLIMATE VAULTS</span>
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            Eco-friendly moving supplies delivered directly to your door, plus 24/7 monitored temperature-controlled storage facilities in {GEO.storageFacilityCities}.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('supplies')}
            aria-pressed={activeTab === 'supplies'}
            className={`min-h-[44px] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeTab === 'supplies'
                ? 'bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20'
                : 'bg-[#131927] text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Box className="w-4 h-4" aria-hidden="true" />
            <span>Eco Packing Supplies Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            aria-pressed={activeTab === 'storage'}
            className={`min-h-[44px] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
              activeTab === 'storage'
                ? 'bg-amber-400 text-slate-950 shadow-xl shadow-amber-400/20'
                : 'bg-[#131927] text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>Climate Storage Vaults ({PRICING.storagePromoPercent}% OFF)</span>
          </button>
        </div>

        {/* SUPPLIES TAB VIEW */}
        {activeTab === 'supplies' && (
          <div className="space-y-8 animate-in fade-in duration-300 motion-reduce:animate-none">
            
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {['all', 'kits', 'boxes', 'protection'].map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedSupplyFilter(cat)}
                  aria-pressed={selectedSupplyFilter === cat}
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-bold uppercase transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 inline-flex items-center justify-center ${
                    selectedSupplyFilter === cat
                      ? 'bg-slate-800 text-amber-400 border border-amber-400/40'
                      : 'bg-[#131927] text-slate-300 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Supplies' : cat === 'kits' ? 'Complete Move Bundles' : cat === 'boxes' ? 'Specialty Boxes' : 'Protection Wrap'}
                </button>
              ))}
            </div>

            {/* Supplies Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSupplies.map((supply) => (
                <div
                  key={supply.id}
                  className="bg-[#131927] border border-slate-800 hover:border-amber-400/40 rounded-3xl p-6 flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 shadow-xl relative"
                >
                  <div>
                    {supply.popular && (
                      <span className="absolute top-4 right-4 bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                        Best Seller
                      </span>
                    )}

                    <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800">
                      {renderSupplyIcon(supply.id)}
                    </div>

                    <h3 className="text-base font-extrabold text-white mb-1 font-['Outfit']">
                      {supply.name}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {supply.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-amber-400 font-['Outfit']">
                        ${supply.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-slate-300 ml-1 font-semibold">/ {supply.unit}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddClick(supply.id)}
                      className={`min-h-[44px] px-4 py-2.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                        addedItems[supply.id]
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20'
                      }`}
                    >
                      {addedItems[supply.id] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Added to Quote!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" aria-hidden="true" /> Add to Quote
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* STORAGE VAULTS TAB VIEW */}
        {activeTab === 'storage' && (
          <div className="space-y-8 animate-in fade-in duration-300 motion-reduce:animate-none">
            
            {/* Promo Banner */}
            <div className="bg-gradient-to-r from-emerald-500/20 via-amber-500/10 to-emerald-500/20 border border-emerald-500/30 rounded-3xl p-6 text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-black uppercase text-emerald-400 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">
                LIMITED {GEO.regionName} PROMOTION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                {PRICING.storagePromoLabel}
              </h3>
              <p className="text-xs text-slate-300">
                Climate-controlled 20°C temperature regulation, 24/7 biometric access, and direct loading dock ramps in {GEO.storageFacilityCities}.
              </p>
            </div>

            {/* Storage Vault Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {STORAGE_OPTIONS.map((vault) => (
                <div
                  key={vault.id}
                  className="bg-[#131927] border border-slate-700 hover:border-amber-400 rounded-3xl p-6 flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 shadow-2xl relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                        {vault.dimensions}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-bold">{PRICING.storagePromoPercent}% Promo Active</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-white mb-1 font-['Outfit']">
                      {vault.name}
                    </h3>
                    <div className="text-xs text-slate-300 font-semibold mb-3">Ideal for: {vault.idealFor}</div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      {vault.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-800 mb-6">
                      {vault.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-4 text-center bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                      <div className="text-[10px] text-slate-300 font-bold uppercase">First Month Special Price</div>
                      <div className="text-3xl font-black text-amber-400 font-['Outfit']">
                        ${(vault.pricePerMonth * (PRICING.storagePromoPercent / 100)).toFixed(0)} <span className="text-xs text-slate-300 font-normal">/ month</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-through">Regular ${vault.pricePerMonth}/mo</div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectStorageForEstimate(vault.id)}
                      className="w-full min-h-[44px] bg-amber-400 hover:bg-amber-300 text-slate-950 py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/20 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span>Reserve Vault in Estimate</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

