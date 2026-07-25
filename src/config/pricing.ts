// ============================================================
// PRICING CONFIG — Kratos Moving
// ============================================================

export const PRICING = {
  // Promo codes
  promoCodes: {
    welcome: { code: 'KRATOS50', discount: 50, label: 'Welcome Promo' },
    vip: { code: 'KRATOSPRO', discount: 75, label: 'VIP $75 Credit' },
    loyalty: { code: 'KRATOS100', discount: 100, label: '$100 Moving Credit' },
  },

  // Default welcome promo
  defaultPromoDiscount: 50,

  // Regional discount
  gtaDiscount: 25,
  gtaDiscountLabel: 'GTA Address Discount',

  // Date-based discount
  midMonthDiscount: 0.10,
  midMonthRange: '10th–20th',

  // Truck & fuel flat fees
  localTruckFee: 100,
  longDistanceTruckFee: 750,

  // Estimate multipliers (for range calculation)
  estimateMinMultiplier: 0.95,
  estimateMaxMultiplier: 1.10,

  // Storage promo
  storagePromoPercent: 50,
  storagePromoDays: 30,
  storagePromoLabel: '50% OFF YOUR FIRST 30 DAYS OF STORAGE',

  // Newsletter offer
  newsletterPromoLabel: 'Exclusive $50 Promos',
} as const;
