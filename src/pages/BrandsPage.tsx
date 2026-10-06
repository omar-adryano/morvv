import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BRAND_DIRECTORY, VAULT_ARTIFACTS } from '../data/products';
import { Search, Shield, Cpu, Headphones, ArrowRight } from 'lucide-react';

export const BrandsPage: React.FC = () => {
  const { formatPrice, navigateTo, showToast, language } = useStore();
  const [searchMaison, setSearchMaison] = useState('');
  const [, setSelectedVaultLot] = useState<string | null>(null);

  const pinnacleMaisons = [
    {
      code: 'NK-001',
      brand: 'NIKE / NIKE LAB',
      tier: 'TIER ZERO',
      tag: 'Air Max · Dunk · Gyakusou',
      editions: 84,
      desc: 'قمة الابتكار الرياضي والتراث الكلاسيكي. تشمل طرازات Air Max النادرة، وإصدارات SB Dunk الأرشيفية، والتعاونات الحصرية مع المصممين اليابانيين.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjkNyI6EYZZutsXvL1G34Bo3qAydGkdQtzEGmdhdcwdeqdzl7zt9csxRZUcjoMV0AGdDDrDMCOhMNNiK1G1pwRXM50xTS6dcPAACHnii1Cz4ZcbgnrQKnI9OkcEu-rH3n0IbjZK7L7fi6JsMUevqO_NwtwkiwK6oDOQck-ku2NkaqrlwsvWLW_u06i-2TKbUN_DPGwxj8VwZrpxayH9iVhyn8i1WsaOAbrOAAQDX0-y22t4D3nrjd0'
    },
    {
      code: 'JD-1985',
      brand: 'JORDAN BRAND',
      tier: 'ORIGIN AIR',
      tag: 'Retro High 85 · OGs',
      editions: 62,
      desc: 'انطلقت على ملاعب السلة عام 1985 لتصبح حجر الأساس الثقافي في عالم جمع الأحذية الرياضية، متوفرة بقوالب العينات الأصلية والريترو المرقم.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBlntfPS4LzMA1EfQQsArOXm7V7tuHRHeHtgvkqeNL8A_1ib_Z1OGzUApGcYCbftkjhlmxJRBYKgTiuNTMLXrPcRIAFqUlHomQnGtCrbhkT-TUezO7dfE8x6P2RHNpS4j3YQcOhWeZEdE8E-sTmD5nFPZcIpQjy8RmAp9Dj_00AXiiLoFZVkACTFLrll6NNnAAwQ5N2VeqamucuyhjmLwupWLpC6XYgI6MHwY3CEwBnjzAV92BJqMg3'
    },
    {
      code: 'NB-1906',
      brand: 'NEW BALANCE',
      tier: 'USA & UK CRAFT',
      tag: '990 Series · 1906R · Flimby',
      editions: 49,
      desc: 'الحرفية اليدوية الأمريكية والإنجليزية في مصنع فليمبي البريطاني تلتقي بأعلى درجات الراحة والجري التقني عبر إصدارات ستوديو طوكيو للتصميم.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBScnzQn70MGcjnX_dpN4z2H6lOBEACAmvhN0P_OeBHxP6xZz5utMkh6gKJ2Aexunj37DGCJBQfpJpFCHXOD-OH5SV3lx51POQ-i9YFoIPQgoSasulEsiMPci3mzx3rFn0_5_bg_-BXTb8NlBZ7gA8N54ar-13qpefiMYyu5jUCnfGP7YvcajlO-HsB_N2oSIKwfPMEZdvPnvNpqMwbJbWgHzDUJ3hUIT_OVdrkPl4EryFpF7K56Mtu'
    },
    {
      code: 'SL-1947',
      brand: 'SALOMON ADVANCED',
      tier: 'TACTICAL LAB',
      tag: 'XT-6 · ACS Pro · Snowcross',
      editions: 38,
      desc: 'الأداء الجبلي الألبي المطور ليكون الزي الأساسي للاستكشاف الحضري المعاصر، بنظام ربط سريع Quicklace وأغشية تقنية مضادة للماء.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVUiG14oFEveVJvOMY4_BrGUm3jT7EluB-4vmHU4rHJ-tN09-VLA3roUsHyvNqDwrAcEEp0RZrGSA1uCAZ47ZI7oioHz9wkKg4dQ82H__qhAa035URJr-cZl2vYStGwU_ksgOSurjj7d_4cXP5oJ-KK0NYapKlj4CUpTWMpue5gz6rJNR5r9cSaKEa9Z0pu8HS-dvcc2DWLRvekwk4cSmKDWgEz6cK9T6L0gpI--VOdRZsuNLKgab6'
    },
    {
      code: 'AD-1949',
      brand: 'ADIDAS CONSORTIUM',
      tier: 'HERITAGE ARCHIVE',
      tag: 'Samba · Wales Bonner · Torsion',
      editions: 41,
      desc: 'أرشيف الخطوط الثلاثة الكلاسيكية الذي يمتد من كلاسيكيات المدرجات السبعينية إلى شراكات المنصات الراقية مع ويلز بونر وكريغ غرين.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYeMd2f_4UoKlO1745qF0UTkf8_87opbjjYmiS8WkVHYTON4rbJ6351ZFWo03RkKwPnPJYwTd6svFr9lno5WnxXEjN3XQePD7EWuVDYenO878EO4kswEmYmmgor_zdEAMg7P5arfx_QXkFEgN-buVlAkatAom0fTRrH6M8aWLejcezwllCQfofzuVKjWoi5MqLEERjlNBhxT3CLZer2an8ViM8jiMmcVRkqVmnmipo3kToWI81Jsu-'
    },
    {
      code: 'AS-1977',
      brand: 'ASICS SPORTSTYLE',
      tier: 'KOBE LAB',
      tag: 'GEL-Kayano 14 · GT-2160',
      editions: 35,
      desc: 'دقة هندسة الجري اليابانية المطورة بأحدث ابتكارات المواد وتقنيات وسائد الجل GEL التي حددت معالم أحذية أوائل الألفية.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCptkmHdq4mjt3eARbf0F3yeLI0gEEXK8HyPUmcQAxmZVrklQcwT3Td2t41NWrGfJVF-dJRx_SDzBGC0vkRtl3WrZ-ql6jRM3_r_2jMfa1lX63LjEfG5AI2X1f7KA5qtRcHHt1OFPjSdY65ut9t3yEY0rXBEW9QpD_tEzehwifEjcGuQxE6-B2FMN85nGbIkrU6d5N80z3dlX05xbkiohlxmV4LlKYPobrVybMkPVCySiqYO1FyAlyo'
    }
  ];

  const handleAcquireLot = (lot: any) => {
    setSelectedVaultLot(lot.lotNumber);
    showToast(
      language === 'ar'
        ? `تم فتح طلب اقتناء خاص للقطعة ${lot.name} عبر كونسيرج MORV`
        : `Private acquisition inquiry opened for ${lot.name}`
    );
  };

  return (
    <div className="w-full flex flex-col bg-[#fdf8f8] font-sans">
      {/* Header Section */}
      <section className="w-full px-4 sm:px-6 md:px-12 pt-8 sm:pt-14 pb-8 bg-[#fdf8f8] border-b border-[#e5e2e1]">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#5e5f5c] mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#d7ef30] inline-block rounded-full"></span>
            <span className="text-black font-semibold">سجل الماركات الأرشيفية المعتمدة</span>
            <span className="text-[#c4c7c7]">/</span>
            <span>48 دار تصميم وماركة عالمية</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span>درجة التوثيق: A+ معتمد</span>
          </div>
        </div>

        {/* Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-8">
          <div className="lg:col-span-8">
            <span className="text-xs uppercase tracking-wide text-[#747878] block mb-1">
              دليل العلامات التجارية الأرشيفية
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
              سجل الماركات العالمية<br />
              <span className="text-[#747878]">والإصدارات التاريخية النادرة</span>
            </h1>
          </div>
          <div className="lg:col-span-4">
            <p className="text-sm sm:text-base text-[#5e5f5c] leading-relaxed">
              منصة معتمدة وسوق أرشيفي منتقى لأبرز دور الأزياء الرياضية العالمية، النماذج الأولية، والإصدارات المحدودة المحفوظة بعناية فائقة.
            </p>
          </div>
        </div>

        {/* Search Bar & Jump Line */}
        <div className="w-full bg-[#f1edec] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border border-[#e5e2e1]">
          {/* Input */}
          <div className="flex items-center bg-white px-3 py-2 flex-1 max-w-md border border-[#e5e2e1] focus-within:border-black">
            <Search className="w-4 h-4 text-[#747878] mr-2" />
            <input
              type="text"
              value={searchMaison}
              onChange={(e) => setSearchMaison(e.target.value)}
              placeholder="ابحث عن ماركة أو طراز حذاء..."
              className="w-full bg-transparent text-xs text-black placeholder:text-[#747878] focus:outline-none"
            />
            {searchMaison && (
              <button onClick={() => setSearchMaison('')} className="text-xs text-black font-bold">
                ✕
              </button>
            )}
          </div>

          {/* Jump Alphabet Track */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1 text-xs select-none">
            <span className="text-[#747878] text-[11px] pr-2">انتقال سريع:</span>
            {['A', 'B', 'C', 'D', 'H', 'J', 'M', 'N', 'O', 'P', 'R', 'S', 'U', 'V', 'Y'].map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  const el = document.getElementById(`section-${letter}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2 py-1 hover:bg-black hover:text-white text-black transition-colors cursor-pointer text-xs font-medium"
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PINNACLE MAISONS & LABS */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-12 sm:py-16 bg-[#ffffff] border-b border-[#e5e2e1]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-wide text-[#747878] block mb-1">
              الماركات الرئيسية
            </span>
            <h2 className="font-display text-2xl sm:text-3xl text-black font-bold">
              أبرز دور التصميم ومختبرات الابتكار
            </h2>
          </div>
          <span className="hidden md:inline text-xs text-[#747878]">
            6 فئات رئيسية مميزة
          </span>
        </div>

        {/* 6 Bento Portals */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pinnacleMaisons.map((maison) => (
            <div
              key={maison.code}
              className="bg-[#fdf8f8] border border-[#e5e2e1] p-6 flex flex-col justify-between group hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xs text-[#747878] font-mono">
                      {maison.code}
                    </span>
                    <h3 className="font-display text-lg font-bold text-black">
                      {maison.brand}
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 bg-[#d7ef30] text-[#191e00] text-[10px] font-bold uppercase">
                    {maison.tier}
                  </span>
                </div>

                <div className="my-5 overflow-hidden bg-[#f1edec] h-56 relative border border-[#e5e2e1]">
                  <img
                    src={maison.image}
                    alt={maison.brand}
                    className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/85 px-2.5 py-1 text-white text-xs">
                    {maison.tag}
                  </div>
                </div>

                <p className="text-xs text-[#5e5f5c] leading-relaxed mb-4">
                  {maison.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#e5e2e1] text-xs">
                <button
                  onClick={() => navigateTo('shop')}
                  className="text-black font-semibold flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>استكشف المجموعة</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
                <span className="text-[#747878] tabular-nums">{maison.editions} حذاء معتمد</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COMPLETE ALPHABETICAL DIRECTORY */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-12 sm:py-16 bg-[#fdf8f8]">
        <div className="mb-8 border-b border-[#e5e2e1] pb-4">
          <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
            الفهرس الشامل
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-black">
            دليل العلامات التجارية الأبجدي
          </h2>
        </div>

        <div className="space-y-12">
          {BRAND_DIRECTORY.map((group) => (
            <div key={group.group} className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#747878] border-b border-[#e5e2e1] pb-2">
                {group.group}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.letters.map((letterGroup) => (
                  <div
                    key={letterGroup.letter}
                    id={`section-${letterGroup.letter}`}
                    className="bg-white border border-[#e5e2e1] p-5 space-y-3"
                  >
                    <div className="font-display text-2xl font-bold text-black border-b border-[#f1edec] pb-2">
                      {letterGroup.letter}
                    </div>

                    <ul className="space-y-2">
                      {letterGroup.brands.map((b) => (
                        <li key={b.name} className="flex items-center justify-between text-xs">
                          <button
                            onClick={() => navigateTo('shop')}
                            className="text-[#1c1b1b] hover:text-black font-medium hover:underline text-left rtl:text-right cursor-pointer"
                          >
                            {b.name}
                          </button>
                          <span className="text-[#747878] tabular-nums">{b.count}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VAULT HISTORIC SPECIMENS */}
      <section className="w-full px-4 sm:px-6 md:px-12 py-12 sm:py-16 bg-black text-white">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#313030]">
          <div>
            <span className="text-xs text-[#d7ef30] uppercase tracking-wide block mb-1">
              الخزينة الأرشيفية
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
              قطع متحفية وعينات تاريخية نادرة
            </h2>
          </div>
          <span className="hidden md:inline text-xs text-[#747878]">
            توثيق كامل مع شريحة NFC
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VAULT_ARTIFACTS.map((artifact) => (
            <div
              key={artifact.lotNumber}
              className="bg-[#1c1b1b] border border-[#313030] p-5 flex flex-col justify-between group hover:border-[#d7ef30] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between pb-2 text-xs text-[#747878]">
                  <span className="font-mono text-[11px]">{artifact.lotNumber}</span>
                  <span className="text-[#d7ef30] font-bold">{artifact.grade}</span>
                </div>

                <div className="h-56 bg-black overflow-hidden relative mb-4 border border-[#313030] flex items-center justify-center">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-full object-cover contrast-125 hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-black/90 px-2 py-0.5 text-xs text-white">
                    {artifact.era}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-xs uppercase text-[#d7ef30] block font-medium">
                    {artifact.brand}
                  </span>
                  <h3 className="font-display text-base font-bold text-white truncate">
                    {artifact.name}
                  </h3>
                  <p className="text-xs text-[#c9c6c5] leading-relaxed pt-1 line-clamp-3">
                    {artifact.description}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex items-baseline justify-between py-2 border-t border-[#313030]">
                  <span className="text-xs text-[#747878]">القيمة التقديرية</span>
                  <span className="text-base font-bold text-white tabular-nums">
                    {formatPrice(artifact.valuation)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    onClick={() => {
                      showToast(`تم فتح سجل التوثيق للقطعة ${artifact.name}`);
                    }}
                    className="bg-[#313030] hover:bg-[#444748] text-white text-xs py-2 transition-colors cursor-pointer font-medium"
                  >
                    سجل الأصالة
                  </button>
                  <button
                    onClick={() => handleAcquireLot(artifact)}
                    className="bg-[#d7ef30] hover:bg-white text-black text-xs font-bold py-2 transition-colors cursor-pointer"
                  >
                    طلب اقتناء
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Escrow & Authentication Triad */}
        <div className="mt-14 bg-[#1c1b1b] border border-[#313030] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#d7ef30] text-xs font-bold uppercase">
              <Shield className="w-4 h-4" />
              <span>ضمان المعاينة والحفظ الآمن</span>
            </div>
            <p className="text-xs text-[#c9c6c5] leading-relaxed">
              كل قطعة محفوظة بعناية فائقة في بيئة مناخية محكمة لحماية الأنسجة والنعال من أي تدهور.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#d7ef30] text-xs font-bold uppercase">
              <Cpu className="w-4 h-4" />
              <span>فحص فيزيائي وميكروسكوبي شامل</span>
            </div>
            <p className="text-xs text-[#c9c6c5] leading-relaxed">
              تخضع جميع العينات لفحص دقيق للغرز، الخامات، والأرقام التسلسلية ومطابقتها لمواصفات المصنع الأصلية.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#d7ef30] text-xs font-bold uppercase">
              <Headphones className="w-4 h-4" />
              <span>خدمة الكونسيرج الخاصة</span>
            </div>
            <p className="text-xs text-[#c9c6c5] leading-relaxed">
              هل تبحث عن حذاء نادر أو إصدار عينة خاص غير معروض؟ فريقنا يعمل مع المقتنين لتوفير القطع المحددة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
