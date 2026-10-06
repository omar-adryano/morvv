import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowRight } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo, formatPrice, t, language, products } = useStore();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const catalogProducts = products && products.length > 0 ? products : PRODUCTS;

  const filteredProducts = query.trim()
    ? catalogProducts.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.colorway.toLowerCase().includes(q) ||
          p.styleCode.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          (p.nameAr && p.nameAr.includes(q))
        );
      })
    : [];

  const popularSearches = ['Air Jordan 1', 'Salomon XT-6', 'New Balance 990', 'adidas Samba', 'Gore-Tex', 'Asics Gel'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#000000]/80 backdrop-blur-md animate-in fade-in duration-150">
      {/* Search Header Container */}
      <div className="w-full bg-[#ffffff] border-b border-[#e5e2e1] px-4 sm:px-6 md:px-12 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          <div className="flex-1 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#5e5f5c] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full bg-transparent text-base sm:text-lg font-sans text-black placeholder:text-[#747878] focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="p-1 text-[#747878] hover:text-black">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline font-mono text-[11px] text-[#747878] bg-[#f1edec] px-2 py-1">
              ESC
            </span>
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-1.5 hover:bg-[#f1edec] text-[#5e5f5c] hover:text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Popular Searches */}
        <div className="max-w-4xl mx-auto mt-3 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-[#747878] font-sans shrink-0">
            {language === 'ar' ? 'بحث شائع:' : 'Trending:'}
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setQuery(term)}
              className="px-2.5 py-1 bg-[#f1edec] hover:bg-black hover:text-white font-sans text-xs text-[#1c1b1b] transition-colors shrink-0 cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          {query.trim() === '' ? (
            <div className="text-center py-16 text-[#c9c6c5] space-y-2">
              <p className="font-display text-lg font-bold text-white/90">
                {language === 'ar' ? 'ابحث في أرشيف الأحذية الموثقة' : 'Search the Archival Registry'}
              </p>
              <p className="text-sm text-white/60">
                {language === 'ar' ? 'اكتب اسم الماركة، الطراز، أو المقاس للبدء' : 'Type brand, model name, or style code to view allocation'}
              </p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-[#ffffff]/5 border border-white/10 p-8 space-y-3">
              <p className="font-display text-lg font-bold text-white">
                {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No Specimens Found'}
              </p>
              <p className="text-sm text-white/70 max-w-md mx-auto">
                {language === 'ar'
                  ? `لم نجد أي حذاء يطابق "${query}". تحقق من الإملاء أو تصفح كامل الكتالوج.`
                  : `No archival footwear matched "${query}". Check spelling or explore all allocations.`}
              </p>
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  navigateTo('shop');
                }}
                className="mt-4 px-6 py-2.5 bg-white text-black font-sans text-xs font-semibold hover:bg-[#d7ef30] transition-colors cursor-pointer"
              >
                {t('startShopping')}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-white/70 border-b border-white/10 pb-2">
                <span>{filteredProducts.length} {language === 'ar' ? 'عينة مطابقة' : 'Specimens Found'}</span>
                <span>{t('vaultVerified')}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      navigateTo('product', prod);
                    }}
                    className="bg-[#ffffff] p-3 flex gap-3 cursor-pointer group hover:bg-[#fdf8f8] transition-colors"
                  >
                    <div className="w-16 h-16 bg-[#f7f3f2] p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={prod.primaryImage}
                        alt={prod.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] text-[#747878] truncate font-medium">
                          {prod.brand}
                        </div>
                        <h4 className="text-xs sm:text-sm font-semibold text-black truncate group-hover:underline">
                          {language === 'ar' && prod.nameAr ? prod.nameAr : prod.name}
                        </h4>
                      </div>
                      <div className="text-xs font-bold text-black tabular-nums">
                        {formatPrice(prod.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
