import React from 'react';
import { MapPin } from 'lucide-react';
import { GEO, MICROCOPY } from '../../../config';

const mapSeed = Math.floor(Math.random() * 1000000);
const mapImageUrl = "/images/cleaning_map_illustration_1786411403252.png";

export const ServiceAreasPage: React.FC<any> = ({ onSelectRouteForEstimate }) => {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-heading)'] mb-4 text-neutral-900 dark:text-white">Service Areas</h2>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">Proudly serving {GEO.regionName} and surrounding communities.</p>

        {/* Custom Art - Map */}
        <div className="w-full h-64 md:h-80 bg-neutral-200 dark:bg-neutral-800 rounded-[var(--radius-card)] relative overflow-hidden shadow-inner mb-12">
          <img src={mapImageUrl} alt={MICROCOPY.images?.map || "Service Areas Map"} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <button onClick={onSelectRouteForEstimate} className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary-500 hover:bg-primary-600 text-black font-semibold rounded-[var(--radius-button)] transition-colors">
          Check Availability in Your Area
        </button>
      </div>
    </section>
  );
};
