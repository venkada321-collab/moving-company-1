import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const coreSeed = Math.floor(Math.random() * 1000000);
const corePrompt = encodeURIComponent("A premium, hyper-realistic image of professional, eco-friendly cleaning supplies (bottles, brushes, sponges) neatly arranged on a sparkling clean kitchen counter. Bright, airy, UI aesthetic.");

export const CoreServicesPage: React.FC<any> = ({ onSelectNicheForEstimate }) => {
  const services = [
    { id: 'residential', title: 'Standard House Cleaning', desc: 'Routine cleaning for bedrooms, bathrooms, and living areas.', popular: true, image: '/images/cleaning_service_standard.jpg' },
    { id: 'deep', title: 'Deep Cleaning', desc: 'Intensive scrubbing for hard-to-reach areas and baseboards.', popular: false, image: '/images/cleaning_service_deep.jpg' },
    { id: 'move', title: 'Move-In / Move-Out', desc: 'Ensure you leave or enter a spotless environment.', popular: false, image: '/images/cleaning_service_move.jpg' },
    { id: 'commercial', title: 'Office Cleaning', desc: 'Maintain a professional workspace for your team.', popular: false, image: '/images/cleaning_service_office.jpg' },
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['var(--font-heading)'] mb-4 text-neutral-900 dark:text-white">Our Cleaning Services</h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">Tailored cleaning solutions for every space and requirement.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-[var(--radius-card)] p-6 hover:border-primary-500 transition-colors flex flex-col h-full relative cursor-pointer" onClick={onSelectNicheForEstimate}>

              {service.popular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-primary-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  POPULAR
                </div>
              )}

              {/* Custom Art */}
              <div className="w-full h-32 rounded-[var(--radius-button)] flex items-center justify-center mb-6 overflow-hidden relative shadow-sm border border-neutral-200 dark:border-neutral-800">
                <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">{service.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 text-sm flex-grow mb-6">{service.desc}</p>

              <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium text-sm mt-auto">
                Select Service <CheckCircle2 className="w-4 h-4 ml-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
