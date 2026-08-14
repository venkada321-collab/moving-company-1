import React from 'react';

const memberships = [
  {
    tier: 'Executive',
    price: '$99',
    period: '/ month',
    features: ['2 Haircuts per month', '1 Line up', 'Complimentary Beverages', '10% off Products'],
    highlighted: false
  },
  {
    tier: 'The Crown',
    price: '$149',
    period: '/ month',
    features: ['Unlimited Haircuts', 'Unlimited Line ups', '2 Hot Towel Shaves', 'VIP Booking Priority', '20% off Products'],
    highlighted: true
  }
];

export const VIPMembershipCards: React.FC = () => {
  return (
    <section id="vip_membership" className="py-24 bg-neutral-900 dark:bg-neutral-950 relative border-t border-neutral-800">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=2000&auto=format&fit=crop')] opacity-5 mix-blend-overlay grayscale"></div>
      
      <div className="relative z-10 max-w-[1000px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight mb-4">
            VIP Memberships
          </h2>
          <p className="text-neutral-400 text-lg max-w-xl mx-auto">
            Join the club. Keep your look sharp all month long with our exclusive grooming subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {memberships.map((plan, idx) => (
            <div key={idx} className={`p-8 flex flex-col ${plan.highlighted ? 'bg-primary-500 text-black border-none transform md:-translate-y-4 shadow-2xl shadow-primary-500/20' : 'bg-black text-white border border-neutral-800'}`}>
              <h3 className={`text-2xl font-black uppercase font-heading mb-2 ${plan.highlighted ? 'text-black' : 'text-white'}`}>{plan.tier}</h3>
              <div className="mb-6">
                <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                <span className={`text-sm font-semibold uppercase tracking-widest ${plan.highlighted ? 'text-black/70' : 'text-neutral-500'}`}>{plan.period}</span>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <svg className={`w-5 h-5 ${plan.highlighted ? 'text-black' : 'text-primary-500'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feat}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 font-bold uppercase tracking-widest transition-colors ${plan.highlighted ? 'bg-black text-white hover:bg-neutral-900' : 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black'}`}>
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
