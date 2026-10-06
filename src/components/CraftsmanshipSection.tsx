import React from 'react';
import { LOUNGEWEAR_IMAGE } from '../data/products';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="bg-[#FBF9F6] py-16 sm:py-24 border-t border-[#1B2433]/8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-sans uppercase tracking-[0.24em] text-[#C76977] font-semibold block mb-2">
            The Triple J Philosophy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1B2433] font-normal leading-tight">
            Designed for intimate comfort, tailored without compromise.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#1B2433]/70 font-sans leading-relaxed">
            We spent two years re-engineering intimates from the yarn up. By eliminating rigid metal wires and using certified organic long-staple cotton, second-skin microfibre, and pure mulberry silk, every piece moves intuitively with your body.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-6 border-t border-[#1B2433]/10">
          {/* Pillar 1 */}
          <div className="space-y-3">
            <div className="font-serif text-2xl text-[#C76977] font-medium">01</div>
            <h3 className="font-serif text-xl text-[#1B2433] font-medium">
              Zero-Underwire Architecture
            </h3>
            <p className="text-xs sm:text-sm text-[#1B2433]/70 leading-relaxed font-sans">
              Traditional underwires dig into delicate tissue and pinch ribs. Our contoured molded memory foam creates natural, buoyant lift without a single millimeter of rigid metal.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="space-y-3">
            <div className="font-serif text-2xl text-[#C76977] font-medium">02</div>
            <h3 className="font-serif text-xl text-[#1B2433] font-medium">
              Certified Organic Breathe Cotton
            </h3>
            <p className="text-xs sm:text-sm text-[#1B2433]/70 leading-relaxed font-sans">
              Our 5-pack undies use hypoallergenic long-staple cotton cultivated without synthetic pesticides or harsh chemical dyes, ensuring skin health and all-day softness.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="space-y-3">
            <div className="font-serif text-2xl text-[#C76977] font-medium">03</div>
            <h3 className="font-serif text-xl text-[#1B2433] font-medium">
              Grade 6A Pure Mulberry Silk
            </h3>
            <p className="text-xs sm:text-sm text-[#1B2433]/70 leading-relaxed font-sans">
              Cut on the bias for fluid drape, our slips and nightwear feature authentic French Chantilly eyelash lace with natural amino acids that nourish skin as you sleep.
            </p>
          </div>
        </div>

        {/* Featured Story Callout with Image */}
        <div className="mt-14 sm:mt-20 bg-[#F5F2ED] border border-[#1B2433]/8 grid grid-cols-1 lg:grid-cols-12 overflow-hidden items-center">
          <div className="lg:col-span-5 p-8 sm:p-12 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[#616B7C]">
              100-Day First Pair Comfort Guarantee
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1B2433]">
              Wear it. Wash it. Fall in love.
            </h3>
            <p className="text-xs sm:text-sm text-[#1B2433]/75 leading-relaxed">
              If your first bra or undies set doesn't instantly become the most comfortable piece in your drawer within 100 days, keep it on us and we will refund you in full. No questions asked.
            </p>
            <div className="pt-2 text-xs font-semibold text-[#C76977] flex items-center gap-1.5">
              <span>99.2% Customer Satisfaction Across 50,000+ Orders</span>
            </div>
          </div>

          <div className="lg:col-span-7 h-64 sm:h-80 lg:h-96 relative overflow-hidden">
            <img
              src={LOUNGEWEAR_IMAGE}
              alt="Triple J loungewear crafted with pure organic modal fibers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
