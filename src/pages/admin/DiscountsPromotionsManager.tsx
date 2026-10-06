import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_DISCOUNT_RULES } from '../../data/initialAdminData';
import { DiscountRule } from '../../types/admin';
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle2,
  Calendar,
  Percent,
  DollarSign,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const DiscountsPromotionsManager: React.FC = () => {
  const { showToast, language, logActivity, formatPrice } = useStore();

  const [rules, setRules] = useState<DiscountRule[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_discount_rules');
      return saved ? JSON.parse(saved) : INITIAL_DISCOUNT_RULES;
    } catch {
      return INITIAL_DISCOUNT_RULES;
    }
  });

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<DiscountRule, 'id'>>({
    name: '',
    type: 'percentage',
    value: 10,
    targetType: 'brand',
    targetValue: 'JORDAN',
    active: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  const saveRules = (updated: DiscountRule[]) => {
    setRules(updated);
    localStorage.setItem('morv_admin_discount_rules', JSON.stringify(updated));
  };

  const handleToggleRule = (id: string) => {
    const updated = rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r));
    saveRules(updated);
    showToast(language === 'ar' ? 'تم تحديث حالة تفعيل الخصم ✓' : 'Discount rule status toggled ✓');
    logActivity('Discount Rule Toggled', 'settings', id);
  };

  const handleDeleteRule = (id: string) => {
    if (!window.confirm(language === 'ar' ? 'حذف قاعدة الخصم؟' : 'Delete this discount rule?')) return;
    const updated = rules.filter((r) => r.id !== id);
    saveRules(updated);
    showToast(language === 'ar' ? 'تم حذف قاعدة الخصم' : 'Discount rule deleted');
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const newRule: DiscountRule = {
      id: `disc-${Date.now().toString().slice(-4)}`,
      ...formData
    };

    saveRules([...rules, newRule]);
    setIsCreating(false);
    showToast(language === 'ar' ? 'تم إنشاء قاعدة الخصم بنجاح ✓' : 'Discount rule created successfully ✓');
    logActivity('Discount Rule Created', 'settings', newRule.id, `Created ${newRule.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              MARKETING // AUTOMATED PRICING RULES
            </span>
            <span className="text-xs font-mono text-[#747878]">{rules.length} Active Rules</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Automated Discounts & Campaign Merchandising
          </h1>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-black hover:bg-[#313030] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Discount Rule</span>
        </button>
      </div>

      {/* Featured Campaign Highlight Banner */}
      <div className="bg-[#1c1b1b] text-white p-5 sm:p-6 border border-black flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d7ef30]" />
            <span className="font-mono text-[10px] text-[#d7ef30] uppercase font-bold">
              AUTONOMOUS MERCHANDISING
            </span>
          </div>
          <h3 className="font-display text-lg font-bold uppercase">
            Storefront Dynamic Rule Injection Active
          </h3>
          <p className="text-xs text-[#a0a0a0] max-w-xl">
            Discount rules are calculated automatically during catalog browsing and applied across targeted sneaker specimens without requiring code changes.
          </p>
        </div>

        <div className="font-mono text-xs text-right">
          <div className="text-[#d7ef30] font-bold">ALL BRANDS MONITORED</div>
          <div className="text-[11px] text-[#747878]">Instant Sync with Bag & Checkout</div>
        </div>
      </div>

      {/* Creation Modal / Form */}
      {isCreating && (
        <div className="bg-white border-2 border-black p-5 sm:p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black">
              Create New Automated Discount Rule
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="font-mono text-xs text-[#747878] hover:text-black"
            >
              CANCEL [✕]
            </button>
          </div>

          <form onSubmit={handleCreateRule} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Rule Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Salomon Gore-Tex Weekend 15% Reduction"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs uppercase font-bold focus:outline-none"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Reduction Value</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Target Scope</label>
                  <select
                    value={formData.targetType}
                    onChange={(e) => setFormData({ ...formData, targetType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs uppercase font-bold focus:outline-none"
                  >
                    <option value="brand">By Brand</option>
                    <option value="category">By Category</option>
                    <option value="all">Entire Catalog</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Target Value</label>
                  <input
                    type="text"
                    placeholder="e.g. JORDAN, NIKE, runners"
                    value={formData.targetValue || ''}
                    onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-[#e5e2e1] font-mono text-xs uppercase font-bold hover:bg-[#f1edec]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-black text-[#d7ef30] font-mono text-xs uppercase font-extrabold hover:bg-[#313030]"
              >
                Publish Discount Rule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Rules Table */}
      <div className="bg-white border border-[#e5e2e1] overflow-hidden">
        <table className="w-full text-left font-mono text-xs">
          <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
            <tr>
              <th className="p-3.5">Rule Name</th>
              <th className="p-3.5">Scope</th>
              <th className="p-3.5">Reduction</th>
              <th className="p-3.5">Schedule Window</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1edec]">
            {rules.map((rule) => (
              <tr key={rule.id} className="hover:bg-[#fdf8f8] transition-colors">
                <td className="p-3.5 font-bold text-black">{rule.name}</td>
                <td className="p-3.5">
                  <span className="bg-[#f1edec] px-2 py-0.5 text-black uppercase font-bold">
                    {rule.targetType}: {rule.targetValue || 'ALL'}
                  </span>
                </td>
                <td className="p-3.5 font-bold text-emerald-600">
                  {rule.type === 'percentage' ? `${rule.value}% OFF` : `${formatPrice(rule.value)} OFF`}
                </td>
                <td className="p-3.5 text-[#5e5f5c] text-[11px]">
                  {rule.startDate} → {rule.endDate}
                </td>
                <td className="p-3.5">
                  <button
                    onClick={() => handleToggleRule(rule.id)}
                    className={`px-2 py-0.5 font-bold uppercase text-[10px] cursor-pointer ${
                      rule.active
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-zinc-200 text-zinc-600'
                    }`}
                  >
                    {rule.active ? 'ACTIVE' : 'PAUSED'}
                  </button>
                </td>
                <td className="p-3.5 text-right">
                  <button
                    onClick={() => handleDeleteRule(rule.id)}
                    className="p-1 hover:text-red-600 transition-colors"
                    title="Delete Rule"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
