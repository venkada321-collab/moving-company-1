// ============================================================
// MICROCOPY & TONE OF VOICE CONFIG — Metropolitan Movers
// ============================================================

export const MICROCOPY = {
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
