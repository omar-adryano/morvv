import React, { useState } from 'react';
import { useStore, Currency } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, Menu, X, User, ShieldCheck } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    currency,
    setCurrency,
    cartCount,
    wishlist,
    setIsCartOpen,
    setIsSearchOpen,
    currentView,
    navigateTo,
    user
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'shop', labelKey: 'newArrivals', view: 'shop' },
    { id: 'brands', labelKey: 'brands', view: 'brands' },
    { id: 'editorial', labelKey: 'editorialLaunches', view: 'editorial' },
    { id: 'vault', labelKey: 'archiveVault', view: 'brands' },
    { id: 'mens', labelKey: 'mens', view: 'shop' },
    { id: 'womens', labelKey: 'womens', view: 'shop' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fdf8f8]/95 backdrop-blur-md border-b border-[#e5e2e1]">
      {/* Top Archival Priority Bar */}
      <div className="w-full bg-[#000000] text-[#ffffff] py-1.5 px-4 sm:px-6 md:px-12">
        <div className="w-full flex items-center justify-between text-xs font-sans">
          <div className="flex items-center gap-2 truncate">
            <span className="w-1.5 h-1.5 bg-[#d7ef30] inline-block shrink-0 rounded-full"></span>
            <span className="truncate text-[#e5e2e1] text-[11px] sm:text-xs">{t('ticker')}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-[#c4c7c7] text-xs">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
              className="hover:text-white transition-colors cursor-pointer font-semibold px-2 py-0.5 border border-[#444748] hover:border-[#d7ef30] text-[#d7ef30] text-[11px]"
              title="Toggle Language / تغيير اللغة"
            >
              {language === 'ar' ? 'EN' : 'عربي'}
            </button>

            <span className="hidden sm:inline text-[#444748]">/</span>

            {/* Currency Indicator */}
            <span className="hidden sm:inline-block text-xs font-medium text-white">
              EGP (ج.م)
            </span>

            <span className="hidden lg:inline text-[#444748]">/</span>
            <button
              onClick={() => navigateTo('editorial')}
              className="hidden lg:inline hover:text-white transition-colors cursor-pointer text-xs"
            >
              {t('authenticityGuarantee')}
            </button>
            <span className="hidden lg:inline text-[#444748]">/</span>
            <button
              onClick={() => navigateTo('account')}
              className="hidden lg:inline hover:text-white transition-colors cursor-pointer text-xs"
            >
              {t('concierge')}
            </button>

            <span className="text-[#444748]">/</span>
            {/* Admin Command Center */}
            <button
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#d7ef30] hover:bg-white text-[#191e00] hover:text-black text-xs font-semibold transition-all shadow-xs cursor-pointer"
              title="MORV Admin Command Center"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'لوحة التحكم' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="h-16 sm:h-20 w-full px-4 sm:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark & Nav */}
        <div className="flex items-center gap-6 lg:gap-10">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2.5 cursor-pointer focus:outline-none text-left"
          >
            {/* Rule 22: DO NOT CHANGE THE MORV LOGO */}
            <span className="font-['Syne'] text-2xl sm:text-3xl font-extrabold tracking-tighter uppercase text-[#000000]">
              MORV
            </span>
            <span className="text-[10px] font-sans px-1.5 py-0.5 bg-[#d7ef30] text-[#191e00] font-bold uppercase tracking-wide">
              ARCHIVE
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium">
            {navLinks.map((link) => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.view)}
                  className={`transition-colors cursor-pointer pb-0.5 ${
                    isActive ? 'text-black font-semibold border-b-2 border-black' : 'text-[#5e5f5c] hover:text-black'
                  }`}
                >
                  {t(link.labelKey as any)}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Search Button */}
          <button
            aria-label="Search Catalog"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 bg-[#f1edec] hover:bg-[#ebe7e6] px-3 py-1.5 text-[#1c1b1b] transition-colors cursor-pointer rounded-none"
            type="button"
          >
            <Search className="w-4 h-4 text-[#5e5f5c]" />
            <span className="hidden md:inline text-xs font-medium text-[#1c1b1b]">
              {t('search')}
            </span>
            <kbd className="hidden md:inline font-mono text-[10px] text-[#5e5f5c] bg-[#e5e2e1] px-1 ml-1 rounded-xs">
              ⌘K
            </kbd>
          </button>

          {/* Wishlist Button */}
          <button
            aria-label="Wishlist"
            onClick={() => navigateTo('wishlist')}
            className={`hidden md:flex relative p-2 text-[#1c1b1b] hover:text-black transition-colors cursor-pointer ${
              currentView === 'wishlist' ? 'bg-[#f1edec]' : ''
            }`}
          >
            <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-black text-black' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 text-[10px] w-4 h-4 rounded-full bg-[#1c1b1b] text-white flex items-center justify-center font-bold tabular-nums">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button
            aria-label="Shopping Bag"
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#1c1b1b] hover:text-black transition-colors cursor-pointer bg-[#f1edec] hover:bg-[#ebe7e6]"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="absolute -top-1 -right-1 text-[10px] min-w-4 h-4 px-1 rounded-full bg-[#000000] text-[#ffffff] flex items-center justify-center font-bold ring-2 ring-[#fdf8f8] tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* User Account / Avatar */}
          <button
            aria-label="Account Profile"
            onClick={() => navigateTo(user ? 'account' : 'auth')}
            className="hidden md:flex relative items-center justify-center p-2 ml-1 border border-[#e5e2e1] hover:border-black transition-colors cursor-pointer"
          >
            <User className="w-4 h-4 text-[#1c1b1b]" />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#d7ef30] ring-1 ring-white"></span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1c1b1b] hover:text-black transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Luxury Mobile Slide-down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[calc(28px+4rem)] bottom-0 bg-[#ffffff] z-50 flex flex-col justify-between overflow-y-auto border-t border-[#e5e2e1] px-5 py-6 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
              <span className="text-xs font-semibold text-[#747878] uppercase tracking-wide">
                {language === 'ar' ? 'أقسام المتجر' : 'Store Catalog'}
              </span>
              <span className="text-xs bg-[#d7ef30] text-[#191e00] px-2 py-0.5 font-bold">
                MORV EGYPT
              </span>
            </div>

            <nav className="flex flex-col space-y-1 text-base sm:text-lg font-medium">
              {navLinks.map((link) => {
                const isActive = currentView === link.view;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      navigateTo(link.view);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left rtl:text-right py-3.5 border-b border-[#f7f3f2] flex items-center justify-between transition-colors ${
                      isActive ? 'text-[#000000] font-bold pl-2 rtl:pr-2 border-l-2 rtl:border-l-0 rtl:border-r-2 border-black' : 'text-[#313030] hover:text-black'
                    }`}
                  >
                    <span>{t(link.labelKey as any)}</span>
                    <span className="text-sm text-[#747878] rtl:rotate-180">→</span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Mobile Links */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => {
                  navigateTo('wishlist');
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-[#f7f3f2] border border-[#e5e2e1] flex items-center justify-between text-left rtl:text-right"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-black" />
                  <span className="text-xs font-semibold text-black">
                    {t('wishlist')}
                  </span>
                </div>
                <span className="text-xs font-bold bg-black text-white px-2 py-0.5 tabular-nums">
                  {wishlist.length}
                </span>
              </button>

              <button
                onClick={() => {
                  navigateTo(user ? 'account' : 'auth');
                  setMobileMenuOpen(false);
                }}
                className="p-3 bg-[#f7f3f2] border border-[#e5e2e1] flex items-center justify-between text-left rtl:text-right"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-black" />
                  <span className="text-xs font-semibold text-black truncate">
                    {user ? user.name.split(' ')[0] : t('account')}
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#d7ef30]"></span>
              </button>
            </div>

            {/* Admin Console Direct Mobile Launcher */}
            <button
              onClick={() => {
                navigateTo('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full p-3 bg-[#1c1b1b] text-[#d7ef30] border border-black flex items-center justify-between text-left rtl:text-right text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d7ef30]" />
                <span>{language === 'ar' ? 'لوحة تحكم المتجر (Admin Portal)' : 'Store Admin Portal'}</span>
              </div>
              <span className="text-[10px] bg-[#d7ef30] text-black px-2 py-0.5 font-bold">CONTROL</span>
            </button>
          </div>

          {/* Mobile Drawer Bottom Settings */}
          <div className="pt-6 mt-6 border-t border-[#e5e2e1] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className="flex-1 py-2 px-3 bg-black text-white font-medium text-xs text-center"
              >
                {language === 'ar' ? 'English (LTR)' : 'العربية (RTL)'}
              </button>
              
              <div className="flex-1 flex items-center justify-center bg-[#f1edec] border border-[#e5e2e1] px-3 py-2 text-xs font-semibold text-black">
                العملة: ج.م (EGP)
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5e5f5c]">
              <span>MORV FOOTWEAR ARCHIVE</span>
              <span>مصر · Cairo, Egypt</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
