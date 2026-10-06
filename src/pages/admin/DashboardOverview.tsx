import React from 'react';
import { useStore } from '../../context/StoreContext';
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  CheckCircle2,
  ExternalLink,
  DollarSign
} from 'lucide-react';

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const {
    orders,
    products,
    customers,
    formatPrice,
    activityLogs,
    updateOrderStatus,
    language
  } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const lowStockProducts = products.filter((p) => p.stock < 5);
  const outOfStockProducts = products.filter((p) => p.stock === 0);
  const pendingOrders = orders.filter((o) => o.status === 'authenticated' || o.status === 'processing');

  // Revenue by Brand breakdown
  const brandSales: Record<string, number> = {};
  orders.forEach((ord) => {
    ord.items.forEach((item) => {
      const b = item.product.brand || 'Other';
      brandSales[b] = (brandSales[b] || 0) + item.price * item.quantity;
    });
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Alert if low stock or pending orders */}
      {(lowStockProducts.length > 0 || pendingOrders.length > 0) && (
        <div className="bg-[#1c1b1b] text-white p-4 border border-[#313030] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#d7ef30] animate-pulse" />
            <span className="font-bold text-[#d7ef30]">VAULT OPERATIONAL NOTICE:</span>
            <span>
              {pendingOrders.length} orders awaiting dispatch · {lowStockProducts.length} deadstock pairs low in inventory.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigateTab('orders')}
              className="px-3 py-1 bg-white text-black hover:bg-[#d7ef30] font-bold uppercase transition-colors text-[11px] cursor-pointer"
            >
              Review Orders
            </button>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="px-3 py-1 bg-[#313030] hover:bg-black text-white font-bold uppercase transition-colors text-[11px] cursor-pointer"
            >
              Manage Stock
            </button>
          </div>
        </div>
      )}

      {/* QUICK ACTIONS BAR (Requested in Section 4) */}
      <div className="bg-white border border-[#e5e2e1] p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-[#f1edec] pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d7ef30]" />
            <h3 className="font-display text-xs uppercase font-extrabold text-black">
              OPERATIONAL QUICK ACTIONS // <span className="font-normal font-sans">مركز الإجراءات السريعة</span>
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#747878] uppercase">1-CLICK MODULE DIRECT ACCESS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 font-mono text-[11px]">
          <button
            onClick={() => onNavigateTab('products')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-[#d7ef30] text-sm">+</span>
            <span className="truncate w-full">Add Product</span>
          </button>

          <button
            onClick={() => onNavigateTab('orders')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-[#d7ef30] text-sm">+</span>
            <span className="truncate w-full">Fulfill Orders</span>
          </button>

          <button
            onClick={() => onNavigateTab('coupons')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-[#d7ef30] text-sm">+</span>
            <span className="truncate w-full">Add Coupon</span>
          </button>

          <button
            onClick={() => onNavigateTab('banners')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-[#d7ef30] text-sm">+</span>
            <span className="truncate w-full">Create Banner</span>
          </button>

          <button
            onClick={() => onNavigateTab('categories_brands')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-[#d7ef30] text-sm">+</span>
            <span className="truncate w-full">Add Brand</span>
          </button>

          <button
            onClick={() => onNavigateTab('inventory')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-black text-sm">⚿</span>
            <span className="truncate w-full">Stock Ledger</span>
          </button>

          <button
            onClick={() => onNavigateTab('abandoned_carts')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-amber-500 text-sm">⚡</span>
            <span className="truncate w-full">Lost Carts</span>
          </button>

          <button
            onClick={() => onNavigateTab('payments')}
            className="p-2.5 bg-[#fdf8f8] border border-[#e5e2e1] hover:border-black hover:bg-black hover:text-white transition-all text-center flex flex-col items-center justify-center gap-1 font-bold uppercase cursor-pointer"
          >
            <span className="text-emerald-500 text-sm">✓</span>
            <span className="truncate w-full">3 Payments</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="bg-white border border-[#e5e2e1] p-4 sm:p-5 relative overflow-hidden group hover:border-black transition-colors">
          <div className="flex items-center justify-between text-[#747878] mb-2 font-mono text-xs">
            <span className="uppercase tracking-wider">Gross Sales (Total)</span>
            <DollarSign className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-black tabular-nums">
            {formatPrice(totalRevenue)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#191e00]">
            <span className="inline-flex items-center px-1.5 py-0.5 bg-[#d7ef30] font-bold text-[10px]">
              +14.2%
            </span>
            <span className="text-[#5e5f5c]">vs last calendar week</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white border border-[#e5e2e1] p-4 sm:p-5 relative overflow-hidden group hover:border-black transition-colors">
          <div className="flex items-center justify-between text-[#747878] mb-2 font-mono text-xs">
            <span className="uppercase tracking-wider">Vault Orders</span>
            <ShoppingCart className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-black tabular-nums">
            {orders.length}
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#5e5f5c]">
            <span>Avg Value: {formatPrice(averageOrderValue)}</span>
            <span className="text-black font-semibold">{pendingOrders.length} pending</span>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white border border-[#e5e2e1] p-4 sm:p-5 relative overflow-hidden group hover:border-black transition-colors">
          <div className="flex items-center justify-between text-[#747878] mb-2 font-mono text-xs">
            <span className="uppercase tracking-wider">Catalog Specimens</span>
            <Package className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-black tabular-nums">
            {products.length}
          </div>
          <div className="mt-2 flex items-center gap-2 text-[11px] font-mono">
            {lowStockProducts.length > 0 ? (
              <span className="text-[#e60000] font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {lowStockProducts.length} low stock
              </span>
            ) : (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                All healthy
              </span>
            )}
          </div>
        </div>

        {/* Registered Collectors */}
        <div className="bg-white border border-[#e5e2e1] p-4 sm:p-5 relative overflow-hidden group hover:border-black transition-colors">
          <div className="flex items-center justify-between text-[#747878] mb-2 font-mono text-xs">
            <span className="uppercase tracking-wider">Verified Collectors</span>
            <Users className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl sm:text-3xl font-extrabold text-black tabular-nums">
            {customers.length + 18}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#5e5f5c]">
            <span className="text-black font-bold">100% Verified</span>
            <span>VIP Registry</span>
          </div>
        </div>
      </div>

      {/* Middle Grid: Sales Trend Graph & Brand Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales by Brand & Volume */}
        <div className="lg:col-span-8 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
                FINANCIAL DISPATCH LEDGER
              </span>
              <h3 className="font-display text-lg font-bold uppercase text-black">
                Revenue & Brand Allocation Share
              </h3>
            </div>
            <span className="text-xs font-mono bg-[#f7f3f2] px-2.5 py-1 border border-[#e5e2e1] text-[#5e5f5c]">
              Live Storefront Sync
            </span>
          </div>

          {/* Visual Bar Graph */}
          <div className="space-y-3 pt-2">
            {Object.entries(brandSales).map(([brand, amount]) => {
              const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;
              return (
                <div key={brand} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-black uppercase">{brand}</span>
                    <span className="text-[#5e5f5c]">
                      {formatPrice(amount)} ({pct}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#f1edec] h-3 overflow-hidden">
                    <div
                      className="bg-black h-full transition-all duration-500 hover:bg-[#d7ef30]"
                      style={{ width: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#e5e2e1] grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="p-2.5 bg-[#f7f3f2] border border-[#e5e2e1]">
              <div className="text-[10px] text-[#747878] uppercase">Top Brand</div>
              <div className="font-bold text-black text-sm">JORDAN BRAND</div>
            </div>
            <div className="p-2.5 bg-[#f7f3f2] border border-[#e5e2e1]">
              <div className="text-[10px] text-[#747878] uppercase">Conversion Rate</div>
              <div className="font-bold text-black text-sm">3.8%</div>
            </div>
            <div className="p-2.5 bg-[#f7f3f2] border border-[#e5e2e1]">
              <div className="text-[10px] text-[#747878] uppercase">Avg Fulfillment</div>
              <div className="font-bold text-black text-sm">18.4 Hours</div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts & Quick Restock */}
        <div className="lg:col-span-4 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
                INVENTORY WATCHDOG
              </span>
              <h3 className="font-display text-base font-bold uppercase text-black">
                Critical Stock
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-xs font-mono text-black underline hover:text-[#747878]"
            >
              View All
            </button>
          </div>

          <div className="space-y-3">
            {lowStockProducts.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-[#747878]">
                All deadstock pairs are adequately provisioned.
              </div>
            ) : (
              lowStockProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="p-3 border border-[#e5e2e1] bg-[#fdf8f8] flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <img
                    src={p.primaryImage}
                    alt={p.name}
                    className="w-12 h-12 object-contain bg-white p-1 border border-[#e5e2e1] shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-black truncate">{p.name}</div>
                    <div className="text-[10px] text-[#5e5f5c]">{p.sku}</div>
                    <div className="text-[10px] text-[#e60000] font-bold">
                      {p.stock === 0 ? 'OUT OF STOCK' : `ONLY ${p.stock} REMAINING`}
                    </div>
                  </div>
                  <button
                    onClick={() => onNavigateTab('inventory')}
                    className="px-2 py-1 bg-black text-white hover:bg-[#313030] text-[10px] uppercase font-bold shrink-0"
                  >
                    Adjust
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Orders & Live Admin Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders Datatable */}
        <div className="lg:col-span-8 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
                LATEST DISPATCH CONTRACTS
              </span>
              <h3 className="font-display text-base font-bold uppercase text-black">
                Recent Customer Orders
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-mono text-black font-bold uppercase hover:underline"
            >
              See All Orders ({orders.length}) →
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right font-mono text-xs">
              <thead className="bg-[#f7f3f2] text-[#747878] uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Order</th>
                  <th className="p-2.5">Customer</th>
                  <th className="p-2.5">Total</th>
                  <th className="p-2.5">Payment</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-right rtl:text-left">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5e2e1]">
                {orders.slice(0, 5).map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#fdf8f8] transition-colors">
                    <td className="p-2.5 font-bold text-black">{ord.orderNumber}</td>
                    <td className="p-2.5 text-[#1c1b1b]">{ord.shippingAddress.fullName}</td>
                    <td className="p-2.5 font-bold text-black">{formatPrice(ord.total)}</td>
                    <td className="p-2.5 text-[11px] text-[#5e5f5c] truncate max-w-[140px]">
                      {ord.paymentMethod}
                    </td>
                    <td className="p-2.5">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${
                          ord.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : ord.status === 'dispatched'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-[#d7ef30] text-[#191e00]'
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                    <td className="p-2.5 text-right rtl:text-left">
                      <button
                        onClick={() => onNavigateTab('orders')}
                        className="px-2.5 py-1 border border-[#e5e2e1] hover:border-black font-bold text-[10px] uppercase transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Audit Activity Stream */}
        <div className="lg:col-span-4 bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-3">
            <div>
              <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
                IMMUTABLE AUDIT LOG
              </span>
              <h3 className="font-display text-base font-bold uppercase text-black">
                Store Operations Log
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('activity_log')}
              className="text-xs font-mono text-black underline hover:text-[#747878]"
            >
              Log File
            </button>
          </div>

          <div className="space-y-3 max-h-[300px] overflow-y-auto font-mono text-xs pr-1">
            {activityLogs.slice(0, 6).map((log) => (
              <div key={log.id} className="border-b border-[#f1edec] pb-2.5 last:border-b-0 space-y-0.5">
                <div className="flex items-center justify-between text-[10px] text-[#747878]">
                  <span className="font-bold text-black">{log.adminName}</span>
                  <span>{log.timestamp.split(' ')[1] || log.timestamp}</span>
                </div>
                <div className="font-semibold text-black text-[11px]">{log.action}</div>
                <div className="text-[10px] text-[#5e5f5c] truncate">{log.target}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
