import React from 'react';
import { HeaderAtomicProMax } from './HeaderAtomicProMax';
import { HeaderMinimal } from './HeaderMinimal';
import { HeaderSplit } from './HeaderSplit';
import { HeaderStandard } from './HeaderStandard';
import { LAYOUT } from '../../config/layout';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
  navLinks?: { id: string; label: string }[];
}

export const Header: React.FC<HeaderProps> = (props) => {
  const variant = LAYOUT.variants.nav || 'transparent-overlay';

  if (variant === 'sticky-standard' || variant === 'dual-ribbon-bar') {
    return <HeaderStandard {...props} />;
  }
  
  if (variant === 'centered-split' || variant === 'promo-ticker-nav') {
    return <HeaderSplit {...props} />;
  }

  if (variant === 'floating-pill-glass' || variant === 'brutalist-border-box' || variant === 'asymmetry-cta-dominant' || variant === 'minimal-dual-deck') {
    return <HeaderMinimal {...props} />;
  }

  return <HeaderAtomicProMax {...props} />;
};

