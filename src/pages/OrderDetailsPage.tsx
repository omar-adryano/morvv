import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowLeft, ShieldCheck, Nfc } from 'lucide-react';

export const OrderDetailsPage: React.FC = () => {
  const { selectedOrderId, orders, navigateTo, formatPrice, language } = useStore();

  const order = orders.find((o) => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4 font-sans">
        <h2 className="font-display text-xl font-bold text-black">
          لم يتم العثور على سجل هذا الطلب
        </h2>
        <button
          onClick={() => navigateTo('orders')}
          className="px-6 py-2 bg-black text-white text-xs font-semibold cursor-pointer"
        >
          العودة إلى جميع الطلبات
        </button>
      </div>
    );
  }

  const steps = [
    { title: 'تسجيل وتأكيد الطلب', desc: 'تم استلام بيانات الطلب وتأكيد الحجز في المستودع', done: true },
    { title: 'الفحص الفيزيائي والميكروسكوبي', desc: 'اجتياز فحص التوثيق الشامل ومطابقة خامات المصنع', done: true },
    { title: 'برمجة وتثبيت شريحة NFC', desc: 'تشفير رمز الشهادة الرقمية غير القابلة للتكرار', done: order.status !== 'processing' },
    { title: 'شحن أمني مصفح ومؤمن', desc: 'الشحنة في طريقها مع مندوب التوصيل', done: order.status === 'dispatched' || order.status === 'delivered' },
    { title: 'تسليم العميل والمعاينة', desc: 'فحص الحذاء وتأكيد الاستلام', done: order.status === 'delivered' }
  ];

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-8 sm:py-12 bg-[#fdf8f8] font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigateTo('orders')}
          className="text-xs text-[#747878] hover:text-black flex items-center gap-1.5 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
          <span>{language === 'ar' ? 'العودة إلى سجل الطلبات' : 'Back to Order Registry'}</span>
        </button>

        {/* Header Certificate Card */}
        <div className="bg-black text-white p-6 sm:p-8 space-y-6 border border-[#313030]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#313030] pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#d7ef30] text-[#191e00] text-[10px] font-bold">
                  سجل أصالة معتمد
                </span>
                <span className="text-xs text-[#747878]">{order.date}</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
                {order.orderNumber}
              </h1>
            </div>

            <div className="text-left rtl:text-right text-xs">
              <div className="text-[#747878] text-[11px]">إجمالي القيمة</div>
              <div className="text-xl font-bold text-white tabular-nums">{formatPrice(order.total)}</div>
            </div>
          </div>

          {/* NFC Certificate Banner */}
          <div className="p-4 bg-[#1c1b1b] border border-[#313030] flex items-start gap-4">
            <Nfc className="w-8 h-8 text-[#d7ef30] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-bold text-[#d7ef30]">
                شهادة NFC الرقمية الموثقة: <span className="font-mono text-sm">{order.nfcCertHash}</span>
              </div>
              <p className="text-[#c9c6c5] leading-relaxed">
                هذا الرمز مشفر داخل الشريحة المدمجة في ختم الحذاء الأيمن، ويثبت أصل الحذاء وتاريخ الفحص الفيزيائي المعتمد في غرف MORV.
              </p>
            </div>
          </div>
        </div>

        {/* Verification & Logistics Timeline */}
        <div className="bg-white border border-[#e5e2e1] p-6 space-y-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black border-b border-[#e5e2e1] pb-3">
            مسار التوثيق والشحن
          </h2>

          <div className="space-y-4">
            {steps.map((st, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex flex-col items-center mt-1">
                  <div
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                      st.done ? 'bg-[#d7ef30]' : 'bg-[#e5e2e1]'
                    }`}
                  >
                    {st.done && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`w-0.5 h-8 my-1 ${st.done ? 'bg-black' : 'bg-[#e5e2e1]'}`} />
                  )}
                </div>

                <div className="text-xs space-y-0.5">
                  <div className={`font-semibold ${st.done ? 'text-black' : 'text-[#747878]'}`}>
                    {st.title}
                  </div>
                  <div className="text-[#5e5f5c] text-[11px]">{st.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-[#e5e2e1] p-6 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-black border-b border-[#e5e2e1] pb-3">
            الأحذية المشمولة في الطلب
          </h2>

          <div className="space-y-3">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex gap-4 p-3 bg-[#f7f3f2] border border-[#e5e2e1] text-xs">
                <img
                  src={item.product.primaryImage}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain bg-white p-1 border border-[#e5e2e1]"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-[#747878] font-medium">{item.product.brand}</div>
                    <div className="font-semibold text-black text-sm truncate">{item.product.name}</div>
                    <div className="text-xs text-[#5e5f5c] mt-0.5">
                      المقاس: <span className="font-bold text-black">EU {item.selectedSize.replace('EU ', '')}</span> · الكمية: {item.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-black tabular-nums">{formatPrice(item.price * item.quantity)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
