import React from 'react';

const gallery = [
  'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=600&auto=format&fit=crop'
];

export const LookbookGallery: React.FC = () => {
  return (
    <section id="lookbook_gallery" className="py-24 bg-white dark:bg-black w-full relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="text-primary-500 font-bold uppercase tracking-widest mb-2 block">Our Work</span>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-neutral-900 dark:text-white font-heading tracking-tight">
            The Lookbook
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {gallery.map((img, idx) => (
            <div key={idx} className="overflow-hidden group bg-neutral-100 dark:bg-neutral-900 aspect-square">
              <img 
                src={img} 
                alt={`Barbershop cut ${idx + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <button className="px-8 py-4 bg-transparent border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase tracking-wider transition-colors">
            Follow our Instagram
          </button>
        </div>
      </div>
    </section>
  );
};
