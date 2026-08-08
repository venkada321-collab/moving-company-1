import { ServiceNiche, SEORoute, BlogPost, PackingSupply, StorageOption, Testimonial, Award } from '../types';

export const SERVICE_NICHES: ServiceNiche[] = [
  {
    id: 'condo-moves',
    name: 'High-Rise Condominium Moves Moves',
    description: 'Executive relocation services tailored for dense metropolitan skyscrapers and condominiums. Full structural elevator padding, verified building manager liability certificates, and punctual window compliance.',
    icon: 'Building2',
    baseRate: 145,
    extraFees: 'No elevator surcharge; Insurance issuance included free',
    features: [
      'Executive liability policy paperwork formatted for high-rise property managers',
      'Heavy-duty neoprene lining for elevators and door frame barriers',
      'Zero-tolerance timing execution for strict elevator booking hours',
      'Specialized low-profile shuttle trucks engineered for compact underground facilities',
      'Heavy protective floor masking and doorway padding deployed in corridors'
    ],
    tips: [
      'Book your elevator with property management at least 2-3 weeks prior',
      'Ensure concierge has our insurance on file 48 hours before move day',
      'Confirm loading dock height clearance if located underground'
    ],
    stats: [
      { label: 'Condo Moves Completed', value: '8,400+' },
      { label: 'Insurance Issuance Speed', value: '< 15 Mins' },
      { label: 'Elevator Window On-Time Rate', value: '99.8%' }
    ]
  },
  {
    id: 'piano-moves',
    name: 'Heavy Organ, Safe & Acoustic Piano Handling',
    description: 'White-glove transfers for concert pianos, fragile heirlooms, and heavy security safes. Deploying commercial mechanical hoists, cushioned wood skids, and temperature-sealed transport vehicles.',
    icon: 'Music',
    baseRate: 280,
    extraFees: 'Flat item rate + flight stairs (if applicable)',
    features: [
      'Custom heavy-duty piano skid boards & lyre disassembly',
      'Multi-layer quilted moving blankets & waterproof shrink wrap',
      'Stair-climbing specialized gear & rubber ramp protection',
      'Climate-regulated air-ride suspension trucks',
      'Specialized fine instrument insurance coverage included'
    ],
    tips: [
      'Clear a 4-foot wide path from room to door prior to team arrival',
      'Inform us of any spiral or tight historic staircases in advance',
      'Plan to tune your piano 2 weeks after settling in its new climate'
    ],
    stats: [
      { label: 'Pianos Moved', value: '1,950+' },
      { label: 'Damage-Free Record', value: '100%' },
      { label: 'Max Weight Handled', value: '1,200 lbs' }
    ]
  },
  {
    id: 'long-distance',
    name: 'Direct Dedicated Cross-Province Dispatch',
    description: 'Direct highway freight routing joining Greater Toronto directly with Ottawa, Kitchener, and Niagara communities. Absolute schedule precision with dedicated single-tenant transport.',
    icon: 'Truck',
    baseRate: 1200,
    extraFees: 'Flat route pricing with mileage, fuel & toll inclusions',
    features: [
      'Dedicated truck exclusively for your belongings (no cross-loading)',
      'Guaranteed 24-48 hour delivery windows for ON corridors',
      'Live GPS location tracking via smartphone link',
      'Full inventory tagging & digital itemized manifests',
      'Overnight secure truck parking with locked satellite tracking'
    ],
    tips: [
      'Prepare essential night bag with toiletries for express transit day',
      'Confirm parking permits for destination cities like Ottawa',
      'Label fragile boxes with room location on top & all 4 sides'
    ],
    stats: [
      { label: 'Corridor Trips / Year', value: '620+' },
      { label: 'Avg Delivery Time (Tor-Ott)', value: '24 Hours' },
      { label: 'GPS Tracking Refresh', value: 'Real-Time' }
    ]
  },
  {
    id: 'white-glove-packing',
    name: 'Surgical Home Packaging & Interior Placement',
    description: 'Complete hands-free relocation. Our professional PROFEESIONAL packing crews bring eco-friendly boxes, pack every drawer and closet, transport, and unpack your new home down to the last spoon.',
    icon: 'PackageCheck',
    baseRate: 160,
    extraFees: 'Supplies charged at wholesale cost',
    features: [
      'Complete pre-move packing of kitchenware, china, clothes, & decor',
      'Custom wardrobe box hanging & garment protection bags',
      'Color-coded box tagging matched to new home floorplan rooms',
      'Post-move complete unboxing, furniture assembly & trash removal',
      'Eco-friendly box recycling & pick-up after you unpack'
    ],
    tips: [
      'Separate personal documents, passports, and medicine before crew arrives',
      'Let packers know about sentimental heirlooms requiring double-boxing',
      'Have new home floorplan ready for color-coded room routing'
    ],
    stats: [
      { label: 'Boxes Packed Daily', value: '3,500+' },
      { label: 'Avg 2-Bed Pack Time', value: '3.5 Hours' },
      { label: 'Unpack Satisfaction', value: '100%' }
    ]
  }
];

export const SEO_ROUTES: SEORoute[] = [
  {
    id: 'woodbridge-to-toronto',
    fromCity: 'Vaughan / Woodbridge (L4L)',
    fromState: 'ON',
    toCity: 'Metropolitan Toronto (M5V)',
    toState: 'ON',
    distance: 30,
    estHours: 3.5,
    avgCostRange: '$560 - $880',
    description: 'Our most requested corridor. Seamless moves from Woodbridge suburban homes directly to downtown Toronto high-rise condos, executed flawlessly by our Elite Crew team.',
    highlights: [
      'Precision routing schedules engineered to circumvent major expressway delays',
      'Concierge compliance documentation expedited for high-rise superintendents',
      'Engineered specifically for transitions linking suburban estates to downtown high-rise residences'
    ],
    testimonials: [
      {
        author: 'Marcus & Julian Vance',
        rating: 5,
        text: 'Moved from our Woodbridge home to a King West condo. PROFEESIONAL relocation solutions had the insurance sent directly to the concierge. Truly Punctuality Verified!',
        date: 'July 14, 2026'
      }
    ]
  },
  {
    id: 'aurora-to-oakville',
    fromCity: 'Aurora Center (L4G)',
    fromState: 'ON',
    toCity: 'Oakville Lakeshore (L6J)',
    toState: 'ON',
    distance: 65,
    estHours: 4.5,
    avgCostRange: '$740 - $1,240',
    description: 'Executive transit capability uniting Aurora estate residences directly with waterfront properties across South Oakville.',
    highlights: [
      'Full floor runner protection for hardwood floors & marble entryways',
      'Custom chandelier, artwork, and wine collection packing available',
      'Disassembly & reassembly of high-end Italian modular furniture'
    ],
    testimonials: [
      {
        author: 'Victoria Sterling',
        rating: 5,
        text: 'Moving our 4,000 sq ft home from Aurora to South Oakville was intimidating. The PROFEESIONAL Elite Crew crew handled our art and grand piano flawlessly.',
        date: 'June 28, 2026'
      }
    ]
  },
  {
    id: 'vaughan-to-mississauga',
    fromCity: 'Vaughan Corporate (L4K)',
    fromState: 'ON',
    toCity: 'Mississauga Central (L5B)',
    toState: 'ON',
    distance: 35,
    estHours: 3,
    avgCostRange: '$475 - $715',
    description: 'Expedient suburban transit utilizing Highway 407 ETR routes linking northern developments to central Mississauga properties.',
    highlights: [
      'Flexible same-day or evening start times',
      'Specialized mattress hygienic encasement included free',
      'Top-tier Pro-Certified Safety Academy trained professional crews'
    ],
    testimonials: [
      {
        author: 'David & Ling Chen',
        rating: 5,
        text: 'Extremely polite PROFEESIONAL crew, arrived 10 minutes early in Vaughan. Nothing scratched and the price was exact to the Direct-Quote quote!',
        date: 'May 19, 2026'
      }
    ]
  },
  {
    id: 'toronto-to-ottawa',
    fromCity: 'Toronto',
    fromState: 'ON',
    toCity: 'Ottawa / Kanata (K2K)',
    toState: 'ON',
    distance: 450,
    estHours: 6.5,
    avgCostRange: '$1,850 - $2,900',
    description: 'Direct highway logistics connecting Southern Ontario directly into Ottawa with guaranteed prompt delivery.',
    highlights: [
      'Uninterrupted direct dispatch avoiding intermediate transfer depots',
      'Temperature-controlled overnight repository access during escrow delays',
      'Comprehensive protective wrapping utilizing multi-layered moving insulation'
    ],
    testimonials: [
      {
        author: 'Dr. Aris Thorne',
        rating: 5,
        text: 'Loaded in Toronto on Tuesday morning, unpacked in Ottawa Kanata by Wednesday 11 AM. PROFEESIONAL relocation solutions delivered exactly as promised!',
        date: 'April 02, 2026'
      }
    ]
  },
  {
    id: 'brampton-to-hamilton',
    fromCity: 'Brampton (L6Y)',
    fromState: 'ON',
    toCity: 'Hamilton / Ancaster (L9G)',
    toState: 'ON',
    distance: 68,
    estHours: 4,
    avgCostRange: '$650 - $980',
    description: 'High-speed regional transport uniting Peel County with Niagara District and Niagara region corridors.',
    highlights: [
      'Express Highway 407 integration utilized to circumvent municipal traffic bottlenecks',
      'Industrial handling capabilities for fitness machinery and mechanical workshops',
      'Friendly 3-4 man Elite Crew crew configurations available for quick dispatch'
    ],
    testimonials: [
      {
        author: 'Rohan Sharma',
        rating: 5,
        text: 'Top notch PROFEESIONAL movers. Took 407 highway so we arrived ahead of schedule. Very careful with our big 75 inch TVs.',
        date: 'February 24, 2026'
      }
    ]
  },
  {
    id: 'barrie-to-kitchener',
    fromCity: 'Barrie (L4N)',
    fromState: 'ON',
    toCity: 'Kitchener (N2G)',
    toState: 'ON',
    distance: 140,
    estHours: 4.5,
    avgCostRange: '$850 - $1,350',
    description: 'Executive freight transfers linking Barrie to Kitchener-Waterloo corporate zones with precision scheduling.',
    highlights: [
      'Guaranteed transit times',
      'Pro-Certified Safety Academy certified drivers and loaders',
      'Full inventory tagging & digital itemized manifests'
    ],
    testimonials: [
      {
        author: 'Sarah Jenkins',
        rating: 5,
        text: 'The PROFEESIONAL relocation solutions process is incredible. Direct-Quote gave us a great quote, Logistics-Coordination scheduled it perfectly, and the Elite Crew crew executed without a hitch.',
        date: 'January 15, 2026'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Jonathan & Chloe Lemaire',
    role: 'High-Rise Relocation Clients',
    rating: 5,
    text: 'Transitioning out of a high-density urban tower under strict 120-minute loading rules is demanding. The PROFEESIONAL relocation solutions team had 4 Pro-Certified Safety Academy trained guys, installed elevator protection instantly and executed our complete penthouse transfer ahead of schedule. Punctuality Verified!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'High-Rise Condominium Moves Move',
    location: 'Downtown Toronto → Woodbridge',
    date: 'July 18, 2026'
  },
  {
    id: 't2',
    author: 'Dr. Arash Shariati',
    role: 'Architectural Interior Designer',
    rating: 5,
    text: 'PROFEESIONAL relocation solutions transported my fragile concert grand piano down complex heritage stairway architecture. Their structural hoisting apparatus and white-glove caution were exceptional. Zero structural surface marks and internal acoustics maintained perfectly. Highly recommend their single-item service.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Piano & Heavy Instrument',
    location: 'Toronto → Aurora',
    date: 'June 30, 2026'
  },
  {
    id: 't3',
    author: 'Benjamin H. Sterling',
    role: 'Tech Executive',
    rating: 5,
    text: 'The Direct-Quote quoting process was 100% accurate. Zero ancillary tariffs or unannounced surcharges. Logistics-Coordination scheduled everything smoothly, and the Elite Crew crew supplied custom garment carriers which simplified wardrobe organization. A premium experience start to finish.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'White-Glove Packing',
    location: 'Vaughan → Oakville',
    date: 'June 12, 2026'
  },
  {
    id: 't4',
    author: 'The Kensington Family',
    role: 'Relocating Family',
    rating: 5,
    text: 'We moved from Woodbridge to Ottawa for work. PROFEESIONAL dispatched a dedicated freight transport featuring real-time telemetry streaming. Our chronological progression from quotation to unpacking was exemplary. Arrived exactly when promised.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Long-Distance Express',
    location: 'Woodbridge → Ottawa',
    date: 'May 27, 2026'
  }
];

export const AWARDS: Award[] = [
  {
    id: 'a1',
    title: 'Canadian Logistics Trophy',
    organization: 'Commercial Carrier Guild',
    year: 'Executive Recognition',
    logo: '🏆',
    badgeText: 'Master Mover Award'
  },
  {
    id: 'a2',
    title: 'Google Guaranteed Pro',
    organization: '2,450+ Verified Client Reviews',
    year: '4.9 ★★★★★',
    logo: '⭐️',
    badgeText: 'Unprecedented Rating'
  },
  {
    id: 'a3',
    title: 'Houzz Pro Mover & Storage',
    organization: 'Concierge Preferred Partner',
    year: '4.9 ★★★★★',
    logo: '🔍',
    badgeText: 'Punctuality Verified'
  },
  {
    id: 'a4',
    title: 'Chamber of Commerce Member',
    organization: 'Business Integrity Seal',
    year: '15+ Years Service',
    logo: '🛡️',
    badgeText: 'A+ Financial Surety'
  }
];

export const PACKING_SUPPLIES: PackingSupply[] = [
  {
    id: 'wardrobe-box',
    name: 'Heavy Duty Pro Heavy-Duty Wardrobe Vault w/ Metal Bar',
    description: 'Stores twenty-four inches of hanging garments. Preserves formal attire completely smooth and uncreased during transport.',
    price: 16.99,
    unit: 'box',
    category: 'boxes',
    image: '👕',
    popular: true
  },
  {
    id: 'dish-pack',
    name: 'Culinary China & Glassware Partitions',
    description: 'Heavy-duty container with reinforced cardboard cells holding eighteen dinner plates and twenty-four stemmed wine glasses.',
    price: 21.50,
    unit: 'kit',
    category: 'boxes',
    image: '🍽️',
    popular: true
  },
  {
    id: 'bubble-wrap-large',
    name: 'Professional Cushion Roll (200 sq ft)',
    description: 'Twelve-inch easy-tear protective air cushioning designed for delicate television displays, fine mirrors, and porcelain.',
    price: 29.99,
    unit: 'roll',
    category: 'protection',
    image: '🫧'
  },
  {
    id: 'mattress-bag-king',
    name: 'Sanitary King Mattress Sealing Bag',
    description: 'Heavy polyethylene barrier shielding mattresses from exterior dust, moisture, and inclement road conditions.',
    price: 14.50,
    unit: 'each',
    category: 'protection',
    image: '🛏️',
    popular: true
  },
  {
    id: 'starter-pack-kit',
    name: 'Suite 1-2 Bedroom Master Move Package',
    description: '15 Medium Boxes, 10 Large Boxes, 2 Pro Heavy-Duty Wardrobe Vaultes, 1 Bubble Roll, 3 Tape Rolls, 1 Marker.',
    price: 139.00,
    unit: 'bundle',
    category: 'kits',
    image: '📦',
    popular: true
  },
  {
    id: 'house-bundle-kit',
    name: 'Executive Home 3-4 Bedroom Packaging Set',
    description: '30 Medium Boxes, 20 Large Boxes, 5 Pro Heavy-Duty Wardrobe Vaultes, 2 Dishpacks, 2 Bubble Rolls, 6 Tape Rolls.',
    price: 269.00,
    unit: 'bundle',
    category: 'kits',
    image: '🏠'
  }
];

export const STORAGE_OPTIONS: StorageOption[] = [
  {
    id: 'storage-5x10',
    name: '5\' x 10\' Climate Controlled Vault',
    description: 'Secure storage locker situated at our primary logistical depot. Perfect for compact apartment contents, stacked bins, and auxiliary furnishings.',
    pricePerMonth: 129,
    dimensions: '50 sq. ft. (400 cu. ft.)',
    idealFor: '1-Bed Apartment / Seasonal Overflow',
    features: [
      '24/7 Security camera monitoring & biometric gate',
      'Constant 20°C temperature & 45% humidity regulation',
      'Free loading dock usage & heavy dollies',
      'First 30 days 50% OFF promotion included'
    ]
  },
  {
    id: 'storage-10x10',
    name: '10\' x 10\' Executive Storage Unit',
    description: 'Expansivie storage bay accessible across multiple depot locations. Easily houses complete two-bedroom residential contents, household electronics, and dozens of containers.',
    pricePerMonth: 199,
    dimensions: '100 sq. ft. (800 cu. ft.)',
    idealFor: '2-3 Bedroom Condo or Townhome',
    features: [
      'Direct drive-up ground floor access option available',
      'Pest-proof sealed steel door unit with cylinder lock',
      'Individual unit intruder alarms connected to security',
      'First 30 days 50% OFF promotion included'
    ]
  },
  {
    id: 'storage-10x20',
    name: '10\' x 20\' Full Residence Vault',
    description: 'Full single-car garage size at our premium Vaughan facility. Perfect for 3-5 bedroom homes, vehicles, or commercial inventory.',
    pricePerMonth: 320,
    dimensions: '200 sq. ft. (1,600 cu. ft.)',
    idealFor: '3-5 Bedroom Detached Home / Commercial',
    features: [
      'High 10ft ceiling clearance for vertical stacking',
      'Complimentary padlocks & moving blanket wraps',
      '24-Hour emergency access permissions',
      'First 30 days 50% OFF promotion included'
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'condo-elevator-booking-guide-toronto',
    title: 'The Executive Protocol for High-Rise Loading Docks & Elevator Permits',
    excerpt: 'Executive directives for managing residential elevator reservations, damage deposit escrow checks, and high-rise dock dimensions.',
    content: `
      Moving into or out of a high-rise condominium in Toronto, Vaughan, or Mississauga comes with strict property management policies. 

      ### 1. Elevator Booking Windows
      Most condo boards restrict moving hours to weekdays between 9:00 AM – 12:00 PM and 1:00 PM – 4:00 PM. Weekend slots fill up 3 to 4 weeks in advance. Always contact your concierge or property manager early to secure your preferred 3-hour window.

      ### 2. The Insurance Requirement
      Property managers will NOT allow moving trucks to back into the loading bay unless the Relocation Enterprise provides proof of insurance naming the Condominium Corporation as an "Additional Insured". At PROFEESIONAL relocation solutions, our $1,000,000 Goods-in-Transit insurance guarantees you're covered, and we handle the paperwork as part of our Logistics-Coordination scheduling process.

      ### 3. Elevator Padding & Key Service
      On move day, our Pro-Certified Safety Academy trained crew inspects the cab before and after with concierge to ensure your damage deposit check is returned in full.

      ### Pro Tip:
      Measure your loading bay height clearance. Older downtown Toronto buildings often have 8ft clearances, requiring specialized low-profile moving trucks.
    `,
    category: 'Local',
    readTime: '5 min read',
    publishedDate: 'July 15, 2026',
    author: {
      name: 'Julian Vance',
      role: 'Director of Operations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'winter-moving-ontario-tips',
    title: 'Winterized Logistics: Mitigating Severe Blizzard & Ice Conditions Across Ontario',
    excerpt: 'Technical guidance on deploying floor film protection and insulating valuable electronics during freezing winter transports.',
    content: `
      Canadian freezing weather introduces hazardous icy surfaces and severe blizzard conditions. Executing transports throughout winter necessitates rigorous temperature mitigation to keep both your family and belongings warm and safe.

      ### Floor Protection Against Road Salt & Slush
      Abrasive chemical ice melt corrodes fine interior flooring and carpets. Our professional PROFEESIONAL Elite Crew crews position heavy-duty neoprene runners and protective floor masking along pathways across all main pathways from entry door to truck.

      ### Protecting Cold-Sensitive Electronics
      High-end electronics and audio displays must remain unplugged immediately following freezing external transport. Permit systems to normalize indoors for four hours to prevent internal condensation to prevent internal condensation short circuits.

      ### Salt & Sand Pathways Early
      Distribute de-icing agents across exterior steps and vehicle docking corridors, and loading ramp area before the crew arrives at 8 AM.
    `,
    category: 'Planning',
    readTime: '4 min read',
    publishedDate: 'June 28, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Pro-Certified Safety Academy Safety Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'toronto-to-ottawa-moving-checklist',
    title: 'The Ultimate Toronto Metro to Eastern Ontario Express Relocation Checklist',
    excerpt: 'Navigating long-distance moves, Highway 401 East express routes, and planning for a stress-free transition with PROFEESIONAL relocation solutions.',
    content: `
      Relocating 450 kilometers from Toronto Metro to Eastern Ontario Express is a major journey. Here is your timeline for a seamless transition.

      - **4 Weeks Before**: Engage with Direct-Quote to get an accurate quote and reserve your direct express truck with PROFEESIONAL relocation solutions. Unlike freight carriers that mix cargo, we guarantee a dedicated truck.
      - **2 Weeks Before**: Let our Logistics-Coordination team finalize the scheduling and confirm any parking or access requirements at your destination.
      - **1 Week Before**: Transfer utility accounts and set up internet installation for your arrival date.
      - **Move Day**: Sit back as our Elite Crew team executes the move, Punctuality Verified.
    `,
    category: 'Long-Distance',
    readTime: '6 min read',
    publishedDate: 'May 10, 2026',
    author: {
      name: 'Marc-Antoine Tremblay',
      role: 'Long-Distance Dispatcher',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80'
    },
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'
  }
];
