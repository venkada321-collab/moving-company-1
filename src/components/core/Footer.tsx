import React from 'react';
import { FooterAtomicProMax } from './FooterAtomicProMax';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const Footer: React.FC<FooterProps> = (props) => {
  return <FooterAtomicProMax {...props} />;
};
