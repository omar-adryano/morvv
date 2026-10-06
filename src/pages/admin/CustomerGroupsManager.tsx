import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_CUSTOMER_GROUPS } from '../../data/initialAdminData';
import { CustomerGroup } from '../../types/admin';
import {
  Users,
  Award,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  ShieldCheck,
  Star,
  FileText
} from 'lucide-react';

export const CustomerGroupsManager: React.FC = () => {
  const { showToast, language, logActivity } = useStore();

  const [groups, setGroups] = useState<CustomerGroup[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_customer_groups');
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMER_GROUPS;
    } catch {
      return INITIAL_CUSTOMER_GROUPS;
    }
  });

  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    discountRate: 10,
    badgeColor: '#000000'
  });

  const saveGroups = (updated: CustomerGroup[]) => {
    setGroups(updated);
    localStorage.setItem('morv_admin_customer_groups', JSON.stringify(updated));
  };

  const handleCreateGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast(language === 'ar' ? 'الرجاء إدخال اسم المجموعة' : 'Please enter group name');
      return;
    }

    const newGroup: CustomerGroup = {
      id: `grp-${Date.now().toString().slice(-4)}`,
      name: formData.name.trim().toUpperCase(),
      description: formData.description.trim(),
      discountRate: Number(formData.discountRate),
      membersCount: 0,
      badgeColor: formData.badgeColor
    };

    saveGroups([...groups, newGroup]);
    setIsCreating(false);
    setFormData({ name: '', description: '', discountRate: 10, badgeColor: '#000000' });
    showToast(language === 'ar' ? 'تم إنشاء مجموعة العملاء بنجاح ✓' : 'Customer tier group created ✓');
    logActivity('Customer Group Created', 'settings', newGroup.id, `Created ${newGroup.name}`);
  };

  const handleDeleteGroup = (id: string) => {
    if (!window.confirm(language === 'ar' ? 'حذف هذه الفئة؟' : 'Delete this customer group?')) return;
    const updated = groups.filter((g) => g.id !== id);
    saveGroups(updated);
    showToast(language === 'ar' ? 'تم حذف الفئة بنجاح' : 'Group deleted successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              CUSTOMERS // TIERS & SYNDICATES
            </span>
            <span className="text-xs font-mono text-[#747878]">{groups.length} Configured Tiers</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Customer Groups & VIP Privilege Tiers
          </h1>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-black hover:bg-[#313030] text-white font-mono text-xs uppercase font-bold tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Customer Tier</span>
        </button>
      </div>

      {/* Creation Modal / Form */}
      {isCreating && (
        <div className="bg-white border-2 border-black p-5 sm:p-6 space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black">
              Define New Collector Privilege Tier
            </h3>
            <button
              onClick={() => setIsCreating(false)}
              className="font-mono text-xs text-[#747878] hover:text-black"
            >
              CANCEL [✕]
            </button>
          </div>

          <form onSubmit={handleCreateGroup} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Group / Tier Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AMBASSADOR CLUB VIP"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">
                  Automatic Discount (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discountRate}
                  onChange={(e) => setFormData({ ...formData, discountRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Privilege Description</label>
              <textarea
                rows={2}
                placeholder="Describe tier privileges, qualifying spend threshold, and raffle priority..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
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
                Save Group
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {groups.map((grp) => (
          <div
            key={grp.id}
            className="bg-white border border-[#e5e2e1] p-5 flex flex-col justify-between space-y-4 hover:border-black transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-black" />
                  <span className="font-display text-base font-bold uppercase text-black">
                    {grp.name}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteGroup(grp.id)}
                  className="text-[#747878] hover:text-red-500 p-1"
                  title="Delete Group"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#5e5f5c] leading-relaxed font-mono">
                {grp.description}
              </p>
            </div>

            <div className="pt-3 border-t border-[#f1edec] flex items-center justify-between font-mono text-xs">
              <div className="space-y-0.5">
                <span className="text-[10px] text-[#747878] uppercase">MEMBERS ENROLLED</span>
                <div className="font-bold text-black text-sm">{grp.membersCount} Collectors</div>
              </div>
              <div className="space-y-0.5 text-right">
                <span className="text-[10px] text-[#747878] uppercase">DISCOUNT PERK</span>
                <div className="font-bold text-emerald-600 text-sm">
                  {grp.discountRate > 0 ? `${grp.discountRate}% OFF` : 'NO AUTO-DISCOUNT'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
