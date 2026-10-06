import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping
}) => {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('FLASH40');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('FLASH40');
  const [promoError, setPromoError] = useState('');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const FREE_SHIPPING_THRESHOLD = 60;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  // If FLASH40 promo is applied, extra 10% on top of already marked-down prices or 40% if calculated
  const promoDiscount = appliedPromo === 'FLASH40' ? subtotal * 0.1 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 5.99;
  const total = Math.max(0, subtotal - promoDiscount + shipping);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim().toUpperCase() === 'FLASH40') {
      setAppliedPromo('FLASH40');
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try FLASH40');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 border-l border-[#1B2433]/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1B2433]/8 flex items-center justify-between bg-[#FBF9F6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C76977]" />
            <h2 className="font-serif text-xl text-[#1B2433] font-normal">
              Your Shopping Bag
            </h2>
            <span className="text-xs font-mono text-[#1B2433]/60 tabular-nums">
              ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1B2433]/60 hover:text-[#1B2433] rounded-full hover:bg-black/5 transition-colors"
            aria-label="Close cart drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#F5F2ED] px-6 py-3 border-b border-[#1B2433]/6">
          <div className="text-xs text-[#1B2433] flex justify-between font-medium mb-1.5">
            <span>
              {amountToFreeShipping > 0 ? (
                <>
                  Add <span className="font-bold text-[#C76977]">${amountToFreeShipping.toFixed(2)}</span> more for Free Shipping
                </>
              ) : (
                <span className="text-[#367C59] font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> You unlocked Free Priority Shipping!
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] text-[#1B2433]/60">
              ${FREE_SHIPPING_THRESHOLD}.00 target
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#E6DFD5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C76977] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 divide-y divide-[#1B2433]/6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F5F2ED] flex items-center justify-center text-[#C76977]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-xl text-[#1B2433]">Your bag is currently empty</h3>
                <p className="text-xs text-[#1B2433]/60 max-w-xs">
                  Discover our softest wireless bras, high-waist organic cotton undies, and French lace slips.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-6 py-2.5 bg-[#1B2433] hover:bg-[#2C384D] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                Explore Flash Sale
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="pt-4 first:pt-0 flex gap-4">
                {/* Thumbnail */}
                <div className="w-20 h-20 bg-[#F5F2ED] border border-[#1B2433]/6 shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-sm font-medium text-[#1B2433] line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-[#1B2433]/40 hover:text-[#C76977] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Variant & Size */}
                    <div className="flex items-center gap-2 text-xs text-[#1B2433]/70">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/20"
                          style={{ backgroundColor: item.colorHex }}
                        />
                        <span>{item.colorName}</span>
                      </span>
                      <span>·</span>
                      <span>Size: <strong className="font-semibold text-[#1B2433]">{item.size}</strong></span>
                    </div>
                  </div>

                  {/* Quantity Stepper & Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="inline-flex items-center border border-[#1B2433]/20 bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-xs text-[#1B2433] hover:bg-[#1B2433]/5 font-semibold"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs font-semibold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-xs text-[#1B2433] hover:bg-[#1B2433]/5 font-semibold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-sans font-semibold text-sm text-[#1B2433] tabular-nums">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#1B2433]/10 bg-[#FBF9F6] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1B2433]/40" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full pl-8 pr-3 py-2 text-xs border border-[#1B2433]/20 bg-white font-mono uppercase focus:border-[#C76977] focus:outline-hidden"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#1B2433] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2C384D] transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="text-[11px] text-[#367C59] flex items-center gap-1 font-medium">
                  <Check className="w-3 h-3" /> Code '{appliedPromo}' applied (Extra 10% Flash Discount)
                </div>
              )}
              {promoError && (
                <div className="text-[11px] text-[#C76977]">{promoError}</div>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#1B2433]/80 border-t border-[#1B2433]/6 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span>
              </div>
              {appliedPromo && (
                <div className="flex justify-between text-[#C76977]">
                  <span>Flash Code Discount (10%)</span>
                  <span className="font-medium tabular-nums">-${promoDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-[#367C59] uppercase font-semibold">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#1B2433] pt-2 border-t border-[#1B2433]/8">
                <span>Total</span>
                <span className="tabular-nums">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <div className="space-y-2">
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#C76977] hover:bg-[#B95D6D] text-white text-xs font-semibold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#1B2433]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C76977]" />
                <span>256-Bit SSL Encrypted & 100-Day Comfort Guarantee</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
