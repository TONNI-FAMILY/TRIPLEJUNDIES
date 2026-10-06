import React from 'react';
import { ArrowRight, ShieldCheck, Feather, Sparkles, RefreshCw } from 'lucide-react';
import { HERO_BANNER_IMAGE } from '../data/products';

interface HeroBannerProps {
  onShopNow: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopNow }) => {
  return (
    <section className="relative overflow-hidden bg-[#F5F2ED]">
      {/* Main Split Screen Hero Banner replicating Image 3 */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] lg:min-h-[580px] items-stretch">
          {/* Left Column: Real Lifestyle Photography matching Image 3 */}
          <div className="lg:col-span-7 relative overflow-hidden flex items-center justify-center bg-[#EFECE6] min-h-[360px] lg:min-h-[580px]">
            <img
              src={HERO_BANNER_IMAGE}
              alt="Triple J Intimates and Undies - End of Season Flash Sale lifestyle collection with comfortable loungewear"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center select-none"
            />
            {/* Subtle soft edge vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-transparent to-[#F5F2ED]/40 hidden lg:block" />
          </div>

          {/* Right Column: Serene Editorial Promotional Panel matching Image 3 */}
          <div className="lg:col-span-5 bg-[#F5F2ED] flex flex-col justify-center px-8 sm:px-12 lg:px-14 py-12 lg:py-16 text-center lg:text-left">
            <div className="space-y-6 max-w-lg mx-auto lg:mx-0">
              {/* Headline block matching Image 3 typography exactly */}
              <div className="space-y-3">
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-[#1B2433] font-normal leading-[1.08] tracking-tight">
                  End of Season <br className="hidden sm:inline" />
                  Flash Sale
                </h1>

                <p className="font-serif text-2xl sm:text-3xl text-[#364152] font-normal tracking-wide">
                  Up to 40% Off
                </p>
              </div>

              {/* Brand kicker label matching Image 3 */}
              <div className="pt-2">
                <span className="text-xs sm:text-sm font-sans tracking-[0.24em] uppercase text-[#616B7C] font-semibold">
                  TRIPLE J UNDIES
                </span>
              </div>

              {/* Shop Now CTA Button matching Image 3 button styling */}
              <div className="pt-2">
                <button
                  onClick={onShopNow}
                  className="inline-flex items-center justify-center gap-3 px-9 py-3.5 bg-[#E3DDD6] hover:bg-[#D7CFC6] text-[#1B2433] text-sm tracking-wider uppercase font-medium rounded-xs transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer group active:scale-[0.99]"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>

              {/* Sub-text note */}
              <p className="text-xs text-[#1B2433]/60 pt-2 tracking-normal font-sans">
                Limited pieces available · Auto-applied or use code{' '}
                <span className="font-mono font-medium text-[#C76977]">FLASH40</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Comfort Bar (Zero-Pill Discipline, Quiet Clean Metrics) */}
      <div className="border-t border-[#1B2433]/8 bg-[#FBF9F6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-xs text-[#1B2433]/80">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#C76977] shrink-0" />
              <span className="font-medium">100-Day Comfort Guarantee</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <Feather className="w-4 h-4 text-[#C76977] shrink-0" />
              <span className="font-medium">Zero-Pinch Wire-Free Fit</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#C76977] shrink-0" />
              <span className="font-medium">Organic Cotton & Pure Silk</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#C76977] shrink-0" />
              <span className="font-medium">Free 30-Day Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
