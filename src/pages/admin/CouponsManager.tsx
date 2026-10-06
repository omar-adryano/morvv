import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Coupon } from '../../types/admin';
import { Plus, Tag, Trash2, Check, X, Percent, DollarSign, Calendar, Copy } from 'lucide-react';

export const CouponsManager: React.FC = () => {
  const { coupons, createCoupon, updateCoupon, deleteCoupon, formatPrice, showToast, language } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<Coupon, 'id' | 'usageCount'>>({
    code: '',
    type: 'percentage',
    value: 15,
    minOrderValue: 150,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    usageLimit: 100,
    active: true,
    description: ''
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) return;
    createCoupon({
      ...formData,
      code: formData.code.trim().toUpperCase()
    });
    setIsModalOpen(false);
    setFormData({
      code: '',
      type: 'percentage',
      value: 15,
      minOrderValue: 150,
      maxDiscount: 100,
      expiryDate: '2026-12-31',
      usageLimit: 100,
      active: true,
      description: ''
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard?.writeText(code);
    showToast(language === 'ar' ? `تم نسخ الكود ${code}` : `Copied ${code}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            PRIVILEGE REGISTRY CODES & DISCOUNTS
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Coupons & Promotional Codes ({coupons.length})
          </h2>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-black hover:bg-[#313030] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-[#d7ef30]" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-[#e5e2e1] p-5 flex flex-col justify-between space-y-4 hover:border-black transition-colors relative"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-black" />
                  <span className="font-mono text-base font-bold uppercase text-black tracking-wider">
                    {c.code}
                  </span>
                </div>
                <button
                  onClick={() => handleCopyCode(c.code)}
                  title="Copy Code"
                  className="p-1 hover:bg-[#f1edec] text-[#5e5f5c] transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="mt-2 text-2xl font-display font-extrabold text-black tabular-nums">
                {c.type === 'percentage' ? `${c.value}% OFF` : `${formatPrice(c.value)} OFF`}
              </div>

              <p className="text-xs font-mono text-[#5e5f5c] mt-1">
                {c.description || 'Promotional coupon applicable at checkout.'}
              </p>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-[#e5e2e1] font-mono text-[11px] text-[#5e5f5c]">
              <div className="flex justify-between">
                <span>Min Order:</span>
                <span className="font-bold text-black">{formatPrice(c.minOrderValue)}</span>
              </div>
              <div className="flex justify-between">
                <span>Usage Limit:</span>
                <span className="font-bold text-black">{c.usageCount} / {c.usageLimit}</span>
              </div>
              <div className="flex justify-between">
                <span>Expires:</span>
                <span className="text-black">{c.expiryDate}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#e5e2e1] flex items-center justify-between font-mono text-xs">
              <button
                type="button"
                onClick={() => updateCoupon(c.id, { active: !c.active })}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase transition-colors ${
                  c.active
                    ? 'bg-[#d7ef30] text-[#191e00]'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {c.active ? 'ACTIVE ON CHECKOUT' : 'INACTIVE'}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete coupon "${c.code}"?`)) deleteCoupon(c.id);
                }}
                className="text-red-600 hover:text-red-800 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-lg p-6 shadow-2xl animate-in zoom-in-95 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
              <h3 className="font-display text-lg font-bold uppercase text-black">
                Mint New Coupon Code
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-[#e5e2e1]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Coupon Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  placeholder="e.g. VIP25"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-bold uppercase focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Dollar Amount ($)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Discount Value ({formData.type === 'percentage' ? '%' : '$'}) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Minimum Order Subtotal ($)
                  </label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Maximum Total Uses
                  </label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: parseInt(e.target.value) || 100 })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Expiration Date
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Description / Collector Privilege Note
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g. VIP Collector First Order Discount"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e5e2e1]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#f1edec] hover:bg-[#e5e2e1] text-black uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black hover:bg-[#313030] text-white uppercase font-bold"
                >
                  Activate Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
