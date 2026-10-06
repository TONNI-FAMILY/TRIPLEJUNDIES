import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles, Check } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ProductCategory } from '../types';

interface HeaderProps {
  currentCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenSearch: () => void;
  onOpenFitGuide: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenFitGuide,
  onOpenCart,
  onOpenWishlist,
  cartCount,
  wishlistCount
}) => {
  const [showPromo, setShowPromo] = useState(true);
  const [copiedCode, setCopiedCode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText('FLASH40');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const navLinks: { label: string; category?: ProductCategory; isAction?: boolean; onClick?: () => void }[] = [
    { label: 'Flash Sale', category: 'sale' },
    { label: 'Bras', category: 'bras' },
    { label: 'Undies & Packs', category: 'undies' },
    { label: 'Silk & Loungewear', category: 'silk-lounge' },
    { label: 'Fit Guide', isAction: true, onClick: onOpenFitGuide }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F6]/95 backdrop-blur-md border-b border-[#1B2433]/8 transition-all">
      {/* Slim Promotional Announcement Banner (<= 40px, dismissible) */}
      {showPromo && (
        <div className="bg-[#1B2433] text-white text-xs px-4 py-2 flex items-center justify-between transition-all">
          <div className="flex-1 text-center font-medium tracking-wide flex items-center justify-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-[#E0909E]">
              <Sparkles className="w-3.5 h-3.5" />
              Flash Sale Live:
            </span>
            <span>Up to 40% Off Select Styles</span>
            <span className="text-white/40 hidden md:inline">·</span>
            <button
              onClick={handleCopyCode}
              className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-2 py-0.5 rounded text-[11px] font-mono tracking-wider transition-colors ml-1"
              title="Click to copy promo code"
            >
              <span>CODE: FLASH40</span>
              {copiedCode ? (
                <Check className="w-3 h-3 text-[#77D2A7]" />
              ) : (
                <span className="text-white/60 text-[10px]">copy</span>
              )}
            </button>
            <span className="text-white/40 hidden lg:inline">·</span>
            <span className="text-white/80 hidden lg:inline">Free US shipping over $60</span>
          </div>

          <button
            onClick={() => setShowPromo(false)}
            aria-label="Dismiss banner"
            className="text-white/60 hover:text-white p-0.5 rounded transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar adhering to Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark Element */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 -ml-2 text-[#1B2433] hover:text-[#C76977] md:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <BrandLogo
            size="md"
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>

        {/* Zone 2: 4-6 Clean Text Navigation Links (Single-line, subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-9 text-sm font-medium text-[#1B2433]">
          {navLinks.map((link) => {
            const isActive = link.category && currentCategory === link.category;
            return (
              <button
                key={link.label}
                onClick={() => {
                  if (link.onClick) {
                    link.onClick();
                  } else if (link.category) {
                    onSelectCategory(link.category);
                  }
                }}
                className={`relative py-1.5 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'text-[#C76977] font-semibold'
                    : 'text-[#1B2433]/85 hover:text-[#C76977]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C76977] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 Primary Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-[#1B2433] hover:text-[#C76977] transition-colors rounded-full hover:bg-[#1B2433]/5"
            aria-label="Search collection"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Wishlist Trigger */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#1B2433] hover:text-[#C76977] transition-colors rounded-full hover:bg-[#1B2433]/5"
            aria-label={`Wishlist (${wishlistCount} items)`}
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute 1 top-0.5 right-0.5 w-4 h-4 bg-[#C76977] text-white text-[10px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Bag / Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3.5 py-2 bg-[#1B2433] hover:bg-[#2C384D] text-white rounded-lg transition-colors text-xs font-semibold whitespace-nowrap shadow-xs"
            aria-label={`Shopping Bag (${cartCount} items)`}
          >
            <ShoppingBag className="w-4 h-4 text-[#F6EBEA]" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-[#C76977] px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums leading-none">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1B2433]/10 bg-[#FBF9F6] px-6 py-5 shadow-lg space-y-4 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 text-base font-medium">
            <button
              onClick={() => {
                onSelectCategory('all');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-1 ${
                currentCategory === 'all' ? 'text-[#C76977] font-semibold' : 'text-[#1B2433]'
              }`}
            >
              Shop All Styles
            </button>
            <button
              onClick={() => {
                onSelectCategory('sale');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-1 flex items-center justify-between ${
                currentCategory === 'sale' ? 'text-[#C76977] font-semibold' : 'text-[#C76977]'
              }`}
            >
              <span>Flash Sale (Up to 40% Off)</span>
              <span className="text-xs bg-[#C76977]/10 px-2 py-0.5 rounded text-[#C76977]">HOT</span>
            </button>
            <button
              onClick={() => {
                onSelectCategory('bras');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-1 ${
                currentCategory === 'bras' ? 'text-[#C76977] font-semibold' : 'text-[#1B2433]'
              }`}
            >
              Bras & Bralettes
            </button>
            <button
              onClick={() => {
                onSelectCategory('undies');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-1 ${
                currentCategory === 'undies' ? 'text-[#C76977] font-semibold' : 'text-[#1B2433]'
              }`}
            >
              Undies & Multi-Packs
            </button>
            <button
              onClick={() => {
                onSelectCategory('silk-lounge');
                setMobileMenuOpen(false);
              }}
              className={`text-left py-1 ${
                currentCategory === 'silk-lounge' ? 'text-[#C76977] font-semibold' : 'text-[#1B2433]'
              }`}
            >
              Silk & Loungewear
            </button>
            <button
              onClick={() => {
                onOpenFitGuide();
                setMobileMenuOpen(false);
              }}
              className="text-left py-1 text-[#1B2433]/70 hover:text-[#1B2433]"
            >
              Sister Size & Bra Fit Finder
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
