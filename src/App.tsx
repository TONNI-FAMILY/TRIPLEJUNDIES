import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FitCalculatorModal } from './components/FitCalculatorModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PRODUCTS, BRA_PRODUCT_IMAGE, UNDIES_BOX_IMAGE } from './data/products';
import { Product, ProductCategory, CartItem } from './types';
import { SlidersHorizontal, Check, Sparkles, ArrowUpDown, ChevronDown } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<ProductCategory>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'discount'>('featured');
  const [sizeFilter, setSizeFilter] = useState<string>('all');

  // Modals & Drawers State
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Cart & Wishlist with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('triplej_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial friendly default
    return [
      {
        id: 'cart-init-1',
        productId: 'cloudsoft-wireless-bra',
        name: 'CloudSoft Wireless Contour Plunge Bra',
        price: 48,
        originalPrice: 68,
        image: BRA_PRODUCT_IMAGE,
        colorName: 'Rose Quartz',
        colorHex: '#C76977',
        size: '34C',
        quantity: 1
      },
      {
        id: 'cart-init-2',
        productId: 'breathe-cotton-undies-5pack',
        name: '5-Pack High-Waist Breathe Cotton Undies',
        price: 42,
        originalPrice: 60,
        image: UNDIES_BOX_IMAGE,
        colorName: 'Blush & Nude Ombre Palette',
        colorHex: '#DFA7A2',
        size: 'M',
        quantity: 1
      }
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('triplej_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['laura-mulberry-silk-slip'];
  });

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const collectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('triplej_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('triplej_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity: number = 1
  ) => {
    const activeVariant = product.variants.find((v) => v.colorName === selectedColor) || product.variants[0];
    const instanceId = `${product.id}-${selectedColor}-${selectedSize}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === instanceId);
      if (existing) {
        return prev.map((item) =>
          item.id === instanceId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: instanceId,
          productId: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: activeVariant ? activeVariant.image : product.primaryImage,
          colorName: selectedColor,
          colorHex: activeVariant ? activeVariant.colorHex : '#C76977',
          size: selectedSize,
          quantity
        }
      ];
    });

    showToast(`Added ${product.name} (${selectedSize}) to bag`);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed from saved favorites`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved to favorites`);
        return [...prev, product.id];
      }
    });
  };

  const wishlistProducts = useMemo(() => {
    return PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (currentCategory === 'sale') {
        if (!product.isFlashSale) return false;
      } else if (currentCategory !== 'all') {
        if (product.category !== currentCategory) return false;
      }

      // Size filter
      if (sizeFilter !== 'all') {
        if (!product.sizes.includes(sizeFilter)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [currentCategory, sizeFilter, sortBy]);

  const scrollToCollection = () => {
    collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F6] text-[#1B2433]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1B2433] text-white px-4 py-3 rounded shadow-xl flex items-center gap-2.5 text-xs font-medium animate-in slide-in-from-bottom-3 duration-200">
          <Check className="w-4 h-4 text-[#77D2A7]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          scrollToCollection();
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
      />

      <main className="flex-1">
        {/* Hero Section replicating Image 3 */}
        <HeroBanner
          onShopNow={() => {
            setCurrentCategory('sale');
            scrollToCollection();
          }}
        />

        {/* Featured Collection & Shop Section */}
        <section ref={collectionRef} className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Kicker and Headline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-sans uppercase tracking-[0.24em] text-[#C76977] font-semibold">
                Curated Intimates
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B2433] font-normal">
                {currentCategory === 'sale'
                  ? 'End of Season Flash Sale'
                  : currentCategory === 'bras'
                  ? 'CloudSoft Wireless Bras & Bralettes'
                  : currentCategory === 'undies'
                  ? 'High-Waist Organic Cotton Undies'
                  : currentCategory === 'silk-lounge'
                  ? 'Mulberry Silk & Ribbed Lounge'
                  : 'Signature Triple J Collection'}
              </h2>
            </div>

            {/* Total Results Count (Zero-Pill Discipline) */}
            <div className="text-xs text-[#1B2433]/60 font-mono">
              Showing <span className="text-[#1B2433] font-bold">{filteredProducts.length}</span> styles
            </div>
          </div>

          {/* Interactive Filter Bar & Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1B2433]/8">
            {/* Category Segmented Controls (Button-based) */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F2ED] rounded-lg">
              {[
                { label: 'All Styles', value: 'all' },
                { label: 'Flash Sale (Up to 40% Off)', value: 'sale' },
                { label: 'Bras', value: 'bras' },
                { label: 'Undies Multi-Packs', value: 'undies' },
                { label: 'Silk & Lounge', value: 'silk-lounge' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setCurrentCategory(tab.value as ProductCategory)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    currentCategory === tab.value
                      ? 'bg-white text-[#1B2433] shadow-xs font-semibold'
                      : 'text-[#1B2433]/70 hover:text-[#1B2433]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Filter and Sort Selectors */}
            <div className="flex items-center gap-3">
              {/* Size Filter Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={sizeFilter}
                  onChange={(e) => setSizeFilter(e.target.value)}
                  className="appearance-none bg-white border border-[#1B2433]/15 text-xs text-[#1B2433] pl-3 pr-8 py-2 rounded-md hover:border-[#1B2433] focus:outline-hidden cursor-pointer"
                >
                  <option value="all">All Sizes</option>
                  <option value="XS">Size XS</option>
                  <option value="S">Size S</option>
                  <option value="M">Size M</option>
                  <option value="L">Size L</option>
                  <option value="XL">Size XL</option>
                  <option value="2XL">Size 2XL</option>
                  <option value="32C">32C</option>
                  <option value="34C">34C</option>
                  <option value="34D">34D</option>
                  <option value="36C">36C</option>
                  <option value="36D">36D</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 text-[#1B2433]/50 pointer-events-none" />
              </div>

              {/* Sort By Dropdown */}
              <div className="relative inline-flex items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white border border-[#1B2433]/15 text-xs text-[#1B2433] pl-3 pr-8 py-2 rounded-md hover:border-[#1B2433] focus:outline-hidden cursor-pointer font-medium"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="discount">Sort: Highest Discount</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 text-[#1B2433]/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Product Grid (3-column desktop, uniform background, generous gap-6/gap-8) */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={(p) => setQuickViewProduct(p)}
                onAddToCart={(p, color, size) => handleAddToCart(p, color, size, 1)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>

          {/* Empty Filter State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white border border-[#1B2433]/8 p-8 space-y-4">
              <h3 className="font-serif text-2xl text-[#1B2433]">No items match this filter</h3>
              <p className="text-xs text-[#1B2433]/60 max-w-sm mx-auto">
                Try selecting "All Sizes" or switching categories to explore the complete Triple J range.
              </p>
              <button
                onClick={() => {
                  setCurrentCategory('all');
                  setSizeFilter('all');
                }}
                className="px-6 py-2.5 bg-[#1B2433] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2C384D] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Brand Craftsmanship & Fabric Story Section */}
        <CraftsmanshipSection />

        {/* Customer Reviews & Social Proof */}
        <ReviewsSection />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          scrollToCollection();
        }}
        onOpenFitGuide={() => setIsFitGuideOpen(true)}
      />

      {/* Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(product, color, size, qty) => {
          handleAddToCart(product, color, size, qty);
          setQuickViewProduct(null);
          setIsCartOpen(true);
        }}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onOpenFitGuide={() => {
          setIsFitGuideOpen(true);
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => {
          setIsCartOpen(false);
          scrollToCollection();
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={() => {
          setCartItems([]);
        }}
      />

      {/* Precision Fit & Sister Size Calculator */}
      <FitCalculatorModal
        isOpen={isFitGuideOpen}
        onClose={() => setIsFitGuideOpen(false)}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(p) => {
          setQuickViewProduct(p);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onOpenQuickView={(p) => setQuickViewProduct(p)}
        onAddToCart={(p, color, size) => {
          handleAddToCart(p, color, size, 1);
          setIsWishlistOpen(false);
          setIsCartOpen(true);
        }}
      />
    </div>
  );
}
