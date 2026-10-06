import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { HomepageConfig } from '../../types/admin';
import { Save, ArrowUp, ArrowDown, Eye, EyeOff, Layout, Sparkles, Image as ImageIcon } from 'lucide-react';

export const HomepageCms: React.FC = () => {
  const { homepageConfig, updateHomepageConfig, navigateTo } = useStore();
  const [formData, setFormData] = useState<HomepageConfig>({ ...homepageConfig });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateHomepageConfig(formData);
  };

  const toggleSectionVisibility = (sectionId: string) => {
    const updated = formData.sections.map((s) =>
      s.id === sectionId ? { ...s, visible: !s.visible } : s
    );
    setFormData({ ...formData, sections: updated });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= formData.sections.length) return;
    const newSections = [...formData.sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;
    // update order numbers
    newSections.forEach((s, idx) => {
      s.order = idx + 1;
    });
    setFormData({ ...formData, sections: newSections });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            VISUAL STOREFRONT CONTENT MANAGEMENT
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Homepage Layout & Content CMS
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="px-4 py-2 border border-[#e5e2e1] hover:border-black text-black font-mono text-xs font-bold uppercase transition-colors"
          >
            Live Storefront Preview ↗
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6 font-mono text-xs">
        {/* Top Ticker Announcement */}
        <div className="bg-white border border-[#e5e2e1] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black">
              Header Global Archival Ticker
            </h3>
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={formData.announcementTicker.enabled}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcementTicker: { ...formData.announcementTicker, enabled: e.target.checked }
                  })
                }
                className="accent-black"
              />
              <span className="font-bold text-black uppercase">Enable Announcement Bar</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Announcement Text (Arabic)
              </label>
              <input
                type="text"
                value={formData.announcementTicker.textAr}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcementTicker: { ...formData.announcementTicker, textAr: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black text-right"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Announcement Text (English)
              </label>
              <input
                type="text"
                value={formData.announcementTicker.textEn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcementTicker: { ...formData.announcementTicker, textEn: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>
          </div>
        </div>

        {/* Hero Section Config */}
        <div className="bg-white border border-[#e5e2e1] p-5 space-y-5">
          <h3 className="font-display text-base font-bold uppercase text-black border-b border-[#e5e2e1] pb-3">
            Architectural Hero Section Editor
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Hero Headline (Arabic)
              </label>
              <input
                type="text"
                value={formData.hero.headlineAr}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, headlineAr: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black text-right font-bold"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Hero Headline (English)
              </label>
              <input
                type="text"
                value={formData.hero.headlineEn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, headlineEn: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-bold uppercase"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Subheadline (Arabic)
              </label>
              <textarea
                rows={2}
                value={formData.hero.subheadlineAr}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subheadlineAr: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black text-right"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Subheadline (English)
              </label>
              <textarea
                rows={2}
                value={formData.hero.subheadlineEn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subheadlineEn: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Hero Image URL
              </label>
              <input
                type="url"
                value={formData.hero.heroImage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, heroImage: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Countdown Hours
              </label>
              <input
                type="number"
                value={formData.hero.countdownHours}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, countdownHours: parseInt(e.target.value) || 18 }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Specimen Ledger Code
              </label>
              <input
                type="text"
                value={formData.hero.specimenCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, specimenCode: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
              />
            </div>
          </div>

          {/* Primary CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Primary CTA Button (Arabic)
              </label>
              <input
                type="text"
                value={formData.hero.ctaPrimaryTextAr}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, ctaPrimaryTextAr: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black text-right"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Primary CTA Button (English)
              </label>
              <input
                type="text"
                value={formData.hero.ctaPrimaryTextEn}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, ctaPrimaryTextEn: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black uppercase"
              />
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                Primary CTA Target Link
              </label>
              <input
                type="text"
                value={formData.hero.ctaPrimaryLink}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, ctaPrimaryLink: e.target.value }
                  })
                }
                className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
              />
            </div>
          </div>
        </div>

        {/* Homepage Sections Hierarchy & Reordering */}
        <div className="bg-white border border-[#e5e2e1] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <div>
              <h3 className="font-display text-base font-bold uppercase text-black">
                Section Hierarchy & Storefront Visibility
              </h3>
              <p className="text-[11px] text-[#747878]">
                Reorder or disable sections. Changes render immediately on the storefront.
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {formData.sections.map((section, idx) => (
              <div
                key={section.id}
                className="p-3 bg-[#fdf8f8] border border-[#e5e2e1] flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-black text-white font-bold flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-black uppercase block">{section.title}</span>
                    <span className="text-[10px] text-[#747878]">{section.titleAr}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => toggleSectionVisibility(section.id)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase border transition-colors flex items-center gap-1 ${
                      section.visible
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                        : 'bg-red-50 border-red-300 text-red-800'
                    }`}
                  >
                    {section.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                    <span>{section.visible ? 'VISIBLE' : 'HIDDEN'}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, 'up')}
                      className="p-1.5 border border-[#e5e2e1] hover:border-black disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === formData.sections.length - 1}
                      onClick={() => moveSection(idx, 'down')}
                      className="p-1.5 border border-[#e5e2e1] hover:border-black disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Save Button */}
        <div className="flex justify-end sticky bottom-4 z-20">
          <button
            type="submit"
            className="px-8 py-3 bg-black hover:bg-[#313030] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#d7ef30]" />
            <span>Publish Homepage Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
