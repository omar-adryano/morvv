import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  Search,
  AlertTriangle,
  Plus,
  Minus,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Filter,
  Package
} from 'lucide-react';

export const InventoryManager: React.FC = () => {
  const { products, updateProduct, adjustStock, formatPrice, storeSettings } = useStore();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out'>('all');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const threshold = storeSettings.inventoryAlertThreshold || 5;

  // Flattened inventory view: each product with its individual sizes
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filterType === 'low') return p.stock > 0 && p.stock < threshold;
    if (filterType === 'out') return p.stock === 0;
    return true;
  });

  const totalStockItems = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < threshold).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  const handleSetStock = (productId: string) => {
    updateProduct(productId, {
      stock: Math.max(0, tempStockValue),
      sizes: products
        .find((p) => p.id === productId)
        ?.sizes.map((s) => ({ ...s, inStock: tempStockValue > 0 }))
    });
    setEditingStockId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            VAULT STOCK AUDIT & RECONCILIATION
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Deadstock Inventory Control
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 bg-white border border-[#e5e2e1] text-black font-bold">
            Total Units: <span className="text-black">{totalStockItems}</span>
          </div>
          <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-800 font-bold">
            Low Stock: {lowStockCount}
          </div>
          <div className="px-3 py-1.5 bg-red-50 border border-red-200 text-red-800 font-bold">
            Out of Stock: {outOfStockCount}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#e5e2e1] p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 font-mono text-xs">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by product name, SKU, or brand..."
            className="w-full bg-[#f7f3f2] border border-[#e5e2e1] pl-9 pr-3 py-2 text-xs text-black focus:outline-none focus:border-black rtl:pl-3 rtl:pr-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
              filterType === 'all'
                ? 'bg-black text-white'
                : 'bg-[#f7f3f2] text-black hover:bg-[#e5e2e1]'
            }`}
          >
            All ({products.length})
          </button>
          <button
            onClick={() => setFilterType('low')}
            className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
              filterType === 'low'
                ? 'bg-amber-600 text-white'
                : 'bg-[#f7f3f2] text-amber-800 hover:bg-[#e5e2e1]'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterType('out')}
            className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
              filterType === 'out'
                ? 'bg-[#e60000] text-white'
                : 'bg-[#f7f3f2] text-red-700 hover:bg-[#e5e2e1]'
            }`}
          >
            Out of Stock ({outOfStockCount})
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-[#e5e2e1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right font-mono text-xs">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3">Product / Specimen</th>
                <th className="p-3">SKU & Code</th>
                <th className="p-3">Size Matrix</th>
                <th className="p-3">Current Stock</th>
                <th className="p-3">Health Status</th>
                <th className="p-3 text-right rtl:text-left">Quick Adjustment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1]">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[#747878] font-mono">
                    No inventory records match the current filter.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#fdf8f8] transition-colors">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.primaryImage}
                          alt={p.name}
                          className="w-12 h-12 object-contain bg-[#f7f3f2] p-1 border border-[#e5e2e1] shrink-0"
                        />
                        <div>
                          <div className="font-bold text-black uppercase">{p.name}</div>
                          <div className="text-[10px] text-[#5e5f5c]">{p.brand} · {formatPrice(p.price)}</div>
                        </div>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="font-mono text-black font-semibold">{p.sku}</div>
                      <div className="text-[10px] text-[#747878]">{p.styleCode}</div>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-wrap gap-1 max-w-[280px]">
                        {p.sizes.map((s) => (
                          <span
                            key={s.size}
                            className={`px-1.5 py-0.5 text-[9px] border ${
                              s.inStock
                                ? 'bg-white border-[#e5e2e1] text-black font-semibold'
                                : 'bg-[#f1edec] border-red-200 text-red-600 line-through'
                            }`}
                          >
                            {s.size}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="p-3">
                      {editingStockId === p.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={tempStockValue}
                            onChange={(e) => setTempStockValue(parseInt(e.target.value) || 0)}
                            className="w-16 bg-[#f7f3f2] border border-black p-1 text-xs font-bold text-black"
                          />
                          <button
                            onClick={() => handleSetStock(p.id)}
                            className="px-2 py-1 bg-black text-white hover:bg-[#313030] text-[10px] font-bold"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingStockId(null)}
                            className="px-1.5 py-1 text-[#747878] hover:text-black text-[10px]"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base text-black tabular-nums">
                            {p.stock}
                          </span>
                          <button
                            onClick={() => {
                              setEditingStockId(p.id);
                              setTempStockValue(p.stock);
                            }}
                            className="text-[10px] text-[#747878] underline hover:text-black"
                          >
                            Set
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="p-3">
                      {p.stock === 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          Out of Stock
                        </span>
                      ) : p.stock < threshold ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock ({p.stock})
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                          <CheckCircle2 className="w-3 h-3" />
                          Optimal
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-right rtl:text-left">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          title="Decrease 1"
                          onClick={() => adjustStock(p.id, p.sizes[0]?.size || 'US 9.0', -1)}
                          className="w-7 h-7 bg-[#f7f3f2] hover:bg-[#e5e2e1] border border-[#e5e2e1] flex items-center justify-center font-bold text-black transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Increase 1"
                          onClick={() => adjustStock(p.id, p.sizes[0]?.size || 'US 9.0', 1)}
                          className="w-7 h-7 bg-[#f7f3f2] hover:bg-[#e5e2e1] border border-[#e5e2e1] flex items-center justify-center font-bold text-black transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                        <button
                          title="Restock +5"
                          onClick={() => adjustStock(p.id, p.sizes[0]?.size || 'US 9.0', 5)}
                          className="px-2 py-1 bg-black text-white hover:bg-[#313030] text-[10px] font-bold uppercase transition-colors"
                        >
                          +5
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
    </div>
  );
};
