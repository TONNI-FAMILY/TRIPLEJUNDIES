import { Product } from '../types';

export const HERO_BANNER_IMAGE = '/src/assets/images/hero_flash_sale_banner_1791132963141.jpg';
export const BRA_PRODUCT_IMAGE = '/src/assets/images/product_rose_contour_bra_1791132973259.jpg';
export const UNDIES_BOX_IMAGE = '/src/assets/images/product_cotton_undies_box_1791132984109.jpg';
export const SILK_SLIP_IMAGE = '/src/assets/images/product_silk_lace_slip_dress_1791132996353.jpg';
export const LOUNGEWEAR_IMAGE = '/src/assets/images/brand_lifestyle_loungewear_1791133007280.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'cloudsoft-wireless-bra',
    name: 'CloudSoft Wireless Contour Plunge Bra',
    subtitle: 'Buttery microfibre with zero-underwire natural lift',
    category: 'bras',
    price: 48,
    originalPrice: 68,
    discountPercent: 30,
    isFlashSale: true,
    isBestSeller: true,
    primaryImage: BRA_PRODUCT_IMAGE,
    description:
      'Engineered for all-day comfort without poking underwires. The CloudSoft Wireless Contour Bra features ultra-fine bonded microfibre, molded micro-breathable cups that adapt to your natural silhouette, and adjustable 14k gold-plated sliders for tailored support.',
    details: [
      'Zero underwire construction with ergonomic molded support band',
      'Ultra-fine peached microfibre for a smooth invisible look under t-shirts',
      'Deep plunge neckline with delicate flexible bridge gore',
      'Convertible multi-way straps with polished gold-tone hardware',
      '4-row hook-and-eye closure for custom ribcage adjustment'
    ],
    fabricCare: [
      'Body: 78% Recycled Polyamide, 22% Spandex Elastane',
      'Cup Lining: 100% Breathable Memory Foam Air-Mesh',
      'Hand wash cold or gentle machine cycle in a delicates laundry bag',
      'Line dry in shade to maintain elastic longevity'
    ],
    sizes: ['32A', '32B', '32C', '34B', '34C', '34D', '36B', '36C', '36D', '38C', '38D'],
    variants: [
      {
        colorName: 'Rose Quartz',
        colorHex: '#C76977',
        image: BRA_PRODUCT_IMAGE
      },
      {
        colorName: 'Warm Sand Nude',
        colorHex: '#D7BC9F',
        image: BRA_PRODUCT_IMAGE
      },
      {
        colorName: 'Champagne Ivory',
        colorHex: '#F0ECE4',
        image: BRA_PRODUCT_IMAGE
      },
      {
        colorName: 'Midnight Noir',
        colorHex: '#25272F',
        image: BRA_PRODUCT_IMAGE
      }
    ],
    rating: 4.9,
    reviewCount: 328,
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena M.',
        rating: 5,
        date: '2 days ago',
        title: 'Threw out all my traditional underwire bras',
        comment:
          'I was skeptical that a wire-free bra could give 34D chest actual lift and shape, but this completely blew me away. No digging, no red marks at the end of the day, and looks seamless under thin white tees.',
        verified: true,
        sizePurchased: '34D',
        usualSize: '34D',
        fitAssessment: 'True to Size'
      },
      {
        id: 'rev-2',
        author: 'Sophia K.',
        rating: 5,
        date: '1 week ago',
        title: 'The Rose Quartz shade is divine',
        comment:
          'Such a soft, muted feminine tone that does not show through light-colored blouses. The fabric feels like rose petals against the skin.',
        verified: true,
        sizePurchased: '32C',
        usualSize: '32C',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'breathe-cotton-undies-5pack',
    name: '5-Pack High-Waist Breathe Cotton Undies',
    subtitle: 'Blush & Nude Collection with gentle waistband satin bows',
    category: 'undies',
    price: 42,
    originalPrice: 60,
    discountPercent: 30,
    isFlashSale: true,
    isBestSeller: true,
    primaryImage: UNDIES_BOX_IMAGE,
    description:
      'Our signature 5-piece curated collection packaged in a luxury gift box. Crafted from long-staple organic breathable cotton with a touch of stretch for 24/7 ease. Designed with a gentle high-waist rise that flatters without rolling or pinching.',
    details: [
      'Pack includes 5 harmonious tones: Soft Petal Pink, Blush, Sand, Warm Rosewood, and Clean Linen',
      'Ultra-soft enclosed elastic waistband with signature delicate center bow accent',
      'Full rear coverage and zero-dig leg openings',
      'Breathable double-layer 100% organic cotton gusset for skin health',
      'Pre-shrunk organic cotton fabric that retains softness wash after wash'
    ],
    fabricCare: [
      'Body: 95% Certified Organic Long-Staple Cotton, 5% Elastane',
      'Gusset: 100% Organic Hypoallergenic Cotton',
      'Machine wash warm with like colors',
      'Tumble dry low or hang dry'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    variants: [
      {
        colorName: 'Blush & Nude Ombre Palette',
        colorHex: '#DFA7A2',
        image: UNDIES_BOX_IMAGE
      },
      {
        colorName: 'Monochrome Neutrals',
        colorHex: '#3D3C3A',
        image: UNDIES_BOX_IMAGE
      },
      {
        colorName: 'Pastel Sorbet',
        colorHex: '#ECC8AF',
        image: UNDIES_BOX_IMAGE
      }
    ],
    rating: 4.95,
    reviewCount: 482,
    reviews: [
      {
        id: 'rev-3',
        author: 'Camilla R.',
        rating: 5,
        date: '3 days ago',
        title: 'Best high-waisted undies on the market',
        comment:
          'They stay in place all day without rolling down. The cotton is so soft and breathable even on warm humid days. The packaging in the gift box felt like opening a luxury treat.',
        verified: true,
        sizePurchased: 'M',
        usualSize: 'M',
        fitAssessment: 'True to Size'
      },
      {
        id: 'rev-4',
        author: 'Hannah L.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Ordered 2 more boxes immediately',
        comment:
          'The muted dusty rose and nude tones are gorgeous in person. The high rise sits right at the natural waist without any tension or muffin-top effect.',
        verified: true,
        sizePurchased: 'L',
        usualSize: 'L',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'laura-mulberry-silk-slip',
    name: "L'Aura Mulberry Silk & French Lace Slip",
    subtitle: '19-Momme Grade 6A silk with scalloped floral eyelash lace',
    category: 'silk-lounge',
    price: 98,
    originalPrice: 140,
    discountPercent: 30,
    isFlashSale: true,
    isBestSeller: true,
    primaryImage: SILK_SLIP_IMAGE,
    description:
      'Pure liquid luxury. Cut on the bias from high-grade 19-momme mulberry silk, this slip dress glides effortlessly over curves. Detailed with delicate French scalloped floral eyelash lace at both the V-neckline and hem for romantic vintage allure.',
    details: [
      '100% Grade 6A Pure Mulberry Silk (19 Momme weight)',
      'Intricate French Chantilly eyelash lace border at neckline and hemline',
      'Bias cut for natural drape and subtle fluid movement',
      'Dainty adjustable spaghetti straps with gold-tone hardware',
      'Versatile for luxurious sleepwear or styled with an oversized blazer'
    ],
    fabricCare: [
      '100% Pure Mulberry Silk with Nylon Lace Trim',
      'Dry clean or hand wash cold in silk-specific detergent',
      'Do not wring or soak; dry flat away from direct sunlight',
      'Cool iron inside out or gentle steam'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      {
        colorName: 'Champagne Blush',
        colorHex: '#DEC3B7',
        image: SILK_SLIP_IMAGE
      },
      {
        colorName: 'Vintage Mauve Rose',
        colorHex: '#B8727F',
        image: SILK_SLIP_IMAGE
      },
      {
        colorName: 'Onyx Black',
        colorHex: '#1A1A1C',
        image: SILK_SLIP_IMAGE
      }
    ],
    rating: 4.88,
    reviewCount: 164,
    reviews: [
      {
        id: 'rev-5',
        author: 'Jessica D.',
        rating: 5,
        date: '5 days ago',
        title: 'Feels like pure indulgence',
        comment:
          'The quality of the silk is comparable to slips twice this price. The lace is so delicate and not scratchy at all. Perfect champagne tone with a hint of warm blush.',
        verified: true,
        sizePurchased: 'S',
        usualSize: 'S',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'cozy-ribbed-lounge-set',
    name: 'Serene Ribbed Modal Lounge & Sleep Set',
    subtitle: 'Brushed bamboo modal scoop tank & wide-leg palazzo pants',
    category: 'silk-lounge',
    price: 76,
    originalPrice: 110,
    discountPercent: 31,
    isFlashSale: true,
    primaryImage: LOUNGEWEAR_IMAGE,
    description:
      'Designed for slow mornings and peaceful evenings. Spun from ultra-soft micro-ribbed modal that cools and regulates body temperature. Features a flattering scoop tank top and flowing wide-leg trousers with an elasticized drawstring waist.',
    details: [
      'Two-piece matching set: Ribbed Scoop Tank + Wide-Leg Lounge Trouser',
      'Ultra-soft micro-ribbed knit with 4-way mechanical stretch',
      'Wide flat elastic waistband with soft knitted drawcord',
      'Deep side seam pockets for everyday convenience',
      'Temperature-regulating breathable fibers'
    ],
    fabricCare: [
      '92% Micro-Modal, 8% Spandex',
      'Machine wash cold on gentle cycle',
      'Tumble dry low or dry flat to prevent stretching',
      'Cool iron if needed'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      {
        colorName: 'Dusty Mauve',
        colorHex: '#9B747D',
        image: LOUNGEWEAR_IMAGE
      },
      {
        colorName: 'Oatmeal Heather',
        colorHex: '#D5C8B9',
        image: LOUNGEWEAR_IMAGE
      },
      {
        colorName: 'Sage Mist',
        colorHex: '#A3ACA0',
        image: LOUNGEWEAR_IMAGE
      }
    ],
    rating: 4.92,
    reviewCount: 215,
    reviews: [
      {
        id: 'rev-6',
        author: 'Madeline P.',
        rating: 5,
        date: '1 week ago',
        title: 'I live in this set now',
        comment:
          'The drapey fabric is heavenly. It feels so elevated compared to standard sweatpants, and the dusty mauve color is so flattering.',
        verified: true,
        sizePurchased: 'M',
        usualSize: 'M',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'cloudsoft-bralette-duo',
    name: 'Seamless Everyday Rib Bralette 2-Pack',
    subtitle: 'Breathable zero-clasp slip-on bralettes with removable contour pads',
    category: 'bras',
    price: 52,
    originalPrice: 75,
    discountPercent: 30,
    isFlashSale: true,
    primaryImage: BRA_PRODUCT_IMAGE,
    description:
      'The ultimate lounge and layering essential. Crafted with 360-degree seamless knitting technology that shapes smoothly without wires, tags, or closures. Comes with featherlight removable natural shape pads.',
    details: [
      'Includes 2 coordinating bralettes in Rose Quartz and Warm Sand',
      'Seamless tubular knit that prevents chafing and side bulges',
      'Wide supportive underband that will not roll or bunch',
      'Removable teardrop foam padding for customizable modesty'
    ],
    fabricCare: [
      '88% Nylon, 12% Spandex',
      'Machine wash gentle in laundry bag',
      'Remove pads before washing for best longevity'
    ],
    sizes: ['XS/S', 'M/L', 'XL/2XL'],
    variants: [
      {
        colorName: 'Rose & Sand Duo',
        colorHex: '#C76977',
        image: BRA_PRODUCT_IMAGE
      },
      {
        colorName: 'Noir & Linen Duo',
        colorHex: '#22232A',
        image: BRA_PRODUCT_IMAGE
      }
    ],
    rating: 4.85,
    reviewCount: 198,
    reviews: [
      {
        id: 'rev-7',
        author: 'Chloe T.',
        rating: 5,
        date: '2 weeks ago',
        title: 'Incredible value and comfort',
        comment:
          'So soft you forget you are wearing a bra. The band stays firmly in place without digging.',
        verified: true,
        sizePurchased: 'M/L',
        usualSize: '36C',
        fitAssessment: 'True to Size'
      }
    ]
  },
  {
    id: 'organic-cotton-bikini-3pack',
    name: '3-Pack Low-Rise Organic Cotton Bikini',
    subtitle: 'Flattering low-rise cut with flat-bonded invisible edges',
    category: 'undies',
    price: 32,
    originalPrice: 45,
    discountPercent: 29,
    isFlashSale: true,
    primaryImage: UNDIES_BOX_IMAGE,
    description:
      'A timeless everyday silhouette with modern updates. Our low-rise bikini is cut with laser-bonded flat edges to remain completely invisible under leggings and tailored pants, made from certified organic cotton.',
    details: [
      'Low-rise hipster fit with moderate rear cheek coverage',
      'Laser-bonded hems for a 100% No-VPL (Visible Panty Line) guarantee',
      'Hypoallergenic certified organic cotton',
      'Includes 3 pairs: Rosewood, Blush, and Shell'
    ],
    fabricCare: [
      '95% Organic Cotton, 5% Elastane',
      'Machine wash warm, tumble dry gentle'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    variants: [
      {
        colorName: 'Blush Trio',
        colorHex: '#C97D87',
        image: UNDIES_BOX_IMAGE
      }
    ],
    rating: 4.9,
    reviewCount: 142,
    reviews: []
  }
];

export const SISTER_SIZE_CHART: Record<string, string[]> = {
  '32B': ['30C', '34A'],
  '32C': ['30D', '34B'],
  '32D': ['30DD', '34C'],
  '34B': ['32C', '36A'],
  '34C': ['32D', '36B'],
  '34D': ['32DD', '36C'],
  '36B': ['34C', '38A'],
  '36C': ['34D', '38B'],
  '36D': ['34DD', '38C'],
  '38C': ['36D', '40B'],
  '38D': ['36DD', '40C']
};
