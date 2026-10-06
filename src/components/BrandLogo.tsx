import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  onClick
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7 rounded-[8px]',
    md: 'w-9 h-9 rounded-[10px]',
    lg: 'w-11 h-11 rounded-[12px]'
  }[size];

  const titleSize = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  }[size];

  const subtitleSize = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9.5px] tracking-[0.28em]',
    lg: 'text-[11px] tracking-[0.32em]'
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Exact rounded rose icon with organic drop & inner circle cutout matching Image 1 */}
      <div
        className={`${iconDimensions} bg-[#C76977] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 40 40"
          className="w-3/5 h-3/5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Teardrop droplet outer contour */}
          <path
            d="M20 6C20 6 29 18.5 29 24.5C29 29.5 25 33.5 20 33.5C15 33.5 11 29.5 11 24.5C11 18.5 20 6 20 6Z"
            fill="#F6EBEA"
          />
          {/* Inner circle cutout in dusty rose */}
          <circle cx="20" cy="22" r="4.2" fill="#C76977" />
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center text-left leading-none">
        <span
          className={`${titleSize} font-bold text-[#1B2433] tracking-wide font-sans leading-none`}
        >
          TRIPLE J
        </span>
        <span
          className={`${subtitleSize} font-semibold text-[#C76977] uppercase font-sans mt-0.5 leading-none`}
        >
          INTIMATES & UNDIES
        </span>
      </div>
    </div>
  );
};
