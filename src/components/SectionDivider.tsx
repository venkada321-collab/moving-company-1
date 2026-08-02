import React from 'react';
import { THEME } from '../config/theme';

interface SectionDividerProps {
  type?: string;
  fillColor?: string;
  className?: string;
  flip?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  type = THEME.dividerStyle.type,
  fillColor = THEME.dividerStyle.color,
  className = '',
  flip = false,
}) => {
  if (type === 'flat' || !type) {
    return <div className={`w-full border-b border-amber-200/40 ${className}`} />;
  }

  const transformStyle = flip ? 'scale-y-[-1] scale-x-[-1]' : '';

  if (type === 'diagonal-cut') {
    return (
      <div className={`w-full overflow-hidden leading-none ${className}`}>
        <svg
          className={`w-full h-8 sm:h-12 block ${transformStyle}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M1200 0L0 120V0H1200Z" fill={fillColor} />
        </svg>
      </div>
    );
  }

  if (type === 'rounded-curve') {
    return (
      <div className={`w-full overflow-hidden leading-none ${className}`}>
        <svg
          className={`w-full h-10 sm:h-16 block ${transformStyle}`}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V0H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }

  // Default: "soft-wave"
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        className={`w-full h-10 sm:h-14 block ${transformStyle}`}
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,0 L0,0 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};
