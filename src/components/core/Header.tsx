import React from 'react';
import { HeaderAtomicProMax } from './HeaderAtomicProMax';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCOIModal: () => void;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return <HeaderAtomicProMax {...props} />;
};

