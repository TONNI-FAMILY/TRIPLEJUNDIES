import React from 'react';
import { Star, CheckCircle, Shield } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      author: 'Elena Vance',
      role: 'Verified Customer · 34D',
      title: 'Finally, a wire-free bra that actually lifts',
      quote:
        'The CloudSoft bra gives real support and shape without feeling like armor. I can wear this through a 12-hour workday and completely forget I have it on.',
      item: 'CloudSoft Wireless Contour Plunge Bra',
      stars: 5
    },
    {
      author: 'Mia Chen',
      role: 'Verified Customer · Size M',
      title: 'The high-waist cotton pack is perfection',
      quote:
        'The blush and nude color palette in the gift box is so dreamy. The waistband never rolls down even when sitting all day. I immediately threw out my synthetic undies.',
      item: '5-Pack High-Waist Breathe Cotton Undies',
      stars: 5
    },
    {
      author: 'Claire Harrington',
      role: 'Verified Customer · Size S',
      title: 'Silk slip of my dreams',
      quote:
        'The Mulberry silk has an incredible heavy drape and the lace detailing is so soft against the skin. Feels like true Parisian lingerie at an honest price.',
      item: "L'Aura Mulberry Silk & Lace Slip",
      stars: 5
    }
  ];

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-[#1B2433]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <span className="text-xs font-sans uppercase tracking-[0.22em] text-[#C76977] font-semibold">
            Loved By Over 50,000 Women
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2433]">
            Tested for everyday life & pure comfort
          </h2>
          <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#1B2433]/80">
            <div className="flex text-[#E5A84D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="font-bold text-sm text-[#1B2433]">4.9 / 5.0</span>
            <span className="text-[#1B2433]/50">· 4,200+ Verified Reviews</span>
          </div>
        </div>

        {/* 3 Review Cards (Single Elevation Depth, No Pill Spam) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, index) => (
            <div
              key={index}
              className="bg-[#FBF9F6] p-6 sm:p-7 border border-[#1B2433]/8 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#E5A84D]">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-sans text-[#367C59] font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified Buyer
                  </span>
                </div>

                <h3 className="font-serif text-base text-[#1B2433] font-semibold leading-snug">
                  "{rev.title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#1B2433]/75 leading-relaxed font-sans">
                  {rev.quote}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1B2433]/8 space-y-0.5">
                <div className="font-medium text-xs text-[#1B2433]">{rev.author}</div>
                <div className="text-[11px] text-[#1B2433]/50">{rev.role}</div>
                <div className="text-[11px] text-[#C76977] font-medium pt-0.5">{rev.item}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
