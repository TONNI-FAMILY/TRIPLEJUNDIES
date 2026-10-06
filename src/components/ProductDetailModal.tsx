import React, { useState } from 'react';
import { X, Heart, Star, Check, ShieldCheck, Ruler, ArrowRight, Truck, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onOpenFitGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onOpenFitGuide
}) => {
  if (!product) return null;

  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'reviews'>('details');
  const [isAdding, setIsAdding] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const activeVariant = product.variants[selectedVariantIdx] || {
    colorName: 'Standard',
    colorHex: '#C76977',
    image: product.primaryImage
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart(product, activeVariant.colorName, selectedSize, quantity);
    setTimeout(() => {
      setIsAdding(false);
      setAddedNotice(true);
      setTimeout(() => setAddedNotice(false), 2400);
    }, 200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-5xl overflow-hidden shadow-2xl border border-[#1B2433]/10 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/90 hover:bg-white text-[#1B2433] rounded-full shadow-xs transition-colors"
          aria-label="Close product details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-8 lg:p-10">
            {/* Left Column: Product Gallery */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-square w-full bg-[#F5F2ED] overflow-hidden border border-[#1B2433]/6">
                <img
                  src={activeVariant.image || product.primaryImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />

                {product.isFlashSale && (
                  <div className="absolute top-4 left-4 bg-[#1B2433] text-white text-xs font-sans font-medium uppercase tracking-wider px-2.5 py-1">
                    End of Season Sale -{product.discountPercent}%
                  </div>
                )}
              </div>

              {/* Variant Preview Thumbnails */}
              {product.variants.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.variants.map((variant, idx) => (
                    <button
                      key={variant.colorName}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`relative w-16 h-16 shrink-0 border-2 overflow-hidden transition-all ${
                        selectedVariantIdx === idx
                          ? 'border-[#C76977] ring-1 ring-[#C76977]/30'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={variant.image}
                        alt={variant.colorName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quality & Care Badges (Zero-Pill Inline Text) */}
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#1B2433]/70">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#C76977]" />
                  <span>OEKO-TEX Standard 100</span>
                </span>
                <span aria-hidden="true" className="text-[#1B2433]/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#C76977]" />
                  <span>Zero-Underwire Comfort</span>
                </span>
                <span aria-hidden="true" className="text-[#1B2433]/20">·</span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#C76977]" />
                  <span>Free Returns within 30 Days</span>
                </span>
              </div>
            </div>

            {/* Right Column: Contiguous Purchase Module */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#C76977] font-semibold">
                    TRIPLE J {product.category.toUpperCase()}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-[#1B2433]">
                    <div className="flex items-center text-[#E5A84D]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="font-semibold tabular-nums">{product.rating}</span>
                    <span className="text-[#1B2433]/50">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Product Name */}
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2433] font-normal leading-tight">
                  {product.name}
                </h2>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="font-sans font-bold text-2xl text-[#1B2433] tabular-nums">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="font-sans text-base text-[#1B2433]/40 line-through tabular-nums">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-xs font-medium text-[#C76977] uppercase tracking-wider">
                        Save ${(product.originalPrice - product.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-[#1B2433]/75 leading-relaxed font-sans">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="space-y-2 pt-2 border-t border-[#1B2433]/8">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1B2433]/70 font-medium">Color:</span>
                    <span className="font-semibold text-[#1B2433]">{activeVariant.colorName}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.colorName}
                        onClick={() => setSelectedVariantIdx(idx)}
                        className={`group relative p-0.5 rounded-full transition-all ${
                          selectedVariantIdx === idx
                            ? 'ring-2 ring-[#1B2433] scale-110'
                            : 'hover:scale-105'
                        }`}
                        title={v.colorName}
                        aria-label={`Select color ${v.colorName}`}
                      >
                        <span
                          className="block w-6 h-6 rounded-full border border-black/15 shadow-xs"
                          style={{ backgroundColor: v.colorHex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#1B2433]/70 font-medium">Select Size:</span>
                    <button
                      onClick={onOpenFitGuide}
                      className="text-[#C76977] hover:text-[#B05361] font-medium flex items-center gap-1 underline underline-offset-2"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Sister Size & Fit Guide</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-12 h-10 px-3 flex items-center justify-center text-xs font-semibold uppercase tracking-wider transition-colors border ${
                          selectedSize === size
                            ? 'bg-[#1B2433] text-white border-[#1B2433]'
                            : 'bg-white text-[#1B2433] border-[#1B2433]/20 hover:border-[#1B2433]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>

                  <div className="text-[11px] text-[#1B2433]/60 flex items-center gap-1 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#48A179]" />
                    <span>In stock · Ready to ship in 24 hours</span>
                  </div>
                </div>

                {/* Quantity and Add to Bag */}
                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  {/* Quantity Stepper */}
                  <div className="inline-flex items-center border border-[#1B2433]/20 bg-white">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-sm text-[#1B2433] hover:bg-[#1B2433]/5 font-semibold select-none"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-semibold tabular-nums">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-sm text-[#1B2433] hover:bg-[#1B2433]/5 font-semibold select-none"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Primary Buy CTA */}
                  <button
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className="flex-1 py-3.5 px-6 bg-[#C76977] hover:bg-[#B95D6D] text-white font-sans font-semibold text-xs uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                  >
                    {addedNotice ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3.5 border transition-colors ${
                      isWishlisted
                        ? 'border-[#C76977] bg-[#C76977]/10 text-[#C76977]'
                        : 'border-[#1B2433]/20 hover:border-[#1B2433] text-[#1B2433]'
                    }`}
                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#C76977]' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Informative Tabs (Details, Fabric & Care, Reviews) */}
              <div className="pt-6 border-t border-[#1B2433]/10">
                <div className="flex border-b border-[#1B2433]/10 gap-6 text-xs font-medium uppercase tracking-wider">
                  <button
                    onClick={() => setActiveTab('details')}
                    className={`pb-2.5 transition-colors border-b-2 -mb-[1px] ${
                      activeTab === 'details'
                        ? 'border-[#C76977] text-[#C76977] font-semibold'
                        : 'border-transparent text-[#1B2433]/60 hover:text-[#1B2433]'
                    }`}
                  >
                    Key Features
                  </button>
                  <button
                    onClick={() => setActiveTab('fabric')}
                    className={`pb-2.5 transition-colors border-b-2 -mb-[1px] ${
                      activeTab === 'fabric'
                        ? 'border-[#C76977] text-[#C76977] font-semibold'
                        : 'border-transparent text-[#1B2433]/60 hover:text-[#1B2433]'
                    }`}
                  >
                    Fabric & Care
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 transition-colors border-b-2 -mb-[1px] ${
                      activeTab === 'reviews'
                        ? 'border-[#C76977] text-[#C76977] font-semibold'
                        : 'border-transparent text-[#1B2433]/60 hover:text-[#1B2433]'
                    }`}
                  >
                    Reviews ({product.reviewCount})
                  </button>
                </div>

                <div className="py-4 text-xs text-[#1B2433]/80 space-y-2 leading-relaxed">
                  {activeTab === 'details' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.details.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'fabric' && (
                    <ul className="space-y-1.5 list-disc list-inside">
                      {product.fabricCare.map((fc, i) => (
                        <li key={i}>{fc}</li>
                      ))}
                    </ul>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-3">
                      <div className="bg-[#FBF9F6] p-3 rounded border border-[#1B2433]/6 flex items-center justify-between">
                        <span className="font-semibold text-[#1B2433]">Fit Rating:</span>
                        <span className="text-[#C76977] font-medium">96% of customers report True to Size</span>
                      </div>
                      {product.reviews.length > 0 ? (
                        product.reviews.map((rev) => (
                          <div key={rev.id} className="border-b border-[#1B2433]/6 pb-3 last:border-none">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-semibold text-[#1B2433]">{rev.author}</span>
                              <span className="text-[#1B2433]/40 text-[11px]">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#E5A84D] mb-1">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                            <p className="font-medium text-[#1B2433] text-xs">{rev.title}</p>
                            <p className="text-[#1B2433]/70 text-xs mt-0.5">{rev.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-[#1B2433]/60 italic">No customer reviews yet. Be the first to share your thoughts!</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
