import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedVariantColor: string, selectedSize: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [addedJustNow, setAddedJustNow] = useState(false);

  const activeVariant = product.variants[selectedVariantIndex] || {
    colorName: 'Standard',
    colorHex: '#C76977',
    image: product.primaryImage
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsQuickAdding(true);
    onAddToCart(product, activeVariant.colorName, selectedSize);
    setTimeout(() => {
      setIsQuickAdding(false);
      setAddedJustNow(true);
      setTimeout(() => setAddedJustNow(false), 2000);
    }, 250);
  };

  return (
    <div
      onClick={() => onOpenQuickView(product)}
      className="group relative flex flex-col bg-white rounded-none border border-[#1B2433]/8 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer overflow-hidden"
    >
      {/* Visual Image Container (65%-75% card visual weight, neutral backdrop) */}
      <div className="relative aspect-square w-full bg-[#F5F2ED] overflow-hidden">
        <img
          src={activeVariant.image || product.primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-103"
        />

        {/* Minimal Single Text Tag (Anti-Pill Rule) */}
        {product.isFlashSale && (
          <div className="absolute top-3 left-3 bg-[#1B2433] text-white text-[11px] font-sans font-medium uppercase tracking-wider px-2 py-0.5">
            Flash Sale -{product.discountPercent}%
          </div>
        )}

        {/* Wishlist Affordance */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted
              ? 'bg-white text-[#C76977] shadow-sm'
              : 'bg-white/85 text-[#1B2433] hover:bg-white hover:text-[#C76977]'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C76977]' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="flex-1 py-2 bg-white/95 hover:bg-white text-[#1B2433] text-xs font-semibold tracking-wide uppercase transition-colors shadow-xs flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-[#C76977]" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={isQuickAdding}
            className="px-3 py-2 bg-[#1B2433] hover:bg-[#2C384D] text-white text-xs font-medium transition-colors shadow-xs flex items-center justify-center"
            title="Quick add to bag"
            aria-label="Quick add to bag"
          >
            {addedJustNow ? (
              <Check className="w-4 h-4 text-[#77D2A7]" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Metadata & Details Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Subtle Category Kicker */}
          <div className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#C76977] font-semibold">
            {product.category === 'bras'
              ? 'Contour Bras'
              : product.category === 'undies'
              ? 'Cotton Multi-Packs'
              : 'Silk Sleep & Lounge'}
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg text-[#1B2433] font-medium leading-snug group-hover:text-[#C76977] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short subtitle note */}
          <p className="text-xs text-[#1B2433]/65 line-clamp-1 font-sans">
            {product.subtitle}
          </p>
        </div>

        {/* Price & Variant Row */}
        <div className="pt-2 border-t border-[#1B2433]/6 flex items-center justify-between">
          {/* Price with Tabular Numerals */}
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-semibold text-base text-[#1B2433] tabular-nums">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span className="font-sans text-xs text-[#1B2433]/40 line-through tabular-nums">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Variant Swatches */}
          {product.variants.length > 1 && (
            <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
              {product.variants.slice(0, 4).map((variant, idx) => (
                <button
                  key={variant.colorName}
                  onClick={() => setSelectedVariantIndex(idx)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedVariantIndex === idx
                      ? 'border-[#1B2433] scale-125 ring-1 ring-[#1B2433]/30'
                      : 'border-black/15 hover:scale-110'
                  }`}
                  style={{ backgroundColor: variant.colorHex }}
                  title={variant.colorName}
                  aria-label={`Select ${variant.colorName}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
