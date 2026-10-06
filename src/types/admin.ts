import { Product, Order, UserProfile, ShippingAddress } from './index';

export type AdminRole = 'super_admin' | 'store_manager' | 'content_editor' | 'order_specialist';

export interface AdminPermission {
  id: string;
  name: string;
  category: 'catalog' | 'sales' | 'customers' | 'content' | 'store' | 'system';
  description: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  roleTitle: string;
  avatar?: string;
  status: 'active' | 'suspended';
  lastActive: string;
  createdAt: string;
  permissions: string[];
}

export interface ActivityLogEntry {
  id: string;
  timestamp: string;
  adminName: string;
  adminEmail: string;
  action: string;
  category: 'product' | 'order' | 'inventory' | 'payment' | 'shipping' | 'coupon' | 'banner' | 'homepage' | 'settings' | 'auth';
  target: string;
  details?: string;
  ip?: string;
}

export interface AdminNotification {
  id: string;
  timestamp: string;
  type: 'order' | 'inventory' | 'payment' | 'system' | 'customer';
  title: string;
  message: string;
  read: boolean;
  linkTab?: string;
  linkId?: string;
}

export interface PaymentMethodConfig {
  id: 'vodafone_cash' | 'instapay' | 'cod';
  name: string;
  nameAr: string;
  enabled: boolean;
  displayOrder: number;
  badge?: string;
  details: {
    walletNumber?: string;
    quickCodeTemplate?: string;
    ipaAddress?: string;
    registeredPhone?: string;
    receiverName?: string;
    codFee?: number;
    minOrderAmount?: number;
    maxOrderAmount?: number;
    customerInstructionsAr: string;
    customerInstructionsEn: string;
    internalNotes?: string;
  };
}

export interface ShippingZone {
  id: string;
  name: string;
  nameAr: string;
  fee: number;
  estimatedDays: string;
  enabled: boolean;
  governorates: string[];
}

export interface ShippingConfig {
  freeShippingThreshold: number; // e.g. 250 USD
  defaultFee: number;
  expressFee: number;
  deliveryEstimate: string;
  zones: ShippingZone[];
  instructionsAr: string;
  instructionsEn: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 15 for 15% or 50 for $50
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  usageLimit: number;
  usageCount: number;
  active: boolean;
  applicableBrands?: string[];
  applicableCategories?: string[];
  description: string;
}

export interface DiscountRule {
  id: string;
  name: string;
  type: 'percentage' | 'fixed';
  value: number;
  targetType: 'all' | 'category' | 'brand' | 'product';
  targetValue?: string;
  active: boolean;
  startDate: string;
  endDate: string;
}

export interface Banner {
  id: string;
  title: string;
  titleAr?: string;
  subtitle?: string;
  subtitleAr?: string;
  ctaText?: string;
  ctaLink?: string;
  desktopImage: string;
  mobileImage: string;
  position: 'top_ticker' | 'hero_slider' | 'mid_editorial' | 'footer_promo';
  priority: number;
  active: boolean;
  startDate?: string;
  endDate?: string;
}

export interface HomepageSectionConfig {
  id: string;
  title: string;
  titleAr: string;
  visible: boolean;
  order: number;
}

export interface HomepageConfig {
  hero: {
    badgeAr: string;
    badgeEn: string;
    headlineAr: string;
    headlineEn: string;
    subheadlineAr: string;
    subheadlineEn: string;
    ctaPrimaryTextAr: string;
    ctaPrimaryTextEn: string;
    ctaPrimaryLink: string;
    ctaSecondaryTextAr: string;
    ctaSecondaryTextEn: string;
    ctaSecondaryLink: string;
    heroImage: string;
    countdownHours: number;
    specimenCode: string;
  };
  sections: HomepageSectionConfig[];
  announcementTicker: {
    enabled: boolean;
    textAr: string;
    textEn: string;
  };
}

export interface CategoryConfig {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  enabled: boolean;
  order: number;
  productCount?: number;
}

export interface BrandConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  descriptionAr: string;
  logoUrl?: string;
  bannerUrl?: string;
  originCountry: string;
  establishedYear: string;
  enabled: boolean;
  featured: boolean;
}

export interface CollectionConfig {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  description: string;
  image: string;
  enabled: boolean;
  productIds: string[];
}

export interface StorePolicy {
  id: 'privacy' | 'terms' | 'shipping' | 'returns' | 'refund' | 'authenticity';
  titleAr: string;
  titleEn: string;
  contentAr: string;
  contentEn: string;
  lastUpdated: string;
}

export interface StoreSettings {
  storeName: string;
  storeTagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  currency: string;
  timezone: string;
  orderPrefix: string;
  maintenanceMode: boolean;
  inventoryAlertThreshold: number;
  socialLinks: {
    instagram: string;
    twitter: string;
    discord: string;
    youtube: string;
  };
  supportHours: string;
}

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: 'sneakers' | 'banners' | 'lookbook' | 'brand_logos' | 'other';
  uploadedAt: string;
  sizeKb?: number;
  aspectRatio?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  featured: boolean;
}

export interface OrderReturn {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  productName: string;
  productSize: string;
  reason: string;
  status: 'pending' | 'inspected' | 'approved' | 'rejected' | 'completed';
  requestedAt: string;
  notes?: string;
  refundAmount: number;
}

export interface OrderRefund {
  id: string;
  orderId: string;
  customerName: string;
  amount: number;
  reason: string;
  status: 'pending' | 'processed' | 'declined';
  createdAt: string;
  paymentMethod: 'vodafone_cash' | 'instapay' | 'cod';
  transactionRef?: string;
}

export interface AbandonedCart {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  itemsCount: number;
  totalValue: number;
  items: { productName: string; size: string; price: number; quantity: number }[];
  abandonedAt: string;
  recovered: boolean;
}

export interface CustomerGroup {
  id: string;
  name: string;
  description: string;
  discountRate: number;
  membersCount: number;
  badgeColor: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  title: string;
  body: string;
  category: 'order' | 'customer' | 'payment' | 'shipping';
  enabled: boolean;
  lastUpdated: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  labelAr: string;
  view: string;
  linkUrl?: string;
  order: number;
  visible: boolean;
  isExternal?: boolean;
}

export interface CustomerMessage {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
  orderId?: string;
}

