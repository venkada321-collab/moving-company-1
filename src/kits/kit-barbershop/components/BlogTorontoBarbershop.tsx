import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { GEO } from '../../../config';

export const BlogTorontoBarbershop: React.FC = () => {
  const articles = [
    {
      title: `The Rise of the ${GEO.regionName} Fade: Why Local Barbers are Setting Global Trends`,
      excerpt: `From Queen Street to the Financial District, ${GEO.regionName} barbers are redefining the classic fade. Here's what makes the 6ix's grooming scene so unique.`,
      category: "Style Trends",
      date: "Oct 12, 2026",
      image: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: `Navigating ${GEO.regionName}'s Best Beard Care Boutiques`,
      excerpt: "Winter in the city is harsh on your facial hair. We break down the top locally-sourced beard oils and how to maintain that lumberjack aesthetic.",
      category: "Grooming Tips",
      date: "Nov 04, 2026",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: `Behind the Chair: Stories from the GTA's Master Barbers`,
      excerpt: "We sat down with three award-winning barbers to discuss the evolution of men's grooming and what it takes to build a loyal clientele in a competitive market.",
      category: "Community",
      date: "Dec 18, 2026",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section id="blog_page" className="py-24 bg-zinc-50 dark:bg-neutral-950 font-['var(--font-body)']">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-bold tracking-widest uppercase mb-4">
            <MapPin className="w-4 h-4" /> The {GEO.regionName} Dispatch
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4 font-['var(--font-heading)'] text-neutral-900 dark:text-white">
            Grooming & Culture
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Insights, style guides, and stories straight from the chairs of {GEO.regionName}'s premier barbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <div key={idx} className="group bg-white dark:bg-neutral-900 rounded-[var(--radius-card)] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-neutral-800 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">
                  {article.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="text-sm text-primary-500 font-bold mb-3">{article.date}</div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4 line-clamp-2 leading-tight">
                  {article.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8 line-clamp-3 flex-1">
                  {article.excerpt}
                </p>
                <button className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors mt-auto w-max">
                  Read Article <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
