import React, { useState } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  const quickTerms = ['Wireless Bra', 'High-Waist Undies', 'Silk Slip', 'Modal Lounge', 'Flash Sale'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl shadow-2xl border border-[#1B2433]/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#1B2433]/10 flex items-center gap-3 bg-[#FBF9F6]">
          <Search className="w-5 h-5 text-[#C76977] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bras, undies packs, silk slips, loungewear..."
            className="w-full text-base sm:text-lg bg-transparent border-none text-[#1B2433] placeholder-[#1B2433]/40 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#1B2433]/40 hover:text-[#1B2433]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold uppercase tracking-wider text-[#1B2433]/70 hover:text-[#1B2433] px-2 py-1"
          >
            Esc
          </button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="px-5 py-3 bg-[#F5F2ED] border-b border-[#1B2433]/6 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[#1B2433]/50 font-medium">Popular:</span>
          {quickTerms.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="text-[#1B2433]/80 hover:text-[#C76977] hover:underline underline-offset-2 transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#1B2433]/6 space-y-3">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#1B2433]/50 pb-1">
            {query.trim() ? `Search Results (${filteredProducts.length})` : 'Featured Styles'}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-12 text-center text-xs text-[#1B2433]/60">
              No intimate apparel found matching "{query}". Try checking your spelling or search for "bra", "cotton", or "silk".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="pt-3 first:pt-0 flex items-center justify-between gap-4 p-2 hover:bg-[#FBF9F6] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#F5F2ED] border border-[#1B2433]/6 shrink-0 overflow-hidden">
                    <img
                      src={p.primaryImage}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#1B2433] group-hover:text-[#C76977] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[#1B2433]/60 line-clamp-1">{p.subtitle}</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-semibold text-sm text-[#1B2433] tabular-nums">
                    ${p.price.toFixed(2)}
                  </span>
                  {p.originalPrice > p.price && (
                    <span className="block text-[11px] text-[#C76977] font-medium">
                      -{p.discountPercent}%
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
