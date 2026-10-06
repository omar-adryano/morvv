export interface Product {
  id: string;
  brand: string;
  name: string;
  nameAr?: string;
  slug: string;
  description: string;
  descriptionAr?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  images: string[];
  primaryImage: string;
  colors: string[];
  colorway: string;
  sizes: { size: string; price: number; inStock: boolean; stock?: number; sku?: string }[];
  stock: number;
  sku: string;
  category: 'runners' | 'court' | 'basketball' | 'mules' | 'gore-tex' | 'archive';
  featured?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  tier?: string;
  badge?: string;
  styleCode: string;
  originYear: string;
  registryId?: string;
  specs?: {
    upper?: string;
    collar?: string;
    midsole?: string;
    packaging?: string;
  };
}

export interface CuratedLookItem {
  id: string;
  brand: string;
  name: string;
  price: number;
  badge: string;
  description: string;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  country: string;
  governorate?: string;
  city: string;
  district?: string;
  addressLine1: string;
  buildingApartment?: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'processing' | 'authenticated' | 'vault_transit' | 'dispatched' | 'delivered';
  shippingMethod: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  nfcCertHash: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  tier: 'Standard' | 'Archive Collector' | 'Black Card Registry';
  defaultAddress?: ShippingAddress;
}

export interface Raffle {
  id: string;
  brand: string;
  model: string;
  subtitle: string;
  image: string;
  dateStr: string;
  day: string;
  month: string;
  closesIn: string;
  allocation: string;
  entryFee: number;
  status: 'open' | 'upcoming' | 'closed';
  retailNote: string;
}

export interface VaultArtifact {
  id: string;
  lotNumber: string;
  grade: string;
  era: string;
  brand: string;
  name: string;
  description: string;
  valuation: number;
  image: string;
}
