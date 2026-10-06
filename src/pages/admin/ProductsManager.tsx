import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product } from '../../types';
import {
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Star,
  Sparkles,
  Flame,
  Check,
  X,
  Upload,
  Layers,
  ChevronDown,
  AlertCircle
} from 'lucide-react';

export const ProductsManager: React.FC = () => {
  const {
    products,
    createProduct,
    updateProduct,
    deleteProduct,
    duplicateProduct,
    formatPrice,
    brands,
    categories,
    navigateTo
  } = useStore();

  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Create/Edit
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    nameAr: '',
    brand: 'NIKE',
    category: 'basketball',
    price: 250,
    originalPrice: 280,
    sku: '',
    styleCode: '',
    originYear: '2026',
    description: '',
    descriptionAr: '',
    primaryImage: '',
    images: [],
    colors: ['Black', 'White'],
    colorway: 'Black / White',
    featured: false,
    newArrival: true,
    bestSeller: false,
    tier: 'TIER 0 / DEADSTOCK',
    badge: 'ARCHIVAL SPECIMEN',
    stock: 12,
    sizes: [
      { size: 'US 8.5', price: 250, inStock: true },
      { size: 'US 9.0', price: 250, inStock: true },
      { size: 'US 9.5', price: 250, inStock: true },
      { size: 'US 10.0', price: 250, inStock: true },
      { size: 'US 10.5', price: 265, inStock: true },
      { size: 'US 11.0', price: 275, inStock: true }
    ],
    specs: {
      upper: 'Distressed Full Grain Hide',
      collar: 'Weathered Split Leather',
      midsole: 'Responsive Encapsulated Cushioning',
      packaging: 'Vintage Mismatched Deadstock Lid'
    }
  });

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newSizeName, setNewSizeName] = useState('');
  const [newSizePrice, setNewSizePrice] = useState(250);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      (p.nameAr && p.nameAr.includes(search));
    const matchesBrand = selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const handleOpenCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      nameAr: '',
      brand: brands[0]?.name || 'NIKE',
      category: 'basketball',
      price: 250,
      originalPrice: 280,
      sku: `MORV-${Math.floor(1000 + Math.random() * 9000)}-VAULT`,
      styleCode: 'DS-2026-X',
      originYear: '2026',
      description: 'Verified deadstock pair from international curation ledger.',
      descriptionAr: 'قطعة مخزون ميت أصلية موثقة من سجل الخزينة الدولي.',
      primaryImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85',
      images: [
        'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=85'
      ],
      colors: ['Black', 'White'],
      colorway: 'Classic Black / White',
      featured: false,
      newArrival: true,
      bestSeller: false,
      tier: 'TIER 0 / DEADSTOCK',
      badge: 'ARCHIVAL SPECIMEN',
      stock: 10,
      sizes: [
        { size: 'US 8.5', price: 250, inStock: true },
        { size: 'US 9.0', price: 250, inStock: true },
        { size: 'US 9.5', price: 250, inStock: true },
        { size: 'US 10.0', price: 250, inStock: true }
      ],
      specs: {
        upper: 'Distressed Full Grain Hide',
        collar: 'Weathered Split Leather',
        midsole: 'Responsive Encapsulated Cushioning',
        packaging: 'Deadstock Original Box & NFC Certificate'
      }
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please fill product name and price');
      return;
    }

    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      createProduct(formData);
    }
    setIsModalOpen(false);
  };

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    const currentImgs = formData.images || [];
    const nextImgs = [...currentImgs, newImageUrl.trim()];
    setFormData({
      ...formData,
      images: nextImgs,
      primaryImage: formData.primaryImage || newImageUrl.trim()
    });
    setNewImageUrl('');
  };

  const handleRemoveImage = (index: number) => {
    const currentImgs = formData.images || [];
    const nextImgs = currentImgs.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: nextImgs,
      primaryImage: nextImgs[0] || ''
    });
  };

  const handleAddSize = () => {
    if (!newSizeName.trim()) return;
    const currentSizes = formData.sizes || [];
    setFormData({
      ...formData,
      sizes: [...currentSizes, { size: newSizeName.trim(), price: newSizePrice, inStock: true }]
    });
    setNewSizeName('');
  };

  const handleRemoveSize = (sizeName: string) => {
    const currentSizes = formData.sizes || [];
    setFormData({
      ...formData,
      sizes: currentSizes.filter((s) => s.size !== sizeName)
    });
  };

  // Bulk operations
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProducts([]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedProducts.length} selected products?`)) {
      selectedProducts.forEach((id) => deleteProduct(id));
      setSelectedProducts([]);
    }
  };

  const handleBulkFeature = (featured: boolean) => {
    selectedProducts.forEach((id) => updateProduct(id, { featured }));
    setSelectedProducts([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            CENTRAL INVENTORY REGISTRY
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Product Management ({products.length})
          </h2>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="px-4 py-2.5 bg-black hover:bg-[#313030] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4 text-[#d7ef30]" />
          <span>New Product Specimen</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#e5e2e1] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU, or Arabic title..."
            className="w-full bg-[#f7f3f2] border border-[#e5e2e1] pl-9 pr-3 py-2 text-xs text-black focus:outline-none focus:border-black rtl:pl-3 rtl:pr-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="bg-[#f7f3f2] border border-[#e5e2e1] px-3 py-2 text-xs text-black focus:outline-none cursor-pointer"
          >
            <option value="all">All Brands</option>
            {brands.map((b) => (
              <option key={b.id} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#f7f3f2] border border-[#e5e2e1] px-3 py-2 text-xs text-black focus:outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Action Bar */}
      {selectedProducts.length > 0 && (
        <div className="bg-[#1c1b1b] text-white p-3 border border-[#313030] flex flex-wrap items-center justify-between gap-2 font-mono text-xs animate-in fade-in">
          <span className="font-bold text-[#d7ef30]">
            {selectedProducts.length} Products Selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkFeature(true)}
              className="px-2.5 py-1 bg-[#313030] hover:bg-black text-[11px] font-bold uppercase transition-colors"
            >
              Mark Featured
            </button>
            <button
              onClick={() => handleBulkFeature(false)}
              className="px-2.5 py-1 bg-[#313030] hover:bg-black text-[11px] font-bold uppercase transition-colors"
            >
              Unfeature
            </button>
            <button
              onClick={handleBulkDelete}
              className="px-2.5 py-1 bg-[#e60000] hover:bg-red-700 text-white text-[11px] font-bold uppercase transition-colors"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white border border-[#e5e2e1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right font-mono text-xs">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3 w-8">
                  <input
                    type="checkbox"
                    checked={
                      selectedProducts.length === filteredProducts.length &&
                      filteredProducts.length > 0
                    }
                    onChange={handleSelectAll}
                    className="accent-black cursor-pointer"
                  />
                </th>
                <th className="p-3">Specimen</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Badges</th>
                <th className="p-3 text-right rtl:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-[#747878] font-mono">
                    No sneaker specimens matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#fdf8f8] transition-colors">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(p.id)}
                        onChange={() => toggleSelect(p.id)}
                        className="accent-black cursor-pointer"
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-12 h-12 object-contain bg-[#f7f3f2] p-1 border border-[#e5e2e1] shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-black uppercase truncate max-w-[200px]">
                            {p.name}
                          </div>
                          {p.nameAr && (
                            <div className="text-[10px] text-[#747878] truncate max-w-[200px]">
                              {p.nameAr}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-semibold text-black uppercase">{p.brand}</td>
                    <td className="p-3 text-[#5e5f5c] uppercase text-[11px]">{p.category}</td>
                    <td className="p-3 font-mono text-[11px] text-[#5e5f5c]">{p.sku}</td>
                    <td className="p-3 font-bold text-black">{formatPrice(p.price)}</td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold ${
                          p.stock === 0
                            ? 'bg-red-100 text-red-800'
                            : p.stock < 5
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {p.stock} in stock
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        {p.featured && (
                          <span title="Featured" className="p-1 bg-[#d7ef30] text-[#191e00] text-[9px] font-bold uppercase">
                            <Star className="w-3 h-3 fill-current inline" />
                          </span>
                        )}
                        {p.newArrival && (
                          <span title="New Arrival" className="p-1 bg-black text-white text-[9px] font-bold uppercase">
                            <Sparkles className="w-3 h-3 inline" />
                          </span>
                        )}
                        {p.bestSeller && (
                          <span title="Best Seller" className="p-1 bg-[#e60000] text-white text-[9px] font-bold uppercase">
                            <Flame className="w-3 h-3 fill-current inline" />
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-3 text-right rtl:text-left">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="View on Storefront"
                          onClick={() => navigateTo('product', p)}
                          className="p-1.5 border border-[#e5e2e1] hover:border-black text-[#5e5f5c] hover:text-black transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Duplicate Specimen"
                          onClick={() => duplicateProduct(p.id)}
                          className="p-1.5 border border-[#e5e2e1] hover:border-black text-[#5e5f5c] hover:text-black transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Edit Product"
                          onClick={() => handleOpenEditModal(p)}
                          className="p-1.5 bg-black text-white hover:bg-[#313030] transition-colors"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Delete"
                          onClick={() => {
                            if (confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                          }}
                          className="p-1.5 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-[#e5e2e1] flex items-center justify-between bg-[#fdf8f8]">
              <div>
                <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
                  VAULT SPECIMEN DOSSIER
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-black">
                  {editingProduct ? `Edit: ${editingProduct.name}` : 'Register New Sneaker Specimen'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-[#e5e2e1] text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Form Body */}
            <form onSubmit={handleSaveProduct} className="p-4 sm:p-6 overflow-y-auto space-y-6 font-mono text-xs flex-1">
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Product Name (EN) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Air Jordan 1 Retro High OG"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Product Name (Arabic)
                  </label>
                  <input
                    type="text"
                    value={formData.nameAr || ''}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    placeholder="الاسم بالعربية"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black text-right"
                  />
                </div>
              </div>

              {/* Row 2: Brand, Category, SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Brand *
                  </label>
                  <select
                    value={formData.brand || ''}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none cursor-pointer"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category || 'archive'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    SKU Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.sku || ''}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="MORV-8501-CHI"
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Row 3: Pricing & Stock */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Price (USD $) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.price || 0}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Original / Retail Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.originalPrice || 0}
                    onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Total Inventory Stock *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.stock || 0}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Description (EN)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                    Description (Arabic)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.descriptionAr || ''}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black text-right"
                  />
                </div>
              </div>

              {/* Multi-Image Gallery Manager */}
              <div className="space-y-3 p-4 bg-[#fdf8f8] border border-[#e5e2e1]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-black tracking-wider">
                    SPECIMEN PHOTOGRAPHY & IMAGE ASSETS
                  </span>
                  <span className="text-[10px] text-[#747878]">First image is Primary</span>
                </div>

                {/* Images Preview Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {formData.images?.map((url, i) => (
                    <div key={i} className="relative group bg-white border border-[#e5e2e1] p-1 aspect-square">
                      <img src={url} alt={`Preview ${i}`} className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(i)}
                        className="absolute top-1 right-1 bg-black text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3" />
                      </button>
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 bg-[#d7ef30] text-[#191e00] font-bold text-[8px] px-1">
                          PRIMARY
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Add Image URL Input */}
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Enter HTTPS Image URL..."
                    className="flex-1 bg-white border border-[#e5e2e1] px-3 py-2 text-xs text-black focus:outline-none focus:border-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-3 py-2 bg-black text-white hover:bg-[#313030] font-bold text-xs uppercase transition-colors"
                  >
                    Add Image
                  </button>
                </div>
              </div>

              {/* Dynamic Size & Variant Matrix */}
              <div className="space-y-3 p-4 bg-[#fdf8f8] border border-[#e5e2e1]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-black tracking-wider">
                    AVAILABLE SIZES & VARIANT MATRIX
                  </span>
                  <span className="text-[10px] text-[#747878]">{formData.sizes?.length || 0} Sizes</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {formData.sizes?.map((s) => (
                    <div
                      key={s.size}
                      className="p-2 bg-white border border-[#e5e2e1] flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-black block">{s.size}</span>
                        <span className="text-[#5e5f5c] text-[10px]">{formatPrice(s.price)}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSize(s.size)}
                        className="text-[#747878] hover:text-red-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[#e5e2e1]">
                  <input
                    type="text"
                    value={newSizeName}
                    onChange={(e) => setNewSizeName(e.target.value)}
                    placeholder="Size e.g. US 12.0"
                    className="flex-1 bg-white border border-[#e5e2e1] px-3 py-1.5 text-xs text-black focus:outline-none"
                  />
                  <input
                    type="number"
                    value={newSizePrice}
                    onChange={(e) => setNewSizePrice(parseFloat(e.target.value) || 250)}
                    placeholder="Price $"
                    className="w-24 bg-white border border-[#e5e2e1] px-3 py-1.5 text-xs text-black focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddSize}
                    className="px-3 py-1.5 bg-black text-white hover:bg-[#313030] text-xs font-bold uppercase transition-colors"
                  >
                    Add Size
                  </button>
                </div>
              </div>

              {/* Status & Display Badges */}
              <div className="p-4 bg-[#fdf8f8] border border-[#e5e2e1] space-y-3">
                <span className="text-[10px] uppercase font-bold text-black tracking-wider block">
                  STOREFRONT CURATION FLAGS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center gap-2 p-2 bg-white border border-[#e5e2e1] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured || false}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="accent-black"
                    />
                    <span className="font-bold text-black">Featured Drop</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-white border border-[#e5e2e1] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.newArrival || false}
                      onChange={(e) => setFormData({ ...formData, newArrival: e.target.checked })}
                      className="accent-black"
                    />
                    <span className="font-bold text-black">New Arrival</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 bg-white border border-[#e5e2e1] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.bestSeller || false}
                      onChange={(e) => setFormData({ ...formData, bestSeller: e.target.checked })}
                      className="accent-black"
                    />
                    <span className="font-bold text-black">Best Seller</span>
                  </label>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="border-t border-[#e5e2e1] pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-[#f1edec] hover:bg-[#e5e2e1] text-black font-bold uppercase transition-colors text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-black hover:bg-[#313030] text-white font-bold uppercase transition-colors text-xs flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#d7ef30]" />
                  <span>Save Specimen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
