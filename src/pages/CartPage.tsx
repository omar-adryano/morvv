import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartSubtotal, formatPrice, navigateTo, t, language, showToast } = useStore();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const freeShippingThreshold = 2500;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping ? 0 : 65;
  const total = Math.max(0, cartSubtotal - discount) + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'MORV10' || promoCode.trim().toUpperCase() === 'VAULT') {
      const disc = Math.round(cartSubtotal * 0.1);
      setDiscount(disc);
      showToast(language === 'ar' ? 'تم تطبيق خصم المقتنين 10% بنجاح ✓' : 'Collector 10% Privilege Code Applied ✓');
    } else {
      showToast(language === 'ar' ? 'رمز غير صالح. جرب MORV10' : 'Invalid code. Try MORV10');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center p-6 sm:p-12 font-sans">
        <ShoppingBag className="w-16 h-16 text-[#c4c7c7] stroke-1 mb-4" />
        <h1 className="font-display text-2xl font-bold text-black mb-2">
          {t('cartEmpty')}
        </h1>
        <p className="text-sm text-[#5e5f5c] max-w-sm mb-6">
          {t('cartEmptyDesc')}
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3 bg-black text-white text-xs font-semibold uppercase hover:bg-[#313030] transition-colors cursor-pointer"
        >
          {t('startShopping')}
        </button>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#fdf8f8] font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="border-b border-[#e5e2e1] pb-4 mb-8">
          <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
            حقيبة التسوق والطلب
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-black">
            {t('cartTitle')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Items List (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="bg-white border border-[#e5e2e1] p-4 flex gap-4 relative"
              >
                <div
                  onClick={() => navigateTo('product', item.product)}
                  className="w-24 h-24 bg-[#f7f3f2] border border-[#e5e2e1] p-2 shrink-0 flex items-center justify-center cursor-pointer"
                >
                  <img
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#747878] font-medium">
                        {item.product.brand}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        className="text-[#747878] hover:text-[#ba1a1a] transition-colors cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3
                      onClick={() => navigateTo('product', item.product)}
                      className="text-sm sm:text-base font-semibold text-black hover:underline cursor-pointer truncate mt-0.5"
                    >
                      {language === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name}
                    </h3>

                    <div className="text-xs text-[#5e5f5c] mt-1">
                      {t('size')} <span className="font-bold text-black">EU {item.selectedSize.replace('EU ', '')}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#f7f3f2]">
                    <div className="flex items-center border border-[#e5e2e1] bg-white">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                        className="p-1.5 hover:bg-[#f1edec] text-[#5e5f5c] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-bold text-black tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                        className="p-1.5 hover:bg-[#f1edec] text-[#5e5f5c] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-sm font-bold text-black tabular-nums">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Verification Guarantee */}
            <div className="p-4 bg-[#f1edec] border border-[#e5e2e1] flex items-center gap-3 text-xs text-[#5e5f5c]">
              <ShieldCheck className="w-5 h-5 text-black shrink-0" />
              <span>
                {language === 'ar'
                  ? 'جميع القطع مشمولة بتأمين الشحن الكامل وفحص التوثيق الفيزيائي قبل الإرسال مع شريحة NFC.'
                  : 'All archive lots include full transit insurance and cryptographic authenticity NFC ledger certificates.'}
              </span>
            </div>
          </div>

          {/* Summary Column (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#e5e2e1] p-6 space-y-6 sticky top-24">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-black border-b border-[#e5e2e1] pb-3">
              {language === 'ar' ? 'ملخص الطلب والحساب' : 'Order Summary'}
            </h2>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="رمز الكوبون (مثال: MORV10)"
                className="flex-1 bg-[#f7f3f2] border border-[#e5e2e1] px-3.5 py-2 text-xs font-sans uppercase text-black placeholder:text-[#747878] focus:outline-none focus:border-black rounded-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white text-xs font-semibold uppercase hover:bg-[#313030] transition-colors cursor-pointer"
              >
                تطبيق
              </button>
            </form>

            <div className="space-y-2 text-xs border-t border-[#e5e2e1] pt-4">
              <div className="flex justify-between text-[#5e5f5c]">
                <span>{t('subtotal')}</span>
                <span className="text-black font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>خصم المقتنين:</span>
                  <span className="tabular-nums">-{formatPrice(discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-[#5e5f5c]">
                <span>{t('shipping')}</span>
                <span className="text-black font-medium">
                  {isFreeShipping ? t('freeComplimentary') : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-black pt-3 border-t border-[#e5e2e1]">
                <span>{t('total')}</span>
                <span className="text-lg font-bold tabular-nums">{formatPrice(total)}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full bg-black hover:bg-[#313030] text-white py-4 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>{t('proceedToCheckout')}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
