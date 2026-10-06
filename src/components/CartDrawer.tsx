import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    formatPrice,
    navigateTo,
    t,
    language
  } = useStore();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2500;
  const progressPercent = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#000000]/70 backdrop-blur-sm transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 max-w-full flex w-full sm:w-auto sm:pl-10 rtl:sm:pl-0 rtl:sm:pr-10">
        <div className="w-full sm:max-w-md bg-[#ffffff] shadow-2xl flex flex-col justify-between border-l rtl:border-l-0 rtl:border-r border-[#e5e2e1]">
          {/* Header */}
          <div className="px-5 py-4 border-b border-[#e5e2e1] flex items-center justify-between bg-[#fdf8f8]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-black" />
              <h2 className="text-base font-bold text-black font-display">
                {t('cartTitle')}
              </h2>
              <span className="text-xs px-2 py-0.5 bg-[#f1edec] text-[#5e5f5c] font-medium">
                {cart.length} {t('items')}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 hover:bg-[#f1edec] text-[#5e5f5c] hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-[#f7f3f2] border-b border-[#e5e2e1] text-xs">
            <div className="flex items-center justify-between mb-1.5 text-[#1c1b1b]">
              <span>
                {cartSubtotal >= freeShippingThreshold
                  ? t('freeShippingQualified')
                  : t('freeShippingRemaining', { amount: formatPrice(remainingForFreeShipping) })}
              </span>
              <span className="font-bold text-[#000000] tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-1 bg-[#e5e2e1] overflow-hidden">
              <div
                className="h-full bg-[#000000] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items Scroll Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#747878] space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#c4c7c7] stroke-1" />
                <p className="font-display text-lg font-bold text-black">
                  {t('cartEmpty')}
                </p>
                <p className="text-xs text-[#5e5f5c] max-w-xs">
                  {t('cartEmptyDesc')}
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-semibold hover:bg-[#313030] transition-colors cursor-pointer"
                >
                  {t('startShopping')}
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-[#fdf8f8] border border-[#e5e2e1] relative group"
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      setIsCartOpen(false);
                      navigateTo('product', item.product);
                    }}
                    className="w-20 h-20 bg-white border border-[#e5e2e1] p-1 shrink-0 flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={item.product.primaryImage}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-[#747878] truncate font-medium">
                        {item.product.brand}
                      </div>
                      <h4
                        onClick={() => {
                          setIsCartOpen(false);
                          navigateTo('product', item.product);
                        }}
                        className="text-xs sm:text-sm font-semibold text-black truncate cursor-pointer hover:underline"
                      >
                        {language === 'ar' && item.product.nameAr ? item.product.nameAr : item.product.name}
                      </h4>
                      <div className="text-xs text-[#5e5f5c] mt-0.5">
                        {t('size')} <span className="font-bold text-black">EU {item.selectedSize.replace('EU ', '')}</span>
                      </div>
                    </div>

                    {/* Quantity Stepper & Price */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#f1edec]">
                      <div className="flex items-center border border-[#e5e2e1] bg-white">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity - 1)}
                          className="p-1 hover:bg-[#f1edec] text-[#5e5f5c] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-black tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.quantity + 1)}
                          className="p-1 hover:bg-[#f1edec] text-[#5e5f5c] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-xs font-bold text-black tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                    className="absolute top-2 right-2 rtl:right-auto rtl:left-2 text-[#747878] hover:text-[#ba1a1a] p-1 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#e5e2e1] bg-[#fdf8f8] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#5e5f5c]">
                  <span>{t('subtotal')}</span>
                  <span className="text-black font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5e5f5c]">
                  <span>{t('shipping')}</span>
                  <span className="text-black font-medium">
                    {cartSubtotal >= freeShippingThreshold ? t('freeComplimentary') : formatPrice(65)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-black pt-2 border-t border-[#e5e2e1]">
                  <span>{t('total')}</span>
                  <span className="text-base font-bold tabular-nums">
                    {formatPrice(cartSubtotal >= freeShippingThreshold ? cartSubtotal : cartSubtotal + 65)}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="w-full bg-[#000000] hover:bg-[#313030] text-[#ffffff] py-3.5 text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('cart');
                  }}
                  className="w-full bg-[#f1edec] hover:bg-[#ebe7e6] text-[#000000] py-2 text-xs transition-colors cursor-pointer font-medium"
                >
                  {language === 'ar' ? 'عرض تفاصيل الحقيبة الكاملة' : 'View Full Bag Details'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
