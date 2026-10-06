import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { StoreSettings, StorePolicy } from '../../types/admin';
import { Save, ShieldCheck, FileText, Globe, Smartphone, Mail, MapPin } from 'lucide-react';

export const StoreSettingsPolicies: React.FC = () => {
  const { storeSettings, updateStoreSettings, policies, updatePolicy, showToast, language } = useStore();

  const [settingsForm, setSettingsForm] = useState<StoreSettings>({ ...storeSettings });
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('authenticity');
  const selectedPolicy = policies.find((p) => p.id === selectedPolicyId) || policies[0];
  const [policyForm, setPolicyForm] = useState<StorePolicy>({ ...selectedPolicy });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(settingsForm);
  };

  const handleSavePolicy = (e: React.FormEvent) => {
    e.preventDefault();
    updatePolicy(policyForm.id, policyForm);
  };

  const handleSelectPolicy = (id: string) => {
    setSelectedPolicyId(id);
    const target = policies.find((p) => p.id === id);
    if (target) setPolicyForm({ ...target });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            STORE IDENTITY & LEGAL GOVERNANCE
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Store Settings & Policies
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: General Store Settings */}
        <div className="lg:col-span-6 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4 font-mono text-xs">
          <h3 className="font-display text-base font-bold uppercase text-black border-b border-[#e5e2e1] pb-2">
            Store Identity & Contact Details
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Storefront Name *
              </label>
              <input
                type="text"
                required
                value={settingsForm.storeName}
                onChange={(e) => setSettingsForm({ ...settingsForm, storeName: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-bold uppercase"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Tagline / Curatorial Mission
              </label>
              <input
                type="text"
                value={settingsForm.storeTagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, storeTagline: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Official Concierge Email
                </label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  WhatsApp Support Line
                </label>
                <input
                  type="text"
                  value={settingsForm.whatsapp}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  value={settingsForm.phone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Order Number Prefix
                </label>
                <input
                  type="text"
                  value={settingsForm.orderPrefix}
                  onChange={(e) => setSettingsForm({ ...settingsForm, orderPrefix: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Vault Physical Headquarters Address
              </label>
              <input
                type="text"
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Concierge Support Hours
              </label>
              <input
                type="text"
                value={settingsForm.supportHours}
                onChange={(e) => setSettingsForm({ ...settingsForm, supportHours: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-black hover:bg-[#313030] text-white font-bold uppercase transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4 text-[#d7ef30]" />
                <span>Save Store Profile</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Policies Editor */}
        <div className="lg:col-span-6 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4 font-mono text-xs">
          <h3 className="font-display text-base font-bold uppercase text-black border-b border-[#e5e2e1] pb-2">
            Store Policies & Legal Terms
          </h3>

          {/* Policy Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {policies.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelectPolicy(p.id)}
                className={`px-3 py-1.5 font-bold uppercase text-[10px] transition-colors ${
                  selectedPolicyId === p.id
                    ? 'bg-black text-[#d7ef30]'
                    : 'bg-[#f7f3f2] text-black hover:bg-[#e5e2e1]'
                }`}
              >
                {p.id}
              </button>
            ))}
          </div>

          <form onSubmit={handleSavePolicy} className="space-y-4 pt-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Policy Document Title (Arabic)
              </label>
              <input
                type="text"
                value={policyForm.titleAr}
                onChange={(e) => setPolicyForm({ ...policyForm, titleAr: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black text-right font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Policy Document Title (English)
              </label>
              <input
                type="text"
                value={policyForm.titleEn}
                onChange={(e) => setPolicyForm({ ...policyForm, titleEn: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-bold uppercase"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Content (Arabic)
              </label>
              <textarea
                rows={5}
                value={policyForm.contentAr}
                onChange={(e) => setPolicyForm({ ...policyForm, contentAr: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black text-right leading-relaxed"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Content (English)
              </label>
              <textarea
                rows={4}
                value={policyForm.contentEn}
                onChange={(e) => setPolicyForm({ ...policyForm, contentEn: e.target.value })}
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black leading-relaxed"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2 bg-black hover:bg-[#313030] text-white font-bold uppercase transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Save className="w-4 h-4 text-[#d7ef30]" />
                <span>Save Policy Document</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
