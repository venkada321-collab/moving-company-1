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
        return <Shirt className="w-8 h-8 text-amber-600" aria-hidden="true" />;
      case 'dish-pack':
        return <Utensils className="w-8 h-8 text-amber-600" aria-hidden="true" />;
      case 'bubble-wrap-large':
        return <Layers className="w-8 h-8 text-amber-600" aria-hidden="true" />;
      case 'mattress-bag-king':
        return <Bed className="w-8 h-8 text-amber-600" aria-hidden="true" />;
      case 'starter-pack-kit':
        return <Package className="w-8 h-8 text-amber-600" aria-hidden="true" />;
      case 'house-bundle-kit':
        return <Home className="w-8 h-8 text-amber-600" aria-hidden="true" />;
      default:
        return <Package className="w-8 h-8 text-amber-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="py-12 bg-white text-neutral-900 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400 text-black text-xs font-black uppercase tracking-widest mb-3 shadow-md">
            <Sparkles className="w-4 h-4" /> PACKING SUPPLIES & VAULT STORAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-black tracking-tight font-['Outfit']">
            PREMIUM PACKING & <span className="text-amber-600">CLIMATE VAULTS</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-600 font-medium">
            Eco-friendly moving supplies delivered directly to your door, plus 24/7 monitored temperature-controlled storage facilities in {GEO.storageFacilityCities}.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('supplies')}
            aria-pressed={activeTab === 'supplies'}
            className={`min-h-[44px] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-white ${
              activeTab === 'supplies'
                ? 'bg-black text-amber-400 shadow-xl shadow-black/20'
                : 'bg-white text-neutral-600 border border-neutral-300 hover:border-amber-400'
            }`}
          >
            <Box className="w-4 h-4" aria-hidden="true" />
            <span>Eco Packing Supplies Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            aria-pressed={activeTab === 'storage'}
            className={`min-h-[44px] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-white ${
              activeTab === 'storage'
                ? 'bg-black text-amber-400 shadow-xl shadow-black/20'
                : 'bg-white text-neutral-600 border border-neutral-300 hover:border-amber-400'
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
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-bold uppercase transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-white inline-flex items-center justify-center ${
                    selectedSupplyFilter === cat
                      ? 'bg-amber-400 text-black border border-amber-400'
                      : 'bg-white text-neutral-600 border border-neutral-200 hover:text-black hover:border-amber-300'
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
                  className="bg-white border border-neutral-200 hover:border-amber-300 rounded-2xl p-5 flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 shadow-sm text-neutral-800 relative"
                >
                  <div>
                    {supply.popular && (
                      <span className="absolute top-4 right-4 bg-black text-amber-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                        Best Seller
                      </span>
                    )}

                    <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border border-amber-100">
                      {renderSupplyIcon(supply.id)}
                    </div>

                    <h3 className="text-base font-bold text-black mb-1 font-['Outfit']">
                      {supply.name}
                    </h3>

                    <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                      {supply.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-amber-600 font-['Outfit']">
                        ${supply.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-neutral-500 ml-1 font-semibold">/ {supply.unit}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddClick(supply.id)}
                      className={`min-h-[44px] px-5 py-3 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-white shadow-md ${
                        addedItems[supply.id]
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-400 hover:bg-amber-500 text-black'
                      }`}
                    >
                      {addedItems[supply.id] ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> Added!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" aria-hidden="true" /> Add
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
            <div className="bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100 border border-amber-300 rounded-3xl p-6 text-center max-w-3xl mx-auto space-y-2 shadow-sm">
              <span className="text-xs font-black uppercase text-amber-700 tracking-widest bg-amber-200/50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Tag className="w-3 h-3" /> LIMITED {GEO.regionName} PROMOTION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black font-['Outfit']">
                {PRICING.storagePromoLabel}
              </h3>
              <p className="text-xs text-neutral-700">
                Climate-controlled 20°C temperature regulation, 24/7 biometric access, and direct loading dock ramps in {GEO.storageFacilityCities}.
              </p>
            </div>

            {/* Storage Vault Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {STORAGE_OPTIONS.map((vault, idx) => {
                // Make the second card (idx === 1) appear as the featured one
                const isFeatured = idx === 1;
                return (
                  <div
                    key={vault.id}
                    className={`flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 relative ${
                      isFeatured 
                        ? 'bg-gradient-to-br from-amber-100/80 via-amber-50 to-white border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-500/15 text-neutral-900' 
                        : 'bg-white border border-amber-200 hover:border-amber-400 rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-900/5 text-neutral-900'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isFeatured ? 'bg-black text-amber-400' : 'bg-amber-100 text-amber-800'}`}>
                          {vault.dimensions}
                        </span>
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-100 px-2 py-0.5 rounded">{PRICING.storagePromoPercent}% Promo Active</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-black mb-1 font-['Outfit']">
                        {vault.name}
                      </h3>
                      <div className="text-xs text-neutral-600 font-medium mb-3">Ideal for: {vault.idealFor}</div>

                      <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                        {vault.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-amber-200/60 mb-6">
                        {vault.features.map((feat, featureIdx) => (
                          <div key={featureIdx} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isFeatured ? 'text-amber-600' : 'text-amber-500'}`} aria-hidden="true" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className={`mb-4 text-center p-3 rounded-2xl border ${isFeatured ? 'bg-white border-amber-300' : 'bg-amber-50/50 border-amber-200'}`}>
                        <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">First Month Special Price</div>
                        <div className="text-3xl font-black text-black font-['Outfit']">
                          ${(vault.pricePerMonth * (PRICING.storagePromoPercent / 100)).toFixed(0)} <span className="text-xs text-neutral-500 font-normal">/ month</span>
                        </div>
                        <div className="text-[11px] text-neutral-400 line-through">Regular ${vault.pricePerMonth}/mo</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectStorageForEstimate(vault.id)}
                        className={`w-full min-h-[44px] py-3 px-5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-white ${
                          isFeatured 
                            ? 'bg-black text-amber-400 hover:bg-neutral-800' 
                            : 'bg-amber-400 hover:bg-amber-500 text-black'
                        }`}
                      >
                        <span>Reserve Vault</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
