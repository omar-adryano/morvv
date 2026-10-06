import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { t, navigateTo, showToast, language } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast(language === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
      return;
    }
    setSubscribed(true);
    showToast(language === 'ar' ? 'تم الانضمام إلى نشرة MORV الأرشيفية ✓' : 'Subscribed to MORV Dispatch ✓');
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#ffffff] text-[#1c1b1b] border-t border-[#e5e2e1] pb-24 md:pb-0 font-sans">
      <div className="w-full px-4 sm:px-6 md:px-12 py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Col 1: Brand Manifesto (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              {/* Rule 22: Preserve MORV Logo */}
              <span className="font-['Syne'] text-2xl font-bold tracking-tighter uppercase text-[#000000]">
                MORV
              </span>
              <span className="text-[10px] font-sans px-2 py-0.5 bg-[#000000] text-[#ffffff] uppercase font-semibold tracking-wide">
                {t('flagship')}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-[#5e5f5c] max-w-sm">
              {t('footerBio')}
            </p>
          </div>

          <div className="space-y-1.5 pt-4 border-t border-[#f1edec]">
            <div className="text-[11px] font-sans font-medium uppercase text-[#747878] tracking-wide">
              {language === 'ar' ? 'سجل الاعتماد الأرشيفي' : 'Status Register'}
            </div>
            <div className="text-xs font-sans text-[#1c1b1b] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#d7ef30] inline-block"></span>
              <span className="font-semibold">{t('systemOnline')}</span>
            </div>
          </div>
        </div>

        {/* Col 2: Brand Roster (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-black">
            {t('brandRoster')}
          </h2>
          <ul className="space-y-2.5 text-sm text-[#5e5f5c]">
            <li>
              <button onClick={() => navigateTo('brands')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                Nike Tier Zero
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('brands')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                Jordan Archive
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('brands')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                New Balance Made
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('brands')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                Adidas Consortium
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('brands')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                Salomon Advanced
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('brands')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                Asics SportStyle
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Client Services (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-black">
            {t('clientServices')}
          </h2>
          <ul className="space-y-2.5 text-sm text-[#5e5f5c]">
            <li>
              <button onClick={() => navigateTo('orders')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                {t('dispatchTracking')}
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('editorial')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                {t('authenticityProtocol')}
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('editorial')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                {t('vaultStorageReturns')}
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('account')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                {t('privateConcierge')}
              </button>
            </li>
            <li>
              <button onClick={() => navigateTo('editorial')} className="hover:text-black transition-colors cursor-pointer text-left rtl:text-right">
                {t('collectorFAQ')}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter Dispatch (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-black">
            {t('theMorvDispatch')}
          </h2>
          <p className="text-sm text-[#5e5f5c] leading-relaxed">
            {t('newsletterDesc')}
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="flex border border-black focus-within:ring-1 focus-within:ring-black">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletterPlaceholder')}
                aria-label="Email Address"
                className="flex-1 bg-[#f7f3f2] px-3.5 py-2.5 text-xs text-black placeholder:text-[#747878] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#000000] text-[#ffffff] px-5 py-2.5 text-xs font-semibold uppercase hover:bg-[#313030] transition-colors shrink-0 cursor-pointer"
              >
                {subscribed ? '✓' : t('join')}
              </button>
            </div>
            <span className="text-[11px] text-[#747878]">
              {t('newsletterConfidentiality')}
            </span>
          </form>
        </div>
      </div>

      {/* Sub-Footer Legal Bar */}
      <div className="w-full px-4 sm:px-6 md:px-12 py-4 bg-[#f7f3f2] flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#5e5f5c]">
        <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
          <span>{t('allRightsReserved')}</span>
          <span className="hidden md:inline">/</span>
          <button onClick={() => navigateTo('editorial')} className="hover:text-black transition-colors cursor-pointer">
            {t('termsOfService')}
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('editorial')} className="hover:text-black transition-colors cursor-pointer">
            {t('privacy')}
          </button>
          <span>/</span>
          <button onClick={() => navigateTo('editorial')} className="hover:text-black transition-colors cursor-pointer">
            {t('provenanceAssurance')}
          </button>
          <span>/</span>
          <button
            onClick={() => navigateTo('admin')}
            className="text-black font-semibold hover:underline transition-all cursor-pointer flex items-center gap-1 bg-[#d7ef30] px-2 py-0.5"
          >
            <span>{language === 'ar' ? 'لوحة الإدارة' : 'Admin Portal'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span>{t('nodeStatus')}</span>
        </div>
      </div>
    </footer>
  );
};
