export type ProductCategory = 'all' | 'bras' | 'undies' | 'silk-lounge' | 'sale';

export interface ProductVariant {
  colorName: string;
  colorHex: string;
  image: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  sizePurchased: string;
  usualSize: string;
  fitAssessment: 'Runs Small' | 'True to Size' | 'Runs Large';
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'bras' | 'undies' | 'silk-lounge';
  price: number;
  originalPrice: number;
  discountPercent: number;
  isFlashSale: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  primaryImage: string;
  secondaryImage?: string;
  description: string;
  details: string[];
  fabricCare: string[];
  sizes: string[];
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews: ProductReview[];
}

export interface CartItem {
  id: string; // unique item instance id
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  colorName: string;
  colorHex: string;
  size: string;
  quantity: number;
}

export interface CheckoutDetails {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: 'card' | 'apple-pay' | 'paypal';
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
}
