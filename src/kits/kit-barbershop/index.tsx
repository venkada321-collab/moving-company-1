import { NicheConfig } from './config';
import { HeroLeadCapture } from './components/HeroLeadCapture';
import { HeroBarberExecutive } from './components/HeroBarberExecutive';
import { HeroBarberBrutalist } from './components/HeroBarberBrutalist';
import { HeroBarberNeomorphic } from './components/HeroBarberNeomorphic';
import { HeroBarberVideo } from './components/HeroBarberVideo';
import { HeroBarberGlass } from './components/HeroBarberGlass';
import { HeroBarberEditorial } from './components/HeroBarberEditorial';
import { HeroBarberStreetwear } from './components/HeroBarberStreetwear';
import { TrustSignalsBarberBrutalist } from './components/TrustSignalsBarberBrutalist';
import { BlogTorontoBarbershop } from './components/BlogTorontoBarbershop';
import { CoreServicesGrid } from './components/CoreServicesGrid';
import { TrustStatsRibbon } from './components/TrustStatsRibbon';
import { LocationAndHours } from './components/LocationAndHours';
import { ContactConversion } from './components/ContactConversion';
import { TeamBarberRoster } from './components/TeamBarberRoster';
import { LookbookGallery } from './components/LookbookGallery';
import { BookingIntegrationWidget } from './components/BookingIntegrationWidget';
import { VIPMembershipCards } from './components/VIPMembershipCards';
import { HeaderBarbershop } from './components/HeaderBarbershop';
import { FooterBarbershop } from './components/FooterBarbershop';
import { LAYOUT } from '../../config/layout';

// Dynamic Niche Routers
const HeroRouterBarbershop = (props: any) => {
  if (LAYOUT.variants.hero === 'slideout-executive-drawer') return <HeroBarberExecutive {...props} />;
  if (LAYOUT.variants.hero === 'brutalist-tariff-ledger') return <HeroBarberBrutalist {...props} />;
  if (LAYOUT.variants.hero === 'streetwear-poster') return <HeroBarberStreetwear {...props} />;
  if (LAYOUT.variants.hero === 'neomorphic-command-console') return <HeroBarberNeomorphic {...props} />;
  if (LAYOUT.variants.hero === 'editorial') return <HeroBarberEditorial {...props} />;
  if (LAYOUT.variants.hero === 'interactive-step-quiz') return <HeroBarberVideo {...props} />;
  if (LAYOUT.variants.hero === 'glass-floating-widget') return <HeroBarberGlass {...props} />;
  return <HeroLeadCapture {...props} />;
};

const TrustRouterBarbershop = (props: any) => {
  if (LAYOUT.variants.reviews === 'brutalist-monospaced-audit') return <TrustSignalsBarberBrutalist {...props} />;
  return <TrustStatsRibbon {...props} />;
};

const BlogRouterBarbershop = (props: any) => {
  // Always override the core generic blog with the Toronto SEO blog for barbershops
  return <BlogTorontoBarbershop {...props} />;
};

export const NicheComponents = {
  HeroRouterBarbershop,
  TrustRouterBarbershop,
  BlogPage: BlogRouterBarbershop,
  CoreServicesGrid,
  TrustStatsRibbon,
  LocationAndHours,
  ContactConversion,
  TeamBarberRoster,
  LookbookGallery,
  BookingIntegrationWidget,
  VIPMembershipCards,
  HeaderBarbershop,
  FooterBarbershop
};

export { NicheConfig };
