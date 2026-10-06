import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Banner } from '../../types/admin';
import { Plus, Trash2, Edit3, Image, Smartphone, Monitor, Check, X, ExternalLink } from 'lucide-react';

export const BannersManager: React.FC = () => {
  const { banners, createBanner, updateBanner, deleteBanner } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  const [formData, setFormData] = useState<Omit<Banner, 'id'>>({
    title: '',
    titleAr: '',
    subtitle: '',
    subtitleAr: '',
    ctaText: 'EXPLORE VAULT',
    ctaLink: 'shop',
    desktopImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=85',
    mobileImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85',
    position: 'hero_slider',
    priority: 1,
    active: true
  });

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      titleAr: '',
      subtitle: '',
      subtitleAr: '',
      ctaText: 'EXPLORE VAULT',
      ctaLink: 'shop',
      desktopImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1600&q=85',
      mobileImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85',
      position: 'hero_slider',
      priority: banners.length + 1,
      active: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({ ...banner });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, formData);
    } else {
      createBanner(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            EDITORIAL PROMOTIONS & VISUAL TAKEOVERS
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Banners & Promotional Placements ({banners.length})
          </h2>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 bg-black hover:bg-[#313030] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-[#d7ef30]" />
          <span>New Promotional Banner</span>
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-[#e5e2e1] overflow-hidden flex flex-col justify-between hover:border-black transition-colors"
          >
            {/* Banner Preview Image */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={b.desktopImage}
                alt={b.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end text-white">
                <span className="text-[9px] font-mono text-[#d7ef30] uppercase font-bold tracking-widest">
                  POSITION: {b.position.toUpperCase()} · PRIORITY #{b.priority}
                </span>
                <h3 className="font-display text-lg font-bold uppercase">{b.title}</h3>
                {b.subtitle && <p className="text-xs text-white/80 font-mono mt-0.5">{b.subtitle}</p>}
              </div>

              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                    b.active ? 'bg-[#d7ef30] text-[#191e00]' : 'bg-red-600 text-white'
                  }`}
                >
                  {b.active ? 'LIVE' : 'DISABLED'}
                </span>
              </div>
            </div>

            {/* Banner Specs & Mobile Info */}
            <div className="p-4 space-y-3 font-mono text-xs">
              <div className="grid grid-cols-2 gap-2 text-[11px] text-[#5e5f5c]">
                <div className="flex items-center gap-1">
                  <Monitor className="w-3.5 h-3.5 text-black" />
                  <span className="truncate">Desktop Image Set</span>
                </div>
                <div className="flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-black" />
                  <span className="truncate">Mobile Crop Set</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#747878]">CTA Destination:</span>
                <span className="font-bold text-black uppercase">{b.ctaLink}</span>
              </div>

              <div className="pt-3 border-t border-[#e5e2e1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => updateBanner(b.id, { active: !b.active })}
                  className="text-[10px] font-bold uppercase text-black underline"
                >
                  Toggle Live Status
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(b)}
                    className="p-1.5 bg-black text-white hover:bg-[#313030] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete banner "${b.title}"?`)) deleteBanner(b.id);
                    }}
                    className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-xl p-6 shadow-2xl space-y-4 font-mono text-xs animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
              <h3 className="font-display text-lg font-bold uppercase text-black">
                {editingBanner ? `Edit: ${editingBanner.title}` : 'Design New Banner'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-[#e5e2e1]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Banner Title (EN) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. JAPAN DEADSTOCK ALLOCATION"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-bold uppercase focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Banner Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Rare Co.jp specimens freshly cataloged."
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Desktop Image URL (16:9 Aspect Ratio) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.desktopImage}
                  onChange={(e) => setFormData({ ...formData, desktopImage: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Mobile Image URL (Dedicated Phone Ratio) *
                </label>
                <input
                  type="url"
                  required
                  value={formData.mobileImage}
                  onChange={(e) => setFormData({ ...formData, mobileImage: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                />
                <span className="text-[10px] text-[#747878] mt-1 block">
                  Tailored for mobile viewports to prevent cramped visuals.
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Placement Position
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value as any })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                  >
                    <option value="hero_slider">Hero Placement</option>
                    <option value="top_ticker">Top Announcement</option>
                    <option value="mid_editorial">Mid-Page Editorial</option>
                    <option value="footer_promo">Footer Promo</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    CTA Target Route
                  </label>
                  <input
                    type="text"
                    value={formData.ctaLink}
                    onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                    placeholder="shop / brands / editorial"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="accent-black"
                />
                <span className="font-bold text-black uppercase">Publish Banner Live</span>
              </label>

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
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
