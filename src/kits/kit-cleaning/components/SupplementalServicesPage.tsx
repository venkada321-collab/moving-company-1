import React from 'react';
import { MICROCOPY } from '../../../config';
import { PlusCircle, Sparkles, Check } from 'lucide-react';

const addonsSeed = Math.floor(Math.random() * 1000000);
const addonsImageUrl = "/images/cleaning_addons_1786411431937.png";

export const SupplementalServicesPage: React.FC<any> = ({ onAddSupplyToEstimate }) => {
  const addons = [
    { name: 'Inside Oven Cleaning', price: '$40' },
    { name: 'Inside Fridge Cleaning', price: '$40' },
    { name: 'Interior Windows', price: '$50' },
    { name: 'Deep Carpet Extraction', price: '$80/room' }
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-heading)'] mb-4 text-neutral-900 dark:text-white">Premium Add-On Services</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">Customize your clean with our specialized services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Custom Art */}
          <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden rounded-[var(--radius-card)]">
            <img src={addonsImageUrl} alt={MICROCOPY.images?.addons || "Service Add-ons"} className="absolute inset-0 w-full h-full object-cover" />
          </div>

          <div className="space-y-4">
            {addons.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[var(--radius-card)] p-4 flex items-center justify-between">
                <span className="font-semibold text-neutral-900 dark:text-white">{item.name}</span>
                <div className="flex items-center gap-4">
                  <span className="text-primary-600 dark:text-primary-400 font-bold">{item.price}</span>
                  <button onClick={onAddSupplyToEstimate} className="p-2 text-neutral-400 hover:text-primary-500 transition-colors">
                    <PlusCircle className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
