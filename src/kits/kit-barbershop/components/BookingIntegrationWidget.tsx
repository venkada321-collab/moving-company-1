import React, { useState } from 'react';

export const BookingIntegrationWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-primary-500 hover:bg-primary-600 text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
      </div>

      {/* Booking Modal Stub */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-neutral-900 w-full max-w-2xl overflow-hidden shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="p-8 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950">
              <h3 className="text-2xl font-black uppercase text-neutral-900 dark:text-white font-heading">
                Book Your Appointment
              </h3>
              <p className="text-neutral-500 text-sm mt-1">Select your service and preferred barber below.</p>
            </div>
            
            <div className="p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
                <p className="text-neutral-600 dark:text-neutral-400 font-bold uppercase tracking-widest text-sm">
                  Loading Squire Booking Engine...
                </p>
                <p className="text-xs text-neutral-500 mt-2 max-w-xs mx-auto">
                  (In a production environment, the iframe or booking script would render here.)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
