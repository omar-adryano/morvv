import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { NavigationMenuItem } from '../../types/admin';
import {
  Menu,
  Sliders,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Share2,
  MessageSquare
} from 'lucide-react';

const INITIAL_NAV_ITEMS: NavigationMenuItem[] = [
  { id: 'nav-1', label: 'NEW ARRIVALS', labelAr: 'وصل حديثاً', view: 'shop', order: 1, visible: true },
  { id: 'nav-2', label: 'BRAND DIRECTORY', labelAr: 'الماركات العالمية', view: 'brands', order: 2, visible: true },
  { id: 'nav-3', label: 'EDITORIAL LAUNCHES', labelAr: 'إصدارات خاصة', view: 'editorial', order: 3, visible: true },
  { id: 'nav-4', label: 'ARCHIVE VAULT', labelAr: 'خزينة الأرشيف', view: 'brands', order: 4, visible: true },
  { id: 'nav-5', label: 'MENS COLLECTION', labelAr: 'رجالي', view: 'shop', order: 5, visible: true },
  { id: 'nav-6', label: 'WOMENS COLLECTION', labelAr: 'نسائي', view: 'shop', order: 6, visible: true }
];

export const NavigationFooterCms: React.FC = () => {
  const { showToast, language, logActivity, storeSettings, updateStoreSettings } = useStore();

  const [activeTab, setActiveTab] = useState<'navigation' | 'footer'>('navigation');

  const [navItems, setNavItems] = useState<NavigationMenuItem[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_nav_items');
      return saved ? JSON.parse(saved) : INITIAL_NAV_ITEMS;
    } catch {
      return INITIAL_NAV_ITEMS;
    }
  });

  const [footerForm, setFooterForm] = useState({
    bioEn: 'An international archival sneaker store, verified deadstock registry, and curated multi-brand gallery based in Cairo, Tokyo, and Zurich.',
    bioAr: 'متجر أحذية رياضية أرشيفية دولي، وسجل توثيق معتمد للإصدارات النادرة، وغاليري منسق لأرقى العلامات الرياضية العالمية.',
    whatsapp: storeSettings.whatsapp || '01098841920',
    email: storeSettings.email || 'concierge@morv-flagship.com',
    instagram: storeSettings.socialLinks?.instagram || 'instagram.com/morv.archive',
    twitter: storeSettings.socialLinks?.twitter || 'x.com/morv_archive',
    discord: storeSettings.socialLinks?.discord || 'discord.gg/morv',
    copyright: '© 2025 MORV ARCHIVE FLAGSHIP. ALL RIGHTS RESERVED.'
  });

  const saveNavItems = (updated: NavigationMenuItem[]) => {
    setNavItems(updated);
    localStorage.setItem('morv_admin_nav_items', JSON.stringify(updated));
  };

  const handleToggleVisible = (id: string) => {
    const updated = navItems.map((n) => (n.id === id ? { ...n, visible: !n.visible } : n));
    saveNavItems(updated);
    showToast(language === 'ar' ? 'تم تحديث ظهور عنصر القائمة ✓' : 'Menu item visibility toggled ✓');
    logActivity('Navigation Menu Updated', 'homepage', id);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navItems.length) return;
    const reordered = [...navItems];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;
    reordered.forEach((item, idx) => (item.order = idx + 1));
    saveNavItems(reordered);
    showToast(language === 'ar' ? 'تم تغيير ترتيب القائمة ✓' : 'Navigation reordered ✓');
  };

  const handleSaveFooter = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings({
      whatsapp: footerForm.whatsapp,
      email: footerForm.email,
      socialLinks: {
        instagram: footerForm.instagram,
        twitter: footerForm.twitter,
        discord: footerForm.discord,
        youtube: 'youtube.com/@morv'
      }
    });
    showToast(language === 'ar' ? 'تم حفظ إعدادات الفوتر والروابط بنجاح ✓' : 'Footer settings saved successfully ✓');
    logActivity('Footer CMS Updated', 'settings', 'footer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              STOREFRONT CMS // GLOBAL CHANNELS
            </span>
            <span className="text-xs font-mono text-[#747878]">Live Header & Footer Navigation</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Navigation Menu & Footer Configuration
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-[#e5e2e1] bg-[#f1edec] p-0.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('navigation')}
            className={`px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'navigation' ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
            }`}
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Top Header Navigation</span>
          </button>
          <button
            onClick={() => setActiveTab('footer')}
            className={`px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'footer' ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Store Footer & Socials</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Navigation Menu CMS */}
      {activeTab === 'navigation' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#e5e2e1] p-4 text-xs font-mono text-[#5e5f5c]">
            Reorder and configure the top bar navigation links visible across desktop and mobile menus.
          </div>

          <div className="space-y-2">
            {navItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white border border-[#e5e2e1] p-4 flex items-center justify-between gap-4 hover:border-black transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#747878] w-6">#{idx + 1}</span>
                  <div>
                    <div className="font-semibold text-sm uppercase text-black">
                      {item.label} <span className="text-[#747878] font-normal font-sans">({item.labelAr})</span>
                    </div>
                    <div className="font-mono text-[11px] text-[#5e5f5c]">
                      Destination Route: <span className="font-bold text-black uppercase">{item.view}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMove(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1.5 border border-[#e5e2e1] hover:bg-[#f1edec] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'down')}
                    disabled={idx === navItems.length - 1}
                    className="p-1.5 border border-[#e5e2e1] hover:bg-[#f1edec] disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleToggleVisible(item.id)}
                    className={`px-3 py-1.5 font-mono text-xs uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      item.visible ? 'bg-black text-[#d7ef30]' : 'bg-[#f1edec] text-[#747878]'
                    }`}
                  >
                    {item.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{item.visible ? 'Visible' : 'Hidden'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Footer CMS */}
      {activeTab === 'footer' && (
        <form onSubmit={handleSaveFooter} className="bg-white border border-[#e5e2e1] p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-xs uppercase font-bold text-black">
                Footer Manifesto (English)
              </label>
              <textarea
                rows={3}
                value={footerForm.bioEn}
                onChange={(e) => setFooterForm({ ...footerForm, bioEn: e.target.value })}
                className="w-full p-3 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs uppercase font-bold text-black">
                بيان الهوية في الفوتر (عربي)
              </label>
              <textarea
                rows={3}
                dir="rtl"
                value={footerForm.bioAr}
                onChange={(e) => setFooterForm({ ...footerForm, bioAr: e.target.value })}
                className="w-full p-3 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[#f1edec]">
            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Concierge WhatsApp</label>
              <input
                type="text"
                value={footerForm.whatsapp}
                onChange={(e) => setFooterForm({ ...footerForm, whatsapp: e.target.value })}
                className="w-full p-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Support Email</label>
              <input
                type="email"
                value={footerForm.email}
                onChange={(e) => setFooterForm({ ...footerForm, email: e.target.value })}
                className="w-full p-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Instagram Handle</label>
              <input
                type="text"
                value={footerForm.instagram}
                onChange={(e) => setFooterForm({ ...footerForm, instagram: e.target.value })}
                className="w-full p-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-xs uppercase text-[#5e5f5c] font-bold">Discord Community</label>
              <input
                type="text"
                value={footerForm.discord}
                onChange={(e) => setFooterForm({ ...footerForm, discord: e.target.value })}
                className="w-full p-2 border border-[#e5e2e1] font-mono text-xs focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-[#f1edec]">
            <button
              type="submit"
              className="px-6 py-2.5 bg-black hover:bg-[#313030] text-[#d7ef30] font-mono text-xs uppercase font-extrabold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Footer Settings</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
