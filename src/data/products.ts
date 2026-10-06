import { Product, CuratedLookItem, Raffle, VaultArtifact } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    brand: 'JORDAN BRAND',
    name: "Air Jordan 1 Retro High OG 'Lost & Found'",
    nameAr: "إير جوردان 1 ريترو هاي أو جي 'لوست آند فاوند'",
    slug: 'air-jordan-1-retro-high-og-lost-and-found',
    description: "Chicago 1985 Re-imagined Archival Release. Celebrates the mom-and-pop sneaker boutiques of the mid-1980s where untouched deadstock boxes sat forgotten in inventory basements, collecting authentic aging, cracked collars, and yellowed sidewalls.",
    descriptionAr: "إصدار أرشيفي معاد تصوره لطراز شيكاغو 1985 الأصلي. يحتفي ببوتيكات الأحذية العائلية في منتصف الثمانينيات، حيث بقيت صناديق المخزون الميت منسية ومحفوظة بعناية مع طوق متصدع ونعل مائل للصفرة الأرشيفية.",
    price: 4850,
    originalPrice: 5400,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EU10l7RfZNnpHU0TT4SYthVaNwjW8ILJftJ8wF5eXWTvcm1fVJAWEPO1RXCQFLY_Bbzs9MxQk9bS9ODLyvoqIzXcuY0mrh4jkUX3YUaPqAaz65AUGjhUkNchkpytRvtQwXGjG_bJdxF0h1D1ByGCRKDcZ9_EswWZwH48fZBpvvYKcxIwyDcfxcg0rFPK0Woqt7gwOCk7OuifEIzANwCXJIvKcTDVyds0tG_d-dAo07Xd5XvCpXOz',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCiLem_XknBoiLrBo9TbUEj5ojULjxpbpti_lBHOfVQOEEIFk3MnQnDNIT0WGp-H1VRSIDacPqZraKsuxd-wMlUdky-D-p6wexYvD6DDf0ZO4TbN3mbxiUQc777A5BxikhZgUx6QetJHE3tKJOtwrMQ1Hvmcezjx5PA5-WZnxeox2Iksob2tWAWicYisUfKP_kIFs-gF8GMBcF-NYgGeOCdmzm6eVZGArKy94FE68jvzKKKFWTb0MMO',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDAhh3smBsnp2GIK3LMjGRMrWYg2_TJAMU1-sKh0dv3tOfovSUxEM3_MHcPX8P2rx30mLIgjdF3Z3qlCGwKOEgLRmJFG1Jz7IGR-8uZu-GvWksHvnFrHD96ZvzZf2g3Ucoq4dCjRFL37VV5cA0RKEpD4OBosnMnegFEqBdRozU6QwcHsxp7rwThwqwlzKoSMCm3uzgQVT_GtbthjCRMo1PgwV8Azyn3LIf0rHda3zeUHHf84TOvf_7j',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCYFOBsWHe8OfzDOjUQp24yCoinKhAg9-XUcW6s5WdJIHBBl72DAlkSbelppiYrX4ekKq2pqoh36eMplbVYcNUqUnu7tVAPZ2JMig34nB-IAEA7UYEsJ6Bm03-oXYESGfX5VRY7zMgSn4fZIbo2ta7a3pOYY6DNFE5On6fJoyzgh-daJsLbOK1nFNzyeeLnvmSu5DfjBhZ-DeLiOX93t199G_Lad0hqOohPpEHTYjWkjzROySicZuv0',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbxAJ2df-bbLgj6VKjXBeKURbo4aOKabwovwc_37kNKwZ0TexCUkY6lGUp9OTBBc_4AKrYcQtC3ciQo3gVexz2ZELznlvdJXbliyMskTvsvACOxGzmhZLh9p3cicCUuqj7k_ugZKjn7o8XdGFPMOzQVSqkDjmexLCM9QVZmozpESaF0CNEs9saJEUDXyigBQNv1pqjjhpJ6Pw0LrXD3Q0yWsxIO4tiYmJBc-jClHfPQHIFDYUV9L7K',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD914s4Ybedov41z1ir7T4-wUG3GoDH__tOZ49JlGsxiEfBOtAJwWhowUnZab4q7FVMpimdPVsfv49w_0OzuI6WCC7bPklxyxa7X6URUHdSqP8TT1s3GmXO9WXLIYnc2YFOEwubu4ZarRWZxUux99r2ckY46pj2H0JjPBlmiTZXWTLcHG0w6iPLPscJZxNPIXe78GSYyLiAiEDlSVPTXA1KeT99O4sJ42AK7Y9GznGDr0BB3EvuGGX6'
    ],
    colors: ['Varsity Red', 'Muslin', 'Black'],
    colorway: 'Varsity Red / Muslin',
    styleCode: 'DZ5485-612',
    originYear: '1985 / 2022',
    registryId: 'SPECIMEN #041',
    sku: 'MORV-8501-CHI',
    category: 'basketball',
    featured: true,
    newArrival: true,
    bestSeller: true,
    tier: 'TIER 0 / DEADSTOCK',
    badge: 'ARCHIVAL SPECIMEN',
    stock: 18,
    sizes: [
      { size: '40', price: 4850, inStock: true, stock: 3, sku: 'CHI-85-40' },
      { size: '41', price: 4850, inStock: true, stock: 5, sku: 'CHI-85-41' },
      { size: '42', price: 4850, inStock: false, stock: 0, sku: 'CHI-85-42' },
      { size: '43', price: 4850, inStock: true, stock: 4, sku: 'CHI-85-43' },
      { size: '44', price: 4850, inStock: true, stock: 6, sku: 'CHI-85-44' },
      { size: '45', price: 4850, inStock: false, stock: 0, sku: 'CHI-85-45' }
    ],
    specs: {
      upper: 'Distressed Premium Full Grain Hide',
      collar: 'Weathered Split Black Hide',
      midsole: 'Muslin Pre-Oxidized Rubber / Encapsulated Air',
      packaging: 'Vintage Mismatched Lid & Sandy Bros Receipt'
    }
  },
  {
    id: 'prod-002',
    brand: 'NEW BALANCE MADE',
    name: '990v6 Made in USA',
    nameAr: 'نيو بالانس 990v6 صناعة أمريكية',
    slug: 'new-balance-990v6-made-in-usa-castlerock',
    description: "Premium pigskin suede overlays, breathable mesh base, and FuelCell midsole foam engineered for modern lightweight cushioning and heritage American craft.",
    descriptionAr: "طبقات من جلد الغزال الفاخر، وقاعدة شبكية جيدة التهوية، ونعل أوسط بتقنية FuelCell مصمم لتوسيد فائق الخفة وحرفية أمريكية تاريخية.",
    price: 3650,
    originalPrice: 4100,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbbckk5RYJTR0CHQOjKv3xHiQrTNH8W9QCgNbAlMZkSqigGBJfKvUhjXayd3BYOk6Hr2HWASnhLK7WlP1zL8clo-zDEBywN-W1fVN6S0kd4ueUhMllPafQWU8SprfSVHkqPykapUDWLCl6VYDcGdwbgQ0qWhz05YjyYCQgqOgkf713AULy6ex9qkndgcElfgnb2J6Feb6GQ3cX8MYmXzl-AmDGsPpNmRTB0HdMSGpRzofl4oH5BPLw',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbbckk5RYJTR0CHQOjKv3xHiQrTNH8W9QCgNbAlMZkSqigGBJfKvUhjXayd3BYOk6Hr2HWASnhLK7WlP1zL8clo-zDEBywN-W1fVN6S0kd4ueUhMllPafQWU8SprfSVHkqPykapUDWLCl6VYDcGdwbgQ0qWhz05YjyYCQgqOgkf713AULy6ex9qkndgcElfgnb2J6Feb6GQ3cX8MYmXzl-AmDGsPpNmRTB0HdMSGpRzofl4oH5BPLw'
    ],
    colors: ['Castlerock', 'Grey'],
    colorway: "'CASTLEROCK' // GREY PALETTE",
    styleCode: 'M990GL6',
    originYear: '2023',
    sku: 'REF // NB-990V6',
    category: 'runners',
    featured: true,
    newArrival: true,
    tier: 'USA CRAFT',
    badge: 'IN STOCK',
    stock: 14,
    sizes: [
      { size: '40', price: 3650, inStock: true, stock: 2, sku: 'NB990-40' },
      { size: '41', price: 3650, inStock: true, stock: 4, sku: 'NB990-41' },
      { size: '42', price: 3650, inStock: true, stock: 3, sku: 'NB990-42' },
      { size: '43', price: 3650, inStock: true, stock: 5, sku: 'NB990-43' },
      { size: '44', price: 3650, inStock: false, stock: 0, sku: 'NB990-44' },
      { size: '45', price: 3650, inStock: false, stock: 0, sku: 'NB990-45' }
    ]
  },
  {
    id: 'prod-003',
    brand: 'SALOMON ADVANCED',
    name: 'XT-6 Gore-Tex',
    nameAr: 'سالومون XT-6 جور-تكس',
    slug: 'salomon-xt-6-gore-tex-black-phantom',
    description: "Alpine performance recontextualised as the essential uniform for contemporary urban exploration. Monochromatic lug geometries, Quicklace systems, and technical waterproof membranes.",
    descriptionAr: "أداء جبال الألب في قالب عصري يناسب الاستكشاف الحضري المعاصر. تضاريس نعل هندسية ونظام أربطة سريع وأغشية جور-تكس مضادة للماء.",
    price: 3200,
    originalPrice: 3600,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr_-oitPniQCcvO9_VWhH-s7RuotMBHcXQ-Z6IT3vJWVSh5PcY0cG53JERMN8ZDLP8vnyaNulytDJMgDDQpWGdCOkJCbhuC9xS2z58yPdpvXJs8VLesM-TiLN1x2nqqSVDYKWw3fcDOOTHRXg7hCtPbKm72MgvjDBE0lSoLZSPpS-LRdTbFR-__AMGKwYid94ZCH0dv6R0As-Xm2StbOeJvlw7MzesgA52k7eJ4v8bLHh6uO5NHc1n',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCr_-oitPniQCcvO9_VWhH-s7RuotMBHcXQ-Z6IT3vJWVSh5PcY0cG53JERMN8ZDLP8vnyaNulytDJMgDDQpWGdCOkJCbhuC9xS2z58yPdpvXJs8VLesM-TiLN1x2nqqSVDYKWw3fcDOOTHRXg7hCtPbKm72MgvjDBE0lSoLZSPpS-LRdTbFR-__AMGKwYid94ZCH0dv6R0As-Xm2StbOeJvlw7MzesgA52k7eJ4v8bLHh6uO5NHc1n'
    ],
    colors: ['Black Phantom', 'Triple Black'],
    colorway: "'BLACK PHANTOM' // WEATHERPROOF",
    styleCode: 'L41663500',
    originYear: '2023',
    sku: 'REF // SLM-XT6GTX',
    category: 'gore-tex',
    featured: true,
    bestSeller: true,
    tier: 'TACTICAL LAB',
    badge: 'STAFF PICK',
    stock: 15,
    sizes: [
      { size: '40', price: 3200, inStock: true, stock: 3, sku: 'SLM-40' },
      { size: '41', price: 3200, inStock: true, stock: 4, sku: 'SLM-41' },
      { size: '42', price: 3200, inStock: true, stock: 5, sku: 'SLM-42' },
      { size: '43', price: 3200, inStock: false, stock: 0, sku: 'SLM-43' },
      { size: '44', price: 3200, inStock: true, stock: 3, sku: 'SLM-44' },
      { size: '45', price: 3200, inStock: false, stock: 0, sku: 'SLM-45' }
    ]
  },
  {
    id: 'prod-004',
    brand: 'ADIDAS CONSORTIUM',
    name: 'Samba x Wales Bonner',
    nameAr: 'سامبا x ويلز بونر',
    slug: 'adidas-samba-wales-bonner-metallic-silver',
    description: "Mirror finish silver leather upper with handcrafted ecru crochet three stripes and an exaggerated foldover tongue detail celebrating British-Jamaican diaspora tailored sportswear.",
    descriptionAr: "جزء علوي جلدي فضي بلمعة مرآة مع خطوط الكروشيه الثلاثة المشغولة يدوياً وتفاصيل لسان الحذاء المطوي الشهير.",
    price: 3800,
    originalPrice: 4200,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDykObI45kxpPjsLOCxG73hBCYdfYgp_jtlRnbumv6YzvCNtycSRgnJfY5bA6G6GKiziyuPesjE3TaaXLuNjGVSR-vg6tiIFyPETAwKvWJfk4QOZan-MjcfPaD-cpjoW3bmZq7rRSGdtRoRt1UGNRE2jnFeeHX_jA8wg5Eo4HYVTf3SxXLAhjS5zht7Juic7yBgni0IwmxTDsHTRtND_BsIviT1r3JLwr7iyGsPoTBF97_0fD-e5ri1',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDykObI45kxpPjsLOCxG73hBCYdfYgp_jtlRnbumv6YzvCNtycSRgnJfY5bA6G6GKiziyuPesjE3TaaXLuNjGVSR-vg6tiIFyPETAwKvWJfk4QOZan-MjcfPaD-cpjoW3bmZq7rRSGdtRoRt1UGNRE2jnFeeHX_jA8wg5Eo4HYVTf3SxXLAhjS5zht7Juic7yBgni0IwmxTDsHTRtND_BsIviT1r3JLwr7iyGsPoTBF97_0fD-e5ri1'
    ],
    colors: ['Metallic Silver', 'Cream'],
    colorway: "'METALLIC SILVER' // HAND-STITCHED",
    styleCode: 'IG0503',
    originYear: '2023',
    sku: 'REF // WB-SAMBA-01',
    category: 'court',
    featured: true,
    tier: 'HERITAGE ARCHIVE',
    badge: 'LIMITED EDITION',
    stock: 9,
    sizes: [
      { size: '40', price: 3800, inStock: true, stock: 2, sku: 'SAMBA-40' },
      { size: '41', price: 3800, inStock: true, stock: 3, sku: 'SAMBA-41' },
      { size: '42', price: 3800, inStock: true, stock: 4, sku: 'SAMBA-42' },
      { size: '43', price: 3800, inStock: false, stock: 0, sku: 'SAMBA-43' },
      { size: '44', price: 3800, inStock: false, stock: 0, sku: 'SAMBA-44' },
      { size: '45', price: 3800, inStock: false, stock: 0, sku: 'SAMBA-45' }
    ]
  },
  {
    id: 'prod-005',
    brand: 'ASICS SPORTSTYLE',
    name: 'GEL-Kayano 14',
    nameAr: 'أسيكس جل-كايانو 14',
    slug: 'asics-gel-kayano-14-cream-pure-silver',
    description: "Japanese precision running engineering elevated through cutting-edge material experimentation, metallic synthetic polymers, and 2000s GEL structural frameworks.",
    descriptionAr: "دقة هندسة الجري اليابانية مجسدة في شبكة معدنية وتوسيد GEL المتطور من أرشيف بدايات الألفية.",
    price: 2950,
    originalPrice: 3350,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwf-1zUtdzM2MUzldhbuHqLQt84IV7qg4f_27gYfV8tUdiKmH_HuFF1TQhcwVaecb5dobagIHLYbugAC78RqBY7MVBkZjk2H4r_3LZ1a9GAPuc5OczhfYSbZxYU1CEBH5oksLfJxHOkaVNm-0FEh-DVRPkQlPNTBsma48lRrV3RdUuCpj8gGfKk1B1NmJUL14H6qe87wZ4wAtkWGQaGL_QNr7Uc18w6MgsjAJWXJtQ7Wlveek6eA4s',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwf-1zUtdzM2MUzldhbuHqLQt84IV7qg4f_27gYfV8tUdiKmH_HuFF1TQhcwVaecb5dobagIHLYbugAC78RqBY7MVBkZjk2H4r_3LZ1a9GAPuc5OczhfYSbZxYU1CEBH5oksLfJxHOkaVNm-0FEh-DVRPkQlPNTBsma48lRrV3RdUuCpj8gGfKk1B1NmJUL14H6qe87wZ4wAtkWGQaGL_QNr7Uc18w6MgsjAJWXJtQ7Wlveek6eA4s'
    ],
    colors: ['Cream', 'Pure Silver'],
    colorway: "'CREAM / PURE SILVER' // Y2K OG",
    styleCode: '1201A019-105',
    originYear: '2008 / 2024',
    sku: 'REF // ASC-K14',
    category: 'runners',
    featured: true,
    bestSeller: true,
    tier: 'KOBE LAB',
    badge: 'ESSENTIAL',
    stock: 16,
    sizes: [
      { size: '40', price: 2950, inStock: true, stock: 4, sku: 'ASC-40' },
      { size: '41', price: 2950, inStock: true, stock: 3, sku: 'ASC-41' },
      { size: '42', price: 2950, inStock: true, stock: 5, sku: 'ASC-42' },
      { size: '43', price: 2950, inStock: true, stock: 4, sku: 'ASC-43' },
      { size: '44', price: 2950, inStock: false, stock: 0, sku: 'ASC-44' },
      { size: '45', price: 2950, inStock: false, stock: 0, sku: 'ASC-45' }
    ]
  },
  {
    id: 'prod-006',
    brand: 'NIKE TIER ZERO',
    name: "Air Force 1 '07 x Ambush",
    nameAr: "نايكي إير فورس 1 x أمبوش",
    slug: 'nike-air-force-1-ambush-pine-green',
    description: "Bold collaboration with Yoon Ahn featuring high-contrast premium Pine Green leather and an exaggerated, protruding tail Swoosh inspired by motorcycle tailpipes.",
    descriptionAr: "تعاون فريد مع المصممة يون آن يتميز بجلد باين جرين الفاخر وشعار سووش ممتد مستوحى من أنابيب الدراجات النارية.",
    price: 3450,
    originalPrice: 3900,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaSDXrtOY7l9IAel2mMsm7CedYPH_fQx2N6YQD7KDPLG5e8lSmJQSL9vAQFxhdd_7lVCD6tdUHbfDLPLtfSiA1tAl4xrhWlfYQSq6ikJ-6pEeyhhatKMTjuMPJFaw050qhYqdcvldUymMnAYwIsUgzcHRcAHpkNOD4lclkG2_eiZ_wsVHcrE4ci-ThjF8-h4i-TPEtZ-iJ1EqAE1w1IVyiJYpgC3c8aBkHJbVxwnRyLqw82GnmNjoP',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAaSDXrtOY7l9IAel2mMsm7CedYPH_fQx2N6YQD7KDPLG5e8lSmJQSL9vAQFxhdd_7lVCD6tdUHbfDLPLtfSiA1tAl4xrhWlfYQSq6ikJ-6pEeyhhatKMTjuMPJFaw050qhYqdcvldUymMnAYwIsUgzcHRcAHpkNOD4lclkG2_eiZ_wsVHcrE4ci-ThjF8-h4i-TPEtZ-iJ1EqAE1w1IVyiJYpgC3c8aBkHJbVxwnRyLqw82GnmNjoP'
    ],
    colors: ['Pine Green', 'Lemon Drop'],
    colorway: "'PINE GREEN' // EXAGGERATED TAIL",
    styleCode: 'DV3464-300',
    originYear: '2023',
    sku: 'REF // NK-AF1-AMB',
    category: 'court',
    featured: false,
    badge: 'LOW STOCK',
    stock: 5,
    sizes: [
      { size: '40', price: 3450, inStock: false, stock: 0, sku: 'AF1-AMB-40' },
      { size: '41', price: 3450, inStock: true, stock: 2, sku: 'AF1-AMB-41' },
      { size: '42', price: 3450, inStock: true, stock: 2, sku: 'AF1-AMB-42' },
      { size: '43', price: 3450, inStock: true, stock: 1, sku: 'AF1-AMB-43' },
      { size: '44', price: 3450, inStock: false, stock: 0, sku: 'AF1-AMB-44' },
      { size: '45', price: 3450, inStock: false, stock: 0, sku: 'AF1-AMB-45' }
    ]
  },
  {
    id: 'prod-007',
    brand: 'NEW BALANCE ARCHIVE',
    name: '550 Retro Basketball',
    nameAr: 'نيو بالانس 550 ريترو باسكتبول',
    slug: 'new-balance-550-white-vintage-indigo',
    description: "Original 1989 basketball low-top revived from the archives with crisp white perforated leather and vintage off-white aged cupsole.",
    descriptionAr: "حذاء كرة سلة كلاسيكي من عام 1989 بجلد أبيض مثقب ونعل بلون عاجي أرشيفي معتق.",
    price: 2450,
    originalPrice: 2800,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSgqGTHkIjYJVLo2W-DHwYGuU5xYrOZUCzfEQrDv4rDjypU4y1rCUD0BqROm1qYMtgmERRpyE8wK6A1FweK3L7a7BKdAxYetLzfYV_1EMzK-O7S1CmMoFnbimtmyy_PndqJ2nppoK_PhWsOmc1caHwUySgatbHU6ez5jlMCcjWJuE8R3FW963tIchveDZ6Pr6CQEPfWJ9qydqP_Udh_m4Z7VS-0fX3LsuEJbB73hyUjehPucgBQGM7',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSgqGTHkIjYJVLo2W-DHwYGuU5xYrOZUCzfEQrDv4rDjypU4y1rCUD0BqROm1qYMtgmERRpyE8wK6A1FweK3L7a7BKdAxYetLzfYV_1EMzK-O7S1CmMoFnbimtmyy_PndqJ2nppoK_PhWsOmc1caHwUySgatbHU6ez5jlMCcjWJuE8R3FW963tIchveDZ6Pr6CQEPfWJ9qydqP_Udh_m4Z7VS-0fX3LsuEJbB73hyUjehPucgBQGM7'
    ],
    colors: ['White', 'Vintage Indigo'],
    colorway: "'WHITE / VINTAGE INDIGO'",
    styleCode: 'BB550PCD',
    originYear: '1989 / 2023',
    sku: 'REF // NB-550-IND',
    category: 'court',
    featured: false,
    badge: 'NEW DROP',
    stock: 20,
    sizes: [
      { size: '40', price: 2450, inStock: true, stock: 4, sku: 'NB550-40' },
      { size: '41', price: 2450, inStock: true, stock: 5, sku: 'NB550-41' },
      { size: '42', price: 2450, inStock: true, stock: 6, sku: 'NB550-42' },
      { size: '43', price: 2450, inStock: true, stock: 3, sku: 'NB550-43' },
      { size: '44', price: 2450, inStock: true, stock: 2, sku: 'NB550-44' },
      { size: '45', price: 2450, inStock: false, stock: 0, sku: 'NB550-45' }
    ]
  },
  {
    id: 'prod-008',
    brand: 'NIKE ARCHIVE VAULT',
    name: 'Air Max 95 OG',
    nameAr: 'نايكي إير ماكس 95 أو جي',
    slug: 'nike-air-max-95-og-neon-archive',
    description: "Iconic Sergio Lozano anatomy-inspired runner featuring gradient grey suede wave panels, neon volt lace loops, and dual-pressure visible Air bags.",
    descriptionAr: "التصميم الأيقوني المستوحى من تشريح الجسم البشري مع موجات رمادية متدرجة وفقاعات هواء باللون الفوسفوري المشع.",
    price: 3850,
    originalPrice: 4300,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8jlWTqYIIUdTLgEaK2iI4Q6agBRP7Mi_lM452QrMgJoEbteGe8txx1sTAgDRkRvpDeeJ5WQmNK-1S4Eb6cS0gGz_jqLC3nHUIbOaXjpwzvMA4tQPhWCN3GmBzcF3RUuykJ2wP1_vvSdjvPZTJYRiTPMaG_0riB-H1dIz2GJ6q_ysVdzHyDe0DaWFgQO-2hzkYz8oZhl0kefIky4UEX0tRUv9Sd-vYlc_0DeWqEbJB6PcOedBke9vO',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB8jlWTqYIIUdTLgEaK2iI4Q6agBRP7Mi_lM452QrMgJoEbteGe8txx1sTAgDRkRvpDeeJ5WQmNK-1S4Eb6cS0gGz_jqLC3nHUIbOaXjpwzvMA4tQPhWCN3GmBzcF3RUuykJ2wP1_vvSdjvPZTJYRiTPMaG_0riB-H1dIz2GJ6q_ysVdzHyDe0DaWFgQO-2hzkYz8oZhl0kefIky4UEX0tRUv9Sd-vYlc_0DeWqEbJB6PcOedBke9vO'
    ],
    colors: ['Black', 'Neon Volt', 'Cool Grey'],
    colorway: "'NEON ARCHIVE' // 1995 RE-ISSUE",
    styleCode: 'CT1689-001',
    originYear: '1995 / 2020',
    sku: 'REF // NK-AM95-OG',
    category: 'runners',
    featured: false,
    badge: 'RESTOCK',
    stock: 12,
    sizes: [
      { size: '40', price: 3850, inStock: false, stock: 0, sku: 'AM95-40' },
      { size: '41', price: 3850, inStock: true, stock: 3, sku: 'AM95-41' },
      { size: '42', price: 3850, inStock: true, stock: 4, sku: 'AM95-42' },
      { size: '43', price: 3850, inStock: true, stock: 3, sku: 'AM95-43' },
      { size: '44', price: 3850, inStock: true, stock: 2, sku: 'AM95-44' },
      { size: '45', price: 3850, inStock: false, stock: 0, sku: 'AM95-45' }
    ]
  },
  {
    id: 'prod-009',
    brand: 'NEW BALANCE ARCHIVE',
    name: "1906R 'Protection Pack'",
    nameAr: "نيو بالانس 1906R 'بروتكشن باك'",
    slug: 'new-balance-1906r-protection-pack-castlerock',
    description: "Deconstructed raw-edge suede panels over technical diamond mesh and N-ergy shock absorption tooling.",
    descriptionAr: "حواف متعرجة مكشوفة من جلد الشامواه فوق شبك ماسي ونظام امتصاص الصدمات N-ergy.",
    price: 3350,
    originalPrice: 3750,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdSP-18p_k3H43MlWoodGcFdTAil_1o5l_0e7leDEymGd6lxh0QZxjxGO3XEzUaFGOAhipwJOZmVW4FLMyANCph4dGEjsibfcVaUL8EsyUGu-pRYcL27e3gsYS1MrT4Gl7m5ZByrUr8xYUeeZt2PePwWBRhfw1QVxG5BpXBhwVLzsJjFeXfv2MF3iNSf0UJmtWzMttgOZ3D-9FLd0QAD6Z4B5NP9TmJlwKw_h41Yk3s_3NLfMoWn2o',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdSP-18p_k3H43MlWoodGcFdTAil_1o5l_0e7leDEymGd6lxh0QZxjxGO3XEzUaFGOAhipwJOZmVW4FLMyANCph4dGEjsibfcVaUL8EsyUGu-pRYcL27e3gsYS1MrT4Gl7m5ZByrUr8xYUeeZt2PePwWBRhfw1QVxG5BpXBhwVLzsJjFeXfv2MF3iNSf0UJmtWzMttgOZ3D-9FLd0QAD6Z4B5NP9TmJlwKw_h41Yk3s_3NLfMoWn2o'
    ],
    colors: ['Castlerock', 'Grey'],
    colorway: 'Castlerock / Magnet',
    styleCode: 'M1906DA',
    originYear: '2023',
    sku: 'M1906DA',
    category: 'runners',
    badge: 'DEADSTOCK',
    stock: 14,
    sizes: [
      { size: '40', price: 3350, inStock: true, stock: 3, sku: 'NB1906-40' },
      { size: '41', price: 3350, inStock: true, stock: 4, sku: 'NB1906-41' },
      { size: '42', price: 3350, inStock: true, stock: 4, sku: 'NB1906-42' },
      { size: '43', price: 3350, inStock: true, stock: 3, sku: 'NB1906-43' },
      { size: '44', price: 3350, inStock: false, stock: 0, sku: 'NB1906-44' },
      { size: '45', price: 3350, inStock: false, stock: 0, sku: 'NB1906-45' }
    ]
  },
  {
    id: 'prod-010',
    brand: 'JORDAN BRAND',
    name: "Air Jordan 4 Retro 'Military Black'",
    nameAr: "إير جوردان 4 ريترو 'ميليتاري بلاك'",
    slug: 'air-jordan-4-retro-military-black',
    description: "Crisp white leather upper, grey suede mudguard, black TPU eyelet wings and iconic quarter panel mesh netting.",
    descriptionAr: "جلد أبيض فاخر مع مقدمة شمواه رمادية وأجنحة TPU سوداء مع شبك جانبي مميز.",
    price: 5900,
    originalPrice: 6500,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzntAzwU-j1tw7LBWJSQ5Z6hOQJcbr_AcPhMLcFEpMnRV9t7Hhl-VuJDtcOIW7El8SX4UXHYwctyHCSC4KOlntyRIpz_dsed0Hp3YPX6kQ1QTlIvVDkrsR1IfH2JoTo9fuGaSo9aBMHuWs6hA16BRTkyng7mjMVFzjce6XdrS2sRlgaoDMV_dFefbFhb55o8BGoINxYd0tXXxNirN79nsbFtzDPj309V7s2MxBZSeNPOjTmPMMKJWa',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzntAzwU-j1tw7LBWJSQ5Z6hOQJcbr_AcPhMLcFEpMnRV9t7Hhl-VuJDtcOIW7El8SX4UXHYwctyHCSC4KOlntyRIpz_dsed0Hp3YPX6kQ1QTlIvVDkrsR1IfH2JoTo9fuGaSo9aBMHuWs6hA16BRTkyng7mjMVFzjce6XdrS2sRlgaoDMV_dFefbFhb55o8BGoINxYd0tXXxNirN79nsbFtzDPj309V7s2MxBZSeNPOjTmPMMKJWa'
    ],
    colors: ['White', 'Black', 'Neutral Grey'],
    colorway: 'White / Black / Neutral Grey',
    styleCode: 'DH6927-111',
    originYear: '2022',
    sku: 'DH6927-111',
    category: 'basketball',
    tier: 'TIER ZERO',
    badge: 'VAULT ARCHIVE',
    stock: 7,
    sizes: [
      { size: '40', price: 5900, inStock: false, stock: 0, sku: 'AJ4-40' },
      { size: '41', price: 5900, inStock: true, stock: 2, sku: 'AJ4-41' },
      { size: '42', price: 5900, inStock: true, stock: 2, sku: 'AJ4-42' },
      { size: '43', price: 5900, inStock: true, stock: 2, sku: 'AJ4-43' },
      { size: '44', price: 5900, inStock: true, stock: 1, sku: 'AJ4-44' },
      { size: '45', price: 5900, inStock: false, stock: 0, sku: 'AJ4-45' }
    ]
  },
  {
    id: 'prod-011',
    brand: 'SALOMON ADVANCED',
    name: "ACS Pro Advanced 'Metal / Frost'",
    nameAr: "سالومون ACS برو أدفانسد",
    slug: 'salomon-acs-pro-advanced-metal-frost',
    description: "The seminal Kurim-structure cage design preserved in its most authentic technical specification.",
    descriptionAr: "هيكل Kurim الأيقوني المحفوظ بمواصفاته التقنية الأكثر أصالة ولمسات الفضة الصناعية.",
    price: 3550,
    originalPrice: 3950,
    primaryImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3l6_wrvZ3kGDdNgxYbFstyk5IXk0ZZ9xYLQt6Gh20_0cJMkrzykHk-YHStJDVkpgHGZbhzAmfN1JEF0pRwkYTyOnRIVltRd8-ed-1WRnWJsX0oBYYB3cFt0u7ZdkIBl_QWIQumZGQJ-wzDYHrAso3HJMbZWOghmyqfR9FQcbzx7NlyIFbTmpDmjaMXLqr3RHWreYnYXWENwqURfqNVmToUJnRnMwA3HWaHlhcb_ZhXp6-iwmu0gjV',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA3l6_wrvZ3kGDdNgxYbFstyk5IXk0ZZ9xYLQt6Gh20_0cJMkrzykHk-YHStJDVkpgHGZbhzAmfN1JEF0pRwkYTyOnRIVltRd8-ed-1WRnWJsX0oBYYB3cFt0u7ZdkIBl_QWIQumZGQJ-wzDYHrAso3HJMbZWOghmyqfR9FQcbzx7NlyIFbTmpDmjaMXLqr3RHWreYnYXWENwqURfqNVmToUJnRnMwA3HWaHlhcb_ZhXp6-iwmu0gjV'
    ],
    colors: ['Metal', 'Frost', 'Vanilla Ice'],
    colorway: "'METAL / FROST' // ARCHIVAL CHASSIS",
    styleCode: 'L47179800',
    originYear: '2023',
    sku: 'L47179800',
    category: 'runners',
    badge: 'TECHNICAL ALLOCATION',
    stock: 9,
    sizes: [
      { size: '40', price: 3550, inStock: true, stock: 2, sku: 'ACS-40' },
      { size: '41', price: 3550, inStock: true, stock: 3, sku: 'ACS-41' },
      { size: '42', price: 3550, inStock: true, stock: 2, sku: 'ACS-42' },
      { size: '43', price: 3550, inStock: true, stock: 2, sku: 'ACS-43' },
      { size: '44', price: 3550, inStock: false, stock: 0, sku: 'ACS-44' },
      { size: '45', price: 3550, inStock: false, stock: 0, sku: 'ACS-45' }
    ]
  },
  {
    id: 'prod-012',
    brand: 'NIKE AIR FORCE 1',
    name: "Air Force 1 '07 'Triple White'",
    nameAr: "نايكي إير فورس 1 '07 'تريبل وايت'",
    slug: 'nike-air-force-1-07-triple-white',
    description: "The timeless streetwear icon. Crisp white full-grain leather, perforated toe box, metal dubrae, and encapsulated Nike Air cushioning.",
    descriptionAr: "أيقونة أزياء الشارع الخالدة. جلد أبيض ناصع مع ثقوب تهوية، ودوبراي معدنية، ووسادة هوائية نايكي إير مدمجة.",
    price: 1999,
    originalPrice: 2350,
    primaryImage: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=85',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=85'
    ],
    colors: ['Triple White'],
    colorway: 'White / White / White',
    styleCode: 'CW2288-111',
    originYear: '1982 / 2024',
    sku: 'CW2288-111',
    category: 'court',
    featured: true,
    bestSeller: true,
    badge: 'FLAGSHIP ICON',
    stock: 25,
    sizes: [
      { size: '40', price: 1999, inStock: true, stock: 4, sku: 'AF1-40' },
      { size: '41', price: 1999, inStock: true, stock: 6, sku: 'AF1-41' },
      { size: '42', price: 1999, inStock: true, stock: 5, sku: 'AF1-42' },
      { size: '43', price: 1999, inStock: true, stock: 5, sku: 'AF1-43' },
      { size: '44', price: 1999, inStock: true, stock: 3, sku: 'AF1-44' },
      { size: '45', price: 1999, inStock: true, stock: 2, sku: 'AF1-45' }
    ]
  }
];

export const LOOKBOOK_ITEMS: CuratedLookItem[] = [
  {
    id: 'look-001',
    brand: 'SALOMON ADVANCED',
    name: 'XT-6 Gore-Tex Black Phantom',
    price: 3200,
    badge: 'SPECIMEN 01',
    description: 'All-weather technical runner with Gore-Tex waterproofing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCr_-oitPniQCcvO9_VWhH-s7RuotMBHcXQ-Z6IT3vJWVSh5PcY0cG53JERMN8ZDLP8vnyaNulytDJMgDDQpWGdCOkJCbhuC9xS2z58yPdpvXJs8VLesM-TiLN1x2nqqSVDYKWw3fcDOOTHRXg7hCtPbKm72MgvjDBE0lSoLZSPpS-LRdTbFR-__AMGKwYid94ZCH0dv6R0As-Xm2StbOeJvlw7MzesgA52k7eJ4v8bLHh6uO5NHc1n',
    category: 'GORE-TEX'
  },
  {
    id: 'look-002',
    brand: 'ADIDAS CONSORTIUM',
    name: 'Samba x Wales Bonner',
    price: 3800,
    badge: 'SPECIMEN 02',
    description: 'Metallic silver leather with handcrafted crochet detailing',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDykObI45kxpPjsLOCxG73hBCYdfYgp_jtlRnbumv6YzvCNtycSRgnJfY5bA6G6GKiziyuPesjE3TaaXLuNjGVSR-vg6tiIFyPETAwKvWJfk4QOZan-MjcfPaD-cpjoW3bmZq7rRSGdtRoRt1UGNRE2jnFeeHX_jA8wg5Eo4HYVTf3SxXLAhjS5zht7Juic7yBgni0IwmxTDsHTRtND_BsIviT1r3JLwr7iyGsPoTBF97_0fD-e5ri1',
    category: 'COURT'
  },
  {
    id: 'look-003',
    brand: 'ASICS SPORTSTYLE',
    name: 'GEL-Kayano 14 Cream',
    price: 2950,
    badge: 'SPECIMEN 03',
    description: 'Y2K Japanese running engineering with metallic framework',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwf-1zUtdzM2MUzldhbuHqLQt84IV7qg4f_27gYfV8tUdiKmH_HuFF1TQhcwVaecb5dobagIHLYbugAC78RqBY7MVBkZjk2H4r_3LZ1a9GAPuc5OczhfYSbZxYU1CEBH5oksLfJxHOkaVNm-0FEh-DVRPkQlPNTBsma48lRrV3RdUuCpj8gGfKk1B1NmJUL14H6qe87wZ4wAtkWGQaGL_QNr7Uc18w6MgsjAJWXJtQ7Wlveek6eA4s',
    category: 'RUNNERS'
  }
];

export const RAFFLES: Raffle[] = [
  {
    id: 'raf-001',
    brand: 'JORDAN BRAND x TRAVIS SCOTT',
    model: "Air Jordan 1 Low OG 'Medium Olive'",
    subtitle: 'NFC VERIFIED ALLOCATION // DEADSTOCK LOT 08',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD03rQ-eYk8Fv2w0n_vVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w4mE5sVz0w',
    dateStr: '12 OCT 2026',
    day: '12',
    month: 'OCT',
    closesIn: '48H 12M',
    allocation: '24 PAIRS (EGYPT REGION)',
    entryFee: 0,
    status: 'open',
    retailNote: 'سحب مقتنين مجاني · استلام عبر الشحن السريع في مصر'
  },
  {
    id: 'raf-002',
    brand: 'NIKE SB x FUTURA LABORATORIES',
    model: "Dunk Low Pro 'Bleached Aqua'",
    subtitle: 'VAULT ACCESS REGISTER // EDITION OF 18',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EU10l7RfZNnpHU0TT4SYthVaNwjW8ILJftJ8wF5eXWTvcm1fVJAWEPO1RXCQFLY_Bbzs9MxQk9bS9ODLyvoqIzXcuY0mrh4jkUX3YUaPqAaz65AUGjhUkNchkpytRvtQwXGjG_bJdxF0h1D1ByGCRKDcZ9_EswWZwH48fZBpvvYKcxIwyDcfxcg0rFPK0Woqt7gwOCk7OuifEIzANwCXJIvKcTDVyds0tG_d-dAo07Xd5XvCpXOz',
    dateStr: '19 OCT 2026',
    day: '19',
    month: 'OCT',
    closesIn: '6 DAYS',
    allocation: '18 PAIRS (EGYPT REGION)',
    entryFee: 0,
    status: 'upcoming',
    retailNote: 'إصدار استثنائي مخصص لأعضاء سجل MORV'
  }
];

export const VAULT_ARTIFACTS: VaultArtifact[] = [
  {
    id: 'vault-01',
    lotNumber: 'LOT # 001985-CH',
    grade: 'DEADSTOCK 10.0',
    era: 'ERA: 1985',
    brand: 'NIKE ARCHIVE VAULT',
    name: "Air Jordan 1 High OG 'Chicago 1985'",
    description: 'Factory-laced, complete with original paper insert and uncracked black collar hide. Kept in climate-controlled dark storage for 39 years.',
    valuation: 42000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2EU10l7RfZNnpHU0TT4SYthVaNwjW8ILJftJ8wF5eXWTvcm1fVJAWEPO1RXCQFLY_Bbzs9MxQk9bS9ODLyvoqIzXcuY0mrh4jkUX3YUaPqAaz65AUGjhUkNchkpytRvtQwXGjG_bJdxF0h1D1ByGCRKDcZ9_EswWZwH48fZBpvvYKcxIwyDcfxcg0rFPK0Woqt7gwOCk7OuifEIzANwCXJIvKcTDVyds0tG_d-dAo07Xd5XvCpXOz'
  },
  {
    id: 'vault-02',
    lotNumber: 'LOT # 002002-DNK',
    grade: 'A+ MUSEUM SPEC',
    era: 'ERA: 2002',
    brand: 'NIKE SB VAULT',
    name: "Dunk Low Pro SB 'Supreme White Cement'",
    description: 'The definitive inaugural partnership between Supreme and Nike SB featuring iconic elephant print leather overlays.',
    valuation: 32000,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSgqGTHkIjYJVLo2W-DHwYGuU5xYrOZUCzfEQrDv4rDjypU4y1rCUD0BqROm1qYMtgmERRpyE8wK6A1FweK3L7a7BKdAxYetLzfYV_1EMzK-O7S1CmMoFnbimtmyy_PndqJ2nppoK_PhWsOmc1caHwUySgatbHU6ez5jlMCcjWJuE8R3FW963tIchveDZ6Pr6CQEPfWJ9qydqP_Udh_m4Z7VS-0fX3LsuEJbB73hyUjehPucgBQGM7'
  }
];

export const BRAND_DIRECTORY = [
  {
    group: 'GROUP 01 (A — C)',
    letters: [
      {
        letter: 'A',
        brands: [
          { name: 'Adidas Originals', count: 14 },
          { name: 'Adidas by Wales Bonner', count: 6 },
          { name: 'Adidas Consortium', count: 9 },
          { name: 'Asics SportStyle', count: 22 },
          { name: 'Autry Action Shoes', count: 4 }
        ]
      },
      {
        letter: 'B',
        brands: [
          { name: 'A Bathing Ape (BAPE)', count: 8 },
          { name: 'Birkenstock 1774', count: 5 }
        ]
      },
      {
        letter: 'C',
        brands: [
          { name: 'Common Projects', count: 12 },
          { name: 'Converse 1970 First String', count: 18 },
          { name: 'Comme des Garçons Homme Plus', count: 7 }
        ]
      }
    ]
  },
  {
    group: 'GROUP 02 (D — M)',
    letters: [
      {
        letter: 'D',
        brands: [
          { name: 'Dime MTL', count: 3 },
          { name: 'Diemme Footwear', count: 5 }
        ]
      },
      {
        letter: 'H',
        brands: [
          { name: 'Hoka One One Project', count: 11 }
        ]
      },
      {
        letter: 'J',
        brands: [
          { name: 'Jordan Retro Collection', count: 36 },
          { name: 'Jordan x Travis Scott', count: 8 }
        ]
      },
      {
        letter: 'M',
        brands: [
          { name: 'Maison Margiela 22', count: 15 },
          { name: 'Mizuno Sportstyle RB', count: 9 }
        ]
      }
    ]
  },
  {
    group: 'GROUP 03 (N — R)',
    letters: [
      {
        letter: 'N',
        brands: [
          { name: 'New Balance Made in USA', count: 28 },
          { name: 'Nike Sportswear Archive', count: 45 },
          { name: 'Nike x Sacai', count: 12 },
          { name: 'Nike x Off-White', count: 10 },
          { name: 'Nike x Travis Scott', count: 9 }
        ]
      },
      {
        letter: 'O',
        brands: [
          { name: 'On Running Cloud Lab', count: 14 }
        ]
      },
      {
        letter: 'P',
        brands: [
          { name: 'Puma Rudolf Dassler Legacy', count: 6 }
        ]
      },
      {
        letter: 'R',
        brands: [
          { name: 'Reebok Beatnik & LTD', count: 8 },
          { name: 'ROA Technical Hiking', count: 17 }
        ]
      }
    ]
  },
  {
    group: 'GROUP 04 (S — Z)',
    letters: [
      {
        letter: 'S',
        brands: [
          { name: 'Salomon Advanced', count: 31 },
          { name: 'Saucony Originals Archival', count: 7 },
          { name: 'Stepney Workers Club', count: 9 },
          { name: 'Suicoke Japan', count: 13 }
        ]
      },
      {
        letter: 'U',
        brands: [
          { name: 'Undercover Jun Takahashi', count: 6 }
        ]
      },
      {
        letter: 'V',
        brands: [
          { name: 'Vans Vault by OTW', count: 16 }
        ]
      },
      {
        letter: 'Y',
        brands: [
          { name: 'Y-3 Yohji Yamamoto', count: 11 }
        ]
      }
    ]
  }
];

export const CURATED_LOOK_ITEMS: CuratedLookItem[] = [
  {
    id: 'look-01',
    brand: 'MORV ARCHIVE LABS',
    name: 'Heavyweight Japanese Cotton Socks (3-Pack)',
    price: 650,
    badge: 'ESSENTIAL COMPLEMENT',
    description: 'High-density 400gsm combed cotton woven in Wakayama, engineered with zero-slip heel ribbing for high-top silhouettes.',
    image: 'https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=600&q=80',
    category: 'accessories'
  },
  {
    id: 'look-02',
    brand: 'JASON MARKK x MORV',
    name: 'Archival Sneaker Care & Micro-Brush Protocol Kit',
    price: 980,
    badge: 'PRESERVATION',
    description: 'Biological foam formulation, hog-bristle gentle brush, and hydrophobic sealant for delicate cracked collar leathers.',
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80',
    category: 'care'
  },
  {
    id: 'look-03',
    brand: 'MORV CRYPTOGRAPHIC VAULT',
    name: 'Magnetic UV-Shield Acrylic Display Casket',
    price: 1450,
    badge: 'DISPLAY SPECIMEN',
    description: '99.4% UV-filtering museum grade cast acrylic with built-in NFC reader platform for certified deadstock specimens.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
    category: 'storage'
  }
];
