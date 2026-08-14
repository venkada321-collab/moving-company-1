import React from 'react';

const services = [
  { id: 'cut', title: 'Haircut & Style', desc: 'Experience the art of a truly tailored men\'s haircut.', price: 'From $45' },
  { id: 'beard', title: 'Beard Trim & Shave', desc: 'Elevate your beard game with expert shaping and hot towel service.', price: 'From $35' },
  { id: 'lineup', title: 'Line Up', desc: 'Maintain that fresh-from-the-barber look with expert precision.', price: 'From $25' },
  { id: 'kids', title: 'Kids Cut', desc: 'A welcoming environment for stylish kids haircuts.', price: 'From $30' }
];

export const CoreServicesGrid: React.FC = () => {
  return (
    <section id="core_services" className="py-24 bg-white dark:bg-neutral-950 w-full relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-neutral-900 dark:text-white font-heading tracking-tight mb-4">
            Main Services
          </h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto"></div>
        </div>

        {/* 4-Column Layout as per spatial findings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc) => (
            <div key={svc.id} className="group relative bg-neutral-50 dark:bg-neutral-900 px-8 pt-8 pb-24 transition-colors duration-300">
              <div className="mb-6">
                <h3 className="text-2xl font-bold uppercase text-neutral-900 dark:text-white mb-2 font-heading">{svc.title}</h3>
                <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm">{svc.price}</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
                {svc.desc}
              </p>
              <div className="absolute bottom-8 left-8">
                <button className="uppercase text-sm font-bold tracking-widest text-neutral-900 dark:text-white group-hover:text-primary-500 transition-colors flex items-center gap-2">
                  Book Now <span className="text-xl">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
