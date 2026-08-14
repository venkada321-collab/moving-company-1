import { ServiceNiche, SEORoute, BlogPost, PackingSupply, StorageOption, Testimonial, Award } from '../types';

export const SERVICE_NICHES: ServiceNiche[] = [];
export const SEO_ROUTES: SEORoute[] = [];
export const PACKING_SUPPLIES: PackingSupply[] = [];
export const STORAGE_OPTIONS: StorageOption[] = [];
export const BLOG_POSTS: BlogPost[] = [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    author: 'Marcus & Julian Vance',
    role: 'Regular Clients',
    rating: 5,
    text: 'Best fade in the city. The barbers here are true artists and the atmosphere is incredible. Highly recommend the hot towel shave.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Haircut & Fade',
    location: 'Downtown',
    date: 'July 18, 2026'
  },
  {
    id: 't2',
    author: 'Dr. Arash Shariati',
    role: 'Executive',
    rating: 5,
    text: 'The precision and attention to detail is unmatched. They understand exactly how to handle my hair type and always deliver a pristine, professional look.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Executive Grooming',
    location: 'Metropolitan',
    date: 'June 30, 2026'
  },
  {
    id: 't3',
    author: 'Benjamin H. Sterling',
    role: 'VIP Member',
    rating: 5,
    text: 'I\'ve been going to my barber here for 3 years. The booking process is seamless, the chairs are comfortable, and the cuts are always incredibly sharp. 10/10.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Haircut & Beard Trim',
    location: 'Vaughan',
    date: 'June 12, 2026'
  },
  {
    id: 't4',
    author: 'The Kensington Family',
    role: 'Clients',
    rating: 5,
    text: 'Great environment and amazing barbers. Walked in on a Saturday and was treated like a VIP. The zero fade is absolutely flawless.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    verified: true,
    serviceType: 'Skin Fade',
    location: 'Oakville',
    date: 'May 27, 2026'
  }
];

export const AWARDS: Award[] = [
  {
    id: 'a1',
    title: 'Top Choice Barbershop',
    organization: 'City Awards 2026',
    year: 'Gold Winner',
    logo: '🏆',
    badgeText: 'AWARD WINNING'
  },
  {
    id: 'a2',
    title: 'Google Guaranteed',
    organization: '1000+ Verified Client Reviews',
    year: '4.9 ★★★★★',
    logo: '⭐️',
    badgeText: 'TOP RATED'
  },
  {
    id: 'a3',
    title: 'Master Barber Certified',
    organization: 'Provincial Barbering Guild',
    year: 'Active Status',
    logo: '✂️',
    badgeText: 'CERTIFIED PROS'
  },
  {
    id: 'a4',
    title: 'Barbicide Sanitation',
    organization: 'Health & Safety Excellence',
    year: '100% Compliant',
    logo: '🛡️',
    badgeText: 'HYGIENE VERIFIED'
  }
];
