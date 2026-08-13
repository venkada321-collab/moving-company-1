import React, { useState } from 'react';
import { MICROCOPY } from '../../../config';
import { BookOpen, ArrowRight, X } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const blogs = [
    {
      id: 1,
      title: "Top 5 Hacks for a Cleaner Kitchen",
      desc: "Discover the secrets professionals use to maintain a sterile and welcoming cooking environment.",
      content: "Keeping your kitchen spotless doesn't have to be a daily struggle. Start by wiping down surfaces immediately after cooking to prevent grease buildup. Use a microfiber cloth and a gentle all-purpose cleaner for the best results without streaks. Don't forget to tackle the sink—a quick scrub with baking soda and water keeps it shining and odor-free. Lastly, run your dishwasher with a cup of white vinegar once a month to remove hard water deposits and keep it smelling fresh.",
      image: "/images/cleaning_blog_image_1786411447892.png",
      tag: "Maintenance"
    },
    {
      id: 2,
      title: "How Often Should You Deep Clean?",
      desc: "A comprehensive guide on scheduling your deep cleans to maximize home hygiene.",
      content: "While standard cleaning maintains your home's appearance, deep cleaning gets to the root of dirt, dust, and allergens. We recommend a full deep clean every 3 to 6 months depending on your lifestyle (pets, kids, allergies). Focus on overlooked areas: behind appliances, baseboards, ceiling fans, and window tracks. Breaking these tasks down into a seasonal checklist ensures your home remains a healthy sanctuary year-round.",
      image: "/images/cleaning_blog_image_2.jpg",
      tag: "Guide"
    },
    {
      id: 3,
      title: "Eco-Friendly Cleaning Solutions",
      desc: "Learn about the best natural products that are tough on dirt but safe for your family.",
      content: "Switching to eco-friendly cleaning products protects both your family's health and the environment. Everyday pantry items like white vinegar, baking soda, and lemon juice are incredibly effective at cutting through grease and neutralizing odors. For tough stains, a paste of baking soda and water works wonders. Not only are these solutions safer than harsh chemicals, but they are also cost-effective and leave your home smelling naturally fresh.",
      image: "/images/cleaning_blog_image_3.jpg",
      tag: "Eco-Friendly"
    }
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-heading)'] mb-4 text-neutral-900 dark:text-white">Cleaning Tips & Resources</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">Expert advice to keep your home spotless between visits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <a href="#" onClick={(e) => { e.preventDefault(); setSelectedArticle(blog); }} key={blog.id} className="block group">
              <div className="bg-white dark:bg-neutral-900 rounded-[var(--radius-card)] overflow-hidden border border-neutral-200 dark:border-neutral-800 h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700">
                
                {/* Custom Art for Blog */}
                <div className="aspect-[16/9] w-full bg-neutral-100 dark:bg-neutral-900 relative overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/10 transition-colors duration-300 z-10" />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 block">{blog.tag}</span>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{blog.title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow">{blog.desc}</p>
                  <span className="text-sm font-bold text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors inline-flex items-center">Read Article <ArrowRight className="w-4 h-4 ml-1" /></span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Blog Article Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => setSelectedArticle(null)}>
          <div 
            className="bg-white dark:bg-zinc-900 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-64 sm:h-80 relative">
              <img src={selectedArticle.image} alt={selectedArticle.title} className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-8">
              <span className="text-sm font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2 block">{selectedArticle.tag}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{selectedArticle.title}</h3>
              <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
                <p>{selectedArticle.content}</p>
              </div>
              <div className="mt-8 text-center">
                <button onClick={() => setSelectedArticle(null)} className="px-6 py-2 bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-full font-bold transition-colors">
                  Close Article
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
