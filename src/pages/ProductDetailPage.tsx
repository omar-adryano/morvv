import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CURATED_LOOK_ITEMS, PRODUCTS } from '../data/products';
import { CuratedLookItem } from '../types';
import { SizeSelectorModal } from '../components/SizeSelectorModal';
import {
  ShieldCheck,
  ShoppingBag,
  Heart,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Check,
  Nfc,
  Truck,
  Box,
  CheckCircle2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, addToCart, isInWishlist, toggleWishlist, formatPrice, navigateTo, t, language } = useStore();

  const product = selectedProduct || PRODUCTS[0];

  // Gallery Active Image
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Selected Size
  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => s.inStock)?.size || product.sizes[0]?.size || '42'
  );

  // Size Selector Modal
  const [sizeModalOpen, setSizeModalOpen] = useState(false);

  // Accordions State
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    auth: true,
    details: false,
    dispatch: false
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const [addedAnimation, setAddedAnimation] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const selectedSizeObj = product.sizes.find((s) => s.size === selectedSize) || product.sizes[0];
  const activePrice = selectedSizeObj?.price || product.price;

  const handleAddToBag = () => {
    addToCart(product, selectedSize, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const displayName = language === 'ar' && product.nameAr ? product.nameAr : product.name;
  const displayDescription = language === 'ar' && product.descriptionAr ? product.descriptionAr : product.description;

  return (
    <div className="w-full flex flex-col bg-[#fdf8f8] font-sans">
      {/* Breadcrumb Bar */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-3 bg-white border-b border-[#e5e2e1] text-xs text-[#5e5f5c]">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button onClick={() => navigateTo('home')} className="hover:text-black transition-colors cursor-pointer">
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-black transition-colors cursor-pointer">
            {language === 'ar' ? 'المتجر' : 'Shop'}
          </button>
          <span>/</span>
          <span className="text-[#747878] uppercase">{product.brand}</span>
          <span>/</span>
          <span className="text-black font-semibold truncate max-w-[200px]">
            {displayName}
          </span>
        </div>
      </div>

      {/* Main Specimen Display Section */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT COLUMN: Gallery Viewport (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Primary Viewport Stage */}
            <div className="relative aspect-square sm:aspect-[4/3] bg-white border border-[#e5e2e1] p-4 sm:p-8 flex items-center justify-center overflow-hidden group">
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 bg-black text-white text-xs font-semibold uppercase tracking-wide">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Fullscreen Trigger */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white text-black border border-[#e5e2e1] transition-colors cursor-pointer"
                aria-label="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Main Image */}
              <img
                src={product.images[activeImageIndex] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />

              {/* Cryptographic Authenticity Stamp */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-[#f1edec]/90 backdrop-blur-md px-3 py-1.5 border border-[#e5e2e1]">
                <ShieldCheck className="w-4 h-4 text-[#d7ef30] fill-black" />
                <span className="text-[11px] font-semibold text-black">
                  {language === 'ar' ? 'فحص وتوثيق فيزيائي معتمد' : 'Verified Archival Specimen'}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation Strip */}
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative aspect-square bg-white border p-1 transition-all cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-black ring-1 ring-black'
                      : 'border-[#e5e2e1] hover:border-black'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Buying Console & Spec Matrix (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            {/* Header & Identity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#5e5f5c] uppercase font-medium">
                  {product.brand}
                </span>
                <span className="text-[#191e00] bg-[#d7ef30] font-bold px-2 py-0.5 text-[11px]">
                  {product.registryId || 'عينة معتمدة #041'}
                </span>
              </div>

              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-black font-bold leading-snug">
                <bdi>{displayName}</bdi>
              </h1>

              <p className="text-sm text-[#5e5f5c] leading-relaxed">
                {displayDescription}
              </p>
            </div>

            {/* Specification Data Tag Strip */}
            <div className="grid grid-cols-3 gap-2 bg-[#f1edec] p-3 border border-[#e5e2e1] text-xs">
              <div>
                <div className="text-[#747878] text-[11px] font-medium">{t('colorway')}</div>
                <div className="text-black font-semibold truncate mt-0.5">{product.colorway}</div>
              </div>
              <div>
                <div className="text-[#747878] text-[11px] font-medium">{t('styleCode')}</div>
                <div className="text-black font-mono text-[11px] font-semibold truncate mt-0.5">{product.styleCode}</div>
              </div>
              <div>
                <div className="text-[#747878] text-[11px] font-medium">{t('originYear')}</div>
                <div className="text-black font-semibold truncate mt-0.5">{product.originYear}</div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="space-y-1.5 border-y border-[#e5e2e1] py-4">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-3xl font-extrabold text-black tabular-nums">
                    {formatPrice(activePrice)}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#f1edec] px-2.5 py-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#d7ef30]"></span>
                  <span className="font-medium text-black">أفضل سعر موثق للمقتنين</span>
                </div>
              </div>

              <div className="text-xs text-[#5e5f5c] flex items-center gap-1.5 flex-wrap">
                <span>توصيل سريع ومجاني للطلبات فوق 2,500 ج.م في جميع محافظات مصر</span>
              </div>
            </div>

            {/* Size Matrix Console */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-black font-semibold">{t('selectSize')}</span>
                  <span className="text-[#747878]">(مقاسات الاتحاد الأوروبي EU)</span>
                </div>

                <button
                  type="button"
                  onClick={() => setSizeModalOpen(true)}
                  className="text-black underline font-semibold hover:text-[#5e5f5c] transition-colors cursor-pointer"
                >
                  {t('fittingProtocol')}
                </button>
              </div>

              {/* Size Selector Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.size;
                  return (
                    <button
                      key={s.size}
                      type="button"
                      onClick={() => setSelectedSize(s.size)}
                      disabled={!s.inStock}
                      className={`flex flex-col items-center justify-center p-2.5 transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-black text-white border-black font-bold ring-1 ring-black'
                          : s.inStock
                          ? 'bg-[#f1edec] hover:bg-[#ebe7e6] text-black border-[#e5e2e1]'
                          : 'bg-[#f7f3f2] text-black/30 border-[#e5e2e1] cursor-not-allowed line-through'
                      }`}
                    >
                      <span className="text-sm font-semibold tabular-nums">EU {s.size.replace('EU ', '').replace('US ', '')}</span>
                      <span
                        className={`text-[10px] mt-0.5 tabular-nums ${
                          isSelected ? 'text-[#d7ef30]' : 'text-[#5e5f5c]'
                        }`}
                      >
                        {formatPrice(s.price)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Size helper footnote */}
              <div className="p-2.5 bg-[#f1edec] text-[#5e5f5c] text-xs flex items-center justify-between border border-[#e5e2e1]">
                <span className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-black" />
                  {t('trueToSize')}
                </span>
                <span className="font-semibold text-black">المقاس القياسي الموصى به</span>
              </div>
            </div>

            {/* Primary Action Stack */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleAddToBag}
                className={`w-full py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                  addedAnimation
                    ? 'bg-[#d7ef30] text-[#191e00]'
                    : 'bg-black hover:bg-[#313030] text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedAnimation
                    ? (language === 'ar' ? 'تمت إضافة الحذاء إلى الحقيبة بنجاح ✓' : 'Secured in bag ✓')
                    : `${t('addToBag')} — ${formatPrice(activePrice)}`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className="w-full py-3.5 bg-[#f1edec] hover:bg-[#ebe7e6] text-black text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#e5e2e1]"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : ''}`} />
                <span>
                  {isWishlisted ? t('savedToVault') : t('saveToVault')}
                </span>
              </button>

              {/* Facility status */}
              <div className="w-full bg-[#f7f3f2] p-2.5 flex items-center justify-between text-xs text-[#5e5f5c] border border-[#e5e2e1]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#d7ef30]"></span>
                  <span>{t('inStockFacility')}</span>
                </div>
                <span className="font-semibold text-black">{t('dispatchesWithin')}</span>
              </div>
            </div>

            {/* Interactive Spec Accordions */}
            <div className="space-y-2.5 pt-2">
              {/* Accordion 1: Authenticity */}
              <div className="border border-[#e5e2e1] bg-white">
                <button
                  type="button"
                  onClick={() => toggleAccordion('auth')}
                  className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#fdf8f8] transition-colors cursor-pointer"
                >
                  <span className="text-xs font-semibold text-black flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-black" />
                    {t('authHeader')}
                  </span>
                  {openAccordions.auth ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.auth && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5e5f5c] space-y-3 border-t border-[#f1edec]">
                    <p className="leading-relaxed">{t('authDesc')}</p>
                    <div className="bg-[#f7f3f2] p-3 flex items-start gap-3 border border-[#e5e2e1]">
                      <Nfc className="w-6 h-6 text-black shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-black">
                          {t('nfcTitle')}
                        </div>
                        <div className="text-xs text-[#5e5f5c] mt-0.5 leading-relaxed">
                          {t('nfcDesc')}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion 2: Materials */}
              <div className="border border-[#e5e2e1] bg-white">
                <button
                  type="button"
                  onClick={() => toggleAccordion('details')}
                  className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#fdf8f8] transition-colors cursor-pointer"
                >
                  <span className="text-xs font-semibold text-black flex items-center gap-2">
                    <Box className="w-4 h-4 text-black" />
                    {t('productDetailsHeader')}
                  </span>
                  {openAccordions.details ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.details && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5e5f5c] space-y-3 border-t border-[#f1edec]">
                    <ul className="space-y-1.5 text-xs">
                      <li className="flex justify-between p-2 bg-[#f7f3f2]">
                        <span className="text-[#747878]">خامة الجزء العلوي</span>
                        <span className="text-black font-semibold">{product.specs?.upper || 'جلد طبيعي فاخر 100%'}</span>
                      </li>
                      <li className="flex justify-between p-2 bg-[#f7f3f2]">
                        <span className="text-[#747878]">طوق الكاحل والبطانة</span>
                        <span className="text-black font-semibold">{product.specs?.collar || 'جلد معالج مقاوم للتآكل'}</span>
                      </li>
                      <li className="flex justify-between p-2 bg-[#f7f3f2]">
                        <span className="text-[#747878]">تقنية النعل الأوسط</span>
                        <span className="text-black font-semibold">{product.specs?.midsole || 'وسادة هوائية مضغوطة'}</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed">
                      {displayDescription}
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Dispatch & Returns */}
              <div className="border border-[#e5e2e1] bg-white">
                <button
                  type="button"
                  onClick={() => toggleAccordion('dispatch')}
                  className="w-full p-4 flex items-center justify-between text-left rtl:text-right hover:bg-[#fdf8f8] transition-colors cursor-pointer"
                >
                  <span className="text-xs font-semibold text-black flex items-center gap-2">
                    <Truck className="w-4 h-4 text-black" />
                    {t('dispatchHeader')}
                  </span>
                  {openAccordions.dispatch ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {openAccordions.dispatch && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#5e5f5c] space-y-2 border-t border-[#f1edec]">
                    <p className="leading-relaxed">{t('dispatchDesc')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLETE THE ARCHIVAL LOOK */}
      <section className="w-full bg-[#f1edec] border-y border-[#e5e2e1] px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-8">
          <div>
            <span className="text-xs uppercase text-[#747878] tracking-wide block mb-1">
              {t('curatedCapsule')}
            </span>
            <h2 className="font-display text-2xl font-bold text-black">
              {t('completeLook')}
            </h2>
          </div>
          <span className="text-xs text-[#5e5f5c]">
            {t('selectedByTeam')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CURATED_LOOK_ITEMS.map((item: CuratedLookItem) => (
            <div
              key={item.id}
              className="bg-white border border-[#e5e2e1] p-5 flex flex-col justify-between group hover:border-black transition-colors"
            >
              <div className="relative aspect-square bg-[#f7f3f2] overflow-hidden mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 bg-black text-white text-[10px] px-2 py-0.5 uppercase font-bold">
                  {item.badge}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#5e5f5c]">
                  <span>{item.brand}</span>
                  <span className="text-black font-bold tabular-nums">{formatPrice(item.price)}</span>
                </div>
                <h3 className="font-display text-base font-bold text-black">
                  {item.name}
                </h3>
                <p className="text-xs text-[#5e5f5c] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f1edec] flex items-center justify-between">
                <span className="text-xs text-[#747878]">تجهيز فوري مع الطلب</span>
                <button
                  type="button"
                  onClick={() => addToCart(product, selectedSize, 1)}
                  className="px-3.5 py-1.5 bg-black hover:bg-[#313030] text-white text-xs font-semibold uppercase transition-colors cursor-pointer"
                >
                  + إضافة للحقيبة
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Specimens Grid */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e5e2e1]">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              عينات ذات صلة
            </span>
            <h2 className="font-display text-2xl font-bold text-black">
              أحذية أرشيفية متوافقة
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs font-semibold text-black hover:underline cursor-pointer"
          >
            تصفح الكتالوج الكامل ←
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4).map((p) => (
            <div
              key={p.id}
              onClick={() => {
                navigateTo('product', p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-white border border-[#e5e2e1] hover:border-black p-3 flex flex-col justify-between transition-colors cursor-pointer"
            >
              <div className="aspect-square bg-[#f7f3f2] p-2 mb-3 flex items-center justify-center overflow-hidden">
                <img
                  src={p.primaryImage}
                  alt={p.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1">
                <div className="text-[11px] text-[#747878] font-medium">{p.brand}</div>
                <h3 className="text-xs sm:text-sm font-semibold text-black truncate group-hover:underline">
                  {language === 'ar' && p.nameAr ? p.nameAr : p.name}
                </h3>
                <div className="text-xs font-bold text-black pt-1 tabular-nums">{formatPrice(p.price)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Size Selector Modal */}
      {sizeModalOpen && (
        <SizeSelectorModal
          isOpen={sizeModalOpen}
          onClose={() => setSizeModalOpen(false)}
          onSelectSize={(sz: string) => setSelectedSize(sz)}
          selectedSize={selectedSize}
        />
      )}
    </div>
  );
};
