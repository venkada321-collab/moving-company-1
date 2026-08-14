import React from 'react';

const team = [
  { name: "Julian 'The Blade'", specialty: 'Master Barber', img: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop' },
  { name: 'Marcus Fade', specialty: 'Fade Specialist', img: 'https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop' },
  { name: 'Dominic Sharp', specialty: 'Beard Sculpting', img: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=800&auto=format&fit=crop' },
  { name: 'Vito Clippers', specialty: 'Classic Cuts', img: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop' }
];

export const TeamBarberRoster: React.FC = () => {
  return (
    <section id="team_roster" className="py-24 bg-neutral-100 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800">
      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* 50/50 Split Layout as per spatial findings */}
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Text Left 50% */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-primary-500 font-bold uppercase tracking-widest mb-2">The Masters</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase text-neutral-900 dark:text-white font-heading leading-[1.1] mb-6">
              Meet Toronto's Best Barbers
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-lg leading-relaxed">
              Our team of highly skilled barbers will have you looking your best, whatever your style preference. We accept walk-ins, but appointments are highly recommended to secure your preferred barber.
            </p>
            <button className="self-start px-8 py-4 border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black font-bold uppercase tracking-wider transition-colors">
              View All Profiles
            </button>
          </div>
          
          {/* Roster Grid Right 50% */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {team.map((member, idx) => (
                <div key={idx} className="group relative overflow-hidden bg-black aspect-[3/4]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0" />
                  <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                    <h3 className="text-2xl font-black text-primary-500 uppercase font-heading">{member.name}</h3>
                    <p className="text-white text-sm uppercase tracking-widest font-semibold">{member.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
