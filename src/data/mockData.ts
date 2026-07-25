import { ServiceNiche, SEORoute, BlogPost, PackingSupply, StorageOption, Testimonial, Award } from '../types';

export const SERVICE_NICHES: ServiceNiche[] = [
  {
    id: 'condo-moves',
    name: 'Condo & High-Rise Moves',
    description: 'Specialized Toronto, Woodbridge, & Vaughan high-rise moving. We handle strict condo board rules, $1M insurance guarantees, narrow loading docks, and 2-3 hour elevator reservations.',
    icon: 'Building2',
    baseRate: 145,
    extraFees: 'No elevator surcharge; Insurance issuance included free',
    features: [
      'Guaranteed $1,000,000 Goods-in-Transit Insurance sent to concierge',
      'Padded elevator wall & door protection installation',
      'Strict adherence to 2-3 hour elevator booking windows',
      'Low-clearance underground loading dock specialized trucks (8ft clearance)',
      'Floor runners & wall door-jamb protection throughout hallways'
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
    name: 'Piano & Heavy Instrument Moves',
    description: 'White-glove single-item moving for Grand Pianos, Uprights, Steinways, Organs, and Heavy Safes. Precision rigging, custom skid boards, and climate-controlled transport across Aurora, Oakville, and beyond.',
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
    name: 'Long Distance & Express Corridor',
    description: 'Direct, non-stop long-distance moves connecting Toronto, Vaughan, and Aurora to Ottawa, Kitchener, and Niagara Falls. Guaranteed delivery dates with zero shared-truck mix-ups.',
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
    name: 'Full White-Glove Packing & Unpacking',
    description: 'Complete hands-free relocation. Our professional Kratos packing crews bring eco-friendly boxes, pack every drawer and closet, transport, and unpack your new home down to the last spoon.',
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
    fromCity: 'Woodbridge (L4L)',
    fromState: 'ON',
    toCity: 'Downtown Toronto (M5V)',
    toState: 'ON',
    distance: 30,
    estHours: 3.5,
    avgCostRange: '$550 - $850',
    description: 'Our most requested corridor. Seamless moves from Woodbridge suburban homes directly to downtown Toronto high-rise condos, executed flawlessly by our Hercules team.',
    highlights: [
      'Expert highway traffic timing to avoid peak congestion hours',
      'Insurance delivery for Toronto property managers',
      'Ideal for moves between Vaughan estates and CityPlace towers'
    ],
    testimonials: [
      {
        author: 'Marcus & Julian Vance',
        rating: 5,
        text: 'Moved from our Woodbridge home to a King West condo. Kratos Moving had the insurance sent directly to the concierge. Truly Done As Promised!',
        date: 'July 14, 2026'
      }
    ]
  },
  {
    id: 'aurora-to-oakville',
    fromCity: 'Aurora (L4G)',
    fromState: 'ON',
    toCity: 'Oakville Downtown (L6J)',
    toState: 'ON',
    distance: 65,
    estHours: 4.5,
    avgCostRange: '$750 - $1,250',
    description: 'Luxury relocation service connecting Aurora estates & family homes to Lake Ontario estates in Oakville.',
    highlights: [
      'Full floor runner protection for hardwood floors & marble entryways',
      'Custom chandelier, artwork, and wine collection packing available',
      'Disassembly & reassembly of high-end Italian modular furniture'
    ],
    testimonials: [
      {
        author: 'Victoria Sterling',
        rating: 5,
        text: 'Moving our 4,000 sq ft home from Aurora to South Oakville was intimidating. The Kratos Hercules crew handled our art and grand piano flawlessly.',
        date: 'June 28, 2026'
      }
    ]
  },
  {
    id: 'vaughan-to-mississauga',
    fromCity: 'Vaughan (L4K)',
    fromState: 'ON',
    toCity: 'Mississauga City Centre (L5B)',
    toState: 'ON',
    distance: 35,
    estHours: 3,
    avgCostRange: '$480 - $720',
    description: 'Quick local moves across Highway 407 connecting Vaughan subdivisions to Mississauga condos and homes.',
    highlights: [
      'Flexible same-day or evening start times',
      'Specialized mattress hygienic encasement included free',
      'Top-tier Hercules Academy trained professional crews'
    ],
    testimonials: [
      {
        author: 'David & Ling Chen',
        rating: 5,
        text: 'Extremely polite Kratos crew, arrived 10 minutes early in Vaughan. Nothing scratched and the price was exact to the Cicero quote!',
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
    description: 'Express 401 East corridor moving residents directly to Canada’s capital city with guaranteed next-day delivery.',
    highlights: [
      'Direct truck transit without stopping at mid-way freight hubs',
      'Overnight climate controlled holding if closing dates mismatch',
      'Full furniture wrapping in double-layered heavy quilted pads'
    ],
    testimonials: [
      {
        author: 'Dr. Aris Thorne',
        rating: 5,
        text: 'Loaded in Toronto on Tuesday morning, unpacked in Ottawa Kanata by Wednesday 11 AM. Kratos Moving delivered exactly as promised!',
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
    description: 'Fast 407/403 suburban moves connecting Peel Region to the Hamilton Mountain and Niagara region corridors.',
    highlights: [
      '407 ETR toll highway routing included to bypass heavy 401 traffic',
      'Heavy gym equipment and garage workshop tool packing',
      'Friendly 3-4 man Hercules crew configurations available for quick dispatch'
    ],
    testimonials: [
      {
        author: 'Rohan Sharma',
        rating: 5,
        text: 'Top notch Kratos movers. Took 407 highway so we arrived ahead of schedule. Very careful with our big 75 inch TVs.',
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
    description: 'Efficient relocations from Barrie through to the Kitchener-Waterloo tech hub. Reliable and seamless.',
    highlights: [
      'Guaranteed transit times',
      'Hercules Academy certified drivers and loaders',
      'Full inventory tagging & digital itemized manifests'
    ],
    testimonials: [
      {
        author: 'Sarah Jenkins',
        rating: 5,
        text: 'The Kratos Moving process is incredible. Cicero gave us a great quote, Hermes scheduled it perfectly, and the Hercules crew executed without a hitch.',
        date: 'January 15, 2026'
      }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Siddharth & Priya Patel',
    role: 'Condo Homeowners',
    rating: 5,
    text: 'Moving out of a downtown Toronto condo can be a nightmare with 2-hour elevator limits. The Kratos Moving team had 4 Hercules Academy trained guys, padded the elevator walls in 5 mins, and finished moving our entire 2-bedroom with 15 mins to spare. Done As Promised!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Condo & High-Rise Move',
    location: 'Downtown Toronto → Woodbridge',
    date: 'July 18, 2026'
  },
  {
    id: 't2',
    author: 'Claire Montpetit',
    role: 'Concert Pianist & Instructor',
    rating: 5,
    text: 'Kratos Moving relocated my Yamaha C3 Grand Piano down a flight of historic Toronto Victorian steps. Their piano skid board system and care were astonishing. Not a single scratch and held pitch beautifully. Highly recommend their single-item service.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Piano & Heavy Instrument',
    location: 'Toronto → Aurora',
    date: 'June 30, 2026'
  },
  {
    id: 't3',
    author: 'Michael Zhang',
    role: 'Tech Executive',
    rating: 5,
    text: 'The Cicero quoting process was 100% accurate. No surprise fees at the end. Hermes scheduled everything smoothly, and the Hercules crew brought wardrobe boxes that made closet packing take 10 minutes. A premium experience start to finish.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'White-Glove Packing',
    location: 'Vaughan → Oakville',
    date: 'June 12, 2026'
  },
  {
    id: 't4',
    author: 'Hannah & Derek Ross',
    role: 'Relocating Family',
    rating: 5,
    text: 'We moved from Woodbridge to Ottawa for work. Kratos provided a direct dedicated truck with real-time GPS tracking. The 3-step process from quote to execution was flawless. Arrived exactly when promised.',
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
    title: 'Consumer Choice Award',
    organization: 'Greater Toronto Area',
    year: '2025 / 2026 Winner',
    logo: '🏆',
    badgeText: '#1 Voted Mover'
  },
  {
    id: 'a2',
    title: 'Top Rated Google Business',
    organization: '3,000+ Reviews',
    year: '5.0 ★★★★★',
    logo: '⭐️',
    badgeText: '5-Star Rating'
  },
  {
    id: 'a3',
    title: 'Trustpilot Excellence',
    organization: 'Verified Customers',
    year: '5.0 ★★★★★',
    logo: '🔍',
    badgeText: 'Done As Promised'
  },
  {
    id: 'a4',
    title: 'BBB Accredited A+',
    organization: 'Better Business Bureau',
    year: '10+ Years Active',
    logo: '🛡️',
    badgeText: 'Fully Licensed & Bonded'
  }
];

export const PACKING_SUPPLIES: PackingSupply[] = [
  {
    id: 'wardrobe-box',
    name: 'Heavy Duty Wardrobe Box w/ Metal Bar',
    description: 'Holds 2 feet of hanging closet clothes. Keeps suits and dresses wrinkle-free during transit.',
    price: 18.50,
    unit: 'box',
    category: 'boxes',
    image: '👕',
    popular: true
  },
  {
    id: 'dish-pack',
    name: 'Dish & Glassware Specialty Box Set',
    description: 'Double-walled box with corrugated cell dividers for 18 plates and 24 wine glasses.',
    price: 24.00,
    unit: 'kit',
    category: 'boxes',
    image: '🍽️',
    popular: true
  },
  {
    id: 'bubble-wrap-large',
    name: 'Commercial Bubble Wrap Roll (200 sq ft)',
    description: '12" width perforated bubble cushioning for fragile electronics, mirrors, and ceramics.',
    price: 29.99,
    unit: 'roll',
    category: 'protection',
    image: '🫧'
  },
  {
    id: 'mattress-bag-king',
    name: 'Hygienic King Mattress Encasement Bag',
    description: '4mil thick tear-resistant heavy plastic seal guarding against dust, dirt, and rain.',
    price: 14.50,
    unit: 'each',
    category: 'protection',
    image: '🛏️',
    popular: true
  },
  {
    id: 'starter-pack-kit',
    name: 'Condo 1-2 Bedroom Complete Move Bundle',
    description: '15 Medium Boxes, 10 Large Boxes, 2 Wardrobe Boxes, 1 Bubble Roll, 3 Tape Rolls, 1 Marker.',
    price: 149.00,
    unit: 'bundle',
    category: 'kits',
    image: '📦',
    popular: true
  },
  {
    id: 'house-bundle-kit',
    name: '3-4 Bedroom House Master Packing Bundle',
    description: '30 Medium Boxes, 20 Large Boxes, 5 Wardrobe Boxes, 2 Dishpacks, 2 Bubble Rolls, 6 Tape Rolls.',
    price: 289.00,
    unit: 'bundle',
    category: 'kits',
    image: '🏠'
  }
];

export const STORAGE_OPTIONS: StorageOption[] = [
  {
    id: 'storage-5x10',
    name: '5\' x 10\' Climate Controlled Vault',
    description: 'Walk-in closet size at our secure Woodbridge facility. Ideal for studio/1-bedroom apartment contents, boxes, and small furniture.',
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
    description: 'Half-car garage size available at both Woodbridge and Vaughan locations. Comfortably fits a 2-bedroom condo with living room, appliances, & 20+ boxes.',
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
    title: 'How to Book a Toronto Condo Moving Elevator Without Losing Your Mind',
    excerpt: 'Step-by-step guide to navigating Toronto condo rules, property management deposit requirements, insurance policies, and loading dock clearances.',
    content: `
      Moving into or out of a high-rise condominium in Toronto, Vaughan, or Mississauga comes with strict property management policies. 

      ### 1. Elevator Booking Windows
      Most condo boards restrict moving hours to weekdays between 9:00 AM – 12:00 PM and 1:00 PM – 4:00 PM. Weekend slots fill up 3 to 4 weeks in advance. Always contact your concierge or property manager early to secure your preferred 3-hour window.

      ### 2. The Insurance Requirement
      Property managers will NOT allow moving trucks to back into the loading bay unless the moving company provides proof of insurance naming the Condominium Corporation as an "Additional Insured". At Kratos Moving, our $1,000,000 Goods-in-Transit insurance guarantees you're covered, and we handle the paperwork as part of our Hermes scheduling process.

      ### 3. Elevator Padding & Key Service
      On move day, our Hercules Academy trained crew inspects the cab before and after with concierge to ensure your damage deposit check is returned in full.

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
    title: 'Winter Moving in Ontario: Surviving Snow, Ice, & Highway Bottlenecks',
    excerpt: 'Essential tips for protecting your hardwood floors from salt, avoiding ice slip hazards, and keeping electronics safe in below-zero Canadian weather.',
    content: `
      Winter in Southern Ontario can mean sudden lake-effect snowstorms and icy driveways. Moving between December and March requires extra precautions to keep both your family and belongings warm and safe.

      ### Floor Protection Against Road Salt & Slush
      Road salt tears through hardwood flooring and carpet fibers. Our professional Kratos Hercules crews lay down heavy neoprene carpet runners and heavy plastic floor film across all main pathways from entry door to truck.

      ### Protecting Cold-Sensitive Electronics
      OLED TVs, computers, and musical instruments should never be turned on immediately after being brought inside from -15°C weather. Allow electronics to warm up to indoor room temperature for 3 to 4 hours to prevent internal condensation short circuits.

      ### Salt & Sand Pathways Early
      Scatter rock salt or ice melt on your front walkway, driveway, and loading ramp area before the crew arrives at 8 AM.
    `,
    category: 'Planning',
    readTime: '4 min read',
    publishedDate: 'June 28, 2026',
    author: {
      name: 'Elena Rostova',
      role: 'Hercules Academy Safety Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    },
    image: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'toronto-to-ottawa-moving-checklist',
    title: 'The Ultimate Toronto to Ottawa Relocation Checklist',
    excerpt: 'Navigating long-distance moves, Highway 401 East express routes, and planning for a stress-free transition with Kratos Moving.',
    content: `
      Relocating 450 kilometers from Toronto to Ottawa is a major journey. Here is your timeline for a seamless transition.

      - **4 Weeks Before**: Engage with Cicero to get an accurate quote and reserve your direct express truck with Kratos Moving. Unlike freight carriers that mix cargo, we guarantee a dedicated truck.
      - **2 Weeks Before**: Let our Hermes team finalize the scheduling and confirm any parking or access requirements at your destination.
      - **1 Week Before**: Transfer utility accounts and set up internet installation for your arrival date.
      - **Move Day**: Sit back as our Hercules team executes the move, Done As Promised.
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
