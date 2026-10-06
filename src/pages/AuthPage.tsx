import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { login, register, navigateTo, showToast, language } = useStore();
  const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast(language === 'ar' ? 'الرجاء إدخال بريد إلكتروني صالح' : 'Please enter a valid email');
      return;
    }

    if (mode === 'signin') {
      login(email);
      navigateTo('account');
    } else if (mode === 'register') {
      if (!name) {
        showToast(language === 'ar' ? 'الرجاء إدخال اسمك' : 'Please enter your name');
        return;
      }
      register(email, name);
      navigateTo('account');
    } else {
      setForgotSent(true);
      showToast(language === 'ar' ? 'تم إرسال رابط استعادة الرمز' : 'Reset instructions transmitted');
    }
  };

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 bg-[#fdf8f8] font-sans">
      <div className="max-w-md w-full bg-white border border-[#e5e2e1] p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header Tabs */}
        <div className="flex border-b border-[#e5e2e1]">
          <button
            onClick={() => {
              setMode('signin');
              setForgotSent(false);
            }}
            className={`flex-1 py-3 text-xs uppercase font-semibold transition-colors cursor-pointer ${
              mode === 'signin' ? 'border-b-2 border-black text-black' : 'text-[#747878] hover:text-black'
            }`}
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            onClick={() => {
              setMode('register');
              setForgotSent(false);
            }}
            className={`flex-1 py-3 text-xs uppercase font-semibold transition-colors cursor-pointer ${
              mode === 'register' ? 'border-b-2 border-black text-black' : 'text-[#747878] hover:text-black'
            }`}
          >
            {language === 'ar' ? 'تسجيل عضوية' : 'Register'}
          </button>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-display text-xl font-bold text-black">
            {mode === 'signin'
              ? (language === 'ar' ? 'الدخول إلى حساب المقتنين' : 'Collector Registry Access')
              : mode === 'register'
              ? (language === 'ar' ? 'إنشاء حساب مقتنٍ معتمد' : 'Authenticated Registration')
              : (language === 'ar' ? 'استعادة كلمة المرور' : 'Recover Access')}
          </h1>
          <p className="text-xs text-[#5e5f5c] leading-relaxed">
            {mode === 'signin'
              ? (language === 'ar' ? 'أدخل بياناتك للوصول إلى طلباتك والميزات الحصرية' : 'Enter credentials to view active allocations and vault balances')
              : (language === 'ar' ? 'سجل للحصول على أولوية الدخول في السحوبات' : 'Register for priority ballot allocations and private showroom invitations')}
          </p>
        </div>

        {forgotSent ? (
          <div className="p-4 bg-[#f7f3f2] border border-[#e5e2e1] text-center space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#d7ef30] fill-black mx-auto" />
            <p className="text-xs text-black font-semibold">
              {language === 'ar'
                ? `تم إرسال بريد إلكتروني إلى ${email} يحتوي على رابط إعادة تعيين كلمة المرور.`
                : `A recovery link has been dispatched to ${email}.`}
            </p>
            <button
              onClick={() => {
                setForgotSent(false);
                setMode('signin');
              }}
              className="text-xs font-semibold text-black underline cursor-pointer"
            >
              العودة لتسجيل الدخول
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-xs text-[#747878] font-medium block">الاسم الكامل</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="محمد أحمد"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs text-[#747878] font-medium block">البريد الإلكتروني</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
              />
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-[#747878] font-medium">كلمة المرور</label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-xs text-[#747878] hover:text-black underline cursor-pointer"
                    >
                      نسيت كلمة المرور؟
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black hover:bg-[#313030] text-white py-3.5 text-xs sm:text-sm font-semibold uppercase transition-colors cursor-pointer rounded-none"
            >
              {mode === 'signin'
                ? (language === 'ar' ? 'تسجيل الدخول' : 'Sign In')
                : mode === 'register'
                ? (language === 'ar' ? 'إنشاء حساب جديد' : 'Create Account')
                : (language === 'ar' ? 'إرسال رابط الاستعادة' : 'Send Recovery Link')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
