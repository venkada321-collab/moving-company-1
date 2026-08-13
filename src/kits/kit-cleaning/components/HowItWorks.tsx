import React from 'react';
import { MICROCOPY } from '../../../config';
import { Calendar, Droplets, Smile } from 'lucide-react';

const processSeed = Math.floor(Math.random() * 1000000);
const processImageUrl = "/images/cleaning_process_flow_1786411395904.png";

export const HowItWorks: React.FC<any> = ({ onStartEstimate }) => {
  return (
    <section className="py-24 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-heading)'] mb-4 text-neutral-900 dark:text-white">How It Works</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">Our simple three-step process to a spotless environment.</p>
        </div>

        {/* Custom Art for Process */}
        <div className="w-full h-48 md:h-64 bg-neutral-100 dark:bg-neutral-950 rounded-[var(--radius-card)] flex items-center justify-center mb-12 overflow-hidden relative shadow-inner">
          <img src={processImageUrl} alt={MICROCOPY.images?.process || "Process Overview"} className="absolute inset-0 w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">1. Book Your Clean</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Select your date and customize your cleaning package online.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
              <Droplets className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">2. We Clean</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Our vetted professionals arrive with top-tier equipment.</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full flex items-center justify-center mb-6">
              <Smile className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-neutral-900 dark:text-white">3. You Relax</h3>
            <p className="text-neutral-600 dark:text-neutral-400">Enjoy your pristine space with absolute peace of mind.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
