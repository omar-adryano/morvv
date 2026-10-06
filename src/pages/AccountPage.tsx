import React from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, Heart, LogOut, Award, ShieldCheck, ArrowRight } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const { user, logout, orders, wishlist, navigateTo, language } = useStore();

  if (!user) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4 font-sans">
        <User className="w-12 h-12 text-[#c4c7c7] mx-auto stroke-1" />
        <h2 className="font-display text-xl font-bold text-black">
          {language === 'ar' ? 'يرجى تسجيل الدخول للوصول إلى الحساب' : 'Please Sign In to Access Your Account'}
        </h2>
        <button
          onClick={() => navigateTo('auth')}
          className="px-8 py-3 bg-black text-white text-xs font-semibold uppercase hover:bg-[#313030] transition-colors cursor-pointer"
        >
          {language === 'ar' ? 'تسجيل الدخول / إنشاء حساب' : 'Sign In / Register'}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-14 bg-[#fdf8f8] font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Profile Bar */}
        <div className="bg-white border border-[#e5e2e1] p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-black text-white flex items-center justify-center font-display text-2xl font-bold uppercase">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 bg-[#d7ef30] text-[#191e00] uppercase font-bold">
                  {user.tier}
                </span>
                <span className="text-xs text-[#747878] font-mono">{user.id}</span>
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-black">
                {user.name}
              </h1>
              <p className="text-xs text-[#5e5f5c]">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigateTo('home');
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#f1edec] hover:bg-[#ba1a1a] hover:text-white text-black text-xs font-semibold uppercase transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => navigateTo('orders')}
            className="bg-white border border-[#e5e2e1] p-5 cursor-pointer hover:border-black transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-[#747878]">
              <span className="font-medium">الطلبات المسجلة</span>
              <Package className="w-4 h-4 text-black" />
            </div>
            <div className="text-2xl font-bold text-black tabular-nums">{orders.length}</div>
            <div className="text-xs text-[#5e5f5c]">طلبات معتمدة في الخزينة</div>
          </div>

          <div
            onClick={() => navigateTo('wishlist')}
            className="bg-white border border-[#e5e2e1] p-5 cursor-pointer hover:border-black transition-colors space-y-1"
          >
            <div className="flex items-center justify-between text-xs text-[#747878]">
              <span className="font-medium">المفضلة والمراقبة</span>
              <Heart className="w-4 h-4 text-black" />
            </div>
            <div className="text-2xl font-bold text-black tabular-nums">{wishlist.length}</div>
            <div className="text-xs text-[#5e5f5c]">عينات محفوظة في قائمتك</div>
          </div>

          <div className="bg-white border border-[#e5e2e1] p-5 space-y-1">
            <div className="flex items-center justify-between text-xs text-[#747878]">
              <span className="font-medium">مستوى العضوية</span>
              <Award className="w-4 h-4 text-[#d7ef30] fill-black" />
            </div>
            <div className="text-2xl font-bold text-black">VIP Collector</div>
            <div className="text-xs text-[#5e5f5c]">أولوية السحب والشحن المجاني</div>
          </div>
        </div>

        {/* Concierge & Admin Quick Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f1edec] p-6 border border-[#e5e2e1] space-y-3">
            <h3 className="font-display text-base font-bold text-black">
              خدمة الكونسيرج الخاصة للمقتنين
            </h3>
            <p className="text-xs text-[#5e5f5c] leading-relaxed">
              تواصل مع فريق الخبراء لتأمين أي زوج أرشيفي نادر أو ترتيب معاينة خاصة في القاهرة قبل الشراء.
            </p>
            <div className="pt-2 text-xs font-semibold text-black">
              البريد: concierge@morv-flagship.com · الهاتف: 01098841920
            </div>
          </div>

          <div className="bg-[#1c1b1b] text-white p-6 border border-black space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-[#d7ef30]" />
                <span className="text-xs font-semibold text-[#d7ef30]">لوحة التحكم والإدارة</span>
              </div>
              <h3 className="font-display text-base font-bold text-white">
                إدارة المتجر والعمليات الكاملة
              </h3>
              <p className="text-xs text-[#c9c6c5] leading-relaxed mt-1">
                الوصول السريع إلى المنتجات والمخزون والطلبات وطرق الدفع والشحن.
              </p>
            </div>
            <button
              onClick={() => navigateTo('admin')}
              className="mt-3 px-4 py-2.5 bg-[#d7ef30] hover:bg-white text-black text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>فتح لوحة التحكم (Admin Portal)</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
