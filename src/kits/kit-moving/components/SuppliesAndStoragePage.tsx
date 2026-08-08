import React, { useState } from 'react';
import { Box, Shield, ShoppingCart, CheckCircle2, ArrowRight, Sparkles, Tag, Plus, Minus, Shirt, Utensils, Layers, Bed, Package, Home } from 'lucide-react';
import { PACKING_SUPPLIES, STORAGE_OPTIONS } from '../../../data/mockData';
import { GEO, PRICING } from '../../../config';
import { THEME } from '../../../config/theme';
import { LAYOUT } from '../../../config/layout';
import { SuppliesTable } from './SuppliesTable';
import { SuppliesMinimalList } from './SuppliesMinimalList';

interface SuppliesAndStoragePageProps {
  onAddSupplyToEstimate: (supplyId: string) => void;
  onSelectStorageForEstimate: (storageId: string) => void;
}

export const SuppliesAndStoragePage: React.FC<SuppliesAndStoragePageProps> = ({ 
  onAddSupplyToEstimate, 
  onSelectStorageForEstimate 
}) => {
  if (LAYOUT.variants.supplies === 'pricing-table') {
    return <SuppliesTable onSelectTab={() => onSelectStorageForEstimate('quote')} />;
  }

  if (LAYOUT.variants.supplies === 'minimal-list') {
    return <SuppliesMinimalList onAddSupplyToEstimate={onAddSupplyToEstimate} onSelectStorageForEstimate={onSelectStorageForEstimate} />;
  }

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
        return <Shirt className="w-8 h-8 text-primary-600" aria-hidden="true" />;
      case 'dish-pack':
        return <Utensils className="w-8 h-8 text-primary-600" aria-hidden="true" />;
      case 'bubble-wrap-large':
        return <Layers className="w-8 h-8 text-primary-600" aria-hidden="true" />;
      case 'mattress-bag-king':
        return <Bed className="w-8 h-8 text-primary-600" aria-hidden="true" />;
      case 'starter-pack-kit':
        return <Package className="w-8 h-8 text-primary-600" aria-hidden="true" />;
      case 'house-bundle-kit':
        return <Home className="w-8 h-8 text-primary-600" aria-hidden="true" />;
      default:
        return <Package className="w-8 h-8 text-primary-600" aria-hidden="true" />;
    }
  };

  return (
    <div className="py-12 bg-white dark:bg-zinc-900/60 text-neutral-900 dark:text-white px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-400 text-black text-xs font-black uppercase tracking-widest mb-3 shadow-md">
            <Sparkles className="w-4 h-4" /> PACKING SUPPLIES & VAULT STORAGE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            PREMIUM PACKING & <span className="text-primary-600 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">CLIMATE VAULTS</span>
          </h2>
          <p className="mt-3 text-sm text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 font-medium">
            Eco-friendly moving supplies delivered directly to your door, plus 24/7 monitored temperature-controlled storage facilities in {GEO.storageFacilityCities}.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab('supplies')}
            aria-pressed={activeTab === 'supplies'}
            className={`min-h-[44px] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white ${
              activeTab === 'supplies'
                ? 'bg-neutral-100 dark:bg-black text-primary-400 shadow-xl shadow-black/20'
                : 'bg-white dark:bg-zinc-900/60 text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 border border-neutral-300 hover:border-primary-400'
            }`}
          >
            <Box className="w-4 h-4" aria-hidden="true" />
            <span>Eco Packing Supplies Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('storage')}
            aria-pressed={activeTab === 'storage'}
            className={`min-h-[44px] px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white ${
              activeTab === 'storage'
                ? 'bg-neutral-100 dark:bg-black text-primary-400 shadow-xl shadow-black/20'
                : 'bg-white dark:bg-zinc-900/60 text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 border border-neutral-300 hover:border-primary-400'
            }`}
          >
            <Shield className="w-4 h-4" aria-hidden="true" />
            <span>Climate Storage Vaults ({PRICING.storagePromoPercent}% OFF)</span>
          </button>
        </div>

        {/* Featured Custom Storage Art Banner */}
        <div className="mb-12 rounded-sm overflow-hidden h-64 sm:h-80 relative shadow-2xl border border-neutral-200 dark:border-zinc-800">
          <img 
            src={THEME.customArt?.storage || "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"}
            alt="Climate Controlled Storage Vaults"
            className="content-art-layer storage-art absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-100 dark:bg-black/20" />
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
                  className={`min-h-[44px] min-w-[44px] px-4 py-2 rounded-full text-xs font-bold uppercase transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white inline-flex items-center justify-center ${
                    selectedSupplyFilter === cat
                      ? 'bg-primary-400 text-black border border-primary-400'
                      : 'bg-white dark:bg-zinc-900/60 text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 border border-neutral-200 dark:border-zinc-800 hover:text-black hover:border-primary-300'
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
                  className="bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 hover:border-primary-300 rounded-2xl p-5 flex flex-col justify-between transition-all motion-reduce:transition-none motion-reduce:transform-none hover:-translate-y-1 shadow-sm text-neutral-700 dark:text-zinc-200 relative"
                >
                  <div>
                    {supply.popular && (
                      <span className="absolute top-4 right-4 bg-neutral-100 dark:bg-black text-primary-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase shadow-md">
                        Best Seller
                      </span>
                    )}

                    <div className="mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 border border-primary-100">
                      {renderSupplyIcon(supply.id)}
                    </div>

                    <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {supply.name}
                    </h3>

                    <p className="text-xs text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 leading-relaxed mb-4">
                      {supply.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-neutral-200 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-primary-600" style={{ fontFamily: 'var(--font-heading)' }}>
                        ${supply.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] text-neutral-900 dark:text-neutral-500 ml-1 font-semibold">/ {supply.unit}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddClick(supply.id)}
                      className={`min-h-[44px] px-5 py-3 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white shadow-md ${
                        addedItems[supply.id]
                          ? 'bg-emerald-500 text-neutral-900 dark:text-white'
                          : 'bg-primary-400 hover:bg-primary-500 text-black'
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
            <div className="bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100 border border-primary-300 rounded-sm p-6 text-center max-w-3xl mx-auto space-y-2 shadow-sm">
              <span className="text-xs font-black uppercase text-primary-700 tracking-widest bg-primary-200/50 px-3 py-1 rounded-full inline-flex items-center gap-1">
                <Tag className="w-3 h-3" /> LIMITED {GEO.regionName} PROMOTION
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                {PRICING.storagePromoLabel}
              </h3>
              <p className="text-xs text-neutral-600 dark:text-zinc-300">
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
                        ? 'bg-gradient-to-br from-primary-100/80 via-primary-50 to-white border-2 border-primary-400 rounded-sm p-6 sm:p-8 shadow-xl shadow-primary-500/15 text-neutral-900 dark:text-white' 
                        : 'bg-white dark:bg-zinc-900/60 border border-neutral-200 dark:border-zinc-800 hover:border-primary-400 rounded-sm p-6 sm:p-8 shadow-xl shadow-primary-900/5 text-neutral-900 dark:text-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${isFeatured ? 'bg-neutral-100 dark:bg-black text-primary-400' : 'bg-primary-100 text-primary-800'}`}>
                          {vault.dimensions}
                        </span>
                        <span className="text-[10px] text-primary-700 font-bold bg-primary-100 px-2 py-0.5 rounded">{PRICING.storagePromoPercent}% Promo Active</span>
                      </div>

                      <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                        {vault.name}
                      </h3>
                      <div className="text-xs text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 font-medium mb-3">Ideal for: {vault.idealFor}</div>

                      <p className="text-xs text-neutral-900 dark:text-neutral-500 dark:text-zinc-400 leading-relaxed mb-6">
                        {vault.description}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-neutral-200/60 dark:border-zinc-800/60 mb-6">
                        {vault.features.map((feat, featureIdx) => (
                          <div key={featureIdx} className="flex items-center gap-2 text-xs text-neutral-600 dark:text-zinc-300 font-medium">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 ${isFeatured ? 'text-primary-600' : 'text-primary-500'}`} aria-hidden="true" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className={`mb-4 text-center p-3 rounded-2xl border ${isFeatured ? 'bg-white dark:bg-zinc-900/60 border-primary-300' : 'bg-primary-50/50 border-neutral-200 dark:border-zinc-800'}`}>
                        <div className="text-[10px] text-neutral-900 dark:text-neutral-500 font-bold uppercase tracking-wider">First Month Special Price</div>
                        <div className="text-3xl font-black text-neutral-900 dark:text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                          ${(vault.pricePerMonth * (PRICING.storagePromoPercent / 100)).toFixed(0)} <span className="text-xs text-neutral-900 dark:text-neutral-500 font-normal">/ month</span>
                        </div>
                        <div className="text-[11px] text-neutral-900 dark:text-neutral-500 dark:text-neutral-400 line-through">Regular ${vault.pricePerMonth}/mo</div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectStorageForEstimate(vault.id)}
                        className={`w-full min-h-[44px] py-3 px-5 rounded-xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-white ${
                          isFeatured 
                            ? 'bg-neutral-100 dark:bg-black text-primary-400 hover:bg-neutral-800' 
                            : 'bg-primary-400 hover:bg-primary-500 text-black'
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
