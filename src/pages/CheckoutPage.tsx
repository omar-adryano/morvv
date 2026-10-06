import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowRight, CheckCircle2, Lock, Copy, Check, Smartphone, Banknote } from 'lucide-react';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    placeOrder,
    navigateTo,
    t,
    language,
    user,
    showToast,
    paymentSettings,
    shippingSettings,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon
  } = useStore();

  const [customerInfo, setCustomerInfo] = useState({
    fullName: user?.defaultAddress?.fullName || user?.name || '',
    email: user?.email || '',
    phone: user?.defaultAddress?.phone || user?.phone || ''
  });

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.defaultAddress?.fullName || '',
    phone: user?.defaultAddress?.phone || '',
    country: user?.defaultAddress?.country || (language === 'ar' ? 'مصر' : 'Egypt'),
    city: user?.defaultAddress?.city || (language === 'ar' ? 'القاهرة' : 'Cairo'),
    district: user?.defaultAddress?.district || (language === 'ar' ? 'التجمع الخامس / الشيخ زايد' : 'New Cairo / Zayed'),
    addressLine1: user?.defaultAddress?.addressLine1 || (language === 'ar' ? 'شارع التسعين الشمالي، مجمع الأعمال' : 'North 90th Street, Suite 402'),
    postalCode: user?.defaultAddress?.postalCode || '11835'
  });

  // Dynamic Payment Methods from Admin Settings
  type ApprovedPaymentMethod = 'vodafone_cash' | 'instapay' | 'cod';
  const enabledPaymentMethods = paymentSettings.filter((pm) => pm.enabled);
  const firstEnabledId = (enabledPaymentMethods[0]?.id as ApprovedPaymentMethod) || 'vodafone_cash';

  const [paymentMethod, setPaymentMethod] = useState<ApprovedPaymentMethod>(firstEnabledId);

  useEffect(() => {
    if (!enabledPaymentMethods.some((pm) => pm.id === paymentMethod) && enabledPaymentMethods.length > 0) {
      setPaymentMethod(enabledPaymentMethods[0].id as ApprovedPaymentMethod);
    }
  }, [paymentSettings]);

  const [instapayHandle, setInstapayHandle] = useState('');
  const [vodafoneSenderNumber, setVodafoneSenderNumber] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [couponInput, setCouponInput] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Dynamic Shipping & Coupon Calculation
  const subtotalAfterDiscount = Math.max(0, cartSubtotal - couponDiscount);
  const isFreeShipping = subtotalAfterDiscount >= shippingSettings.freeShippingThreshold;
  const shippingFee = isFreeShipping ? 0 : shippingSettings.defaultFee;
  const total = subtotalAfterDiscount + shippingFee;

  // Active method configurations
  const vfConfig = paymentSettings.find((p) => p.id === 'vodafone_cash');
  const vfWalletNumber = vfConfig?.details?.walletNumber || '01098841920';

  const instaConfig = paymentSettings.find((p) => p.id === 'instapay');
  const instaAddress = instaConfig?.details?.ipaAddress || 'morv@instapay';
  const instaPhone = instaConfig?.details?.registeredPhone || '01098841920';

  const codConfig = paymentSettings.find((p) => p.id === 'cod');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput.trim());
    if (res.success) setCouponInput('');
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedField(field);
    showToast(language === 'ar' ? `تم نسخ ${text} بنجاح ✓` : `Copied ${text} ✓`);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerInfo.email || !shippingAddress.addressLine1 || !shippingAddress.city) {
      showToast(language === 'ar' ? 'يرجى إكمال جميع الحقول المطلوبة' : 'Please complete all required fields');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      let paymentLabel = 'Vodafone Cash (فودافون كاش)';
      if (paymentMethod === 'instapay') paymentLabel = 'InstaPay (انستاباي)';
      else if (paymentMethod === 'cod') paymentLabel = 'Cash on Delivery (الدفع عند الاستلام مع المعاينة)';

      const order = placeOrder(
        customerInfo,
        shippingAddress,
        language === 'ar' ? 'شحن أولوي متميز مجاني ومؤمن' : 'Complimentary Insured Priority Dispatch',
        paymentLabel
      );

      setCompletedOrder(order);
      setIsProcessing(false);
      showToast(language === 'ar' ? 'تم تأكيد طلبك بنجاح وجارٍ التجهيز ✓' : 'Order successfully placed ✓');
    }, 1200);
  };

  // Success Confirmation Screen
  if (completedOrder) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 py-16 bg-[#fdf8f8] font-sans">
        <div className="max-w-xl w-full bg-white border border-[#e5e2e1] p-6 sm:p-10 shadow-xl space-y-6 text-center">
          <div className="w-14 h-14 bg-[#d7ef30] rounded-full mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#191e00]" />
          </div>

          <div className="space-y-1">
            <span className="text-xs text-[#747878] uppercase tracking-wide font-medium">
              تم تأكيد الطلب وتوثيق الحجز
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {t('orderSuccess')}
            </h1>
          </div>

          <div className="p-4 bg-[#f7f3f2] border border-[#e5e2e1] text-xs text-left rtl:text-right space-y-2.5">
            <div className="flex justify-between border-b border-[#e5e2e1] pb-2">
              <span className="text-[#5e5f5c]">{t('orderNumber')}</span>
              <span className="font-bold text-black font-mono">{completedOrder.orderNumber}</span>
            </div>
            <div className="flex justify-between border-b border-[#e5e2e1] pb-2">
              <span className="text-[#5e5f5c]">طريقة السداد:</span>
              <span className="font-semibold text-black">{completedOrder.paymentMethod}</span>
            </div>
            <div className="flex justify-between border-b border-[#e5e2e1] pb-2">
              <span className="text-[#5e5f5c]">{t('nfcLedgerId')}</span>
              <span className="font-mono text-[11px] text-black font-semibold truncate max-w-[200px]">
                {completedOrder.nfcCertHash}
              </span>
            </div>
            <div className="flex justify-between border-b border-[#e5e2e1] pb-2">
              <span className="text-[#5e5f5c]">{t('total')}</span>
              <span className="font-bold text-black tabular-nums">{formatPrice(completedOrder.total)}</span>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-[#5e5f5c]">عنوان التوصيل:</span>
              <span className="text-black font-medium">{completedOrder.shippingAddress.city}، {completedOrder.shippingAddress.country}</span>
            </div>
          </div>

          {/* Payment Specific Instructions */}
          {paymentMethod === 'vodafone_cash' && (
            <div className="p-4 bg-[#f1edec] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#e60000] text-left rtl:text-right text-xs space-y-1.5">
              <div className="font-bold text-black">
                <span>تعليمات فودافون كاش:</span>
              </div>
              <p className="text-[#5e5f5c] leading-relaxed">
                يرجى تحويل إجمالي المبلغ <strong>{formatPrice(completedOrder.total)}</strong> إلى محفظة فودافون كاش: <strong className="text-black font-mono text-sm">{vfWalletNumber}</strong>. سيصلك إشعار بالواتساب أو رسالة تأكيد فور استلام الحوالة.
              </p>
            </div>
          )}

          {paymentMethod === 'instapay' && (
            <div className="p-4 bg-[#f1edec] border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#7b2cbf] text-left rtl:text-right text-xs space-y-1.5">
              <div className="font-bold text-black">
                <span>تعليمات التحويل عبر انستاباي (InstaPay):</span>
              </div>
              <p className="text-[#5e5f5c] leading-relaxed">
                يرجى تحويل إجمالي المبلغ <strong>{formatPrice(completedOrder.total)}</strong> إلى معرّف انستاباي: <strong className="text-black font-mono text-sm">{instaAddress}</strong> أو عبر رقم الهاتف المسجل <strong>{instaPhone}</strong>.
              </p>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="p-4 bg-[#f1edec] border-l-4 rtl:border-l-0 rtl:border-r-4 border-black text-left rtl:text-right text-xs space-y-1.5">
              <div className="font-bold text-black">
                <span>الدفع عند الاستلام مع المعاينة:</span>
              </div>
              <p className="text-[#5e5f5c] leading-relaxed">
                طلبك مؤكد بنجاح. سيتصل بك مندوب الشحن قبل الحضور. يحق لك فتح الشحنة ومعاينة الزوج والتأكد من المقاس وبطاقة الأصالة NFC قبل السداد نقداً.
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigateTo('orders')}
              className="flex-1 bg-black text-white py-3.5 text-xs font-semibold uppercase hover:bg-[#313030] transition-colors cursor-pointer"
            >
              {t('viewOrders')}
            </button>
            <button
              onClick={() => navigateTo('home')}
              className="flex-1 bg-[#f1edec] text-black py-3.5 text-xs font-semibold uppercase hover:bg-[#ebe7e6] transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'متابعة التسوق' : 'Continue Shopping'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#fdf8f8] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Checkout Header */}
        <div className="border-b border-[#e5e2e1] pb-4 mb-8 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              إتمام الطلب والدفع الآمن
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {t('checkoutTitle')}
            </h1>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#5e5f5c]">
            <Lock className="w-3.5 h-3.5 text-black" />
            <span className="hidden sm:inline font-medium">اتصال آمن وموثق 256-Bit</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Form: Customer Info -> Shipping Address -> Payment Methods */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Step 1: Customer Info */}
            <div className="bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black border-b border-[#e5e2e1] pb-2">
                {t('contactInfo')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  type="email"
                  required
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                  placeholder={t('emailPlaceholder')}
                  className="bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />
                <input
                  type="tel"
                  required
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                  placeholder={language === 'ar' ? 'رقم الهاتف للتوصيل (01xxxxxxxxx)' : 'Mobile Phone (+20 / 01xxxxxxxxx)'}
                  className="bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />
              </div>
            </div>

            {/* Step 2: Shipping / Delivery Address */}
            <div className="bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-black border-b border-[#e5e2e1] pb-2">
                {t('shippingInfo')}
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  required
                  value={shippingAddress.fullName}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  placeholder={t('fullName')}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                    className="bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black cursor-pointer rounded-none"
                  >
                    <option value="مصر">جمهورية مصر العربية (Egypt)</option>
                    <option value="المملكة العربية السعودية">المملكة العربية السعودية (KSA)</option>
                    <option value="الإمارات العربية المتحدة">الإمارات العربية المتحدة (UAE)</option>
                    <option value="الكويت">الكويت (Kuwait)</option>
                  </select>

                  <input
                    type="text"
                    required
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                    placeholder={language === 'ar' ? 'المحافظة (القاهرة، الجيزة، الإسكندرية...)' : 'Governorate / City'}
                    className="bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                  />
                </div>

                <input
                  type="text"
                  required
                  value={shippingAddress.addressLine1}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
                  placeholder={t('addressLine')}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />

                <input
                  type="text"
                  value={shippingAddress.postalCode}
                  onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                  placeholder={t('postalCode')}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2.5 text-xs sm:text-sm text-black focus:outline-none focus:border-black rounded-none"
                />
              </div>
            </div>

            {/* PAYMENT METHODS — EXACTLY THE 3 APPROVED EGYPTIAN METHODS */}
            <div className="bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-2">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-black">
                  {t('paymentMethod')}
                </h2>
                <span className="text-xs font-semibold text-black bg-[#d7ef30] px-2 py-0.5">
                  طرق دفع محلية معتمدة
                </span>
              </div>

              {/* Selector for the 3 Methods */}
              <div className="space-y-3">
                {/* 1. Vodafone Cash */}
                {vfConfig?.enabled !== false && (
                  <div
                    onClick={() => setPaymentMethod('vodafone_cash')}
                    className={`border transition-all cursor-pointer ${
                      paymentMethod === 'vodafone_cash'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-[#e5e2e1] bg-[#fdf8f8] hover:border-black text-black'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === 'vodafone_cash' ? 'border-white' : 'border-black'
                        }`}>
                          {paymentMethod === 'vodafone_cash' && (
                            <div className="w-2 h-2 rounded-full bg-[#d7ef30]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Vodafone Cash (فودافون كاش)</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 font-semibold ${
                        paymentMethod === 'vodafone_cash' ? 'bg-[#d7ef30] text-[#191e00]' : 'bg-[#e60000] text-white'
                      }`}>
                        محفظة إلكترونية
                      </span>
                    </div>

                    {paymentMethod === 'vodafone_cash' && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-3 text-xs">
                        <p className="text-white/80 leading-relaxed">
                          قم بتحويل المبلغ الإجمالي إلى رقم محفظة فودافون كاش المعتمد أدناه، ثم أدخل رقم الهاتف الذي قمت بالتحويل منه لتأكيد إيداعك فورياً:
                        </p>

                        <div className="p-3 bg-white/10 border border-white/20 flex items-center justify-between">
                          <div>
                            <div className="text-[11px] text-white/60">رقم المحفظة المعتمد:</div>
                            <div className="font-mono text-base font-bold text-[#d7ef30] tracking-wider">{vfWalletNumber}</div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(vfWalletNumber, 'vf');
                            }}
                            className="px-3 py-1.5 bg-white text-black text-xs font-semibold flex items-center gap-1.5 hover:bg-[#d7ef30] transition-colors"
                          >
                            {copiedField === 'vf' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedField === 'vf' ? 'تم النسخ' : 'نسخ الرقم'}</span>
                          </button>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-white/80 block font-medium">
                            رقم الهاتف المحوّل منه (اختياري لتسريع التأكيد):
                          </label>
                          <input
                            type="tel"
                            value={vodafoneSenderNumber}
                            onChange={(e) => setVodafoneSenderNumber(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="مثال: 01012345678"
                            className="w-full bg-white/10 border border-white/20 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#d7ef30]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. InstaPay */}
                {instaConfig?.enabled !== false && (
                  <div
                    onClick={() => setPaymentMethod('instapay')}
                    className={`border transition-all cursor-pointer ${
                      paymentMethod === 'instapay'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-[#e5e2e1] bg-[#fdf8f8] hover:border-black text-black'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === 'instapay' ? 'border-white' : 'border-black'
                        }`}>
                          {paymentMethod === 'instapay' && (
                            <div className="w-2 h-2 rounded-full bg-[#d7ef30]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">InstaPay (انستاباي)</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 font-semibold ${
                        paymentMethod === 'instapay' ? 'bg-[#d7ef30] text-[#191e00]' : 'bg-[#7b2cbf] text-white'
                      }`}>
                        تحويل بنكي لحظي
                      </span>
                    </div>

                    {paymentMethod === 'instapay' && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-3 text-xs">
                        <p className="text-white/80 leading-relaxed">
                          قم بتحويل المبلغ عبر تطبيق انستاباي إلى عنوان الدفع اللحظي (IPA) أو رقم الهاتف المسجل أدناه:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="p-3 bg-white/10 border border-white/20 flex items-center justify-between">
                            <div>
                              <div className="text-[11px] text-white/60">عنوان الدفع اللحظي (IPA):</div>
                              <div className="font-mono text-sm font-bold text-[#d7ef30]">{instaAddress}</div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(instaAddress, 'insta-ipa');
                              }}
                              className="p-1.5 bg-white text-black hover:bg-[#d7ef30] transition-colors"
                            >
                              {copiedField === 'insta-ipa' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <div className="p-3 bg-white/10 border border-white/20 flex items-center justify-between">
                            <div>
                              <div className="text-[11px] text-white/60">رقم الهاتف المسجل:</div>
                              <div className="font-mono text-sm font-bold text-[#d7ef30]">{instaPhone}</div>
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy(instaPhone, 'insta-phone');
                              }}
                              className="p-1.5 bg-white text-black hover:bg-[#d7ef30] transition-colors"
                            >
                              {copiedField === 'insta-phone' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs text-white/80 block font-medium">
                            اسم الحساب أو المعرف المحول منه (لتسريع التحقق):
                          </label>
                          <input
                            type="text"
                            value={instapayHandle}
                            onChange={(e) => setInstapayHandle(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            placeholder="مثال: name@instapay أو اسم المرسل"
                            className="w-full bg-white/10 border border-white/20 px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[#d7ef30]"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Cash on Delivery */}
                {codConfig?.enabled !== false && (
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-black bg-black text-white shadow-md'
                        : 'border-[#e5e2e1] bg-[#fdf8f8] hover:border-black text-black'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          paymentMethod === 'cod' ? 'border-white' : 'border-black'
                        }`}>
                          {paymentMethod === 'cod' && (
                            <div className="w-2 h-2 rounded-full bg-[#d7ef30]" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Banknote className="w-5 h-5 shrink-0" />
                          <span className="font-semibold text-sm sm:text-base">Cash on Delivery (الدفع عند الاستلام)</span>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-0.5 font-semibold ${
                        paymentMethod === 'cod' ? 'bg-[#d7ef30] text-[#191e00]' : 'bg-[#1c1b1b] text-white'
                      }`}>
                        معاينة قبل الدفع
                      </span>
                    </div>

                    {paymentMethod === 'cod' && (
                      <div className="px-5 pb-5 pt-1 border-t border-white/10 space-y-2.5 text-xs">
                        <p className="text-white/80 leading-relaxed">
                          ادفع نقداً لمندوب الشحن عند استلام الطلب. يحق لك فتح الصندوق وفحص الزوج الأرشيفي والتأكد من المقاس وبطاقة الأصالة NFC قبل السداد.
                        </p>
                        <div className="p-3 bg-white/10 border border-white/20 flex items-center gap-2 text-white">
                          <ShieldCheck className="w-4 h-4 text-[#d7ef30] shrink-0" />
                          <span>ضمان كامل للمعانية قبل الدفع في جميع أنحاء مصر بدون أي مخاطرة.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-5 sticky top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-black border-b border-[#e5e2e1] pb-3">
              {language === 'ar' ? 'ملخص الطلب والحقيبة' : 'Order Summary'}
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} className="flex gap-3 text-xs">
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-12 h-12 bg-[#f7f3f2] p-1 object-contain border border-[#e5e2e1]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-black truncate">{language === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name}</div>
                    <div className="text-[11px] text-[#5e5f5c] mt-0.5">
                      {t('size')} EU {item.selectedSize.replace('EU ', '')} · الكمية: {item.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-black tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <div className="pt-3 border-t border-[#e5e2e1] space-y-2">
              <span className="text-xs uppercase font-medium text-[#747878] block">
                {language === 'ar' ? 'كوبون الخصم:' : 'Discount Privilege Coupon:'}
              </span>

              {appliedCoupon ? (
                <div className="p-2.5 bg-[#fdf8f8] border border-black flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#d7ef30]" />
                    <strong className="text-black font-semibold uppercase font-mono">{appliedCoupon.code}</strong>
                    <span className="text-[#5e5f5c]">
                      (-{appliedCoupon.type === 'percentage' ? `${appliedCoupon.value}%` : formatPrice(appliedCoupon.value)})
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:text-red-800 underline font-semibold cursor-pointer"
                  >
                    {language === 'ar' ? 'إزالة' : 'Remove'}
                  </button>
                </div>
              ) : (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder={language === 'ar' ? 'رمز الكوبون (مثال: WELCOME10)' : 'Coupon code'}
                    className="flex-1 bg-[#f7f3f2] border border-[#e5e2e1] px-3 py-2 text-xs font-sans uppercase text-black placeholder:text-[#747878] focus:outline-none focus:border-black rounded-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 bg-black hover:bg-[#313030] text-white text-xs font-semibold uppercase transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'تطبيق' : 'Apply'}
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs border-t border-[#e5e2e1] pt-4">
              <div className="flex justify-between text-[#5e5f5c]">
                <span>{t('subtotal')}</span>
                <span className="text-black font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>خصم الكوبون:</span>
                  <span className="tabular-nums">-{formatPrice(couponDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#5e5f5c]">
                <span>{t('shipping')}</span>
                <span className="text-black font-medium">
                  {isFreeShipping ? t('freeComplimentary') : formatPrice(shippingFee)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-[#e5e2e1]">
                <span>{t('total')}</span>
                <span className="text-lg font-bold tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Selected Payment Method Indicator */}
            <div className="p-3 bg-[#f7f3f2] border border-[#e5e2e1] flex items-center justify-between text-xs">
              <span className="text-[#5e5f5c]">وسيلة الدفع المختارة:</span>
              <span className="font-semibold text-black">
                {paymentMethod === 'vodafone_cash'
                  ? 'فودافون كاش (Vodafone Cash)'
                  : paymentMethod === 'instapay'
                  ? 'انستاباي (InstaPay)'
                  : 'الدفع عند الاستلام (COD)'}
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-black hover:bg-[#313030] text-white py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm disabled:opacity-50 min-h-[48px] rounded-none"
            >
              <span>{isProcessing ? t('orderProcessing') : t('placeOrder')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <div className="text-xs text-[#747878] text-center">
              جميع الأسعار بالجنيه المصري (ج.م) وشاملة الضريبة والشحن المؤمن
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
