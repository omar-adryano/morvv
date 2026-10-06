import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Search, Trash2, Copy, Check, ExternalLink, Image as ImageIcon } from 'lucide-react';
import { MediaItem } from '../../types/admin';

export const MediaLibrary: React.FC = () => {
  const { mediaLibrary, addMediaItem, deleteMediaItem, showToast, language } = useStore();

  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<MediaItem['category']>('sneakers');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filteredMedia = mediaLibrary.filter(
    (m) => m.title.toLowerCase().includes(search.toLowerCase()) || m.category.includes(search)
  );

  const handleCopyUrl = (item: MediaItem) => {
    navigator.clipboard?.writeText(item.url);
    setCopiedId(item.id);
    showToast(language === 'ar' ? 'تم نسخ رابط الصورة' : 'Image URL Copied');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;
    addMediaItem({
      title: newTitle.trim(),
      url: newUrl.trim(),
      category: newCategory
    });
    setNewTitle('');
    setNewUrl('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            HIGH-RESOLUTION VISUAL ASSET VAULT
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Media & Asset Library ({mediaLibrary.length})
          </h2>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2 bg-black hover:bg-[#313030] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#d7ef30]" />
          <span>Add Media Asset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-[#e5e2e1] p-4 font-mono text-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media assets by title or tag..."
            className="w-full bg-[#f7f3f2] border border-[#e5e2e1] pl-9 pr-3 py-2 text-xs text-black focus:outline-none focus:border-black rtl:pl-3 rtl:pr-9"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredMedia.map((m) => (
          <div
            key={m.id}
            className="bg-white border border-[#e5e2e1] group relative flex flex-col justify-between hover:border-black transition-colors"
          >
            <div className="aspect-square bg-[#f7f3f2] p-2 flex items-center justify-center overflow-hidden">
              <img
                src={m.url}
                alt={m.title}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-3 font-mono text-xs space-y-1.5 border-t border-[#e5e2e1]">
              <div className="font-bold text-black truncate uppercase text-[11px]" title={m.title}>
                {m.title}
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#747878]">
                <span className="uppercase">{m.category}</span>
                <span>{m.uploadedAt}</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#f1edec]">
                <button
                  type="button"
                  onClick={() => handleCopyUrl(m)}
                  className="px-2 py-1 bg-black text-white hover:bg-[#313030] text-[9px] font-bold uppercase transition-colors flex items-center gap-1"
                >
                  {copiedId === m.id ? <Check className="w-3 h-3 text-[#d7ef30]" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === m.id ? 'COPIED' : 'COPY URL'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remove asset "${m.title}"?`)) deleteMediaItem(m.id);
                  }}
                  className="p-1 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD ASSET MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-md p-6 shadow-2xl space-y-4 font-mono text-xs animate-in zoom-in-95">
            <h3 className="font-display text-lg font-bold uppercase text-black border-b border-[#e5e2e1] pb-2">
              Register Media Asset
            </h3>

            <form onSubmit={handleAddAsset} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Asset Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Jordan 1 Lost & Found Side Angle"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  HTTPS Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black"
                >
                  <option value="sneakers">Sneakers Specimen</option>
                  <option value="banners">Promotional Banner</option>
                  <option value="lookbook">Editorial Lookbook</option>
                  <option value="brand_logos">Brand Logo</option>
                  <option value="other">Other Asset</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e5e2e1]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 bg-[#f1edec] uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white uppercase font-bold"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
