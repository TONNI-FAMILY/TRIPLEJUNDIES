import React, { useState } from 'react';
import { X, Ruler, CheckCircle, Info, Sparkles, ArrowRight } from 'lucide-react';
import { SISTER_SIZE_CHART } from '../data/products';

interface FitCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplySize?: (size: string) => void;
}

export const FitCalculatorModal: React.FC<FitCalculatorModalProps> = ({
  isOpen,
  onClose,
  onApplySize
}) => {
  if (!isOpen) return null;

  const [calcType, setCalcType] = useState<'bra' | 'undies'>('bra');
  const [underbust, setUnderbust] = useState<number>(32);
  const [bust, setBust] = useState<number>(36);
  const [waist, setWaist] = useState<number>(28);
  const [hips, setHips] = useState<number>(38);

  // Bra calculation:
  // Band: if even, band = underbust; if odd, +1 or standard rounded
  const calculatedBand = Math.round(underbust / 2) * 2;
  const cupDiff = Math.max(0, Math.round(bust - underbust));
  const cups = ['AA', 'A', 'B', 'C', 'D', 'DD', 'E', 'F'];
  const cupIndex = Math.min(cups.length - 1, Math.max(0, cupDiff - 1));
  const calculatedCup = cups[cupIndex] || 'B';
  const calculatedBraSize = `${calculatedBand}${calculatedCup}`;
  const sisterSizes = SISTER_SIZE_CHART[calculatedBraSize] || [];

  // Undies calculation:
  let recommendedUndieSize = 'M';
  if (hips <= 35) recommendedUndieSize = 'XS';
  else if (hips <= 37) recommendedUndieSize = 'S';
  else if (hips <= 40) recommendedUndieSize = 'M';
  else if (hips <= 43) recommendedUndieSize = 'L';
  else if (hips <= 46) recommendedUndieSize = 'XL';
  else recommendedUndieSize = '2XL';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-xl shadow-2xl border border-[#1B2433]/10 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1B2433]/8 bg-[#FBF9F6] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#C76977]" />
            <h2 className="font-serif text-lg font-medium text-[#1B2433]">
              Triple J Precision Fit & Sister Size Finder
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#1B2433]/60 hover:text-[#1B2433] rounded-full hover:bg-black/5"
            aria-label="Close fit finder"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-[#1B2433]/8 text-xs font-semibold uppercase tracking-wider bg-[#F5F2ED]/50">
          <button
            onClick={() => setCalcType('bra')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 -mb-[1px] ${
              calcType === 'bra'
                ? 'border-[#C76977] text-[#C76977] bg-white'
                : 'border-transparent text-[#1B2433]/60 hover:text-[#1B2433]'
            }`}
          >
            Wireless Bra Sizing
          </button>
          <button
            onClick={() => setCalcType('undies')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 -mb-[1px] ${
              calcType === 'undies'
                ? 'border-[#C76977] text-[#C76977] bg-white'
                : 'border-transparent text-[#1B2433]/60 hover:text-[#1B2433]'
            }`}
          >
            High-Waist Cotton Undies Sizing
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {calcType === 'bra' ? (
            <div className="space-y-6">
              <p className="text-xs text-[#1B2433]/70 leading-relaxed font-sans">
                Our wire-free contour bras are constructed with adaptive memory foam cups and an ergonomic underband that delivers custom fit. Use a soft tape measure while wearing an unpadded bra.
              </p>

              {/* Slider 1: Snug Underbust */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1B2433]">1. Snug Underbust Measurement:</span>
                  <span className="font-mono font-bold text-[#C76977] text-sm">{underbust} inches</span>
                </div>
                <input
                  type="range"
                  min="28"
                  max="44"
                  step="1"
                  value={underbust}
                  onChange={(e) => setUnderbust(Number(e.target.value))}
                  className="w-full accent-[#C76977] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#1B2433]/40 font-mono">
                  <span>28"</span>
                  <span>34"</span>
                  <span>44"</span>
                </div>
              </div>

              {/* Slider 2: Fullest Bust */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1B2433]">2. Fullest Overbust Measurement:</span>
                  <span className="font-mono font-bold text-[#C76977] text-sm">{bust} inches</span>
                </div>
                <input
                  type="range"
                  min={underbust}
                  max={underbust + 8}
                  step="1"
                  value={bust}
                  onChange={(e) => setBust(Number(e.target.value))}
                  className="w-full accent-[#C76977] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#1B2433]/40 font-mono">
                  <span>{underbust}"</span>
                  <span>{underbust + 4}"</span>
                  <span>{underbust + 8}"</span>
                </div>
              </div>

              {/* Result Recommendation Card */}
              <div className="bg-[#FBF9F6] border border-[#1B2433]/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-widest text-[#616B7C]">
                    Recommended Triple J Size
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C76977]" />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold text-[#1B2433]">
                    {calculatedBraSize}
                  </span>
                  <span className="text-xs text-[#367C59] font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> 100% Fit Guarantee
                  </span>
                </div>

                {sisterSizes.length > 0 && (
                  <div className="pt-2 border-t border-[#1B2433]/6 text-xs text-[#1B2433]/80">
                    <span className="font-medium text-[#1B2433]">Sister Sizes: </span>
                    <span>
                      {sisterSizes.join(' or ')} (same cup volume with tighter or looser band)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <p className="text-xs text-[#1B2433]/70 leading-relaxed font-sans">
                Our 5-Pack High-Waist Breathe Cotton Undies feature gentle zero-dig elastic and a high rise that hugs without pinching. Match your hip circumference below:
              </p>

              {/* Hip Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-[#1B2433]">Widest Hip Circumference:</span>
                  <span className="font-mono font-bold text-[#C76977] text-sm">{hips} inches</span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="52"
                  step="1"
                  value={hips}
                  onChange={(e) => setHips(Number(e.target.value))}
                  className="w-full accent-[#C76977] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#1B2433]/40 font-mono">
                  <span>32" (XS)</span>
                  <span>40" (M)</span>
                  <span>52" (2XL)</span>
                </div>
              </div>

              {/* Undies Result */}
              <div className="bg-[#FBF9F6] border border-[#1B2433]/10 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans uppercase tracking-widest text-[#616B7C]">
                    Recommended Cotton Undies Size
                  </span>
                  <Sparkles className="w-4 h-4 text-[#C76977]" />
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl font-bold text-[#1B2433]">
                    Size {recommendedUndieSize}
                  </span>
                  <span className="text-xs text-[#367C59] font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" /> High-Waist No-Roll Fit
                  </span>
                </div>

                <p className="text-xs text-[#1B2433]/70 pt-2 border-t border-[#1B2433]/6">
                  Tip: If between sizes, choose your larger size for maximum relaxed lounge comfort, or your smaller size for light smoothing support.
                </p>
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#1B2433] hover:bg-[#2C384D] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
            >
              Done & Return to Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
