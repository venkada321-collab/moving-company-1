import React from 'react';
import { FooterAtomicProMax } from './FooterAtomicProMax';

interface FooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenCOIModal: () => void;
  navLinks?: { id: string; label: string }[];
}

export const Footer: React.FC<FooterProps> = (props) => {
  return <FooterAtomicProMax {...props} />;
};
