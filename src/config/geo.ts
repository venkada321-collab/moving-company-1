// ============================================================
// GEO CONFIG — Kratos Moving (Ontario / Canada-wide)
// ============================================================

export const GEO = {
  // Primary region
  regionName: 'GTA',
  regionFull: 'Greater Toronto Area',
  regionLabel: "Canada's",
  subRegions: 'Toronto, York, Peel, Durham, and Halton regions',
  provinceCode: 'ON',

  // Key cities served
  cities: [
    'Toronto', 'Woodbridge', 'Vaughan', 'Aurora',
    'Mississauga', 'Brampton', 'Oakville', 'Burlington',
    'Hamilton', 'Kitchener', 'Barrie', 'Ajax',
    'North York', 'Niagara Falls', 'Ottawa',
  ],

  // Neighborhoods with postal code prefixes (for quote form autocomplete)
  neighborhoods: [
    { name: 'Toronto (Downtown)', postal: 'M5V' },
    { name: 'North York', postal: 'M2N' },
    { name: 'Vaughan / Woodbridge', postal: 'L4L' },
    { name: 'Aurora', postal: 'L4G' },
    { name: 'Mississauga (City Centre)', postal: 'L5B' },
    { name: 'Brampton (Central)', postal: 'L6Y' },
    { name: 'Oakville (Downtown)', postal: 'L6J' },
    { name: 'Burlington', postal: 'L7R' },
    { name: 'Hamilton', postal: 'L8P' },
    { name: 'Kitchener / Waterloo', postal: 'N2G' },
    { name: 'Barrie', postal: 'L4M' },
    { name: 'Ajax', postal: 'L1S' },
    { name: 'Ottawa / Kanata', postal: 'K2K' },
    { name: 'Niagara Falls', postal: 'L2E' },
  ],

  // Default form addresses
  defaultFromAddress: '27 Roytec Rd, Woodbridge, ON',
  defaultToAddress: '15160 Yonge St, Aurora, ON',
  placeholderFrom: '100 King St West, Toronto',
  placeholderTo: '200 City Centre Dr, Mississauga',

  // Highways referenced in copy
  highways: '401/407/QEW/404',
  highwaysLong: 'Highway 401, Highway 407 ETR, QEW, Highway 404',

  // Condo-specific defaults
  defaultCondoAddress: '88 Blue Jays Way, Toronto, ON M5V 2G2',
  defaultCondoCorp: 'TSCC #2234 Parade Condominiums',
  defaultCondoUnit: 'Suite 1802',
  defaultConciergeEmail: 'concierge@example.com',
  condoCorpPrefix: 'TSCC',
  sampleCondoAddresses: '88 Blue Jays Way, 100 Harbour St, or Square One',

  // Storage facility locations
  storageFacilityCities: 'Woodbridge, Vaughan, & Aurora',

  // Footer top routes (city pairs for quick links)
  footerRoutes: [
    { from: 'Toronto', to: 'Mississauga' },
    { from: 'Vaughan', to: 'Oakville' },
    { from: 'North York', to: 'Hamilton' },
    { from: 'Toronto', to: 'Ottawa' },
    { from: 'Toronto', to: 'Kitchener' },
  ],

  // Country/region-specific
  paymentMethod: 'Canadian Interac e-Transfer',
  currency: 'CAD',
  distanceUnit: 'km',
  phonePlaceholder: '(647) 555-0192',
} as const;
