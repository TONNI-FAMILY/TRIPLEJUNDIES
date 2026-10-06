import React, { useState } from 'react';
import { ArrowRight, Check, ShieldCheck, Heart } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenFitGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenFitGuide }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1B2433] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand & Mission (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="inline-block bg-[#FBF9F6] p-2 rounded-md">
              <BrandLogo size="md" />
            </div>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm font-sans">
              Triple J designs wire-free, second-skin intimates, organic cotton high-waist undies, and liquid mulberry silk sleepwear made for pure everyday ease.
            </p>

            <div className="pt-2 text-xs text-white/50 space-y-1">
              <div>OEKO-TEX Certified Organic Materials</div>
              <div>Designed with love & verified by women</div>
            </div>
          </div>

          {/* Collections (3 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E0909E]">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={() => onSelectCategory('sale')}
                  className="hover:text-white transition-colors cursor-pointer text-[#E0909E] font-medium"
                >
                  Flash Sale (Up to 40% Off)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('bras')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Wireless Contour Bras
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('undies')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Organic Cotton Multi-Packs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('silk-lounge')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Mulberry Silk & Loungewear
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  All Triple J Essentials
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Assistance
            </h4>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li>
                <button
                  onClick={onOpenFitGuide}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sister Size & Fit Guide
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  100-Day First Pair Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Discreet Shipping & Returns
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Sustainable Fabric Sourcing
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/90">
              Join the Triple J Inner Circle
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-sans">
              Subscribe for early access to seasonal flash sales, private restocks, and care guides.
            </p>

            {subscribed ? (
              <div className="p-3 bg-white/10 rounded text-xs text-[#77D2A7] flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You're subscribed! Use code WELCOME15 on your next order.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-3.5 py-2.5 text-xs bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-hidden focus:border-[#C76977]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-[#C76977] hover:bg-[#B95D6D] text-white text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}

            <div className="flex items-center gap-2 text-[11px] text-white/50 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E0909E]" />
              <span>We respect your inbox. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Triple J Intimates & Undies Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
