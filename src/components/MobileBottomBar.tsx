import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Layers, Search, Heart, ShoppingBag } from 'lucide-react';

export const MobileBottomBar: React.FC = () => {
  const { currentView, navigateTo, cartCount, wishlist, setIsSearchOpen, setIsCartOpen, t, language } = useStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#ffffff]/98 backdrop-blur-lg border-t border-[#e5e2e1] px-1 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 items-center text-center">
        {/* Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentView === 'home' ? 'text-black font-semibold' : 'text-[#747878]'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-sans">
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </span>
          {currentView === 'home' && (
            <span className="w-1 h-1 rounded-full bg-black mt-0.5"></span>
          )}
        </button>

        {/* Shop / Catalog */}
        <button
          onClick={() => navigateTo('shop')}
          className={`flex flex-col items-center justify-center py-1 transition-colors relative ${
            currentView === 'shop' ? 'text-black font-semibold' : 'text-[#747878]'
          }`}
        >
          <Layers className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-sans">
            {language === 'ar' ? 'المتجر' : 'Shop'}
          </span>
          {currentView === 'shop' && (
            <span className="w-1 h-1 rounded-full bg-black mt-0.5"></span>
          )}
        </button>

        {/* Search */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-[#747878] hover:text-black transition-colors"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-sans">
            {language === 'ar' ? 'بحث' : 'Search'}
          </span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => navigateTo('wishlist')}
          className={`relative flex flex-col items-center justify-center py-1 transition-colors ${
            currentView === 'wishlist' ? 'text-black font-semibold' : 'text-[#747878]'
          }`}
        >
          <div className="relative">
            <Heart className={`w-5 h-5 mb-0.5 ${wishlist.length > 0 ? 'fill-black text-black' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 text-[10px] min-w-3.5 h-3.5 px-1 rounded-full bg-black text-white flex items-center justify-center font-bold tabular-nums">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[11px] font-sans">
            {language === 'ar' ? 'المفضلة' : 'Wishlist'}
          </span>
          {currentView === 'wishlist' && (
            <span className="w-1 h-1 rounded-full bg-black mt-0.5"></span>
          )}
        </button>

        {/* Bag */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-1 text-black transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[10px] min-w-3.5 h-3.5 px-1 rounded-full bg-[#d7ef30] text-[#191e00] flex items-center justify-center font-bold ring-1 ring-black tabular-nums">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-sans font-semibold">
            {language === 'ar' ? 'السلة' : 'Cart'}
          </span>
        </button>
      </div>
    </div>
  );
};
