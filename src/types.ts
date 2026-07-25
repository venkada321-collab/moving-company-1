export interface ServiceNiche {
  id: string;
  name: string;
  description: string;
  icon: string;
  baseRate: number; // per hour or base
  extraFees: string;
  features: string[];
  tips: string[];
  stats: { label: string; value: string }[];
}

export interface SEORoute {
  id: string;
  fromCity: string;
  fromState: string;
  toCity: string;
  toState: string;
  distance: number; // in miles
  estHours: number;
  avgCostRange: string;
  description: string;
  highlights: string[];
  testimonials: {
    author: string;
    rating: number;
    text: string;
    date: string;
  }[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Packing' | 'Planning' | 'Local' | 'Long-Distance' | 'Life Hacks';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  image: string;
}

export interface PackingSupply {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: 'boxes' | 'protection' | 'kits';
  image: string;
  popular?: boolean;
}

export interface StorageOption {
  id: string;
  name: string;
  description: string;
  pricePerMonth: number;
  dimensions: string;
  idealFor: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  rating: number;
  text: string;
  avatar: string;
  verified: boolean;
  serviceType: string;
  location: string;
  date: string;
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  year: string;
  logo: string;
  badgeText: string;
}

export interface QuoteRequest {
  fromZip: string;
  fromAddress: string;
  toZip: string;
  toAddress: string;
  moveDate: string;
  size: string; // 'studio' | '1bed' | '2bed' | '3bed+' | 'office' | 'piano'
  serviceNicheId: string;
  packingSupplies: Record<string, number>; // supplyId -> qty
  storageOptionId: string | null;
  fullName: string;
  email: string;
  phone: string;
  promoCode: string;
  referralCode: string;
}
