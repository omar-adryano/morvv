import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, UserProfile, ShippingAddress } from '../types';
import { PRODUCTS } from '../data/products';
import { translations, Language } from '../utils/translations';
import {
  PaymentMethodConfig,
  ShippingConfig,
  Coupon,
  Banner,
  HomepageConfig,
  CategoryConfig,
  BrandConfig,
  CollectionConfig,
  StoreSettings,
  StorePolicy,
  AdminUser,
  ActivityLogEntry,
  AdminNotification,
  MediaItem,
  AdminRole
} from '../types/admin';
import {
  INITIAL_PAYMENT_METHODS,
  INITIAL_SHIPPING_CONFIG,
  INITIAL_COUPONS,
  INITIAL_BANNERS,
  INITIAL_HOMEPAGE_CONFIG,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_COLLECTIONS,
  INITIAL_STORE_SETTINGS,
  INITIAL_POLICIES,
  INITIAL_ADMIN_USERS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_MEDIA_LIBRARY
} from '../data/initialAdminData';

export type Currency = 'EGP' | 'SAR' | 'AED' | 'USD' | 'EUR';

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  tier: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'active' | 'disabled';
}

interface StoreContextType {
  // Localization & Currency
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en'], params?: Record<string, string | number>) => string;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInEGP: number) => string;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Coupons on storefront
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Search & Navigation
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentView: string;
  selectedProduct: Product | null;
  selectedOrderId: string | null;
  navigateTo: (view: string, payload?: any) => void;

  // Customer Authentication
  user: UserProfile | null;
  login: (email: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;

  // Toast
  toast: { message: string; visible: boolean };
  showToast: (msg: string) => void;

  // Storefront & Admin Orders
  orders: Order[];
  placeOrder: (customerInfo: { fullName: string; email: string; phone: string }, address: ShippingAddress, shippingMethod: string, paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  cancelOrder: (orderId: string, reason?: string) => void;

  // === Dynamic Store & Admin Catalog Data ===
  products: Product[];
  createProduct: (productData: Partial<Product>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => Product;
  toggleProductStatus: (id: string) => void;
  adjustStock: (productId: string, sizeName: string, delta: number) => void;

  // Payment Configuration
  paymentSettings: PaymentMethodConfig[];
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethodConfig>) => void;

  // Shipping Configuration
  shippingSettings: ShippingConfig;
  updateShippingSettings: (updates: Partial<ShippingConfig>) => void;

  // Coupons Management
  coupons: Coupon[];
  createCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => Coupon;
  updateCoupon: (id: string, updates: Partial<Coupon>) => void;
  deleteCoupon: (id: string) => void;

  // Banners & Content Management
  banners: Banner[];
  createBanner: (banner: Omit<Banner, 'id'>) => Banner;
  updateBanner: (id: string, updates: Partial<Banner>) => void;
  deleteBanner: (id: string) => void;

  // Homepage CMS
  homepageConfig: HomepageConfig;
  updateHomepageConfig: (updates: Partial<HomepageConfig>) => void;

  // Categories & Brands
  categories: CategoryConfig[];
  createCategory: (cat: Omit<CategoryConfig, 'id'>) => CategoryConfig;
  updateCategory: (id: string, updates: Partial<CategoryConfig>) => void;
  deleteCategory: (id: string) => void;

  brands: BrandConfig[];
  createBrand: (brand: Omit<BrandConfig, 'id'>) => BrandConfig;
  updateBrand: (id: string, updates: Partial<BrandConfig>) => void;
  deleteBrand: (id: string) => void;

  collections: CollectionConfig[];
  createCollection: (col: Omit<CollectionConfig, 'id'>) => CollectionConfig;
  updateCollection: (id: string, updates: Partial<CollectionConfig>) => void;
  deleteCollection: (id: string) => void;

  // Store Settings & Policies
  storeSettings: StoreSettings;
  updateStoreSettings: (updates: Partial<StoreSettings>) => void;
  policies: StorePolicy[];
  updatePolicy: (id: string, updates: Partial<StorePolicy>) => void;

  // Customers Data
  customers: AdminCustomer[];
  toggleCustomerStatus: (id: string) => void;

  // Admin Security & Users
  adminUsers: AdminUser[];
  currentAdmin: AdminUser | null;
  isAdminLoggedIn: boolean;
  adminLogin: (email: string, role?: AdminRole) => boolean;
  adminLogout: () => void;
  createAdminUser: (userData: Omit<AdminUser, 'id' | 'createdAt' | 'lastActive'>) => AdminUser;
  updateAdminUser: (id: string, updates: Partial<AdminUser>) => void;
  deleteAdminUser: (id: string) => void;

  // Activity Logs & Notifications
  activityLogs: ActivityLogEntry[];
  logActivity: (action: string, category: ActivityLogEntry['category'], target: string, details?: string) => void;
  notifications: AdminNotification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Media Library
  mediaLibrary: MediaItem[];
  addMediaItem: (item: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  deleteMediaItem: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State - Default to Arabic (RTL)
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('morv_lang') as Language;
    return saved === 'en' ? 'en' : 'ar';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('morv_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof typeof translations['en'], params?: Record<string, string | number>): string => {
    let str = translations[language][key] || translations['en'][key] || String(key);
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(`{${k}}`, String(v));
      });
    }
    return str;
  };

  // 2. Currency State - Official Store Currency is Egyptian Pound (EGP / ج.م)
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('morv_currency') as Currency;
    return saved || 'EGP';
  });

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('morv_currency', c);
  };

  const formatPrice = (priceInEGP: number) => {
    if (priceInEGP === undefined || priceInEGP === null || isNaN(priceInEGP)) return '0 ج.م';
    return `${Math.round(priceInEGP).toLocaleString('en-US')} ج.م`;
  };

  // 3. Products Catalog State (Admin <-> Storefront Live Sync)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('morv_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_products', JSON.stringify(products));
  }, [products]);

  // 4. Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('morv_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string, quantity: number = 1) => {
    const sizeObj = product.sizes.find((s) => s.size === size);
    if (sizeObj && (!sizeObj.inStock || (sizeObj.stock !== undefined && sizeObj.stock <= 0))) {
      showToast(language === 'ar' ? `عفواً، المقاس ${size} نفد من المخزون` : `Sorry, size ${size} is out of stock`);
      return;
    }

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );
      const price = sizeObj ? sizeObj.price : product.price;

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { product, selectedSize: size, price, quantity }];
    });
    showToast(language === 'ar' ? `تمت إضافة المقاس ${size} إلى السلة ✓` : `Added size ${size} to Cart ✓`);
  };

  const removeFromCart = (productId: string, size: string) => {
    setCart((prev) => prev.filter((item) => !(item.product.id === productId && item.selectedSize === size)));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 5. Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('morv_wishlist');
      return saved ? JSON.parse(saved) : ['prod-001', 'prod-004'];
    } catch {
      return ['prod-001'];
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(
        exists
          ? (language === 'ar' ? 'تمت الإزالة من المفضلة' : 'Removed from Wishlist')
          : (language === 'ar' ? 'تم الحفظ في المفضلة الأرشيفية' : 'Saved to Archive Wishlist')
      );
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // 6. Navigation & View Routing
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const navigateTo = (view: string, payload?: any) => {
    if (view === 'product' && payload) {
      setSelectedProduct(payload);
    } else if (view === 'orderDetails' && payload) {
      setSelectedOrderId(typeof payload === 'string' ? payload : payload.id);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 7. Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 8. User Profile & Auth
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('morv_user');
      return saved ? JSON.parse(saved) : {
        id: 'usr-8891',
        name: 'Julian V. Meyer',
        email: 'julian.meyer@vault-collector.org',
        phone: '+20 109 884 1920',
        tier: 'Archive Collector',
        defaultAddress: {
          fullName: 'Julian V. Meyer',
          phone: '+20 109 884 1920',
          country: 'مصر',
          city: 'القاهرة',
          district: 'التجمع الخامس',
          addressLine1: 'شارع التسعين الشمالي، مجمع الأعمال',
          postalCode: '11835'
        }
      };
    } catch {
      return null;
    }
  });

  const login = (email: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name: email.split('@')[0].toUpperCase(),
      email,
      tier: 'Archive Collector'
    };
    setUser(newUser);
    localStorage.setItem('morv_user', JSON.stringify(newUser));
    showToast(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Authenticated as Collector');
  };

  const register = (email: string, name: string) => {
    const newUser: UserProfile = {
      id: 'usr-' + Math.floor(1000 + Math.random() * 9000),
      name,
      email,
      tier: 'Standard'
    };
    setUser(newUser);
    localStorage.setItem('morv_user', JSON.stringify(newUser));
    showToast(language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Collector Registry Created');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('morv_user');
    showToast(language === 'ar' ? 'تم تسجيل الخروج' : 'Signed Out');
  };

  // 9. Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('morv_orders');
      return saved ? JSON.parse(saved) : [
        {
          id: 'ord-8501',
          orderNumber: 'MORV-8501-CHI',
          date: '2026-10-02',
          items: [
            {
              product: PRODUCTS[0],
              selectedSize: 'US 9.0',
              price: 295,
              quantity: 1
            }
          ],
          subtotal: 295,
          shipping: 0,
          total: 295,
          status: 'dispatched',
          shippingMethod: 'Complimentary Insured Priority Dispatch',
          shippingAddress: {
            fullName: 'Julian V. Meyer',
            phone: '+20 109 884 1920',
            country: 'مصر',
            city: 'القاهرة',
            district: 'التجمع الخامس',
            addressLine1: 'شارع التسعين الشمالي، مجمع الأعمال',
            postalCode: '11835'
          },
          paymentMethod: 'Vodafone Cash (01098841920)',
          nfcCertHash: '0x98E442CHI-771B-VAULT-2026'
        },
        {
          id: 'ord-8490',
          orderNumber: 'MORV-8490-BOS',
          date: '2026-09-28',
          items: [
            {
              product: PRODUCTS[1],
              selectedSize: 'US 10.0',
              price: 260,
              quantity: 1
            }
          ],
          subtotal: 260,
          shipping: 0,
          total: 260,
          status: 'delivered',
          shippingMethod: 'Complimentary Insured Priority Dispatch',
          shippingAddress: {
            fullName: 'Karim Tarek',
            phone: '+20 102 334 5567',
            country: 'مصر',
            city: 'الجيزة',
            district: 'الشيخ زايد',
            addressLine1: 'كمبوند الربوة، فيلا 14',
            postalCode: '12588'
          },
          paymentMethod: 'InstaPay (morv@instapay)',
          nfcCertHash: '0x33A190NB-552A-VAULT-2026'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_orders', JSON.stringify(orders));
  }, [orders]);

  // 10. Store Settings & Configurations State
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('morv_store_settings');
      return saved ? JSON.parse(saved) : INITIAL_STORE_SETTINGS;
    } catch {
      return INITIAL_STORE_SETTINGS;
    }
  });

  const updateStoreSettings = (updates: Partial<StoreSettings>) => {
    setStoreSettings((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('morv_store_settings', JSON.stringify(next));
      return next;
    });
    logActivity('Store Settings Updated', 'settings', 'General Store Information');
    showToast(language === 'ar' ? 'تم تحديث إعدادات المتجر' : 'Store Settings Updated');
  };

  // 11. Payment Methods Configuration
  const [paymentSettings, setPaymentSettings] = useState<PaymentMethodConfig[]>(() => {
    try {
      const saved = localStorage.getItem('morv_payment_settings');
      return saved ? JSON.parse(saved) : INITIAL_PAYMENT_METHODS;
    } catch {
      return INITIAL_PAYMENT_METHODS;
    }
  });

  const updatePaymentMethod = (id: string, updates: Partial<PaymentMethodConfig>) => {
    setPaymentSettings((prev) => {
      const next = prev.map((pm) => (pm.id === id ? { ...pm, ...updates } : pm));
      localStorage.setItem('morv_payment_settings', JSON.stringify(next));
      return next;
    });
    logActivity('Payment Method Updated', 'payment', id);
    showToast(language === 'ar' ? 'تم تحديث وسيلة الدفع' : 'Payment Method Updated');
  };

  // 12. Shipping Configuration
  const [shippingSettings, setShippingSettings] = useState<ShippingConfig>(() => {
    try {
      const saved = localStorage.getItem('morv_shipping_settings');
      return saved ? JSON.parse(saved) : INITIAL_SHIPPING_CONFIG;
    } catch {
      return INITIAL_SHIPPING_CONFIG;
    }
  });

  const updateShippingSettings = (updates: Partial<ShippingConfig>) => {
    setShippingSettings((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('morv_shipping_settings', JSON.stringify(next));
      return next;
    });
    logActivity('Shipping Config Updated', 'shipping', 'Shipping Zones & Rules');
    showToast(language === 'ar' ? 'تم تحديث إعدادات الشحن' : 'Shipping Settings Updated');
  };

  // 13. Coupons Management
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    try {
      const saved = localStorage.getItem('morv_coupons');
      return saved ? JSON.parse(saved) : INITIAL_COUPONS;
    } catch {
      return INITIAL_COUPONS;
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_coupons', JSON.stringify(coupons));
  }, [coupons]);

  const createCoupon = (couponData: Omit<Coupon, 'id' | 'usageCount'>): Coupon => {
    const newCoupon: Coupon = {
      ...couponData,
      id: 'coup-' + Date.now(),
      usageCount: 0
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    logActivity('Coupon Created', 'coupon', newCoupon.code, `Value: ${newCoupon.value}${newCoupon.type === 'percentage' ? '%' : '$'}`);
    showToast(language === 'ar' ? `تم إنشاء الكوبون ${newCoupon.code}` : `Coupon ${newCoupon.code} Created`);
    return newCoupon;
  };

  const updateCoupon = (id: string, updates: Partial<Coupon>) => {
    setCoupons((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    logActivity('Coupon Updated', 'coupon', id);
    showToast(language === 'ar' ? 'تم تحديث الكوبون' : 'Coupon Updated');
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
    logActivity('Coupon Deleted', 'coupon', id);
    showToast(language === 'ar' ? 'تم حذف الكوبون' : 'Coupon Deleted');
  };

  // Storefront coupon application
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === 'percentage'
      ? Math.round((cartSubtotal * appliedCoupon.value) / 100)
      : Math.min(appliedCoupon.value, cartSubtotal)
    : 0;

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode && c.active);

    if (!found) {
      return {
        success: false,
        message: language === 'ar' ? 'كود الكوبون غير صالح أو منتهي الصلاحية' : 'Invalid or expired coupon code'
      };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: language === 'ar'
          ? `الحد الأدنى لتطبيق الكوبون هو ${formatPrice(found.minOrderValue)}`
          : `Minimum order value for this coupon is ${formatPrice(found.minOrderValue)}`
      };
    }

    setAppliedCoupon(found);
    showToast(language === 'ar' ? `تم تفعيل خصم ${found.code} بنجاح` : `Coupon ${found.code} Applied`);
    return {
      success: true,
      message: language === 'ar' ? 'تم تطبيق الخصم بنجاح ✓' : 'Coupon applied successfully ✓'
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast(language === 'ar' ? 'تمت إزالة الكوبون' : 'Coupon Removed');
  };

  // 14. Banners State
  const [banners, setBanners] = useState<Banner[]>(() => {
    try {
      const saved = localStorage.getItem('morv_banners');
      return saved ? JSON.parse(saved) : INITIAL_BANNERS;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_banners', JSON.stringify(banners));
  }, [banners]);

  const createBanner = (bannerData: Omit<Banner, 'id'>): Banner => {
    const newBanner: Banner = { ...bannerData, id: 'ban-' + Date.now() };
    setBanners((prev) => [newBanner, ...prev]);
    logActivity('Banner Created', 'banner', newBanner.title);
    showToast(language === 'ar' ? 'تم إنشاء البانر بنجاح' : 'Banner Created');
    return newBanner;
  };

  const updateBanner = (id: string, updates: Partial<Banner>) => {
    setBanners((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    logActivity('Banner Updated', 'banner', id);
    showToast(language === 'ar' ? 'تم تحديث البانر' : 'Banner Updated');
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
    logActivity('Banner Deleted', 'banner', id);
    showToast(language === 'ar' ? 'تم حذف البانر' : 'Banner Deleted');
  };

  // 15. Homepage CMS State
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    try {
      const saved = localStorage.getItem('morv_homepage_config');
      return saved ? JSON.parse(saved) : INITIAL_HOMEPAGE_CONFIG;
    } catch {
      return INITIAL_HOMEPAGE_CONFIG;
    }
  });

  const updateHomepageConfig = (updates: Partial<HomepageConfig>) => {
    setHomepageConfig((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem('morv_homepage_config', JSON.stringify(next));
      return next;
    });
    logActivity('Homepage CMS Updated', 'homepage', 'Hero & Sections Hierarchy');
    showToast(language === 'ar' ? 'تم تحديث الصفحة الرئيسية بنجاح' : 'Homepage Layout Updated');
  };

  // 16. Categories & Brands
  const [categories, setCategories] = useState<CategoryConfig[]>(() => {
    try {
      const saved = localStorage.getItem('morv_categories');
      return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
    } catch {
      return INITIAL_CATEGORIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_categories', JSON.stringify(categories));
  }, [categories]);

  const createCategory = (catData: Omit<CategoryConfig, 'id'>): CategoryConfig => {
    const newCat: CategoryConfig = { ...catData, id: 'cat-' + Date.now() };
    setCategories((prev) => [...prev, newCat]);
    logActivity('Category Created', 'product', newCat.name);
    showToast(language === 'ar' ? 'تم إنشاء التصنيف' : 'Category Created');
    return newCat;
  };

  const updateCategory = (id: string, updates: Partial<CategoryConfig>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    logActivity('Category Updated', 'product', id);
    showToast(language === 'ar' ? 'تم تحديث التصنيف' : 'Category Updated');
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    logActivity('Category Deleted', 'product', id);
    showToast(language === 'ar' ? 'تم حذف التصنيف' : 'Category Deleted');
  };

  const [brands, setBrands] = useState<BrandConfig[]>(() => {
    try {
      const saved = localStorage.getItem('morv_brands');
      return saved ? JSON.parse(saved) : INITIAL_BRANDS;
    } catch {
      return INITIAL_BRANDS;
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_brands', JSON.stringify(brands));
  }, [brands]);

  const createBrand = (brandData: Omit<BrandConfig, 'id'>): BrandConfig => {
    const newBrand: BrandConfig = { ...brandData, id: 'br-' + Date.now() };
    setBrands((prev) => [...prev, newBrand]);
    logActivity('Brand Created', 'product', newBrand.name);
    showToast(language === 'ar' ? 'تمت إضافة العلامة التجارية' : 'Brand Added');
    return newBrand;
  };

  const updateBrand = (id: string, updates: Partial<BrandConfig>) => {
    setBrands((prev) => prev.map((b) => (b.id === id ? { ...b, ...updates } : b)));
    logActivity('Brand Updated', 'product', id);
    showToast(language === 'ar' ? 'تم تحديث العلامة التجارية' : 'Brand Updated');
  };

  const deleteBrand = (id: string) => {
    setBrands((prev) => prev.filter((b) => b.id !== id));
    logActivity('Brand Deleted', 'product', id);
    showToast(language === 'ar' ? 'تم حذف العلامة التجارية' : 'Brand Deleted');
  };

  const [collections, setCollections] = useState<CollectionConfig[]>(() => {
    try {
      const saved = localStorage.getItem('morv_collections');
      return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
    } catch {
      return INITIAL_COLLECTIONS;
    }
  });

  useEffect(() => {
    localStorage.setItem('morv_collections', JSON.stringify(collections));
  }, [collections]);

  const createCollection = (colData: Omit<CollectionConfig, 'id'>): CollectionConfig => {
    const newCol: CollectionConfig = { ...colData, id: 'col-' + Date.now() };
    setCollections((prev) => [...prev, newCol]);
    logActivity('Collection Created', 'product', newCol.name);
    return newCol;
  };

  const updateCollection = (id: string, updates: Partial<CollectionConfig>) => {
    setCollections((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id));
  };

  // 17. Policies
  const [policies, setPolicies] = useState<StorePolicy[]>(() => {
    try {
      const saved = localStorage.getItem('morv_policies');
      return saved ? JSON.parse(saved) : INITIAL_POLICIES;
    } catch {
      return INITIAL_POLICIES;
    }
  });

  const updatePolicy = (id: string, updates: Partial<StorePolicy>) => {
    setPolicies((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, ...updates } : p));
      localStorage.setItem('morv_policies', JSON.stringify(next));
      return next;
    });
    logActivity('Policy Updated', 'settings', id);
    showToast(language === 'ar' ? 'تم تحديث وثيقة السياسة' : 'Policy Document Updated');
  };

  // 18. Product CRUD Operations
  const createProduct = (productData: Partial<Product>): Product => {
    const newId = 'prod-' + Date.now();
    const newProd: Product = {
      id: newId,
      brand: productData.brand || 'MORV LAB',
      name: productData.name || 'New Archival Specimen',
      nameAr: productData.nameAr || 'عينة أرشيفية جديدة',
      slug: (productData.name || 'new-specimen').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: productData.description || 'Verified deadstock piece from international curation ledger.',
      descriptionAr: productData.descriptionAr || 'قطعة مخزون ميت أصلية موثقة من سجل الخزينة الدولي.',
      price: productData.price || 250,
      originalPrice: productData.originalPrice || productData.price || 250,
      primaryImage: productData.primaryImage || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85',
      images: productData.images && productData.images.length > 0 ? productData.images : [
        productData.primaryImage || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85'
      ],
      colors: productData.colors || ['Black', 'White'],
      colorway: productData.colorway || 'Classic Black / White',
      sizes: productData.sizes || [
        { size: 'US 8.5', price: productData.price || 250, inStock: true },
        { size: 'US 9.0', price: productData.price || 250, inStock: true },
        { size: 'US 9.5', price: productData.price || 250, inStock: true },
        { size: 'US 10.0', price: productData.price || 250, inStock: true }
      ],
      stock: productData.stock || 10,
      sku: productData.sku || `MORV-${Math.floor(1000 + Math.random() * 9000)}-ARCH`,
      category: (productData.category as any) || 'archive',
      featured: productData.featured || false,
      newArrival: productData.newArrival !== undefined ? productData.newArrival : true,
      bestSeller: productData.bestSeller || false,
      tier: productData.tier || 'TIER 0 / DEADSTOCK',
      badge: productData.badge || 'VERIFIED DEADSTOCK',
      styleCode: productData.styleCode || 'DS-2026-X',
      originYear: productData.originYear || '2026',
      registryId: productData.registryId || `SPECIMEN #${Math.floor(100 + Math.random() * 900)}`,
      specs: productData.specs || {
        upper: 'Premium Hide & Mesh',
        collar: 'Archival Padded Cut',
        midsole: 'Responsive Lightweight Cushioning',
        packaging: 'Deadstock Original Box & NFC Certificate'
      }
    };

    setProducts((prev) => [newProd, ...prev]);
    logActivity('Product Created', 'product', newProd.name, `SKU: ${newProd.sku}`);
    showToast(language === 'ar' ? `تم إضافة المنتج ${newProd.name}` : `Product ${newProd.name} Created`);
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, ...updates };
          return updated;
        }
        return p;
      })
    );
    logActivity('Product Updated', 'product', id);
    showToast(language === 'ar' ? 'تم حفظ تعديلات المنتج' : 'Product Updated');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    logActivity('Product Deleted', 'product', target?.name || id);
    showToast(language === 'ar' ? 'تم حذف المنتج من المتجر' : 'Product Removed');
  };

  const duplicateProduct = (id: string): Product => {
    const source = products.find((p) => p.id === id);
    if (!source) throw new Error('Product not found');
    const duplicated: Product = {
      ...source,
      id: 'prod-' + Date.now(),
      name: `${source.name} (Copy)`,
      nameAr: `${source.nameAr || source.name} (نسخة)`,
      sku: `${source.sku}-COPY`,
      slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`
    };
    setProducts((prev) => [duplicated, ...prev]);
    logActivity('Product Duplicated', 'product', duplicated.name);
    showToast(language === 'ar' ? 'تم تكرار المنتج بنجاح' : 'Product Duplicated');
    return duplicated;
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStock = p.stock > 0 ? 0 : 5;
          return {
            ...p,
            stock: nextStock,
            sizes: p.sizes.map((s) => ({ ...s, inStock: nextStock > 0 }))
          };
        }
        return p;
      })
    );
    showToast(language === 'ar' ? 'تم تحديث حالة توفر المنتج' : 'Product Availability Toggled');
  };

  const adjustStock = (productId: string, sizeName: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const updatedSizes = p.sizes.map((s) => {
            if (s.size === sizeName) {
              const nextInStock = delta > 0 ? true : false;
              return { ...s, inStock: nextInStock };
            }
            return s;
          });
          const newStock = Math.max(0, p.stock + delta);
          return { ...p, stock: newStock, sizes: updatedSizes };
        }
        return p;
      })
    );
    logActivity('Stock Level Adjusted', 'inventory', productId, `Delta: ${delta > 0 ? '+' : ''}${delta}`);
  };

  // 19. Order Management
  const placeOrder = (
    customerInfo: { fullName: string; email: string; phone: string },
    address: ShippingAddress,
    shippingMethod: string,
    paymentMethod: string
  ): Order => {
    const subtotal = cartSubtotal - couponDiscount;
    const shipping = subtotal >= shippingSettings.freeShippingThreshold ? 0 : shippingSettings.defaultFee;
    const total = subtotal + shipping;
    const orderNum = `${storeSettings.orderPrefix}${Math.floor(1000 + Math.random() * 9000)}-VAULT`;
    const nfcHash = '0x' + Math.random().toString(16).substring(2, 10).toUpperCase() + '-VAULT-REG';

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: orderNum,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      shipping,
      total,
      status: 'authenticated',
      shippingMethod,
      shippingAddress: {
        fullName: customerInfo.fullName || address.fullName,
        phone: customerInfo.phone || address.phone,
        country: address.country,
        city: address.city,
        addressLine1: address.addressLine1,
        postalCode: address.postalCode
      },
      paymentMethod,
      nfcCertHash: nfcHash
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Update coupon usage count if used
    if (appliedCoupon) {
      setCoupons((prev) =>
        prev.map((c) => (c.id === appliedCoupon.id ? { ...c, usageCount: c.usageCount + 1 } : c))
      );
      setAppliedCoupon(null);
    }

    // Add activity log and admin notification
    logActivity('New Order Placed', 'order', newOrder.orderNumber, `Total: ${formatPrice(newOrder.total)} via ${paymentMethod}`);
    addNotification({
      type: 'order',
      title: 'New Store Order Received',
      message: `${newOrder.orderNumber} placed by ${newOrder.shippingAddress.fullName} (${formatPrice(newOrder.total)})`,
      read: false,
      linkTab: 'orders',
      linkId: newOrder.id
    });

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
    logActivity('Order Status Updated', 'order', orderId, `New status: ${status.toUpperCase()}`);
    showToast(language === 'ar' ? `تم تغيير حالة الطلب إلى ${status}` : `Order Status Updated to ${status}`);
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: 'vault_transit' } : o)));
    logActivity('Order Cancelled', 'order', orderId, reason || 'Customer request');
    showToast(language === 'ar' ? 'تم إلغاء الطلب' : 'Order Cancelled');
  };

  // 20. Customer Directory Data (computed dynamically from registered users and orders)
  const [customerDirectory, setCustomerDirectory] = useState<AdminCustomer[]>(() => [
    {
      id: 'cust-01',
      name: 'Julian V. Meyer',
      email: 'julian.meyer@vault-collector.org',
      phone: '+20 109 884 1920',
      city: 'القاهرة',
      country: 'مصر',
      tier: 'Black Card VIP',
      totalOrders: 6,
      totalSpent: 1840,
      lastOrderDate: '2026-10-02',
      status: 'active'
    },
    {
      id: 'cust-02',
      name: 'Karim Tarek',
      email: 'karim.tarek@archival.me',
      phone: '+20 102 334 5567',
      city: 'الجيزة',
      country: 'مصر',
      tier: 'Archive Collector',
      totalOrders: 3,
      totalSpent: 780,
      lastOrderDate: '2026-09-28',
      status: 'active'
    },
    {
      id: 'cust-03',
      name: 'Youssef El-Husseiny',
      email: 'youssef.husseiny@grail.eg',
      phone: '+20 111 223 9988',
      city: 'الإسكندرية',
      country: 'مصر',
      tier: 'Standard',
      totalOrders: 1,
      totalSpent: 310,
      lastOrderDate: '2026-09-21',
      status: 'active'
    }
  ]);

  const toggleCustomerStatus = (id: string) => {
    setCustomerDirectory((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: c.status === 'active' ? 'disabled' : 'active' } : c))
    );
    showToast(language === 'ar' ? 'تم تغيير حالة حساب العميل' : 'Customer Account Status Toggled');
  };

  // 21. Admin Authentication & Management
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_users');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS;
    } catch {
      return INITIAL_ADMIN_USERS;
    }
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('morv_current_admin');
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_USERS[0];
    } catch {
      return INITIAL_ADMIN_USERS[0];
    }
  });

  const adminLogin = (email: string, role: AdminRole = 'super_admin'): boolean => {
    const existing = adminUsers.find((a) => a.email.toLowerCase() === email.toLowerCase());
    const adminToSet = existing || {
      id: 'adm-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email,
      role,
      roleTitle: role === 'super_admin' ? 'Super Administrator' : 'Store Administrator',
      status: 'active',
      lastActive: 'Just now',
      createdAt: '2026-10-05',
      permissions: ['all']
    };
    setCurrentAdmin(adminToSet);
    localStorage.setItem('morv_current_admin', JSON.stringify(adminToSet));
    logActivity('Admin Logged In', 'auth', adminToSet.email, `Role: ${adminToSet.role}`);
    showToast(language === 'ar' ? `مرحباً بك ${adminToSet.name} في لوحة التحكم` : `Welcome ${adminToSet.name} to Admin Console`);
    return true;
  };

  const adminLogout = () => {
    setCurrentAdmin(null);
    localStorage.removeItem('morv_current_admin');
    navigateTo('home');
    showToast(language === 'ar' ? 'تم تسجيل خروج المشرف' : 'Admin Session Terminated');
  };

  const createAdminUser = (userData: Omit<AdminUser, 'id' | 'createdAt' | 'lastActive'>): AdminUser => {
    const newAdmin: AdminUser = {
      ...userData,
      id: 'adm-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: 'Never'
    };
    setAdminUsers((prev) => {
      const next = [...prev, newAdmin];
      localStorage.setItem('morv_admin_users', JSON.stringify(next));
      return next;
    });
    logActivity('Admin User Created', 'auth', newAdmin.email, `Role: ${newAdmin.role}`);
    showToast(language === 'ar' ? 'تم إضافة المشرف بنجاح' : 'Admin User Created');
    return newAdmin;
  };

  const updateAdminUser = (id: string, updates: Partial<AdminUser>) => {
    setAdminUsers((prev) => {
      const next = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
      localStorage.setItem('morv_admin_users', JSON.stringify(next));
      return next;
    });
    showToast(language === 'ar' ? 'تم تحديث بيانات المشرف' : 'Admin User Updated');
  };

  const deleteAdminUser = (id: string) => {
    setAdminUsers((prev) => {
      const next = prev.filter((a) => a.id !== id);
      localStorage.setItem('morv_admin_users', JSON.stringify(next));
      return next;
    });
    showToast(language === 'ar' ? 'تم حذف حساب المشرف' : 'Admin User Deleted');
  };

  // 22. Activity Log State
  const [activityLogs, setActivityLogs] = useState<ActivityLogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('morv_activity_logs');
      return saved ? JSON.parse(saved) : INITIAL_ACTIVITY_LOGS;
    } catch {
      return INITIAL_ACTIVITY_LOGS;
    }
  });

  const logActivity = (
    action: string,
    category: ActivityLogEntry['category'],
    target: string,
    details?: string
  ) => {
    const newEntry: ActivityLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      adminName: currentAdmin?.name || 'Administrator',
      adminEmail: currentAdmin?.email || 'admin@morv.store',
      action,
      category,
      target,
      details,
      ip: '197.38.12.84'
    };
    setActivityLogs((prev) => {
      const next = [newEntry, ...prev.slice(0, 99)];
      localStorage.setItem('morv_activity_logs', JSON.stringify(next));
      return next;
    });
  };

  // 23. Admin Notifications State
  const [notifications, setNotifications] = useState<AdminNotification[]>(() => {
    try {
      const saved = localStorage.getItem('morv_notifications');
      return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  });

  const addNotification = (item: Omit<AdminNotification, 'id' | 'timestamp'>) => {
    const newNotif: AdminNotification = {
      ...item,
      id: 'notif-' + Date.now(),
      timestamp: 'Just now'
    };
    setNotifications((prev) => {
      const next = [newNotif, ...prev];
      localStorage.setItem('morv_notifications', JSON.stringify(next));
      return next;
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => {
      const next = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
      localStorage.setItem('morv_notifications', JSON.stringify(next));
      return next;
    });
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => {
      const next = prev.map((n) => ({ ...n, read: true }));
      localStorage.setItem('morv_notifications', JSON.stringify(next));
      return next;
    });
  };

  // 24. Media Library State
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem('morv_media_library');
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_LIBRARY;
    } catch {
      return INITIAL_MEDIA_LIBRARY;
    }
  });

  const addMediaItem = (item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem => {
    const newItem: MediaItem = {
      ...item,
      id: 'med-' + Date.now(),
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaLibrary((prev) => {
      const next = [newItem, ...prev];
      localStorage.setItem('morv_media_library', JSON.stringify(next));
      return next;
    });
    showToast(language === 'ar' ? 'تم إضافة الملف إلى مكتبة الوسائط' : 'Asset Added to Media Library');
    return newItem;
  };

  const deleteMediaItem = (id: string) => {
    setMediaLibrary((prev) => {
      const next = prev.filter((m) => m.id !== id);
      localStorage.setItem('morv_media_library', JSON.stringify(next));
      return next;
    });
    showToast(language === 'ar' ? 'تم حذف الملف' : 'Asset Deleted');
  };

  // 25. Global Toast System
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2800);
  };

  return (
    <StoreContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        currentView,
        selectedProduct,
        selectedOrderId,
        navigateTo,
        user,
        login,
        register,
        logout,
        orders,
        placeOrder,
        updateOrderStatus,
        cancelOrder,
        products,
        createProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        toggleProductStatus,
        adjustStock,
        paymentSettings,
        updatePaymentMethod,
        shippingSettings,
        updateShippingSettings,
        coupons,
        createCoupon,
        updateCoupon,
        deleteCoupon,
        banners,
        createBanner,
        updateBanner,
        deleteBanner,
        homepageConfig,
        updateHomepageConfig,
        categories,
        createCategory,
        updateCategory,
        deleteCategory,
        brands,
        createBrand,
        updateBrand,
        deleteBrand,
        collections,
        createCollection,
        updateCollection,
        deleteCollection,
        storeSettings,
        updateStoreSettings,
        policies,
        updatePolicy,
        customers: customerDirectory,
        toggleCustomerStatus,
        adminUsers,
        currentAdmin,
        isAdminLoggedIn: !!currentAdmin,
        adminLogin,
        adminLogout,
        createAdminUser,
        updateAdminUser,
        deleteAdminUser,
        activityLogs,
        logActivity,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        mediaLibrary,
        addMediaItem,
        deleteMediaItem,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
