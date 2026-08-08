module.exports.getCopyVariation = function(index) {
  const variations = [
    {
      heroTaglineSuffix: 'TRUSTED PROFESSIONALS',
      heroSubtitle: 'Reliable, stress-free service from the local team that cares about your peace of mind.',
      rankingClaim: 'Voted #1 for Customer Satisfaction',
      ctaText: 'Get Started Today',
      buttons: {
        getQuote: 'Get Your Free Quote',
        submitQuote: 'Confirm My Estimate',
        startEstimate: 'Begin Your Estimate',
        callUsNow: 'Speak To An Expert',
        learnMore: 'Learn More'
      },
      reassurances: {
        priceGuarantee: 'Transparent pricing with zero hidden fees.',
        protectionClaim: 'Fully insured for your complete protection.'
      },
      toneProfile: 'professional-approachable'
    },
    {
      heroTaglineSuffix: 'PREMIUM SERVICE GUARANTEED',
      heroSubtitle: 'Experience the gold standard. We handle the heavy lifting with precision and care.',
      rankingClaim: 'Rated 5 Stars by Top Executives',
      ctaText: 'See Your Price Now',
      buttons: {
        getQuote: 'Request an Executive Quote',
        submitQuote: 'Lock In Your Rate',
        startEstimate: 'Start Priority Estimate',
        callUsNow: 'Contact Concierge',
        learnMore: 'Explore Services'
      },
      reassurances: {
        priceGuarantee: 'Guaranteed flat rates. No surprises.',
        protectionClaim: 'Comprehensive platinum coverage included.'
      },
      toneProfile: 'luxury-concierge'
    },
    {
      heroTaglineSuffix: 'FAST & EFFICIENT',
      heroSubtitle: 'Get it done right, on time, every time. No hassle, just results.',
      rankingClaim: 'Thousands of Projects Completed',
      ctaText: 'Book Now',
      buttons: {
        getQuote: 'Calculate Instant Estimate',
        submitQuote: 'Reserve This Price',
        startEstimate: 'Start Now',
        callUsNow: 'Call Us Now',
        learnMore: 'See Details'
      },
      reassurances: {
        priceGuarantee: 'What we quote is what you pay.',
        protectionClaim: 'Bonded and insured for all scenarios.'
      },
      toneProfile: 'no-nonsense-direct'
    },
    {
      heroTaglineSuffix: 'YOUR FRIENDLY NEIGHBORS',
      heroSubtitle: 'We’re here to help make your day a little easier, with a smile.',
      rankingClaim: 'Loved by the Local Community',
      ctaText: 'Let\'s Chat',
      buttons: {
        getQuote: 'Get a Friendly Estimate',
        submitQuote: 'Send My Request',
        startEstimate: 'Start Here',
        callUsNow: 'Talk To Our Team',
        learnMore: 'Read More About Us'
      },
      reassurances: {
        priceGuarantee: 'Fair, honest pricing for everyone.',
        protectionClaim: 'We treat your property like our own.'
      },
      toneProfile: 'friendly-casual'
    },
    {
      heroTaglineSuffix: 'NEXT-GEN SOLUTIONS',
      heroSubtitle: 'Modern workflows and streamlined systems for an optimized experience.',
      rankingClaim: 'Top Rated Tech-Enabled Service',
      ctaText: 'Initialize Process',
      buttons: {
        getQuote: 'Generate Digital Quote',
        submitQuote: 'Verify Estimate',
        startEstimate: 'Launch Assessment',
        callUsNow: 'Connect With Support',
        learnMore: 'View Capabilities'
      },
      reassurances: {
        priceGuarantee: 'Algorithmic precision pricing.',
        protectionClaim: 'Secured and verified protection protocols.'
      },
      toneProfile: 'tech-forward'
    },
    {
      heroTaglineSuffix: 'CERTIFIED EXPERTS',
      heroSubtitle: 'Industry-leading professionals delivering compliant and rigorous standards.',
      rankingClaim: 'Recognized by Industry Leaders',
      ctaText: 'Schedule Consultation',
      buttons: {
        getQuote: 'Request Official Estimate',
        submitQuote: 'Authorize Pricing',
        startEstimate: 'Commence Evaluation',
        callUsNow: 'Consult An Associate',
        learnMore: 'Review Specifications'
      },
      reassurances: {
        priceGuarantee: 'Audited and verified transparent billing.',
        protectionClaim: 'Exceeds standard liability requirements.'
      },
      toneProfile: 'corporate-executive'
    }
  ];

  return variations[index % variations.length];
};
