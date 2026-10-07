import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Grid, Columns, X, ShieldCheck, Box, Plane } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { t, language, products } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string>('ALL');
  const [selectedFamily, setSelectedFamily] = useState<string>('ALL');
  const [selectedSize, setSelectedSize] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('recent');
  const [gridDensity, setGridDensity] = useState<'matrix' | 'editorial'>('matrix');
  const [visibleCount, setVisibleCount] = useState<number>(16);

  const catalogProducts = products && products.length > 0 ? products : PRODUCTS;

  // Filter logic
  const filtered = useMemo(() => {
    return catalogProducts.filter((product) => {
      // Brand filter
      if (selectedBrand !== 'ALL' && !product.brand.toLowerCase().includes(selectedBrand.toLowerCase())) {
        return false;
      }
      // Family / Category filter
      if (selectedFamily !== 'ALL' && product.category?.toLowerCase() !== selectedFamily.toLowerCase()) {
        return false;
      }
      // Size filter
      if (selectedSize !== 'ALL') {
        const cleanSelected = selectedSize.replace('EU ', '').trim();
        const hasSize = product.sizes.some((s) => s.size.replace('EU ', '').trim() === cleanSelected && s.inStock);
        if (!hasSize) return false;
      }
      return true;
    });
  }, [selectedBrand, selectedFamily, selectedSize, catalogProducts]);

  // Sort logic
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'tier') {
        const tierRank: Record<string, number> = { 'TIER 0 / DEADSTOCK': 3, 'ARCHIVAL RESTOCK': 2, 'COLLABORATION': 1 };
        return (tierRank[b.tier || ''] || 0) - (tierRank[a.tier || ''] || 0);
      }
      return (b.originYear || '').localeCompare(a.originYear || '');
    });
  }, [filtered, sortBy]);

  const brandTabs = [
    { id: 'ALL', label: t('allBrands'), count: catalogProducts.length },
    { id: 'Jordan', label: 'Jordan Brand', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('JORDAN')).length },
    { id: 'Nike', label: 'Nike Archive', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('NIKE')).length },
    { id: 'New Balance', label: 'New Balance', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('NEW BALANCE')).length },
    { id: 'Adidas', label: 'adidas Consortium', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('ADIDAS')).length },
    { id: 'Salomon', label: 'Salomon Lab', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('SALOMON')).length },
    { id: 'Asics', label: 'Asics SportStyle', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('ASICS')).length },
    { id: 'Maison Margiela', label: 'Margiela 22', count: catalogProducts.filter(p => p.brand.toUpperCase().includes('MARGIELA')).length },
  ];

  const families = [
    { id: 'ALL', label: language === 'ar' ? 'جميع الفئات' : 'All Categories' },
    { id: 'basketball', label: 'Basketball' },
    { id: 'court', label: 'Court & Tennis' },
    { id: 'runners', label: 'Technical Runners' },
    { id: 'mules', label: 'Mules & Slides' },
    { id: 'gore-tex', label: 'GORE-TEX Tactical' },
    { id: 'archive', label: 'Heritage Archive' },
  ];

  const sizeOptions = ['40', '41', '42', '43', '44', '45'];

  const clearFilters = () => {
    setSelectedBrand('ALL');
    setSelectedFamily('ALL');
    setSelectedSize('ALL');
    setSortBy('recent');
  };

  const hasActiveFilters = selectedBrand !== 'ALL' || selectedFamily !== 'ALL' || selectedSize !== 'ALL';

  return (
    <div className="w-full flex flex-col font-sans">
      {/* Page Header */}
      <section className="w-full bg-[#ffffff] border-b border-[#e5e2e1] px-4 sm:px-6 md:px-12 pt-6 sm:pt-10 pb-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between text-xs text-[#5e5f5c]">
            <span className="uppercase tracking-wide font-medium">
              {language === 'ar' ? 'سجل الأحذية المعتمدة' : 'Archival Footwear Catalog'}
            </span>
            <span className="px-2.5 py-0.5 bg-[#f1edec] text-black text-xs font-semibold tabular-nums">
              {sorted.length} {language === 'ar' ? 'عينة متوفرة' : 'Pairs Available'}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pt-1">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-black leading-tight">
                {language === 'ar' ? 'كتالوج الأحذية الرياضية الأرشيفية' : 'Curated Footwear Index'}
              </h1>
              <p className="text-sm sm:text-base text-[#5e5f5c] mt-1 font-medium">
                {language === 'ar' ? 'أحدث الإصدارات الميتة والمعتمدة بشريحة NFC' : 'Deadstock certified archival releases & collector specimens'}
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#5e5f5c] text-xs">
              <span className="w-2 h-2 rounded-full bg-[#d7ef30]"></span>
              <span className="font-semibold text-black">
                {language === 'ar' ? 'توثيق فيزيائي معتمد في مصر والعالم' : 'Physical Verification & NFC Certification'}
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#5e5f5c] max-w-3xl leading-relaxed pt-1">
            {language === 'ar'
              ? 'سجل الأحذية الرياضية متعدد الماركات الكامل. يتم فحص كل زوج فيزيائياً والتحقق من أصالته في مرافق توزيع لندن ونيويورك والقاهرة قبل فهرستها واعتماد شحنها الآمن.'
              : 'The complete multi-brand sneaker index. Every pair in our inventory is physically inspected and authenticated prior to cataloging and security dispatch.'}
          </p>
        </div>
      </section>

      {/* Sticky Filter Deck */}
      <div className="sticky top-16 sm:top-20 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e2e1] shadow-xs">
        {/* Row 1: Brand Tabs & Controls */}
        <div className="px-4 sm:px-6 md:px-12 py-2.5 flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-[#f7f3f2]">
          {/* Brand Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 text-xs">
            {brandTabs.map((brand) => (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-3 py-1.5 shrink-0 transition-colors cursor-pointer font-medium ${
                  selectedBrand === brand.id
                    ? 'bg-black text-white font-semibold'
                    : 'bg-white hover:bg-[#ebe7e6] text-black border border-[#e5e2e1]'
                }`}
              >
                {brand.label} ({brand.count})
              </button>
            ))}
          </div>

          {/* Controls: Matrix Switcher + Sort */}
          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            {/* View Density Switcher */}
            <div className="flex items-center bg-[#f1edec] p-0.5 border border-[#e5e2e1]">
              <button
                onClick={() => setGridDensity('matrix')}
                className={`px-2.5 py-1 text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  gridDensity === 'matrix' ? 'bg-white text-black shadow-xs font-semibold' : 'text-[#747878] hover:text-black'
                }`}
                title="Matrix View (4-Col)"
              >
                <Grid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'شبكة متقدمة' : 'Matrix (4X)'}</span>
              </button>
              <button
                onClick={() => setGridDensity('editorial')}
                className={`px-2.5 py-1 text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                  gridDensity === 'editorial' ? 'bg-white text-black shadow-xs font-semibold' : 'text-[#747878] hover:text-black'
                }`}
                title="Editorial View (2-Col)"
              >
                <Columns className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{language === 'ar' ? 'عرض تحريري' : 'Editorial (2X)'}</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center bg-white border border-[#e5e2e1] px-3 py-1 text-xs">
              <span className="text-[#747878] mr-2 hidden sm:inline">{language === 'ar' ? 'الترتيب:' : 'Sort:'}</span>
              <select
                aria-label="Sort Footwear Catalog"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-black font-semibold focus:outline-none cursor-pointer text-xs"
              >
                <option value="recent">{language === 'ar' ? 'الأحدث إضافة' : 'Recently Added'}</option>
                <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}</option>
                <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}</option>
                <option value="tier">{language === 'ar' ? 'أندر العينات الأرشيفية' : 'Tier 0 / Deadstock'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Category & Size Matrix */}
        <div className="px-4 sm:px-6 md:px-12 py-2 bg-white flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#f1edec]">
          {/* Family Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[#747878] hidden md:inline text-xs font-medium">{language === 'ar' ? 'الفئة:' : 'Category:'}</span>
            {families.map((fam) => (
              <button
                key={fam.id}
                onClick={() => setSelectedFamily(fam.id)}
                className={`px-2.5 py-1 text-xs shrink-0 transition-colors cursor-pointer ${
                  selectedFamily === fam.id
                    ? 'bg-black text-white font-semibold'
                    : 'bg-[#f7f3f2] hover:bg-[#ebe7e6] text-[#5e5f5c]'
                }`}
              >
                {fam.label}
              </button>
            ))}
          </div>

          {/* Size Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[#747878] mr-1 hidden lg:inline text-xs font-medium">{language === 'ar' ? 'المقاس (EU):' : 'Size (EU):'}</span>
            {sizeOptions.map((sz) => (
              <button
                key={sz}
                onClick={() => setSelectedSize(selectedSize === sz ? 'ALL' : sz)}
                className={`w-7 h-7 flex items-center justify-center text-xs transition-colors cursor-pointer tabular-nums ${
                  selectedSize === sz
                    ? 'bg-black text-white font-bold'
                    : 'bg-[#f7f3f2] hover:bg-[#ebe7e6] text-[#1c1b1b] border border-[#e5e2e1]'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filter Badges */}
        <div className="px-4 sm:px-6 md:px-12 py-1.5 bg-[#fdf8f8] flex items-center justify-between border-t border-[#f1edec] text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#747878]">{language === 'ar' ? 'التصفية النشطة:' : 'Active Filters:'}</span>
            {selectedBrand !== 'ALL' && (
              <span className="bg-black text-white px-2 py-0.5 text-xs flex items-center gap-1">
                <span>{selectedBrand}</span>
                <button onClick={() => setSelectedBrand('ALL')} className="hover:text-[#d7ef30] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFamily !== 'ALL' && (
              <span className="bg-black text-white px-2 py-0.5 text-xs flex items-center gap-1">
                <span>{selectedFamily}</span>
                <button onClick={() => setSelectedFamily('ALL')} className="hover:text-[#d7ef30] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedSize !== 'ALL' && (
              <span className="bg-black text-white px-2 py-0.5 text-xs flex items-center gap-1">
                <span>EU {selectedSize}</span>
                <button onClick={() => setSelectedSize('ALL')} className="hover:text-[#d7ef30] cursor-pointer">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[#747878] hover:text-black underline text-xs ml-2 cursor-pointer"
              >
                {t('clearAll')}
              </button>
            )}
          </div>

          <div className="text-xs text-[#747878] tabular-nums">
            {language === 'ar'
              ? `عرض ${Math.min(visibleCount, sorted.length)} من ${sorted.length} حذاء`
              : `Showing ${Math.min(visibleCount, sorted.length)} of ${sorted.length} pairs`}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-8">
        {sorted.length === 0 ? (
          <div className="w-full py-16 sm:py-20 text-center bg-white border border-[#e5e2e1] p-6 sm:p-8 space-y-3">
            <h3 className="font-display text-xl font-bold text-black">
              {language === 'ar' ? 'لم يتم العثور على أحذية مطابقة لخيارات التصفية' : 'No specimens matched selected filters'}
            </h3>
            <p className="text-sm text-[#5e5f5c]">
              {language === 'ar'
                ? 'يرجى تعديل خيارات المقاس أو الماركة أو الفئة لعرض المزيد من الأحذية الأرشيفية.'
                : 'Try adjusting your size, brand, or category filters to explore more archival footwear.'}
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-semibold hover:bg-[#313030] transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'إعادة ضبط جميع خيارات التصفية' : 'Reset All Filters'}
            </button>
          </div>
        ) : (
          <div
            className={
              gridDensity === 'matrix'
                ? 'grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6'
                : 'grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'
            }
          >
            {sorted.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Load More Pagination */}
        {visibleCount < sorted.length && (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 text-center max-w-md mx-auto">
            <div className="w-full flex items-center justify-between text-xs text-[#5e5f5c]">
              <span>
                {language === 'ar'
                  ? `تم عرض ${Math.min(visibleCount, sorted.length)} من ${sorted.length} عينة`
                  : `Showing ${Math.min(visibleCount, sorted.length)} of ${sorted.length} specimens`}
              </span>
              <span className="tabular-nums">
                {Math.round((visibleCount / sorted.length) * 100)}% {language === 'ar' ? 'من الكتالوج' : 'of Catalog'}
              </span>
            </div>

            <div className="w-full h-1 bg-[#e5e2e1] overflow-hidden">
              <div
                className="h-full bg-black transition-all duration-300"
                style={{ width: `${(visibleCount / sorted.length) * 100}%` }}
              />
            </div>

            <button
              onClick={() => setVisibleCount((prev) => prev + 12)}
              className="w-full sm:w-auto px-8 py-3 bg-black text-white text-xs font-semibold hover:bg-[#313030] transition-colors cursor-pointer min-h-[44px]"
            >
              {language === 'ar' ? 'عرض 12 حذاء إضافي' : 'Load 12 More Specimens'}
            </button>

            <span className="text-xs text-[#747878]">
              {language === 'ar'
                ? 'شحن مؤمن بالكامل لجميع محافظات مصر مع شريحة توثيق NFC مرفقة مع كل طلب'
                : 'Insured priority dispatch across Egypt with NFC authenticity card included'}
            </span>
          </div>
        )}
      </section>

      {/* Trust & Integrity Banner */}
      <section className="w-full bg-[#f1edec] border-t border-[#e5e2e1] px-4 sm:px-6 md:px-12 py-10 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white border border-[#e5e2e1] space-y-2">
            <div className="flex items-center gap-2 text-black font-semibold text-sm">
              <ShieldCheck className="w-5 h-5 text-[#d7ef30] fill-black" />
              <span>فحص توثيق فيزيائي مزدوج</span>
            </div>
            <p className="text-xs text-[#5e5f5c] leading-relaxed">
              كل زوج يخضع لـ 18 نقطة فحص فيزيائي وميكروسكوبي دقيقة للتأكد من خلوه من أي عيوب قبل إصدار ختم الأصالة.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e2e1] space-y-2">
            <div className="flex items-center gap-2 text-black font-semibold text-sm">
              <Box className="w-5 h-5 text-[#d7ef30] fill-black" />
              <span>حفظ في غرف مبردة وخالية من الأكسدة</span>
            </div>
            <p className="text-xs text-[#5e5f5c] leading-relaxed">
              جميع العينات مخزنة في بيئة محكمة الحرارة والرطوبة لضمان حماية النعل والجلد من أي اصفرار أو تلف.
            </p>
          </div>

          <div className="p-6 bg-white border border-[#e5e2e1] space-y-2">
            <div className="flex items-center gap-2 text-black font-semibold text-sm">
              <Plane className="w-5 h-5 text-[#d7ef30]" />
              <span>توصيل سريع وآمن لجميع المحافظات</span>
            </div>
            <p className="text-xs text-[#5e5f5c] leading-relaxed">
              تغليف مصفح مزدوج مع شريط أمني مرقم ومتابعة لحظية للشحنة مع مندوبنا حتى باب منزلك.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
