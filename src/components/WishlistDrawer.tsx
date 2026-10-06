import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onOpenQuickView: (product: Product) => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onOpenQuickView,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 border-l border-[#1B2433]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1B2433]/8 flex items-center justify-between bg-[#FBF9F6]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C76977] fill-[#C76977]" />
            <h2 className="font-serif text-xl text-[#1B2433] font-normal">
              Saved Favorites
            </h2>
            <span className="text-xs font-mono text-[#1B2433]/60 tabular-nums">
              ({wishlistProducts.length})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1B2433]/60 hover:text-[#1B2433] rounded-full hover:bg-black/5"
            aria-label="Close wishlist drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-[#1B2433]/6">
          {wishlistProducts.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#C76977]">
                <Heart className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl text-[#1B2433]">No items saved yet</h3>
                <p className="text-xs text-[#1B2433]/60 max-w-xs">
                  Tap the heart on any bra, undies set, or silk slip to save your dream pieces here.
                </p>
              </div>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex gap-4">
                <div
                  onClick={() => {
                    onOpenQuickView(product);
                    onClose();
                  }}
                  className="w-20 h-20 bg-[#F5F2ED] border border-[#1B2433]/6 shrink-0 overflow-hidden cursor-pointer"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4
                        onClick={() => {
                          onOpenQuickView(product);
                          onClose();
                        }}
                        className="font-serif text-sm font-medium text-[#1B2433] line-clamp-1 hover:text-[#C76977] cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => onRemoveFromWishlist(product)}
                        className="text-[#1B2433]/40 hover:text-[#C76977] p-1 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs text-[#C76977] font-semibold mt-0.5">
                      ${product.price.toFixed(2)}{' '}
                      {product.originalPrice > product.price && (
                        <span className="text-[#1B2433]/40 font-normal line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <button
                      onClick={() => {
                        const defaultColor = product.variants[0]?.colorName || 'Default';
                        const defaultSize = product.sizes[0] || 'M';
                        onAddToCart(product, defaultColor, defaultSize);
                      }}
                      className="px-3 py-1.5 bg-[#1B2433] hover:bg-[#2C384D] text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1B2433]/10 bg-[#FBF9F6]">
          <button
            onClick={onClose}
            className="w-full py-3 border border-[#1B2433]/20 hover:border-[#1B2433] text-[#1B2433] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
