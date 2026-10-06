import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_ABANDONED_CARTS } from '../../data/initialAdminData';
import { AbandonedCart } from '../../types/admin';
import {
  ShoppingCart,
  Send,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Copy,
  ArrowRight,
  RefreshCw,
  Search
} from 'lucide-react';

export const AbandonedCartsManager: React.FC = () => {
  const { formatPrice, showToast, language, logActivity } = useStore();

  const [carts, setCarts] = useState<AbandonedCart[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_abandoned_carts');
      return saved ? JSON.parse(saved) : INITIAL_ABANDONED_CARTS;
    } catch {
      return INITIAL_ABANDONED_CARTS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  const saveCarts = (updated: AbandonedCart[]) => {
    setCarts(updated);
    localStorage.setItem('morv_admin_abandoned_carts', JSON.stringify(updated));
  };

  const handleToggleRecovered = (id: string) => {
    const updated = carts.map((c) => (c.id === id ? { ...c, recovered: !c.recovered } : c));
    saveCarts(updated);
    showToast(language === 'ar' ? 'تم تحديث حالة استعادة السلة ✓' : 'Cart recovery status toggled ✓');
    logActivity('Abandoned Cart Updated', 'order', id, 'Recovery status toggled');
  };

  const handleSendRecoveryWhatsApp = (cart: AbandonedCart) => {
    const text = encodeURIComponent(
      `Hello ${cart.customerName}, your selected sneaker specimens at MORV Archive are reserved in your cart for 24h. Complete your order here: ${window.location.origin}`
    );
    window.open(`https://wa.me/2${cart.customerPhone || '01098841920'}?text=${text}`, '_blank');
    showToast(language === 'ar' ? 'تم إطلاق نافذة الواتساب للتذكير بالسلة ✓' : 'WhatsApp reminder launched ✓');
    logActivity('Recovery Reminder Sent', 'order', cart.id, 'Sent via WhatsApp');
  };

  const filtered = carts.filter(
    (c) =>
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = carts.reduce((acc, c) => acc + c.totalValue, 0);
  const recoveredValue = carts.filter((c) => c.recovered).reduce((acc, c) => acc + c.totalValue, 0);
  const recoveryRate = ((carts.filter((c) => c.recovered).length / (carts.length || 1)) * 100).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              SALES RECOVERY // UNCHECKED SESSIONS
            </span>
            <span className="text-xs font-mono text-[#747878]">{carts.length} Tracked Sessions</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Abandoned Carts & Session Recovery
          </h1>
        </div>

        {/* Recovery Metrics Cards */}
        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#e5e2e1] px-4 py-2">
            <div className="text-[10px] font-mono text-[#747878] uppercase">POTENTIAL VALUE</div>
            <div className="font-display text-lg font-bold text-black tabular-nums">{formatPrice(totalValue)}</div>
          </div>
          <div className="bg-white border border-[#e5e2e1] px-4 py-2">
            <div className="text-[10px] font-mono text-[#747878] uppercase">RECOVERY RATE</div>
            <div className="font-display text-lg font-bold text-emerald-600 tabular-nums">{recoveryRate}%</div>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-[#e5e2e1] p-3 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#747878]" />
        <input
          type="text"
          placeholder="Search by customer name, email address, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full font-mono text-xs bg-transparent focus:outline-none text-black"
        />
      </div>

      {/* Abandoned Carts Table / Cards */}
      <div className="space-y-3">
        {filtered.map((cart) => (
          <div
            key={cart.id}
            className={`bg-white border p-4 sm:p-5 transition-all space-y-4 ${
              cart.recovered ? 'border-emerald-300 bg-emerald-50/10' : 'border-[#e5e2e1] hover:border-black'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1edec] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base text-black">{cart.customerName}</span>
                  <span className="text-[#c4c7c7]">/</span>
                  <span className="font-mono text-xs text-[#5e5f5c]">{cart.customerEmail}</span>
                  {cart.customerPhone && (
                    <span className="font-mono text-xs text-black font-semibold">({cart.customerPhone})</span>
                  )}
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#747878] mt-0.5">
                  <Clock className="w-3 h-3 text-[#747878]" />
                  <span>Abandoned At: {cart.abandonedAt}</span>
                  <span>·</span>
                  <span>{cart.itemsCount} Items In Bag</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-display text-lg font-bold text-black tabular-nums">
                  {formatPrice(cart.totalValue)}
                </span>
                <span
                  className={`font-mono text-[10px] px-2 py-0.5 font-bold uppercase ${
                    cart.recovered ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {cart.recovered ? 'RECOVERED' : 'UNRECOVERED'}
                </span>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cart.items.map((it, idx) => (
                <div
                  key={idx}
                  className="bg-[#fdf8f8] border border-[#f1edec] p-2.5 flex items-center justify-between text-xs font-mono"
                >
                  <div className="truncate mr-2">
                    <div className="font-bold text-black truncate">{it.productName}</div>
                    <div className="text-[11px] text-[#747878]">
                      Size: {it.size} · Qty: {it.quantity}
                    </div>
                  </div>
                  <div className="font-bold text-black shrink-0">{formatPrice(it.price * it.quantity)}</div>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-[#f1edec]">
              <button
                onClick={() => handleToggleRecovered(cart.id)}
                className={`font-mono text-xs px-3 py-1.5 border font-bold uppercase transition-colors flex items-center gap-1.5 ${
                  cart.recovered
                    ? 'border-emerald-500 text-emerald-800 bg-emerald-50'
                    : 'border-[#e5e2e1] hover:border-black text-black'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{cart.recovered ? 'Mark As Abandoned' : 'Mark As Converted / Recovered'}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendRecoveryWhatsApp(cart)}
                  className="px-3.5 py-1.5 bg-[#25D366] hover:bg-[#1ebd5a] text-white font-mono text-xs uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send WhatsApp Cart Nudge</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
