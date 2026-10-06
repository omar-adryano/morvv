import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { CategoryConfig, BrandConfig } from '../../types/admin';
import { Plus, Trash2, Edit3, FolderTree, Tag, Check, X, Image as ImageIcon } from 'lucide-react';

export const CategoriesBrandsManager: React.FC = () => {
  const {
    categories,
    createCategory,
    updateCategory,
    deleteCategory,
    brands,
    createBrand,
    updateBrand,
    deleteBrand
  } = useStore();

  const [activeTab, setActiveTab] = useState<'categories' | 'brands'>('categories');

  // Category Modal
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<CategoryConfig | null>(null);
  const [catForm, setCatForm] = useState<Omit<CategoryConfig, 'id'>>({
    name: '',
    nameAr: '',
    slug: '',
    description: '',
    descriptionAr: '',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
    enabled: true,
    order: categories.length + 1
  });

  // Brand Modal
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandConfig | null>(null);
  const [brandForm, setBrandForm] = useState<Omit<BrandConfig, 'id'>>({
    name: '',
    slug: '',
    description: '',
    descriptionAr: '',
    logoUrl: '',
    originCountry: 'USA',
    establishedYear: '1985',
    enabled: true,
    featured: false
  });

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catForm.name.trim()) return;
    if (editingCat) {
      updateCategory(editingCat.id, catForm);
    } else {
      createCategory({
        ...catForm,
        slug: (catForm.slug || catForm.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
    setIsCatModalOpen(false);
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name.trim()) return;
    if (editingBrand) {
      updateBrand(editingBrand.id, brandForm);
    } else {
      createBrand({
        ...brandForm,
        slug: (brandForm.slug || brandForm.name).toLowerCase().replace(/[^a-z0-9]+/g, '-')
      });
    }
    setIsBrandModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            TAXONOMY & HERITAGE ARCHIVES
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Categories & Sneaker Brands
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (activeTab === 'categories') {
                setEditingCat(null);
                setCatForm({
                  name: '',
                  nameAr: '',
                  slug: '',
                  description: '',
                  descriptionAr: '',
                  image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=600&q=80',
                  enabled: true,
                  order: categories.length + 1
                });
                setIsCatModalOpen(true);
              } else {
                setEditingBrand(null);
                setBrandForm({
                  name: '',
                  slug: '',
                  description: '',
                  descriptionAr: '',
                  logoUrl: '',
                  originCountry: 'USA',
                  establishedYear: '1985',
                  enabled: true,
                  featured: false
                });
                setIsBrandModalOpen(true);
              }
            }}
            className="px-4 py-2 bg-black hover:bg-[#313030] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#d7ef30]" />
            <span>{activeTab === 'categories' ? 'New Category' : 'New Brand'}</span>
          </button>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-[#e5e2e1] font-mono text-xs">
        <button
          onClick={() => setActiveTab('categories')}
          className={`px-5 py-2.5 font-bold uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'categories'
              ? 'border-black text-black'
              : 'border-transparent text-[#747878] hover:text-black'
          }`}
        >
          <FolderTree className="w-4 h-4" />
          <span>Categories ({categories.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('brands')}
          className={`px-5 py-2.5 font-bold uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'brands'
              ? 'border-black text-black'
              : 'border-transparent text-[#747878] hover:text-black'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>Brands & Houses ({brands.length})</span>
        </button>
      </div>

      {/* CATEGORIES TAB */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bg-white border border-[#e5e2e1] overflow-hidden flex flex-col justify-between hover:border-black transition-colors"
            >
              <div className="aspect-video relative bg-black">
                <img src={c.image} alt={c.name} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 p-3 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end text-white">
                  <span className="text-[9px] text-[#d7ef30] font-bold uppercase">SLUG: {c.slug}</span>
                  <h4 className="font-display font-bold text-base uppercase">{c.name}</h4>
                  {c.nameAr && <span className="text-xs text-white/80">{c.nameAr}</span>}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <p className="text-[#5e5f5c] text-[11px] line-clamp-2">
                  {c.description || 'Curated footwear category.'}
                </p>

                <div className="pt-2 border-t border-[#e5e2e1] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => updateCategory(c.id, { enabled: !c.enabled })}
                    className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                      c.enabled ? 'bg-[#d7ef30] text-[#191e00]' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {c.enabled ? 'ENABLED' : 'HIDDEN'}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingCat(c);
                        setCatForm({ ...c });
                        setIsCatModalOpen(true);
                      }}
                      className="p-1 hover:bg-[#f1edec]"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete category "${c.name}"?`)) deleteCategory(c.id);
                      }}
                      className="p-1 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BRANDS TAB */}
      {activeTab === 'brands' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          {brands.map((b) => (
            <div
              key={b.id}
              className="bg-white border border-[#e5e2e1] p-5 flex flex-col justify-between space-y-4 hover:border-black transition-colors"
            >
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-extrabold text-base uppercase text-black">
                    {b.name}
                  </h4>
                  <span className="text-[10px] text-[#747878] uppercase">{b.originCountry} · Est. {b.establishedYear}</span>
                </div>
                <p className="text-[#5e5f5c] text-[11px] mt-2 line-clamp-3">
                  {b.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e5e2e1] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => updateBrand(b.id, { enabled: !b.enabled })}
                  className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                    b.enabled ? 'bg-[#d7ef30] text-[#191e00]' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {b.enabled ? 'ACTIVE ON STORE' : 'HIDDEN'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingBrand(b);
                      setBrandForm({ ...b });
                      setIsBrandModalOpen(true);
                    }}
                    className="p-1 hover:bg-[#f1edec]"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete brand "${b.name}"?`)) deleteBrand(b.id);
                    }}
                    className="p-1 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CATEGORY MODAL */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-lg p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
              <h3 className="font-display text-lg font-bold uppercase text-black">
                {editingCat ? `Edit Category: ${editingCat.name}` : 'Register Category'}
              </h3>
              <button onClick={() => setIsCatModalOpen(false)} className="p-1 hover:bg-[#e5e2e1]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveCategory} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Name (EN) *</label>
                <input
                  type="text"
                  required
                  value={catForm.name}
                  onChange={(e) => setCatForm({ ...catForm, name: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Name (Arabic)</label>
                <input
                  type="text"
                  value={catForm.nameAr || ''}
                  onChange={(e) => setCatForm({ ...catForm, nameAr: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black text-right"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Image URL</label>
                <input
                  type="url"
                  value={catForm.image}
                  onChange={(e) => setCatForm({ ...catForm, image: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={catForm.description}
                  onChange={(e) => setCatForm({ ...catForm, description: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-[#e5e2e1]">
                <button type="button" onClick={() => setIsCatModalOpen(false)} className="px-4 py-2 bg-[#f1edec]">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-black text-white font-bold">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BRAND MODAL */}
      {isBrandModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-lg p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
              <h3 className="font-display text-lg font-bold uppercase text-black">
                {editingBrand ? `Edit Brand: ${editingBrand.name}` : 'Register Footwear Brand'}
              </h3>
              <button onClick={() => setIsBrandModalOpen(false)} className="p-1 hover:bg-[#e5e2e1]">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBrand} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value.toUpperCase() })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black font-bold uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Origin Country</label>
                  <input
                    type="text"
                    value={brandForm.originCountry}
                    onChange={(e) => setBrandForm({ ...brandForm, originCountry: e.target.value })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Established Year</label>
                  <input
                    type="text"
                    value={brandForm.establishedYear}
                    onChange={(e) => setBrandForm({ ...brandForm, establishedYear: e.target.value })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">Brand Description</label>
                <textarea
                  rows={3}
                  value={brandForm.description}
                  onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-[#e5e2e1]">
                <button type="button" onClick={() => setIsBrandModalOpen(false)} className="px-4 py-2 bg-[#f1edec]">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-black text-white font-bold">Save Brand</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
