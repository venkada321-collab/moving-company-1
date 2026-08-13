import React from 'react';
import { BRAND } from '../../config/brand';

export const TrustStatsRibbon: React.FC = () => {
  const stats = [
    { label: "Verified Client Rating", value: "4.9 / 5.0", icon: "★" },
    { label: "Successful Projects", value: "10,000+", icon: "✔" },
    { label: "On-Time Completion Rate", value: "99.4%", icon: "⌚" },
    { label: "Full Cargo Insurance", value: "$2.0M Bonded", icon: "🛡️" }
  ];

  return (
    <section className="py-12 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white border-y border-neutral-200 dark:border-neutral-800 my-8 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Proof Intro */}
        <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-8">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-primary-400">
              Executive Social Proof & Corporate Legitimacy
            </span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-neutral-900 dark:text-white tracking-tight mt-2">
              Tested, Verified & Certified by {BRAND.shortName} Clients
            </h2>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-2 text-yellow-500 dark:text-yellow-400 bg-neutral-100 dark:bg-neutral-800 px-4 py-2 rounded-[var(--radius-badge)] border border-neutral-200 dark:border-neutral-700">
            <span className="text-lg font-bold">★★★★★</span>
            <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Verified Client Feedback</span>
          </div>
        </div>

        {/* Minimalist 4-Pillar Numerical Proof Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 p-6 rounded-[var(--radius-card)] text-center transition-transform hover:-translate-y-1 duration-[var(--anim-speed)]"
            >
              <div className="text-2xl sm:text-3xl font-black text-primary-400 mb-1 flex items-center justify-center gap-2">
                <span>{stat.icon}</span>
                <span>{stat.value}</span>
              </div>
              <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Executive Quotation Banner */}
        <div className="bg-gradient-to-r from-neutral-50 via-white to-neutral-50 dark:from-primary-900/40 dark:via-neutral-800/60 dark:to-primary-900/40 border border-neutral-200 dark:border-primary-500/30 rounded-[var(--radius-card)] p-8 max-w-4xl mx-auto relative shadow-lg dark:shadow-2xl">
          <div className="absolute -top-4 left-8 bg-primary-500 text-black font-extrabold text-xs px-3 py-1 rounded-[var(--radius-badge)] uppercase tracking-wide">
            Featured Case Assessment
          </div>
          <blockquote className="text-lg md:text-xl font-medium text-neutral-800 dark:text-neutral-200 italic mb-6 leading-relaxed">
            "We required precision coordination and strict adherence to property management protocols during our commercial headquarters relocation. {BRAND.name} provided faultless logistical execution, flawless packaging systems, and complete adherence to our scheduled transport windows."
          </blockquote>
          <div className="flex items-center gap-4 border-t border-neutral-200 dark:border-neutral-700/80 pt-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-500/20 text-primary-700 dark:text-primary-300 font-bold flex items-center justify-center text-lg border border-primary-200 dark:border-primary-500/40">
              DR
            </div>
            <div>
              <div className="font-bold text-neutral-900 dark:text-white text-base">Dr. Arash Shariati</div>
              <div className="text-xs text-neutral-600 dark:text-neutral-400">Director of Clinical Operations • Greater Toronto & Canada Route</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
