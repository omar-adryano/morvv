import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  CreditCard,
  ShieldCheck,
  Percent,
  DollarSign,
  Save,
  CheckCircle2,
  FileText,
  Lock,
  Globe
} from 'lucide-react';

export const CheckoutSettingsManager: React.FC = () => {
  const { showToast, language, logActivity, paymentSettings, updatePaymentMethod } = useStore();

  const codSetting = paymentSettings.find((p) => p.id === 'cod');

  const [form, setForm] = useState({
    minOrderAmount: codSetting?.details.minOrderAmount || 0,
    maxOrderAmount: codSetting?.details.maxOrderAmount || 5000,
    codFee: codSetting?.details.codFee || 0,
    allowGuestCheckout: true,
    requirePhoneVerification: true,
    orderPrefix: 'MRV-2025-',
    taxRate: 14,
    pricesIncludeTax: true,
    defaultCurrency: 'USD',
    enableMultiCurrency: true
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (codSetting) {
      updatePaymentMethod('cod', {
        details: {
          ...codSetting.details,
          minOrderAmount: Number(form.minOrderAmount),
          maxOrderAmount: Number(form.maxOrderAmount),
          codFee: Number(form.codFee)
        }
      });
    }
    showToast(language === 'ar' ? 'تم حفظ إعدادات إتمام الطلب والضرائب بنجاح ✓' : 'Checkout & commerce rules saved ✓');
    logActivity('Checkout Settings Updated', 'settings', 'checkout_rules');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              COMMERCE // TRANSACTION RULES
            </span>
            <span className="text-xs font-mono text-[#747878]">Enforced on Checkout Route</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Checkout Policies, Currency & Tax Configuration
          </h1>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Cash on Delivery & Order Limits */}
        <div className="bg-white border border-[#e5e2e1] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Cash on Delivery (COD) Thresholds</span>
            </h3>
            <span className="font-mono text-[10px] bg-[#d7ef30] text-black px-2 py-0.5 font-bold uppercase">
              ANTI-FRAUD BUFFER
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                Min Order Amount (ج.م EGP)
              </label>
              <input
                type="number"
                min="0"
                value={form.minOrderAmount}
                onChange={(e) => setForm({ ...form, minOrderAmount: Number(e.target.value) })}
                className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                Max Order Amount (ج.م EGP)
              </label>
              <input
                type="number"
                min="0"
                value={form.maxOrderAmount}
                onChange={(e) => setForm({ ...form, maxOrderAmount: Number(e.target.value) })}
                className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                COD Handling Surcharge (ج.م EGP)
              </label>
              <input
                type="number"
                min="0"
                value={form.codFee}
                onChange={(e) => setForm({ ...form, codFee: Number(e.target.value) })}
                className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Order ID & Customer Verification */}
        <div className="bg-white border border-[#e5e2e1] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Order Identification & Guest Protocol</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                Order Tracking Prefix
              </label>
              <input
                type="text"
                value={form.orderPrefix}
                onChange={(e) => setForm({ ...form, orderPrefix: e.target.value })}
                className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black uppercase font-bold"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-black">
                <input
                  type="checkbox"
                  checked={form.allowGuestCheckout}
                  onChange={(e) => setForm({ ...form, allowGuestCheckout: e.target.checked })}
                  className="w-4 h-4 text-black focus:ring-black accent-black"
                />
                <span>Allow Immediate Guest Checkout (No forced registration)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Section 3: Taxes & Currency Configuration */}
        <div className="bg-white border border-[#e5e2e1] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Tax, VAT & Currency Matrix</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                VAT / Sales Tax (%)
              </label>
              <input
                type="number"
                min="0"
                max="30"
                value={form.taxRate}
                onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })}
                className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                Store Base Currency
              </label>
              <select
                value={form.defaultCurrency}
                onChange={(e) => setForm({ ...form, defaultCurrency: e.target.value })}
                className="w-full p-2.5 border border-[#e5e2e1] font-mono text-xs font-bold uppercase focus:outline-none"
              >
                <option value="EGP">EGP (ج.م) — Official Egypt Store Currency</option>
                <option value="SAR">SAR (ر.س)</option>
                <option value="AED">AED (د.إ)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold text-black">
                <input
                  type="checkbox"
                  checked={form.pricesIncludeTax}
                  onChange={(e) => setForm({ ...form, pricesIncludeTax: e.target.checked })}
                  className="w-4 h-4 text-black focus:ring-black accent-black"
                />
                <span>Catalog Prices Already Include VAT</span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-8 py-3 bg-black hover:bg-[#313030] text-[#d7ef30] font-mono text-xs uppercase font-extrabold flex items-center gap-2 transition-colors cursor-pointer shadow-md"
          >
            <Save className="w-4 h-4" />
            <span>Save All Commerce Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
