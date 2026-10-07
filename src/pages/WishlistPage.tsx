import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo, t, language, products } = useStore();

  const catalog = products && products.length > 0 ? products : PRODUCTS;
  const wishlistedProducts = catalog.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-14 bg-[#fdf8f8] font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-[#e5e2e1] pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              {language === 'ar' ? 'قائمة الرغبات والمراقبة الخاصة' : 'Private Watchlist & Acquisition Vault'}
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {language === 'ar' ? 'خزينة المفضلة والمراقبة' : 'Vault Wishlist'}
            </h1>
          </div>
          <span className="text-xs text-[#5e5f5c] tabular-nums">
            {wishlistedProducts.length} {language === 'ar' ? 'عينات محفوظة' : 'Saved'}
          </span>
        </div>

        {wishlistedProducts.length === 0 ? (
          <div className="bg-white border border-[#e5e2e1] p-12 text-center space-y-4">
            <Heart className="w-12 h-12 text-[#c4c7c7] mx-auto stroke-1" />
            <h2 className="font-display text-lg font-bold text-black">
              {language === 'ar' ? 'لا توجد عينات في قائمة المفضلة' : 'No Specimens in Vault Wishlist'}
            </h2>
            <p className="text-sm text-[#5e5f5c] max-w-sm mx-auto leading-relaxed">
              {language === 'ar'
                ? 'انقر على رمز القلب في أي بطاقة حذاء لحفظ العينات ومتابعة توفر المقاسات وتحديثات الأسعار.'
                : 'Tap the heart icon on any sneaker card to monitor restocks, rarity, and price updates.'}
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase hover:bg-[#313030] transition-colors cursor-pointer"
            >
              {t('startShopping')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {wishlistedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
