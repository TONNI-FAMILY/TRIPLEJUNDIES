import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Lock, ArrowRight, PackageCheck, ShoppingBag } from 'lucide-react';
import { CartItem, CheckoutDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderCompleted
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmed'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState<CheckoutDetails>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'CA',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '•••• •••• •••• 4242',
    expiry: '10/28',
    cvv: '984'
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 60 || items.length === 0 ? 0 : 5.99;
  const promoDiscount = subtotal * 0.1; // FLASH40 applied
  const finalTotal = Math.max(0, subtotal - promoDiscount + shipping);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOrderNumber(`TJ-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep('confirmed');
      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl shadow-2xl border border-[#1B2433]/10 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1B2433]/8 bg-[#FBF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#C76977]" />
            <h2 className="font-serif text-lg font-medium text-[#1B2433]">
              {step === 'confirmed' ? 'Order Confirmation' : 'Secure Express Checkout'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1B2433]/60 hover:text-[#1B2433] rounded-full hover:bg-black/5"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content based on step */}
        <div className="p-6 sm:p-8">
          {step === 'confirmed' ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 bg-[#48A179]/10 text-[#48A179] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C76977] font-semibold">
                  Order Successfully Placed
                </span>
                <h3 className="font-serif text-3xl text-[#1B2433]">Thank you for your order!</h3>
                <p className="text-sm text-[#1B2433]/70 max-w-md mx-auto">
                  We've sent a detailed confirmation email with receipt and tracking info to{' '}
                  <strong className="text-[#1B2433]">{formData.email || 'your inbox'}</strong>.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#FBF9F6] border border-[#1B2433]/10 p-5 text-left text-xs space-y-3 max-w-md mx-auto">
                <div className="flex justify-between border-b border-[#1B2433]/8 pb-2">
                  <span className="text-[#1B2433]/60">Order Reference:</span>
                  <span className="font-mono font-bold text-[#1B2433]">{orderNumber}</span>
                </div>
                <div className="flex justify-between border-b border-[#1B2433]/8 pb-2">
                  <span className="text-[#1B2433]/60">Shipping To:</span>
                  <span className="font-medium text-[#1B2433] text-right">
                    {formData.firstName || 'Elena'} {formData.lastName || 'Miller'}
                    <br />
                    {formData.address || '742 Evergreen Terrace'}, {formData.city || 'Springfield'}
                  </span>
                </div>
                <div className="flex justify-between border-b border-[#1B2433]/8 pb-2">
                  <span className="text-[#1B2433]/60">Estimated Delivery:</span>
                  <span className="font-medium text-[#367C59]">3–5 Business Days (Discreet Packaging)</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold text-[#1B2433]">
                  <span>Total Paid:</span>
                  <span className="tabular-nums">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-8 py-3.5 bg-[#1B2433] hover:bg-[#2C384D] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-xs"
              >
                Continue Shopping
              </button>
            </div>
          ) : step === 'shipping' ? (
            <form onSubmit={handleShippingSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#1B2433]">1. Contact & Shipping Details</h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#1B2433]/80 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@domain.com"
                      className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#1B2433]/80 font-medium mb-1">First Name *</label>
                      <input
                        type="text"
                        required
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="Elena"
                        className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1B2433]/80 font-medium mb-1">Last Name *</label>
                      <input
                        type="text"
                        required
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Miller"
                        className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#1B2433]/80 font-medium mb-1">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Blossom Way, Apt 4B"
                      className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#1B2433]/80 font-medium mb-1">City *</label>
                      <input
                        type="text"
                        required
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Austin"
                        className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1B2433]/80 font-medium mb-1">State *</label>
                      <input
                        type="text"
                        required
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="TX"
                        className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-[#1B2433]/80 font-medium mb-1">Postal Code *</label>
                      <input
                        type="text"
                        required
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="78701"
                        className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Order quick overview */}
              <div className="bg-[#FBF9F6] p-4 border border-[#1B2433]/8 text-xs space-y-1">
                <div className="flex justify-between text-[#1B2433]/70">
                  <span>Cart Items ({items.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#C76977]">
                  <span>Flash Sale Discount</span>
                  <span>-${promoDiscount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#1B2433]/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#1B2433] pt-1 border-t border-[#1B2433]/8">
                  <span>Total Due</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#C76977] hover:bg-[#B95D6D] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-[#1B2433]">2. Payment Method</h3>
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="text-xs text-[#C76977] hover:underline"
                  >
                    Edit Shipping
                  </button>
                </div>

                {/* Payment Option Selector */}
                <div className="grid grid-cols-3 gap-2">
                  {(['card', 'apple-pay', 'paypal'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData((p) => ({ ...p, paymentMethod: method }))}
                      className={`p-3 border text-xs font-medium text-center uppercase tracking-wider transition-colors ${
                        formData.paymentMethod === method
                          ? 'border-[#C76977] bg-[#C76977]/5 text-[#C76977]'
                          : 'border-[#1B2433]/20 hover:border-[#1B2433] text-[#1B2433]'
                      }`}
                    >
                      {method === 'card' ? 'Credit Card' : method === 'apple-pay' ? 'Apple Pay' : 'PayPal'}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-3 text-xs pt-2">
                    <div>
                      <label className="block text-[#1B2433]/80 font-medium mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full pl-9 pr-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden font-mono"
                        />
                        <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#1B2433]/40" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[#1B2433]/80 font-medium mb-1">Expiry Date</label>
                        <input
                          type="text"
                          required
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[#1B2433]/80 font-medium mb-1">Security Code (CVV)</label>
                        <input
                          type="text"
                          required
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3.5 py-2.5 border border-[#1B2433]/20 bg-white focus:border-[#C76977] focus:outline-hidden font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 bg-[#1B2433] hover:bg-[#2C384D] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-75"
              >
                {isProcessing ? (
                  <span>Processing Payment...</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-[#F6EBEA]" />
                    <span>Pay ${finalTotal.toFixed(2)} & Complete Order</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
