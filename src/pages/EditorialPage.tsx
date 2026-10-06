import React from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ArrowRight } from 'lucide-react';

export const EditorialPage: React.FC = () => {
  const { navigateTo, language } = useStore();

  const articles = [
    {
      id: 'art-01',
      title: 'أرشيف شيكاغو 1985: ولادة الأسطورة وإعادة تخيل الصناديق المنسية',
      issue: 'المقال التحليلي 01',
      readTime: '6 دقائق قراءة',
      author: 'إعداد فريق توثيق MORV',
      excerpt:
        'دراسة نقدية في تاريخ إصدار Air Jordan 1 Chicago الأصلي لعام 1985 وكيف أعادت صيحة Lost & Found الاحتفاء بمتاجر الأحذية العائلية في أمريكا وأرشفتها كقطع فنية خالدة.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA37X3x7vUYO6qoowchuZwFp_k5qA-6Lyqm1XNgcToaAWHW1VmyipnrMeLNKZdr8rgz08U4s6dxw1zERZQ1KQ9vcDrUw0ukVfZZnHEmL4356QVFhYpc4Jeeuw29S1k50gPYT4CfP_LLYfYvuOY5-LdIgHih0KnSAW56qgefqsaKAozLuvaTFgczfaQaGwIV4m6lcIlGw1o8sH-tiQMXem9P5reYKuCs6CrCKmR8ZZG8RnUOVIuJ2uUG',
      relatedProduct: PRODUCTS[0]
    },
    {
      id: 'art-02',
      title: 'جماليات أحذية الجري التقنية: سالومون وأسيكس في المشهد المعاصر',
      issue: 'المقال التحليلي 02',
      readTime: '4 دقائق قراءة',
      author: 'مختبرات التصميم الأرشيفي',
      excerpt:
        'كيف تحولت أحذية الركض الجبلي والمسارات الوعرة في أواخر التسعينيات وأوائل الألفية إلى القطع الأساسية في أسبوع الموضة في باريس وتنسيقات الستريت وير الفاخرة.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCVUiG14oFEveVJvOMY4_BrGUm3jT7EluB-4vmHU4rHJ-tN09-VLA3roUsHyvNqDwrAcEEp0RZrGSA1uCAZ47ZI7oioHz9wkKg4dQ82H__qhAa035URJr-cZl2vYStGwU_ksgOSurjj7d_4cXP5oJ-KK0NYapKlj4CUpTWMpue5gz6rJNR5r9cSaKEa9Z0pu8HS-dvcc2DWLRvekwk4cSmKDWgEz6cK9T6L0gpI--VOdRZsuNLKgab6',
      relatedProduct: PRODUCTS[2]
    },
    {
      id: 'art-03',
      title: 'سلسلة 990 من نيو بالانس: أربعة عقود من الحرفية الأمريكية',
      issue: 'المقال التحليلي 03',
      readTime: '5 دقائق قراءة',
      author: 'الأرشيف التاريخي',
      excerpt:
        'قصة الحذاء الرياضي الذي كسر حاجز الـ 100 دولار عام 1982 وظل محافظاً على خط إنتاجه اليدوي في ماساتشوستس عبر ستة أجيال متتالية من التميز.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBScnzQn70MGcjnX_dpN4z2H6lOBEACAmvhN0P_OeBHxP6xZz5utMkh6gKJ2Aexunj37DGCJBQfpJpFCHXOD-OH5SV3lx51POQ-i9YFoIPQgoSasulEsiMPci3mzx3rFn0_5_bg_-BXTb8NlBZ7gA8N54ar-13qpefiMYyu5jUCnfGP7YvcajlO-HsB_N2oSIKwfPMEZdvPnvNpqMwbJbWgHzDUJ3hUIT_OVdrkPl4EryFpF7K56Mtu',
      relatedProduct: PRODUCTS[1]
    }
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-14 bg-[#fdf8f8] font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-[#e5e2e1] pb-6 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#747878]">
            <span className="w-2 h-2 rounded-full bg-[#d7ef30]"></span>
            <span>الأرشيف التحريري والمقالات النقدية</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight">
            {language === 'ar' ? 'الأرشيف التحريري وتاريخ السنيكرز' : 'Editorial & Launch Monographs'}
          </h1>
          <p className="text-sm text-[#5e5f5c] max-w-2xl leading-relaxed">
            مقالات ودراسات نقدية متخصصة حول تاريخ الأحذية الرياضية الأرشيفية، ثقافة الاقتناء، ومعايير التوثيق بين الفن والهندسة الرياضية.
          </p>
        </div>

        {/* Lead Featured Article */}
        <div className="bg-white border border-[#e5e2e1] grid grid-cols-1 lg:grid-cols-12 overflow-hidden group">
          <div className="lg:col-span-7 aspect-[16/10] overflow-hidden bg-black relative">
            <img
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 bg-black text-white text-xs px-2.5 py-1 font-semibold uppercase tracking-wide">
              مقال العدد المميز
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#747878]">
                <span>{articles[0].issue}</span>
                <span>•</span>
                <span>{articles[0].readTime}</span>
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-black leading-snug">
                {articles[0].title}
              </h2>
              <p className="text-sm text-[#5e5f5c] leading-relaxed">
                {articles[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-[#f1edec] flex items-center justify-between">
              <span className="text-xs text-[#747878]">{articles[0].author}</span>
              <button
                onClick={() => navigateTo('product', articles[0].relatedProduct)}
                className="text-xs font-semibold text-black uppercase hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>معاينة العينة الأرشيفية</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Essays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.slice(1).map((art) => (
            <div
              key={art.id}
              className="bg-white border border-[#e5e2e1] flex flex-col justify-between group hover:border-black transition-colors"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-[#f7f3f2]">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#747878]">
                    <span>{art.issue}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-black leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5e5f5c] leading-relaxed">
                    {art.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#f1edec] mt-4 flex items-center justify-between">
                <span className="text-xs text-[#747878]">{art.author}</span>
                <button
                  onClick={() => navigateTo('product', art.relatedProduct)}
                  className="text-xs font-semibold text-black hover:underline cursor-pointer"
                >
                  معاينة الحذاء ←
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
