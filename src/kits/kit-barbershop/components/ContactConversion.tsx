import React from 'react';
import { BRAND } from '../../../config';

export const ContactConversion: React.FC = () => {
  return (
    <section id="contact_conversion" className="py-24 bg-neutral-100 dark:bg-black w-full border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-neutral-900 dark:text-white font-heading tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Have a specific request or booking issue? Send us a message and we'll get back to you shortly.
          </p>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Name</label>
              <input type="text" className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-4 text-neutral-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Phone</label>
              <input type="tel" className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-4 text-neutral-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="(555) 555-5555" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-2">Message</label>
            <textarea rows={4} className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 p-4 text-neutral-900 dark:text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="How can we help?"></textarea>
          </div>
          <button type="submit" className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-black font-bold uppercase tracking-widest transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
