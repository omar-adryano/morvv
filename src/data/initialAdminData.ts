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
  MediaItem
} from '../types/admin';

export const INITIAL_PAYMENT_METHODS: PaymentMethodConfig[] = [
  {
    id: 'vodafone_cash',
    name: 'Vodafone Cash',
    nameAr: 'فودافون كاش',
    enabled: true,
    displayOrder: 1,
    badge: 'محفظة إلكترونية',
    details: {
      walletNumber: '01098841920',
      quickCodeTemplate: '*9*7*01098841920*{amount}#',
      customerInstructionsAr: 'يرجى تحويل إجمالي المبلغ إلى محفظة فودافون كاش المعتمدة: 01098841920. سيصلك إشعار بالواتساب فور استلام الحوالة وتأكيد شحن طلبك.',
      customerInstructionsEn: 'Please transfer the total order amount to verified Vodafone Cash wallet: 01098841920. You will receive an immediate confirmation on WhatsApp once received.',
      internalNotes: 'Automated SMS webhook verification enabled for 01098841920.'
    }
  },
  {
    id: 'instapay',
    name: 'InstaPay',
    nameAr: 'انستاباي',
    enabled: true,
    displayOrder: 2,
    badge: 'تحويل فوري IPN',
    details: {
      ipaAddress: 'morv@instapay',
      registeredPhone: '01098841920',
      receiverName: 'MORV SNEAKER ARCHIVE',
      customerInstructionsAr: 'قم بالتحويل الفوري عبر تطبيق InstaPay إلى معرّف الدفع: morv@instapay أو رقم الهاتف 01098841920. يتم حجز الزوج الأرشيفي فورياً.',
      customerInstructionsEn: 'Send instant IPN payment to address: morv@instapay or mobile: 01098841920. Deadstock pair is immediately reserved.',
      internalNotes: 'Central Bank of Egypt IPN Network instant settlement.'
    }
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    nameAr: 'الدفع عند الاستلام',
    enabled: true,
    displayOrder: 3,
    badge: 'معاينة قبل الدفع',
    details: {
      codFee: 0,
      minOrderAmount: 0,
      maxOrderAmount: 5000,
      customerInstructionsAr: 'سداد القيمة نقداً عند الاستلام بعد فتح الصندوق ومعاينة الحذاء وفحص شريحة التوثيق الأرشيفية NFC والتأكد من المقاس.',
      customerInstructionsEn: 'Cash payment upon delivery after opening box, inspecting physical sneaker authenticity, NFC chip scan, and sizing fit.',
      internalNotes: 'Courier carries physical inspection guarantee protocols.'
    }
  }
];

export const INITIAL_SHIPPING_CONFIG: ShippingConfig = {
  freeShippingThreshold: 2500,
  defaultFee: 60,
  expressFee: 95,
  deliveryEstimate: 'خلال 24-48 ساعة لجميع المحافظات',
  zones: [
    {
      id: 'greater_cairo',
      name: 'Greater Cairo & Giza',
      nameAr: 'القاهرة الكبرى والجيزة',
      fee: 60,
      estimatedDays: '24 ساعة',
      enabled: true,
      governorates: ['القاهرة', 'الجيزة', 'التجمع الخامس', '6 أكتوبر', 'الشيخ زايد', 'المعادي', 'مدينة نصر']
    },
    {
      id: 'alex_coastal',
      name: 'Alexandria & Delta',
      nameAr: 'الإسكندرية ومحافظات الدلتا',
      fee: 75,
      estimatedDays: '24-48 ساعة',
      enabled: true,
      governorates: ['الإسكندرية', 'المنصورة', 'طنطا', 'دمنهور', 'الزقازيق', 'دمياط']
    },
    {
      id: 'canal_redsea',
      name: 'Canal & Coastal Cities',
      nameAr: 'مدن القناة والساحل',
      fee: 90,
      estimatedDays: '48 ساعة',
      enabled: true,
      governorates: ['السويس', 'الإسماعيلية', 'بورسعيد', 'الغردقة', 'شرم الشيخ']
    },
    {
      id: 'upper_egypt',
      name: 'Upper Egypt',
      nameAr: 'محافظات الصعيد',
      fee: 110,
      estimatedDays: '48-72 ساعة',
      enabled: true,
      governorates: ['أسيوط', 'سوهاج', 'قنا', 'الأقصر', 'أسوان', 'المنيا', 'بني سويف']
    }
  ],
  instructionsAr: 'تصل جميع الشحنات في صناديق مصفحة مزدوجة ومؤمنة بالكامل مع شريط أمان مشفر لا يمكن فتحه دون تمزق التوثيق.',
  instructionsEn: 'All dispatches utilize double-walled armored packaging with tamper-evident cryptographic security seals.'
};

export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'coup-001',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    minOrderValue: 1500,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usageCount: 84,
    active: true,
    description: 'خصم 10% للعملاء الجدد على الطلبات فوق 1,500 ج.م'
  },
  {
    id: 'coup-002',
    code: 'MORV200',
    type: 'fixed',
    value: 200,
    minOrderValue: 3000,
    expiryDate: '2026-11-30',
    usageLimit: 200,
    usageCount: 42,
    active: true,
    description: 'خصم فوري 200 ج.م على الطلبات فوق 3,000 ج.م'
  },
  {
    id: 'coup-003',
    code: 'VIP20',
    type: 'percentage',
    value: 20,
    minOrderValue: 400,
    maxDiscount: 120,
    expiryDate: '2026-12-31',
    usageLimit: 100,
    usageCount: 19,
    active: true,
    description: 'Black Card VIP registry 20% privilege discount'
  }
];

export const INITIAL_BANNERS: Banner[] = [
  {
    id: 'ban-001',
    title: 'CHICAGO 1985 VAULT ALLOCATION',
    titleAr: 'تخصيص الخزينة الحصري: شيكاغو 1985',
    subtitle: 'Verified Deadstock With Original Sandy Bros Box Receipt',
    subtitleAr: 'مخزون ميت أصلي موثق مع إيصال المتجر التاريخي الأصلي',
    ctaText: 'EXPLORE VAULT',
    ctaLink: 'shop',
    desktopImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85',
    position: 'top_ticker',
    priority: 1,
    active: true
  },
  {
    id: 'ban-002',
    title: 'JAPAN ARCHIVE EDITIONS',
    titleAr: 'إصدارات الأرشيف الياباني الحصرية',
    subtitle: 'Rare Tier-0 co.jp Allocations Just Secured',
    subtitleAr: 'شحنات نادرة من إصدارات co.jp حُفظت حديثاً في الخزينة',
    ctaText: 'VIEW SPECIMENS',
    ctaLink: 'brands',
    desktopImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1600&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=85',
    position: 'hero_slider',
    priority: 2,
    active: true
  }
];

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    badgeAr: 'إصدار الخزينة المركزي 01',
    badgeEn: 'VAULT CENTRAL DROP 01',
    headlineAr: 'أرشيف الأحذية الرياضية النادرة',
    headlineEn: 'CURATED FOOTWEAR ARCHIVE & DEADSTOCK REGISTRY',
    subheadlineAr: 'مستودع دولي موثق يضم أندر أزواج السنيكرز التاريخية والإصدارات المحدودة مع شهادة أصالة مشفرة بتقنية NFC لكل زوج.',
    subheadlineEn: 'An international deadstock vault cataloging certified specimens across Nike, Jordan, New Balance, and rare archival collaborations.',
    ctaPrimaryTextAr: 'استكشف المعروضات الأرشيفية',
    ctaPrimaryTextEn: 'ACCESS THE VAULT',
    ctaPrimaryLink: 'shop',
    ctaSecondaryTextAr: 'شاهد دور الأزياء والمصممين',
    ctaSecondaryTextEn: 'EXPLORE BRANDS',
    ctaSecondaryLink: 'brands',
    heroImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EU10l7RfZNnpHU0TT4SYthVaNwjW8ILJftJ8wF5eXWTvcm1fVJAWEPO1RXCQFLY_Bbzs9MxQk9bS9ODLyvoqIzXcuY0mrh4jkUX3YUaPqAaz65AUGjhUkNchkpytRvtQwXGjG_bJdxF0h1D1ByGCRKDcZ9_EswWZwH48fZBpvvYKcxIwyDcfxcg0rFPK0Woqt7gwOCk7OuifEIzANwCXJIvKcTDVyds0tG_d-dAo07Xd5XvCpXOz',
    countdownHours: 18,
    specimenCode: 'SPECIMEN #041 // CHICAGO 1985'
  },
  sections: [
    { id: 'hero', title: 'Architectural Hero', titleAr: 'قسم الواجهة الترحيبي', visible: true, order: 1 },
    { id: 'marquee', title: 'Brand Marquee & Fast Filter', titleAr: 'شريط العلامات التجارية السريع', visible: true, order: 2 },
    { id: 'editorial_lookbook', title: 'Curated Lookbook Grid', titleAr: 'معرض الإطلالات الأرشيفية', visible: true, order: 3 },
    { id: 'featured_products', title: 'Curated Footwear Index', titleAr: 'فهرس الأحذية المختارة', visible: true, order: 4 },
    { id: 'vault_standard', title: 'Vault Verification Standard', titleAr: 'معايير توثيق الخزينة', visible: true, order: 5 },
    { id: 'raffles_upcoming', title: 'Allocations & Deadstock Raffles', titleAr: 'قرعات التخصيص والمخزون الميت', visible: true, order: 6 }
  ],
  announcementTicker: {
    enabled: true,
    textAr: '✦ شحن سريع ومجاني لجميع الطلبات ✦ معاينة وفحص الحذاء بالكامل قبل الاستلام ✦ شهادة توثيق أصلية NFC على البلوكشين ✦',
    textEn: '✦ COMPLIMENTARY INSURED PRIORITY DISPATCH ✦ 100% PRE-PAYMENT PHYSICAL INSPECTION ✦ CRYPTOGRAPHIC NFC CERTIFICATION ✦'
  }
};

export const INITIAL_CATEGORIES: CategoryConfig[] = [
  {
    id: 'cat-basketball',
    slug: 'basketball',
    name: 'Basketball & Heritage',
    nameAr: 'كرة السلة والتراث الكلاسيكي',
    description: 'Iconic hard-court silhouettes that defined modern sneaker culture from 1985 onward.',
    descriptionAr: 'تصاميم ملاعب كرة السلة التاريخية التي شكلت ثقافة السنيكرز الحديثة منذ 1985.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    order: 1
  },
  {
    id: 'cat-runners',
    slug: 'runners',
    name: 'Retro Runners & Tech',
    nameAr: 'أحذية الجري والتقنية التراثية',
    description: 'Engineering masterpieces combining premium pigskin suedes, mesh, and historic cushioning foams.',
    descriptionAr: 'تحف هندسية تجمع بين جلود السويد الفاخرة والقماش المسامي وتقنيات التوسيد الرائدة.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    order: 2
  },
  {
    id: 'cat-court',
    slug: 'court',
    name: 'Low Court & Skate Heritage',
    nameAr: 'أحذية الكورت والتزلج الأرشيفية',
    description: 'Low-profile icons spanning university color-blocking and archival skate silhouettes.',
    descriptionAr: 'الأحذية المنخفضة الشهيرة بألوان الجامعات الكلاسيكية وتراث التزلج التذكاري.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    order: 3
  },
  {
    id: 'cat-goretex',
    slug: 'gore-tex',
    name: 'Outdoor & Weatherproof Gore-Tex',
    nameAr: 'أحذية الطبيعة ومقاومة الماء',
    description: 'Aggressive trail lugs, Contagrip compounds, and waterproof GORE-TEX breathable membranes.',
    descriptionAr: 'نعال جبلية متينة، ومركبات مانعة للانزلاق، وأغشية جور-تكس المقاومة للعوامل الجوية.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    order: 4
  },
  {
    id: 'cat-archive',
    slug: 'archive',
    name: 'Deadstock Archive Grails',
    nameAr: 'نوادر الخزينة والمخزون التاريخي',
    description: 'Vault certified specimens with immutable physical provenance and NFC authentication chips.',
    descriptionAr: 'أندر العينات المحفوظة بعناية مع شهادة أصالة فيزيائية ومسح مشفر للشريحة.',
    image: 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    order: 5
  }
];

export const INITIAL_BRANDS: BrandConfig[] = [
  {
    id: 'br-jordan',
    name: 'JORDAN BRAND',
    slug: 'jordan',
    description: 'Michael Jordan signature retrospective cataloging deadstock silhouettes from 1985 to present.',
    descriptionAr: 'السلسلة التاريخية لأسطورة السلة مايكل جوردان بأندر الإصدارات الأرشيفية منذ عام 1985.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg',
    originCountry: 'USA',
    establishedYear: '1984',
    enabled: true,
    featured: true
  },
  {
    id: 'br-nike',
    name: 'NIKE',
    slug: 'nike',
    description: 'Beaverton archival laboratory pioneering iconic Air cushioning, Dunks, and collaborative releases.',
    descriptionAr: 'مختبر بيفيرتون الأيقوني المبتكر لتقنيات Air وDunk وأقوى الشراكات التصميمية العالمية.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    originCountry: 'USA',
    establishedYear: '1964',
    enabled: true,
    featured: true
  },
  {
    id: 'br-nb',
    name: 'NEW BALANCE',
    slug: 'new-balance',
    description: 'Heritage craftsmanship from Boston, Maine, and Flimby UK utilizing unmatched material curation.',
    descriptionAr: 'حرفية يدوية وتراث أمريكي وبريطاني لا مثيل له مع تركيز فائق على خامات الجلود النبيلة.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg',
    originCountry: 'USA',
    establishedYear: '1906',
    enabled: true,
    featured: true
  },
  {
    id: 'br-adidas',
    name: 'ADIDAS ORIGINALS',
    slug: 'adidas',
    description: 'Herzogenaurach archival legacy spanning Terrace culture, Samba, and modern retro revivals.',
    descriptionAr: 'إرث مدينة هيرتسوغن آوراخ الألمانية الممتد عبر ثقافة التيراس وسامبا وغازيل التاريخية.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    originCountry: 'Germany',
    establishedYear: '1949',
    enabled: true,
    featured: true
  },
  {
    id: 'br-asics',
    name: 'ASICS',
    slug: 'asics',
    description: 'Kobe Japan performance heritage fused with Kiko Kostadinov design curation and GEL technology.',
    descriptionAr: 'تراث الأداء الرياضي الرفيع من مدينة كوبي اليابانية المدمج بتقنيات GEL وأرقى التعاونات.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Asics_Logo.svg',
    originCountry: 'Japan',
    establishedYear: '1949',
    enabled: true,
    featured: false
  },
  {
    id: 'br-salomon',
    name: 'SALOMON ADVANCED',
    slug: 'salomon',
    description: 'Annecy French Alps alpine technical mastery translated into modern urban trail aesthetics.',
    descriptionAr: 'هندسة جبال الألب الفرنسية المتقنة المحولة إلى صيحة أزياء الشارع العصرية والأداء الجبلي.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Salomon_logo.svg',
    originCountry: 'France',
    establishedYear: '1947',
    enabled: true,
    featured: false
  }
];

export const INITIAL_COLLECTIONS: CollectionConfig[] = [
  {
    id: 'col-new',
    slug: 'new-arrivals',
    name: 'Deadstock New Arrivals',
    nameAr: 'أحدث وصولات الخزينة',
    description: 'Freshly authenticated specimens deposited into the vault ledger this week.',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    productIds: ['prod-001', 'prod-002', 'prod-003', 'prod-005']
  },
  {
    id: 'col-bestsellers',
    slug: 'best-sellers',
    name: 'Archival Best Sellers',
    nameAr: 'الأكثر طلباً بين المقتنين',
    description: 'Most coveted collector pairs with high resale liquidity and certified deadstock grade.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    productIds: ['prod-001', 'prod-003', 'prod-004', 'prod-006']
  }
];

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'MORV FOOTWEAR ARCHIVE',
  storeTagline: 'Curated Footwear & Certified Deadstock Registry',
  email: 'concierge@morv-archive.com',
  phone: '+20 109 884 1920',
  whatsapp: '+20 109 884 1920',
  address: 'شارع التسعين الشمالي، التجمع الخامس، القاهرة، مصر',
  currency: 'EGP',
  timezone: 'Africa/Cairo',
  orderPrefix: 'MORV-EG-',
  maintenanceMode: false,
  inventoryAlertThreshold: 5,
  socialLinks: {
    instagram: 'https://instagram.com/morv.archive',
    twitter: 'https://twitter.com/morv_archive',
    discord: 'https://discord.gg/morv',
    youtube: 'https://youtube.com/@morv_archive'
  },
  supportHours: 'Saturday - Thursday: 10:00 AM - 10:00 PM (EET)'
};

export const INITIAL_POLICIES: StorePolicy[] = [
  {
    id: 'authenticity',
    titleAr: 'ميثاق الأصالة والتوثيق الأرشيفي NFC',
    titleEn: 'NFC Authenticity & Provenance Charter',
    contentAr: 'كل زوج معروض في MORV يخضع لفحص يدوي وميكروسكوبي متعدد المراحل بواسطة خبراء التوثيق المعتمدين. يتم تثبيت شريحة NFC مشفرة وغير قابلة للتكرار تسجل تاريخ وتفاصيل الحذاء على السجل الأرشيفي.',
    contentEn: 'Every specimen hosted by MORV passes a rigorous multi-stage physical and microscopic authentication protocol. An immutable cryptographic NFC chip is paired to the shoe.',
    lastUpdated: '2026-10-01'
  },
  {
    id: 'returns',
    titleAr: 'سياسة المعاينة والاسترجاع الفوري',
    titleEn: 'Inspection & Return Policy',
    contentAr: 'يحق للعميل فتح الشحنة وفحص الحذاء وتجربة المقاس قبل سداد أي مبلغ للمندوب في خدمة الدفع عند الاستلام. في حالة وجود أي اختلاف في المقاس أو عدم الرضا، يحق الاسترجاع الفوري بدون أي رسوم.',
    contentEn: 'Customers have the absolute right to inspect the parcel, check sizing and condition before handing any payment to the courier on COD orders. Hassle-free zero-cost returns.',
    lastUpdated: '2026-10-01'
  },
  {
    id: 'shipping',
    titleAr: 'سياسة الشحن والتسليم المصفح',
    titleEn: 'Armored Shipping & Logistics Policy',
    contentAr: 'يتم تغليف وتأمين الشحنات في صناديق مصفحة مزدوجة ومحمية من الصدمات والظروف الجوية. مدة التوصيل داخل القاهرة والجيزة خلال 24 ساعة، وباقي المحافظات خلال 48 ساعة كحد أقصى.',
    contentEn: 'Shipments are packaged in double-walled armored corrugated boxes with weather seals. Delivery within 24 hours in Cairo & Giza, and 48 hours for remaining governorates.',
    lastUpdated: '2026-10-01'
  },
  {
    id: 'privacy',
    titleAr: 'سياسة الخصوصية وحماية بيانات العملاء',
    titleEn: 'Privacy & Data Protection Policy',
    contentAr: 'نلتزم بأعلى معايير حماية البيانات وسرية عناوين وأرقام عملاء الخزينة. لا يتم مشاركة أي معلومات مع أي طرف ثالث سوى مندوب التوصيل المعتمد لغرض تسليم الشحنة فقط.',
    contentEn: 'We adhere to bank-grade confidentiality and data protection. Customer addresses and phone numbers are strictly used solely for courier fulfillment.',
    lastUpdated: '2026-10-01'
  }
];

export const INITIAL_ADMIN_USERS: AdminUser[] = [
  {
    id: 'adm-001',
    name: 'Alexander Cruz',
    email: 'alexander@morv.store',
    role: 'super_admin',
    roleTitle: 'Founder & Head Curator',
    status: 'active',
    lastActive: 'Just now',
    createdAt: '2025-01-15',
    permissions: ['all']
  },
  {
    id: 'adm-002',
    name: 'Sarah Lin',
    email: 'sarah.lin@morv.store',
    role: 'store_manager',
    roleTitle: 'Vault Operations Manager',
    status: 'active',
    lastActive: '2 hours ago',
    createdAt: '2025-03-20',
    permissions: ['catalog', 'orders', 'inventory', 'customers']
  },
  {
    id: 'adm-003',
    name: 'Omar Mansour',
    email: 'omar@morv.store',
    role: 'content_editor',
    roleTitle: 'Editorial & Brand Lead',
    status: 'active',
    lastActive: 'Yesterday',
    createdAt: '2025-04-10',
    permissions: ['content', 'banners', 'homepage', 'media']
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLogEntry[] = [
  {
    id: 'log-001',
    timestamp: '2026-10-05 14:32:10',
    adminName: 'Alexander Cruz',
    adminEmail: 'alexander@morv.store',
    action: 'Payment Settings Updated',
    category: 'payment',
    target: 'Vodafone Cash & InstaPay verified credentials',
    details: 'Configured verified wallet 01098841920 and IPA morv@instapay with 100% inspection guarantee on COD.'
  },
  {
    id: 'log-002',
    timestamp: '2026-10-05 13:15:44',
    adminName: 'Sarah Lin',
    adminEmail: 'sarah.lin@morv.store',
    action: 'Inventory Stock Adjusted',
    category: 'inventory',
    target: 'Air Jordan 1 Lost & Found (US 9.0)',
    details: 'Restocked 4 pairs from European vault consignment.'
  },
  {
    id: 'log-003',
    timestamp: '2026-10-05 11:20:00',
    adminName: 'Omar Mansour',
    adminEmail: 'omar@morv.store',
    action: 'Homepage Hero Published',
    category: 'homepage',
    target: 'Vault Central Drop 01',
    details: 'Updated editorial hero typography and interactive lookbook links.'
  },
  {
    id: 'log-004',
    timestamp: '2026-10-05 09:40:12',
    adminName: 'Alexander Cruz',
    adminEmail: 'alexander@morv.store',
    action: 'Coupon Created',
    category: 'coupon',
    target: 'WELCOME10',
    details: '10% discount on orders exceeding $100 for collectors.'
  }
];

export const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-001',
    timestamp: '10 mins ago',
    type: 'order',
    title: 'New High-Value Allocation Order',
    message: 'Order MORV-8501-CHI placed for Air Jordan 1 Lost & Found ($295.00) via Vodafone Cash.',
    read: false,
    linkTab: 'orders',
    linkId: 'ord-8501'
  },
  {
    id: 'notif-002',
    timestamp: '1 hour ago',
    type: 'inventory',
    title: 'Low Deadstock Alert: Salomon XT-6',
    message: 'Stock fell below threshold (2 units remaining in US 9.5).',
    read: false,
    linkTab: 'inventory'
  },
  {
    id: 'notif-003',
    timestamp: '3 hours ago',
    type: 'customer',
    title: 'New Collector Registered',
    message: 'Youssef El-Husseiny joined the MORV Vault Registry.',
    read: true,
    linkTab: 'customers'
  }
];

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'med-001',
    title: 'Air Jordan 1 Lost & Found Primary',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EU10l7RfZNnpHU0TT4SYthVaNwjW8ILJftJ8wF5eXWTvcm1fVJAWEPO1RXCQFLY_Bbzs9MxQk9bS9ODLyvoqIzXcuY0mrh4jkUX3YUaPqAaz65AUGjhUkNchkpytRvtQwXGjG_bJdxF0h1D1ByGCRKDcZ9_EswWZwH48fZBpvvYKcxIwyDcfxcg0rFPK0Woqt7gwOCk7OuifEIzANwCXJIvKcTDVyds0tG_d-dAo07Xd5XvCpXOz',
    category: 'sneakers',
    uploadedAt: '2025-09-15',
    sizeKb: 340,
    aspectRatio: '1:1'
  },
  {
    id: 'med-002',
    title: 'New Balance 990v6 Castlerock',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7c0z6B2eUuhB9tGkYnOkmqO6-Z8QcZ-G8L-Q-o8q0bJ4V_p6gZ6hR0pQ-lZq7_p6gZ6hR0pQ-lZq7_p6gZ6hR0pQ-lZq7_p6gZ6hR0pQ-lZq7',
    category: 'sneakers',
    uploadedAt: '2025-09-18',
    sizeKb: 410,
    aspectRatio: '1:1'
  },
  {
    id: 'med-003',
    title: 'Vintage Leather Atelier Editorial',
    url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85',
    category: 'banners',
    uploadedAt: '2025-09-20',
    sizeKb: 680,
    aspectRatio: '16:9'
  },
  {
    id: 'med-004',
    title: 'Deadstock Archive Display',
    url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85',
    category: 'banners',
    uploadedAt: '2025-09-22',
    sizeKb: 720,
    aspectRatio: '16:9'
  }
];

export const INITIAL_REVIEWS: any[] = [
  {
    id: 'rev-001',
    productId: 'mrv-001',
    productName: 'Air Jordan 1 Retro High OG "Lost & Found"',
    customerName: 'Youssef El-Shennawy',
    customerEmail: 'youssef.sh@example.com',
    rating: 5,
    comment: 'Authenticity confirmed via NFC archive tag. Leather distress texture is pure 1985 perfection. Dispatched and delivered within 24 hours.',
    date: '2025-09-28',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev-002',
    productId: 'mrv-002',
    productName: 'Travis Scott x Air Jordan 1 Low OG "Olive"',
    customerName: 'Karim Mansour',
    customerEmail: 'kmansour@cairomail.com',
    rating: 5,
    comment: 'InstaPay transfer was verified in less than 3 minutes. Flawless deadstock condition with pristine box and all spare laces.',
    date: '2025-09-30',
    status: 'approved',
    featured: true
  },
  {
    id: 'rev-003',
    productId: 'mrv-004',
    productName: 'Salomon XT-6 Advanced "Black/Phantom"',
    customerName: 'Tariq El-Ghamry',
    customerEmail: 'tariq@designer.eg',
    rating: 4,
    comment: 'Great all-weather sneaker. Sizing is slightly narrow, recommend half size up for wider feet.',
    date: '2025-10-02',
    status: 'pending',
    featured: false
  }
];

export const INITIAL_RETURNS: any[] = [
  {
    id: 'ret-101',
    orderId: 'MRV-2025-891',
    customerName: 'Omar Abdel-Rahman',
    customerEmail: 'omar.abdel@gmail.com',
    productName: 'New Balance 990v6 Made in USA',
    productSize: 'US 10.0',
    reason: 'Size exchange requested: Customer prefers US 10.5 for relaxed fit.',
    status: 'inspected',
    requestedAt: '2025-10-01',
    notes: 'Specimen inspected at Giza fulfillment center. Factory tags intact.',
    refundAmount: 220
  },
  {
    id: 'ret-102',
    orderId: 'MRV-2025-782',
    customerName: 'Ziad Hossam',
    customerEmail: 'ziad.h@yahoo.com',
    productName: 'Adidas Samba OG Consortium',
    productSize: 'US 9.0',
    reason: 'Ordered duplicate item by mistake.',
    status: 'pending',
    requestedAt: '2025-10-04',
    notes: 'Awaiting courier pick-up.',
    refundAmount: 140
  }
];

export const INITIAL_REFUNDS: any[] = [
  {
    id: 'ref-501',
    orderId: 'MRV-2025-674',
    customerName: 'Nouran Salem',
    amount: 190,
    reason: 'Customer cancelled prior to dispatch.',
    status: 'processed',
    createdAt: '2025-09-29',
    paymentMethod: 'vodafone_cash',
    transactionRef: 'VF-REF-99214'
  },
  {
    id: 'ref-502',
    orderId: 'MRV-2025-812',
    customerName: 'Ahmed Farouk',
    amount: 320,
    reason: 'Vault lot allocation out of stock.',
    status: 'processed',
    createdAt: '2025-10-03',
    paymentMethod: 'instapay',
    transactionRef: 'IPN-RET-88129'
  }
];

export const INITIAL_ABANDONED_CARTS: any[] = [
  {
    id: 'abn-01',
    customerName: 'Sherif Mostafa',
    customerEmail: 'sherif.m@techcorp.eg',
    customerPhone: '01229988112',
    itemsCount: 2,
    totalValue: 560,
    items: [
      { productName: 'Air Jordan 1 Lost & Found', size: 'US 10.5', price: 340, quantity: 1 },
      { productName: 'New Balance 990v6', size: 'US 10.5', price: 220, quantity: 1 }
    ],
    abandonedAt: '2025-10-05 11:24',
    recovered: false
  },
  {
    id: 'abn-02',
    customerName: 'Mona El-Badry',
    customerEmail: 'mona.badry@icloud.com',
    customerPhone: '01011223344',
    itemsCount: 1,
    totalValue: 190,
    items: [
      { productName: 'Salomon XT-6 Phantom', size: 'US 8.0', price: 190, quantity: 1 }
    ],
    abandonedAt: '2025-10-04 18:40',
    recovered: true
  }
];

export const INITIAL_CUSTOMER_GROUPS: any[] = [
  {
    id: 'grp-01',
    name: 'TIER 0 ARCHIVE SYNDICATE',
    description: 'Top spenders with > $2,000 spend. Guaranteed raffle allocation & private concierge.',
    discountRate: 15,
    membersCount: 28,
    badgeColor: '#d7ef30'
  },
  {
    id: 'grp-02',
    name: 'DEADSTOCK CLUB VIP',
    description: 'Active collectors with 3+ confirmed orders. Free express courier delivery.',
    discountRate: 10,
    membersCount: 84,
    badgeColor: '#000000'
  },
  {
    id: 'grp-03',
    name: 'GENERAL REGISTRY',
    description: 'Standard registered members with verified phone numbers.',
    discountRate: 0,
    membersCount: 412,
    badgeColor: '#747878'
  }
];

export const INITIAL_EMAIL_TEMPLATES: any[] = [
  {
    id: 'tpl-01',
    name: 'Order Confirmation & Payment Verification',
    subject: 'MORV ARCHIVE // Order Confirmation #{orderId}',
    title: 'Your Footwear Specimen Has Been Reserved',
    body: 'Thank you for your order with MORV Archive. Your deadstock pair is currently allocated in our climate-controlled vault. If paying via InstaPay or Vodafone Cash, please ensure transfer receipt is shared to expedite dispatch.',
    category: 'order',
    enabled: true,
    lastUpdated: '2025-09-20'
  },
  {
    id: 'tpl-02',
    name: 'Order Dispatched & Tracking Link',
    subject: 'MORV DISPATCH // Specimen En Route #{orderId}',
    title: 'Your Order Is With Priority Armored Courier',
    body: 'Your sneakers have passed physical authentication, NFC chip programming, and are now out for delivery. Tracking number is #{trackingNumber}. You may inspect prior to signing.',
    category: 'shipping',
    enabled: true,
    lastUpdated: '2025-09-22'
  },
  {
    id: 'tpl-03',
    name: 'Vodafone Cash & InstaPay Instructions',
    subject: 'MORV PAYMENT // Instant Transfer Guide #{orderId}',
    title: 'Official Payment Transfer Details',
    body: 'Please transfer #{totalAmount} to Vodafone Cash wallet 01098841920 or InstaPay address morv@instapay. Once sent, your allocation is permanently secured.',
    category: 'payment',
    enabled: true,
    lastUpdated: '2025-09-25'
  },
  {
    id: 'tpl-04',
    name: 'Welcome to MORV Archive Registry',
    subject: 'MORV ARCHIVE // Welcome to the Collector Registry',
    title: 'Access to Unreleased Vault Drops',
    body: 'Welcome to MORV. You are now registered on the global sneaker registry. You receive 48-hour early drop notifications and access to tier-zero raffle pools.',
    category: 'customer',
    enabled: true,
    lastUpdated: '2025-09-10'
  }
];

export const INITIAL_DISCOUNT_RULES: any[] = [
  {
    id: 'disc-01',
    name: 'Jordan Heritage 10% Weekend Boost',
    type: 'percentage',
    value: 10,
    targetType: 'brand',
    targetValue: 'JORDAN',
    active: true,
    startDate: '2025-10-01',
    endDate: '2025-10-31'
  },
  {
    id: 'disc-02',
    name: 'Technical Runners Flash Reduction',
    type: 'fixed',
    value: 25,
    targetType: 'category',
    targetValue: 'runners',
    active: true,
    startDate: '2025-10-01',
    endDate: '2025-10-15'
  }
];

export const INITIAL_MESSAGES: any[] = [
  {
    id: 'msg-01',
    customerName: 'Mostafa Kamel',
    customerEmail: 'mkamel@designstudio.eg',
    subject: 'Special Inquiry: Nike Dunk Low SB "Pigeon" 2005 Edition',
    message: 'Hello MORV Concierge, do you have any deadstock pairs in US 10.5 originating from the original Tokyo or NYC release? Budget is ready.',
    date: '2025-10-05 13:10',
    status: 'unread'
  },
  {
    id: 'msg-02',
    customerName: 'Laila Soliman',
    customerEmail: 'laila.s@gmail.com',
    subject: 'Order #MRV-2025-901 Address Correction',
    message: 'Please update my delivery address to Villa 14, Katameya Dunes, New Cairo. Phone remains 01099887766.',
    date: '2025-10-04 16:20',
    status: 'read',
    orderId: 'MRV-2025-901'
  }
];

