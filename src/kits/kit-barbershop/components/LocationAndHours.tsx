import React from 'react';
import { BRAND } from '../../../config';

export const LocationAndHours: React.FC = () => {
  return (
    <section id="location_hours" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-black uppercase text-neutral-900 dark:text-white font-heading mb-8">
              Location & Hours
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase mb-2 flex items-center gap-2">
                  <span className="text-primary-500">📍</span> Address
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {BRAND.hqAddress || '123 Main St, Toronto, ON M1A 1A1'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase mb-2 flex items-center gap-2">
                  <span className="text-primary-500">📞</span> Contact
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {BRAND.phone || '(555) 123-4567'}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white uppercase mb-4 flex items-center gap-2">
                  <span className="text-primary-500">🕒</span> Hours
                </h3>
                <ul className="space-y-2 text-neutral-600 dark:text-neutral-400 w-full max-w-xs">
                  <li className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2"><span>Monday - Friday</span> <span className="font-medium text-neutral-900 dark:text-white">10am - 8pm</span></li>
                  <li className="flex justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2"><span>Saturday</span> <span className="font-medium text-neutral-900 dark:text-white">9am - 6pm</span></li>
                  <li className="flex justify-between pt-2"><span>Sunday</span> <span className="font-medium text-neutral-900 dark:text-white">Closed</span></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 min-h-[400px] bg-neutral-200 dark:bg-neutral-900 relative grayscale contrast-125">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center border-4 border-black dark:border-neutral-800">
              <span className="text-neutral-400 font-bold uppercase tracking-widest">Interactive Map Frame</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
