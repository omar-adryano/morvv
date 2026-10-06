import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethodConfig } from '../../types/admin';
import {
  Smartphone,
  CheckCircle2,
  Banknote,
  Check,
  ShieldCheck,
  AlertCircle,
  Save,
  ArrowUpDown
} from 'lucide-react';

export const PaymentManager: React.FC = () => {
  const { paymentSettings, updatePaymentMethod, formatPrice, showToast, language } = useStore();

  const [activeTab, setActiveTab] = useState<'vodafone_cash' | 'instapay' | 'cod'>('vodafone_cash');

  const selectedMethod = paymentSettings.find((pm) => pm.id === activeTab);

  // Local draft state for editing
  const [formData, setFormData] = useState<PaymentMethodConfig | null>(selectedMethod || null);

  const handleTabChange = (id: 'vodafone_cash' | 'instapay' | 'cod') => {
    setActiveTab(id);
    const target = paymentSettings.find((pm) => pm.id === id);
    if (target) setFormData(target);
  };

  const handleToggleEnable = (id: string, currentEnabled: boolean) => {
    updatePaymentMethod(id, { enabled: !currentEnabled });
    if (formData && formData.id === id) {
      setFormData({ ...formData, enabled: !currentEnabled });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;
    updatePaymentMethod(formData.id, formData);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            VAULT MONETARY ESCROW SETTINGS
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Approved Payment Methods
          </h2>
        </div>

        <div className="text-xs font-mono bg-black text-[#d7ef30] px-3 py-1.5 font-bold uppercase">
          STRICT POLICY: ONLY 3 APPROVED METHODS ACTIVE
        </div>
      </div>

      {/* Info Notice */}
      <div className="p-4 bg-[#fdf8f8] border border-[#e5e2e1] flex items-start gap-3 font-mono text-xs text-[#5e5f5c]">
        <ShieldCheck className="w-5 h-5 text-black shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-black block mb-0.5 uppercase">Zero-Card Security Policy Enforced</strong>
          MORV exclusively accepts <strong>Vodafone Cash</strong>, <strong>InstaPay (IPN)</strong>, and <strong>Cash on Delivery (COD)</strong> with full physical inspection and cryptographic NFC certification before payment. No credit card, cardholder, or 3rd-party gateway scripts are loaded anywhere in the customer checkout.
        </div>
      </div>

      {/* Payment Methods Cards Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paymentSettings.map((pm) => {
          const isSelected = activeTab === pm.id;
          return (
            <div
              key={pm.id}
              onClick={() => handleTabChange(pm.id)}
              className={`p-4 border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-black bg-black text-white shadow-md'
                  : 'border-[#e5e2e1] bg-white text-black hover:border-black'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  {pm.id === 'vodafone_cash' && <Smartphone className="w-5 h-5 text-[#e60000] shrink-0" />}
                  {pm.id === 'instapay' && <CheckCircle2 className="w-5 h-5 text-[#7b2cbf] shrink-0" />}
                  {pm.id === 'cod' && <Banknote className="w-5 h-5 text-emerald-600 shrink-0" />}
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base uppercase">
                      {pm.name}
                    </h3>
                    <span className="text-[10px] font-sans opacity-70 block">{pm.nameAr}</span>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 font-bold uppercase ${
                    pm.enabled
                      ? 'bg-[#d7ef30] text-[#191e00]'
                      : 'bg-red-200 text-red-900'
                  }`}
                >
                  {pm.enabled ? 'ACTIVE' : 'DISABLED'}
                </span>
              </div>

              <div className="pt-4 mt-3 border-t border-[#313030]/20 flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] opacity-70">Display Priority: #{pm.displayOrder}</span>
                <span className="text-[10px] underline font-bold uppercase">
                  {isSelected ? 'Editing Now' : 'Configure →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Method Configuration Form */}
      {formData && (
        <form onSubmit={handleSave} className="bg-white border border-[#e5e2e1] p-5 sm:p-7 space-y-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#e5e2e1] pb-4">
            <div>
              <span className="text-[10px] text-[#747878] uppercase tracking-widest block">
                CONFIGURE METHOD
              </span>
              <h3 className="font-display text-lg font-bold uppercase text-black">
                {formData.name} <span className="font-normal font-sans">({formData.nameAr})</span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  className="w-4 h-4 accent-black cursor-pointer"
                />
                <span className="font-bold text-black uppercase">
                  Enable on Storefront Checkout
                </span>
              </label>

              <button
                type="submit"
                className="px-5 py-2 bg-black hover:bg-[#313030] text-white font-bold uppercase transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4 text-[#d7ef30]" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>

          {/* VODAFONE CASH SPECIFIC FIELDS */}
          {formData.id === 'vodafone_cash' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Verified Vodafone Cash Wallet Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.details.walletNumber || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: { ...formData.details, walletNumber: e.target.value }
                      })
                    }
                    placeholder="01098841920"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono font-bold focus:outline-none focus:border-black"
                  />
                  <span className="text-[10px] text-[#747878] mt-1 block">
                    Displayed with 1-click clipboard copy button at checkout.
                  </span>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    USSD Quick Code Template
                  </label>
                  <input
                    type="text"
                    value={formData.details.quickCodeTemplate || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: { ...formData.details, quickCodeTemplate: e.target.value }
                      })
                    }
                    placeholder="*9*7*01098841920*{amount}#"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Customer Payment Instructions (Arabic)
                </label>
                <textarea
                  rows={3}
                  value={formData.details.customerInstructionsAr || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, customerInstructionsAr: e.target.value }
                    })
                  }
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black text-right"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Internal Vault Settlement Notes
                </label>
                <input
                  type="text"
                  value={formData.details.internalNotes || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, internalNotes: e.target.value }
                    })
                  }
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                />
              </div>
            </div>
          )}

          {/* INSTAPAY SPECIFIC FIELDS */}
          {formData.id === 'instapay' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    InstaPay IPA Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.details.ipaAddress || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: { ...formData.details, ipaAddress: e.target.value }
                      })
                    }
                    placeholder="morv@instapay"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono font-bold focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Registered Mobile Number
                  </label>
                  <input
                    type="text"
                    value={formData.details.registeredPhone || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: { ...formData.details, registeredPhone: e.target.value }
                      })
                    }
                    placeholder="01098841920"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Verified Account Receiver Name
                  </label>
                  <input
                    type="text"
                    value={formData.details.receiverName || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: { ...formData.details, receiverName: e.target.value }
                      })
                    }
                    placeholder="MORV SNEAKER ARCHIVE"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Customer Instructions (Arabic)
                </label>
                <textarea
                  rows={3}
                  value={formData.details.customerInstructionsAr || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, customerInstructionsAr: e.target.value }
                    })
                  }
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black text-right"
                />
              </div>
            </div>
          )}

          {/* CASH ON DELIVERY SPECIFIC FIELDS */}
          {formData.id === 'cod' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    COD Handling Fee ($)
                  </label>
                  <input
                    type="number"
                    value={formData.details.codFee || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: { ...formData.details, codFee: parseFloat(e.target.value) || 0 }
                      })
                    }
                    placeholder="0"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                  />
                  <span className="text-[10px] text-[#747878] mt-1 block">Set 0 for free COD.</span>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Maximum Order Amount Limit ($)
                  </label>
                  <input
                    type="number"
                    value={formData.details.maxOrderAmount || 5000}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: {
                          ...formData.details,
                          maxOrderAmount: parseFloat(e.target.value) || 5000
                        }
                      })
                    }
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Display Priority Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder || 3}
                    onChange={(e) =>
                      setFormData({ ...formData, displayOrder: parseInt(e.target.value) || 3 })
                    }
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Customer COD Physical Inspection Guarantee (Arabic)
                </label>
                <textarea
                  rows={3}
                  value={formData.details.customerInstructionsAr || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      details: { ...formData.details, customerInstructionsAr: e.target.value }
                    })
                  }
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black text-right"
                />
              </div>
            </div>
          )}

          {/* Live Storefront Impact Callout */}
          <div className="p-3 bg-[#f7f3f2] border border-[#e5e2e1] flex items-center justify-between text-xs">
            <span className="text-[#5e5f5c]">
              Status on Customer Checkout:{' '}
              <strong className={formData.enabled ? 'text-emerald-700' : 'text-red-700'}>
                {formData.enabled ? 'Visible to all shoppers ✓' : 'Hidden from checkout ✗'}
              </strong>
            </span>
            <button
              type="submit"
              className="px-4 py-1.5 bg-black text-white hover:bg-[#313030] text-[10px] font-bold uppercase transition-colors"
            >
              Apply to Checkout
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
