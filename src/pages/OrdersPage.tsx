import React from 'react';
import { useStore } from '../context/StoreContext';
import { Package, ArrowRight, ShieldCheck } from 'lucide-react';

export const OrdersPage: React.FC = () => {
  const { orders, navigateTo, formatPrice, t, language } = useStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-[#d7ef30] text-[#191e00] font-semibold';
      case 'dispatched':
        return 'bg-black text-white font-semibold';
      case 'authenticated':
        return 'bg-[#f1edec] text-black border border-[#e5e2e1] font-semibold';
      default:
        return 'bg-[#e5e2e1] text-[#5e5f5c]';
    }
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#fdf8f8] font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-[#e5e2e1] pb-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              سجل الطلبات والشحنات
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-black">
              {language === 'ar' ? 'سجل طلبات الاقتناء الخاصة بك' : 'Your Archive Orders'}
            </h1>
          </div>
          <span className="text-xs text-[#5e5f5c] tabular-nums">
            {orders.length} {language === 'ar' ? 'طلبات مسجلة' : 'Orders'}
          </span>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="bg-white border border-[#e5e2e1] p-12 text-center space-y-3">
            <Package className="w-12 h-12 text-[#c4c7c7] mx-auto stroke-1" />
            <h3 className="font-display text-lg font-bold text-black">
              {language === 'ar' ? 'لا توجد طلبات سابقة مسجلة' : 'No Recorded Orders Found'}
            </h3>
            <p className="text-xs text-[#5e5f5c] max-w-sm mx-auto">
              {language === 'ar'
                ? 'استكشف كتالوج الأرشيف وابدأ بتوثيق أول زوج في مجموعتك الخاصة.'
                : 'Explore the catalog and secure your first verified archival deadstock specimen.'}
            </p>
            <button
              onClick={() => navigateTo('shop')}
              className="mt-4 px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase hover:bg-[#313030] transition-colors cursor-pointer"
            >
              {t('startShopping')}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => navigateTo('orderDetails', ord.id)}
                className="bg-white border border-[#e5e2e1] p-5 hover:border-black transition-colors cursor-pointer space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1edec] pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black font-mono">{ord.orderNumber}</span>
                    <span className="text-[#747878]">·</span>
                    <span className="text-[#5e5f5c]">{ord.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-xs ${getStatusBadge(ord.status)}`}>
                      {ord.status.toUpperCase()}
                    </span>
                    <span className="font-bold text-black text-sm tabular-nums">
                      {formatPrice(ord.total)}
                    </span>
                  </div>
                </div>

                {/* Items strip */}
                <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 shrink-0 bg-[#f7f3f2] p-1.5 border border-[#e5e2e1]">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-10 h-10 object-contain mix-blend-multiply"
                      />
                      <div className="text-xs pr-2">
                        <div className="font-semibold text-black max-w-[140px] truncate">{item.product.name}</div>
                        <div className="text-[11px] text-[#747878]">EU {item.selectedSize.replace('EU ', '')} · x{item.quantity}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1 text-xs text-[#5e5f5c]">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#d7ef30] fill-black" />
                    <span className="font-mono text-[11px] truncate max-w-[240px]">{ord.nfcCertHash}</span>
                  </div>
                  <span className="font-semibold text-black flex items-center gap-1 hover:underline">
                    <span>عرض التفاصيل</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
