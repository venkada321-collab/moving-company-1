// ============================================================
// MICROCOPY & TONE OF VOICE CONFIG — Metropolitan Movers
// ============================================================

export const MICROCOPY = {
  hero: {
    proclamation: "Professional Certified Service",
    trustBadge: "Vetted Professionals",
    insuranceBadge: "Fully Insured",
    ratesBadge: "Transparent Rates",
    contactHeading: "Need Immediate Service?",
    quizTitle: "Take our 30-second quiz to get an instant estimate tailored to your needs.",
    step1Question: "Where do you need service?",
    step2Question: "What is the scope of the service?"
  },
  formFields: {
    scopeLabel: "Select Service Scope",
    location1Label: "Origin / Service Postal",
    location2Label: "Destination (If applicable)",
    dateLabel: "Service Date"
  },
  formOptions: [
    { value: 'studio', label: 'Studio / Small Area' },
    { value: '1bed', label: '1 Bedroom Scope' },
    { value: '2bed', label: '2 Bedroom Scope' },
    { value: '3bed+', label: '3+ Bedroom Scope' },
    { value: 'office', label: 'Commercial Office Scope' }
  ],
  trustFilters: ['All', 'Residential', 'Commercial', 'Premium', 'Express'],
  trustStats: [
    { label: "Successful Projects", value: "10,000+", icon: "✔" },
    { label: "Verified Reviews", value: "4,500+", icon: "★" },
    { label: "Active Professionals", value: "150+", icon: "user" }
  ],
  footer: {
    cta: "READY TO START? LET'S TALK.",
    description: "Setting the canonical standard for residential and commercial services.",
    newsletterText: "Enter your email to receive a $50 promotional credit.",
    bondedText: "Fully WSIB insured with verified customer ratings."
  },
  buttons: {
    getQuote: "Calculate Your Instant Estimate",
    submitQuote: "Lock In Your All-Inclusive Rate",
    requestCOI: "Need COI Sent To Your Condo Concierge Now?",
    startEstimate: "Start Your Move Estimate Now",
    claimDiscount: "Claim 50% Off Your 1st Month",
    callUsNow: "Call Concierge Now",
    learnMore: "Explore Service Details",
  },
  placeholders: {
    originRegion: "Moving From (GTA Pickup)",
    destinationRegion: "Moving To (Select Destination Area)",
    moveDate: "Select Preferred Moving Day",
    homeSize: "Select Residence Size (e.g. 2-3 Bedroom Condo)",
    specialItems: "Any heavy pianos or glass cases?",
  },
  reassurances: {
    priceGuarantee: "Total All-Inclusive Estimate — No Hidden Elevator or Stair Fees",
    protectionClaim: "Includes Full Replacement Value Protection & GPS Tracking",
    coiFastSLA: "Free $1M - $5M Condo COI Issued in Under 2 Hours",
    noSpamPromise: "Zero spam guarantee. We never sell your personal information.",
  },
  toneProfile: "professional-approachable",
} as const;
