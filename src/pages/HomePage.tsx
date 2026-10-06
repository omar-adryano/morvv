import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, RAFFLES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ArrowRight, ShieldCheck, Plane, QrCode, RefreshCw } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t, navigateTo, showToast, language, products, formatPrice } = useStore();

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter Tabs
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'vault' | 'collab' | 'upcoming'>('all');

  const catalogProducts = products && products.length > 0 ? products : PRODUCTS;
  const filteredProducts = catalogProducts.filter((p) => {
    if (activeFilter === 'recent') return p.newArrival;
    if (activeFilter === 'vault') return p.tier?.includes('VAULT') || p.badge?.includes('VAULT');
    if (activeFilter === 'collab') return p.badge?.includes('COLLABORATION') || p.brand.includes('x');
    if (activeFilter === 'upcoming') return p.badge?.includes('NEW DROP') || p.badge?.includes('DEADSTOCK');
    return true;
  });

  // Raffle Interaction State
  const [enteredRaffles, setEnteredRaffles] = useState<string[]>([]);
  const [notifiedRaffles, setNotifiedRaffles] = useState<string[]>([]);

  const handleEnterRaffle = (id: string, name: string) => {
    if (enteredRaffles.includes(id)) return;
    setEnteredRaffles([...enteredRaffles, id]);
    showToast(language === 'ar' ? `تم تسجيل دخولك في سحب ${name} ✓` : `Entered raffle for ${name} ✓`);
  };

  const handleNotifyRaffle = (id: string, name: string) => {
    if (notifiedRaffles.includes(id)) return;
    setNotifiedRaffles([...notifiedRaffles, id]);
    showToast(language === 'ar' ? `سيتم إشعارك فور انطلاق ${name} ✓` : `Notification configured for ${name} ✓`);
  };

  return (
    <div className="w-full flex flex-col font-sans">
      {/* SECTION 1: ARCHITECTURAL HERO LAUNCH */}
      <section className="w-full bg-[#fdf8f8] text-[#1c1b1b] border-b border-[#e5e2e1] overflow-hidden">
        <div className="w-full px-4 sm:px-6 md:px-12 py-6 sm:py-10 md:py-14">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6 text-xs text-[#5e5f5c] border-b border-[#e5e2e1] pb-3">
            <div className="flex items-center gap-2 truncate">
              <span className="w-2 h-2 rounded-full bg-[#d7ef30] inline-block shrink-0"></span>
              <span className="font-semibold text-black truncate">{t('dropTag')}</span>
              <span className="hidden sm:inline text-[#c4c7c7]">/</span>
              <span className="hidden md:inline truncate">طوكيو · باريس · لندن · القاهرة</span>
            </div>
            <div className="flex items-center gap-3 text-black shrink-0 text-xs">
              <span className="text-[#5e5f5c] hidden xs:inline">{t('deadstockPool')}</span>
              <span className="font-semibold text-[#1c1b1b]">{t('unitsRemaining')}</span>
            </div>
          </div>

          {/* 12-Column Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
            {/* Left 5 Cols: Editorial Text & Launch Console */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-block bg-black text-white px-2.5 py-1 text-xs font-semibold uppercase tracking-wide">
                  {t('dropTag')}
                </div>
                <h1 className="font-display text-2xl xs:text-3xl sm:text-4xl lg:text-5xl text-black font-bold leading-tight">
                  {t('heroTitle')}
                </h1>
                <p className="text-sm sm:text-base text-[#5e5f5c] leading-relaxed max-w-lg">
                  {t('heroDescription')}
                </p>
              </div>

              {/* Live Launch Countdown Box */}
              <div className="bg-[#f1edec] p-4 sm:p-5 border border-[#e5e2e1] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#5e5f5c]">
                  <span className="flex items-center gap-1.5 font-medium text-black">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d7ef30]"></span>
                    {t('allocationClosesIn')}
                  </span>
                  <span className="font-semibold text-black">{t('batchProtocol')}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  <div className="bg-white p-2 border border-[#e5e2e1]">
                    <span className="font-display text-xl sm:text-2xl font-bold block text-black leading-none tabular-nums">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#747878] mt-1 block">{t('days')}</span>
                  </div>
                  <div className="bg-white p-2 border border-[#e5e2e1]">
                    <span className="font-display text-xl sm:text-2xl font-bold block text-black leading-none tabular-nums">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#747878] mt-1 block">{t('hours')}</span>
                  </div>
                  <div className="bg-white p-2 border border-[#e5e2e1]">
                    <span className="font-display text-xl sm:text-2xl font-bold block text-black leading-none tabular-nums">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#747878] mt-1 block">{t('minutes')}</span>
                  </div>
                  <div className="bg-white p-2 border border-[#e5e2e1]">
                    <span className="font-display text-xl sm:text-2xl font-bold block text-[#191e00] bg-[#d7ef30] leading-none py-0.5 tabular-nums">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] uppercase text-[#747878] mt-1 block">{t('seconds')}</span>
                  </div>
                </div>

                {/* Progress Line */}
                <div className="w-full bg-[#e5e2e1] h-1">
                  <div className="bg-black h-full w-[78%]"></div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="flex-1 bg-black text-white text-xs sm:text-sm font-semibold py-3.5 px-5 text-center hover:bg-[#313030] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                >
                  <span>{t('shopDrop')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
                <button
                  onClick={() => navigateTo('editorial')}
                  className="flex-1 bg-[#f1edec] hover:bg-[#ebe7e6] active:scale-[0.99] text-black text-xs sm:text-sm font-medium py-3.5 px-5 text-center transition-all cursor-pointer min-h-[44px]"
                >
                  {t('exploreEditorial')}
                </button>
                <a
                  href="#raffles"
                  className="bg-[#d7ef30] text-[#191e00] text-xs sm:text-sm font-bold py-3.5 px-4 text-center hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-1 cursor-pointer min-h-[44px]"
                >
                  {t('enterRaffles')}
                </a>
              </div>
            </div>

            {/* Right 7 Cols: Hero Imagery & Feature Plate */}
            <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[460px] lg:min-h-[540px] bg-[#f1edec] border border-[#e5e2e1] overflow-hidden group flex flex-col justify-between">
              <div
                className="w-full h-full absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDs4dlGhMC2YgXs89ie2r5OwgOAcpIy9Ch0-Gcrp18Ivt9C8PX_-ZVVImWq1XWKxbIyhXfx5fqb07d0YCIBMk5ZI-SVphBCkp9VIxyz23WbUioa4ynHR1d_CQKtTYyLwdfFd3Yht0UpU9gfddMDc1CoS9mgsqCUjenbCIfTOwTqpKnZhe6cSuL8emBRgwply0tgSHGWpz8ghS3B6kfXHylBBQza2ofmxuAj9N4aHcAucSm9aU9tVlGx')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

              {/* Top Floating Badge */}
              <div className="relative z-10 p-4 sm:p-6 flex items-start justify-between">
                <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs text-black font-semibold uppercase tracking-wide">
                  إصدار خاص للمقتنين
                </span>
                <span className="bg-[#d7ef30] text-[#191e00] px-2.5 py-1 text-xs uppercase font-bold">
                  {t('runwaySpec')}
                </span>
              </div>

              {/* Bottom Spec Details */}
              <div className="relative z-10 p-4 sm:p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
                <div className="min-w-0">
                  <div className="text-xs text-[#d7ef30] uppercase font-medium mb-1">
                    عينة معتمدة ونادرة
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold uppercase">
                    Salomon XT-6 & ROA Hybrid Cordura
                  </h3>
                  <p className="text-xs text-[#c9c6c5] truncate mt-0.5">
                    إصدار حصري محدود · متوفر بمقاسات معتمدة
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('product', PRODUCTS[2])}
                  className="w-full sm:w-auto bg-white text-black hover:bg-[#d7ef30] px-5 py-2.5 text-xs font-semibold uppercase transition-colors cursor-pointer shrink-0 text-center min-h-[40px] flex items-center justify-center"
                >
                  {language === 'ar' ? 'معاينة المواصفات ←' : 'View Spec Sheet →'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BRAND MARQUEE & FAST FILTERS */}
      <section className="w-full bg-[#ffffff] border-b border-[#e5e2e1] py-4">
        {/* Brand Scrolling Strip */}
        <div className="w-full px-4 sm:px-6 md:px-12 overflow-x-auto no-scrollbar mb-4">
          <div className="flex items-center gap-6 sm:gap-10 whitespace-nowrap text-black text-sm sm:text-base font-semibold">
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">Nike Lab</button>
            <span className="text-[#e5e2e1]">/</span>
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">Jordan Retro</button>
            <span className="text-[#e5e2e1]">/</span>
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">New Balance Made</button>
            <span className="text-[#e5e2e1]">/</span>
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">Adidas Consortium</button>
            <span className="text-[#e5e2e1]">/</span>
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">Salomon Advanced</button>
            <span className="text-[#e5e2e1]">/</span>
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">Asics SportStyle</button>
            <span className="text-[#e5e2e1]">/</span>
            <button onClick={() => navigateTo('brands')} className="hover:text-[#747878] transition-colors cursor-pointer">Maison Margiela</button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="w-full px-4 sm:px-6 md:px-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-2 border-t border-[#f7f3f2]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full md:w-auto text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 transition-colors shrink-0 font-medium ${
                activeFilter === 'all' ? 'bg-black text-white font-semibold' : 'bg-[#f1edec] text-black hover:bg-[#ebe7e6]'
              }`}
            >
              {t('allArchives')} ({PRODUCTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('recent')}
              className={`px-3.5 py-1.5 transition-colors shrink-0 font-medium ${
                activeFilter === 'recent' ? 'bg-black text-white font-semibold' : 'bg-[#f1edec] text-black hover:bg-[#ebe7e6]'
              }`}
            >
              {t('recentDrops')}
            </button>
            <button
              onClick={() => setActiveFilter('vault')}
              className={`px-3.5 py-1.5 transition-colors shrink-0 font-medium ${
                activeFilter === 'vault' ? 'bg-black text-white font-semibold' : 'bg-[#f1edec] text-black hover:bg-[#ebe7e6]'
              }`}
            >
              {t('vaultRestocks')}
            </button>
            <button
              onClick={() => setActiveFilter('collab')}
              className={`px-3.5 py-1.5 transition-colors shrink-0 font-medium ${
                activeFilter === 'collab' ? 'bg-black text-white font-semibold' : 'bg-[#f1edec] text-black hover:bg-[#ebe7e6]'
              }`}
            >
              {t('collaborations')}
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`px-3.5 py-1.5 transition-colors shrink-0 font-medium ${
                activeFilter === 'upcoming' ? 'bg-black text-white font-semibold' : 'bg-[#f1edec] text-black hover:bg-[#ebe7e6]'
              }`}
            >
              {t('comingSoon')}
            </button>
          </div>

          <div className="text-xs text-[#5e5f5c] hidden sm:flex items-center gap-2">
            <span>{filteredProducts.length} {language === 'ar' ? 'عينة معروضة' : 'specimens on exhibit'}</span>
            <span>•</span>
            <span className="text-black font-semibold">100% Deadstock</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: CURATED EDITORIAL SNEAKER GRID */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-14 bg-[#fdf8f8]">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-6 sm:mb-8">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              {language === 'ar' ? 'المجموعة الأرشيفية المختارة' : 'Curated Selection 2026'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {language === 'ar' ? 'أحذية أرشيفية نادرة معتمدة' : 'Verified Archival Footwear'}
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs uppercase font-semibold text-black hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{t('viewAllCatalog')}</span>
            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
          </button>
        </div>

        {/* 2-Column Mobile & 4-Column Desktop Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Sourcing Callout Banner */}
        <div className="mt-12 p-6 bg-[#f1edec] border border-[#e5e2e1] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="font-display text-base font-bold text-black">
              {language === 'ar' ? 'هل تبحث عن زوج أرشيفي نادر غير معروض؟' : 'Seeking an unlisted rare sneaker pair?'}
            </h4>
            <p className="text-xs text-[#5e5f5c] mt-1 leading-relaxed">
              {language === 'ar'
                ? 'مكاتب التوريد التابعة لنا في طوكيو ولندن وباريس تعمل على مدار الساعة لتأمين القطع للمقتنين بأعلى درجات الموثوقية.'
                : 'Our Tokyo & London sourcing desks operate direct private client procurement for authentic pairs.'}
            </p>
          </div>
          <button
            onClick={() => navigateTo('account')}
            className="px-6 py-2.5 bg-black text-white text-xs font-semibold hover:bg-[#313030] transition-colors shrink-0 cursor-pointer"
          >
            {language === 'ar' ? 'طلب توفير مخصص' : 'Request Sourcing'}
          </button>
        </div>
      </section>

      {/* SECTION 4: "THE CURATOR'S JOURNAL" */}
      <section className="w-full bg-[#f7f3f2] px-4 sm:px-6 md:px-12 py-12 sm:py-16 border-y border-[#e5e2e1]">
        <div className="w-full mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e5e2e1] pb-4">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {t('journalTitle')}
            </h2>
            <span className="text-xs px-2.5 py-0.5 bg-black text-white font-medium">
              العدد الرابع
            </span>
          </div>
          <span className="text-xs text-[#747878]">
            {t('journalIssue')}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left 7 Cols: Editorial Spread */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] bg-black overflow-hidden group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA37X3x7vUYO6qoowchuZwFp_k5qA-6Lyqm1XNgcToaAWHW1VmyipnrMeLNKZdr8rgz08U4s6dxw1zERZQ1KQ9vcDrUw0ukVfZZnHEmL4356QVFhYpc4Jeeuw29S1k50gPYT4CfP_LLYfYvuOY5-LdIgHih0KnSAW56qgefqsaKAozLuvaTFgczfaQaGwIV4m6lcIlGw1o8sH-tiQMXem9P5reYKuCs6CrCKmR8ZZG8RnUOVIuJ2uUG"
                alt="Curatorial editorial shot in Berlin gallery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-xs text-[#d7ef30] font-semibold mb-1">
                  مقال تحريري خاص
                </span>
                <h3 className="font-display text-lg sm:text-2xl font-bold leading-tight mb-2">
                  {t('journalHeadline')}
                </h3>
                <p className="text-xs sm:text-sm text-[#e5e2e1] max-w-xl leading-relaxed">
                  {t('journalExcerpt')}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#5e5f5c] pt-2">
              <span>تم التصوير في معرض برلين الأرشيفي</span>
              <button
                onClick={() => navigateTo('editorial')}
                className="font-semibold text-black hover:underline cursor-pointer"
              >
                {t('readFullMonograph')} →
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Accompanying Curated Silhouettes */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div className="border-b border-[#e5e2e1] pb-3">
              <span className="text-xs text-[#747878] uppercase block mb-1">
                {t('curatorialAnnotation')}
              </span>
              <p className="text-xs sm:text-sm text-black leading-relaxed italic">
                "{t('curatorQuote')}"
              </p>
            </div>

            {/* Accompanying Item 1 */}
            <div className="bg-white p-3 border border-[#e5e2e1] flex gap-3 items-center group">
              <div className="w-20 h-20 bg-[#f7f3f2] p-1 shrink-0 flex items-center justify-center">
                <img
                  src={PRODUCTS[10].primaryImage}
                  alt={PRODUCTS[10].name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-[#747878] block font-medium">Salomon</span>
                <h4 className="text-xs sm:text-sm font-semibold text-black truncate">ACS Pro Advanced</h4>
                <p className="text-xs text-[#5e5f5c] truncate">Metal / Frost OG</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-bold text-black tabular-nums">{formatPrice(PRODUCTS[10].price)}</span>
                  <button
                    onClick={() => navigateTo('product', PRODUCTS[10])}
                    className="text-xs font-semibold text-black hover:underline cursor-pointer"
                  >
                    {t('acquirePair')} →
                  </button>
                </div>
              </div>
            </div>

            {/* Accompanying Item 2 */}
            <div className="bg-white p-3 border border-[#e5e2e1] flex gap-3 items-center group">
              <div className="w-20 h-20 bg-[#f7f3f2] p-1 shrink-0 flex items-center justify-center">
                <img
                  src={PRODUCTS[4].primaryImage}
                  alt={PRODUCTS[4].name}
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] text-[#747878] block font-medium">Asics</span>
                <h4 className="text-xs sm:text-sm font-semibold text-black truncate">GEL-Kayano 14</h4>
                <p className="text-xs text-[#5e5f5c] truncate">Cream / Pure Silver</p>
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-xs font-bold text-black tabular-nums">{formatPrice(PRODUCTS[4].price)}</span>
                  <button
                    onClick={() => navigateTo('product', PRODUCTS[4])}
                    className="text-xs font-semibold text-black hover:underline cursor-pointer"
                  >
                    {t('acquirePair')} →
                  </button>
                </div>
              </div>
            </div>

            {/* Archivist Direct Note */}
            <div className="p-4 bg-black text-white space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-[#d7ef30] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d7ef30]"></span>
                <span>خدمة الكونسيرج الخاصة</span>
              </div>
              <p className="text-xs text-[#c9c6c5] leading-relaxed">
                يحصل أعضاء سجل MORV المميزين على أولوية حجز التخصيصات للأحذية النادرة قبل طرحها العام.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: "THE MORV VAULT STANDARD" */}
      <section className="w-full bg-[#000000] text-[#ffffff] px-4 sm:px-6 md:px-12 py-14 sm:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#313030] gap-4">
          <div>
            <span className="text-xs text-[#d7ef30] uppercase tracking-wide block mb-1 font-medium">
              معايير الأصالة والتوثيق
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              {t('vaultStandardTitle')}
            </h2>
          </div>
          <span className="text-xs text-[#c4c7c7]">
            {t('zeroTolerance')}
          </span>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#1c1b1b] border border-[#313030] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <ShieldCheck className="w-8 h-8 text-[#d7ef30]" />
              <span className="text-xs text-[#d7ef30] font-medium block">المعيار الأول</span>
              <h3 className="font-display text-base font-bold text-white">
                {t('protocol1Title')}
              </h3>
              <p className="text-xs text-[#c9c6c5] leading-relaxed">
                {t('protocol1Desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#313030] text-xs text-[#747878]">
              فحص يدوي متعدد المراحل
            </div>
          </div>

          <div className="p-6 bg-[#1c1b1b] border border-[#313030] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <Plane className="w-8 h-8 text-[#d7ef30]" />
              <span className="text-xs text-[#d7ef30] font-medium block">المعيار الثاني</span>
              <h3 className="font-display text-base font-bold text-white">
                {t('protocol2Title')}
              </h3>
              <p className="text-xs text-[#c9c6c5] leading-relaxed">
                {t('protocol2Desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#313030] text-xs text-[#747878]">
              توصيل آمن وسريع لجميع المحافظات
            </div>
          </div>

          <div className="p-6 bg-[#1c1b1b] border border-[#313030] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <QrCode className="w-8 h-8 text-[#d7ef30]" />
              <span className="text-xs text-[#d7ef30] font-medium block">المعيار الثالث</span>
              <h3 className="font-display text-base font-bold text-white">
                {t('protocol3Title')}
              </h3>
              <p className="text-xs text-[#c9c6c5] leading-relaxed">
                {t('protocol3Desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#313030] text-xs text-[#747878]">
              شريحة NFC مشفرة وغير قابلة للتكرار
            </div>
          </div>

          <div className="p-6 bg-[#1c1b1b] border border-[#313030] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <RefreshCw className="w-8 h-8 text-[#d7ef30]" />
              <span className="text-xs text-[#d7ef30] font-medium block">المعيار الرابع</span>
              <h3 className="font-display text-base font-bold text-white">
                {t('protocol4Title')}
              </h3>
              <p className="text-xs text-[#c9c6c5] leading-relaxed">
                {t('protocol4Desc')}
              </p>
            </div>
            <div className="pt-3 border-t border-[#313030] text-xs text-[#747878]">
              ضمان إعادة الشراء واسترداد القيمة
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: UPCOMING ALLOCATIONS & RAFFLES */}
      <section id="raffles" className="w-full bg-[#fdf8f8] px-4 sm:px-6 md:px-12 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-8 pb-3 border-b border-[#e5e2e1]">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              جدول الإطلاقات الحصرية
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {t('rafflesTitle')}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-[#d7ef30]"></span>
            <span className="font-semibold text-black uppercase">{t('activeProtocols')}</span>
          </div>
        </div>

        {/* Raffles Table */}
        <div className="space-y-3">
          {RAFFLES.map((raffle) => {
            const isEntered = enteredRaffles.includes(raffle.id);
            const isNotified = notifiedRaffles.includes(raffle.id);

            return (
              <div
                key={raffle.id}
                className="bg-white border border-[#e5e2e1] p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:border-black transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#f7f3f2] p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={raffle.image}
                      alt={raffle.model}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] px-2 py-0.5 uppercase font-semibold ${
                          raffle.status === 'open'
                            ? 'bg-[#d7ef30] text-[#191e00]'
                            : 'bg-[#f1edec] text-[#1c1b1b]'
                        }`}
                      >
                        {raffle.status === 'open' ? 'سحب مفتوح' : 'قريباً'}
                      </span>
                      <span className="text-xs text-[#747878]">
                        {raffle.status === 'open' ? `${t('raffleClosesIn')} ${raffle.closesIn}` : raffle.closesIn}
                      </span>
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-black truncate">
                      {raffle.model}
                    </h3>
                    <p className="text-xs text-[#5e5f5c] truncate">
                      {raffle.retailNote}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:flex sm:items-center justify-between lg:justify-end gap-3 sm:gap-6 shrink-0 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#f1edec]">
                  <div className="text-left rtl:text-right">
                    <span className="text-xs text-[#747878] block">{t('allocationCount')}</span>
                    <span className="text-xs font-semibold text-black">{raffle.allocation}</span>
                  </div>
                  <div className="text-left rtl:text-right">
                    <span className="text-xs text-[#747878] block">{t('entryPrice')}</span>
                    <span className="text-xs font-bold text-black tabular-nums">{formatPrice(raffle.entryFee * 50)}</span>
                  </div>

                  {raffle.status === 'open' ? (
                    <button
                      onClick={() => handleEnterRaffle(raffle.id, raffle.model)}
                      disabled={isEntered}
                      className={`col-span-2 sm:col-span-1 w-full sm:w-auto px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 text-center min-h-[40px] flex items-center justify-center ${
                        isEntered
                          ? 'bg-black text-white cursor-default'
                          : 'bg-[#d7ef30] hover:bg-[#bbd200] text-[#191e00]'
                      }`}
                    >
                      {isEntered ? t('raffleEntered') : t('enterRaffle')}
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNotifyRaffle(raffle.id, raffle.model)}
                      className={`col-span-2 sm:col-span-1 w-full sm:w-auto px-5 py-2.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 text-center min-h-[40px] flex items-center justify-center ${
                        isNotified
                          ? 'bg-black text-white'
                          : 'bg-[#f1edec] hover:bg-black hover:text-white text-black'
                      }`}
                    >
                      {isNotified ? t('notificationSet') : t('notifyMe')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
