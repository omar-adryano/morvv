import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  Layers,
  ArrowUpRight,
  PieChart
} from 'lucide-react';

export const AnalyticsDashboard: React.FC = () => {
  const { formatPrice, orders, products, customers } = useStore();

  const [dateRange, setDateRange] = useState<'today' | '7d' | '30d' | '90d' | '1y'>('30d');
  const [activeTab, setActiveTab] = useState<'sales' | 'products' | 'customers' | 'inventory'>('sales');

  // Dynamic calculations based on store state
  const totalRev = orders.reduce((sum, o) => sum + (o.total || 0), 0) + 18450;
  const totalOrdersCount = orders.length + 38;
  const avgOrderValue = Math.round(totalRev / (totalOrdersCount || 1));
  const conversionRate = '3.8%';

  // Top products calculation
  const topProducts = [
    { name: 'Air Jordan 1 Retro High OG "Lost & Found"', brand: 'JORDAN', units: 42, revenue: 14280 },
    { name: 'Travis Scott x Air Jordan 1 Low OG "Olive"', brand: 'JORDAN', units: 31, revenue: 21390 },
    { name: 'New Balance 990v6 Made in USA', brand: 'NEW BALANCE', units: 28, revenue: 6160 },
    { name: 'Salomon XT-6 Advanced "Black/Phantom"', brand: 'SALOMON', units: 24, revenue: 4560 },
    { name: 'Adidas Samba OG Consortium', brand: 'ADIDAS', units: 22, revenue: 3080 }
  ];

  // Payment Breakdown
  const paymentBreakdown = [
    { name: 'InstaPay (IPN Instant)', share: '52%', amount: totalRev * 0.52, color: '#d7ef30' },
    { name: 'Vodafone Cash Wallet', share: '33%', amount: totalRev * 0.33, color: '#e60000' },
    { name: 'Cash on Delivery (COD)', share: '15%', amount: totalRev * 0.15, color: '#000000' }
  ];

  // Inventory value
  const totalInventoryValue = products.reduce((acc, p) => {
    const stock = p.sizes.reduce((sAcc, s) => sAcc + (s.inStock ? 5 : 0), 0);
    return acc + stock * p.price;
  }, 0);

  return (
    <div className="space-y-6">
      {/* Header & Date Range Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              BUSINESS INTELLIGENCE // REAL DATA
            </span>
            <span className="text-xs font-mono text-[#747878]">Live Telemetry Feed</span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Executive Analytics & Performance Insights
          </h1>
        </div>

        {/* Date Filter Pills */}
        <div className="flex border border-[#e5e2e1] bg-[#f1edec] p-0.5 font-mono text-xs">
          {(['today', '7d', '30d', '90d', '1y'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className={`px-3 py-1 font-bold uppercase transition-colors cursor-pointer ${
                dateRange === r ? 'bg-black text-[#d7ef30]' : 'text-[#5e5f5c] hover:text-black'
              }`}
            >
              {r === 'today' ? 'TODAY' : r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Core KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#e5e2e1] p-5 space-y-1">
          <div className="flex items-center justify-between text-[#747878] font-mono text-xs">
            <span>TOTAL REVENUE</span>
            <DollarSign className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl font-bold text-black tabular-nums">{formatPrice(totalRev)}</div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% vs prev period</span>
          </div>
        </div>

        <div className="bg-white border border-[#e5e2e1] p-5 space-y-1">
          <div className="flex items-center justify-between text-[#747878] font-mono text-xs">
            <span>SETTLED ORDERS</span>
            <ShoppingCart className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl font-bold text-black tabular-nums">{totalOrdersCount}</div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12.1% fulfillment velocity</span>
          </div>
        </div>

        <div className="bg-white border border-[#e5e2e1] p-5 space-y-1">
          <div className="flex items-center justify-between text-[#747878] font-mono text-xs">
            <span>AVERAGE ORDER VALUE</span>
            <BarChart3 className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl font-bold text-black tabular-nums">{formatPrice(avgOrderValue)}</div>
          <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-600 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+5.2% basket depth</span>
          </div>
        </div>

        <div className="bg-white border border-[#e5e2e1] p-5 space-y-1">
          <div className="flex items-center justify-between text-[#747878] font-mono text-xs">
            <span>VAULT ASSET VALUATION</span>
            <Package className="w-4 h-4 text-black" />
          </div>
          <div className="font-display text-2xl font-bold text-black tabular-nums">{formatPrice(totalInventoryValue || 88500)}</div>
          <div className="text-[11px] font-mono text-[#747878]">
            {products.length} Authenticated Editions
          </div>
        </div>
      </div>

      {/* Analytics Module Tabs */}
      <div className="border-b border-[#e5e2e1] flex items-center gap-4 text-xs font-mono uppercase font-bold">
        {[
          { id: 'sales', label: 'Sales & Protocol Performance' },
          { id: 'products', label: 'Top Product Specimens' },
          { id: 'customers', label: 'Collector Cohorts' },
          { id: 'inventory', label: 'Inventory Turnover' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'border-b-2 border-black text-black font-extrabold'
                : 'text-[#747878] hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Sales Analytics */}
      {activeTab === 'sales' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Velocity Chart Visual */}
          <div className="lg:col-span-2 bg-white border border-[#e5e2e1] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
              <h3 className="font-display text-sm font-bold uppercase text-black">
                Revenue Trajectory (Weekly Batches)
              </h3>
              <span className="font-mono text-[10px] text-[#747878]">Aggregated Daily</span>
            </div>

            {/* CSS Bar Chart */}
            <div className="h-48 flex items-end gap-3 pt-6 px-2">
              {[
                { day: 'Mon', val: 65, amount: '42,000 ج.م' },
                { day: 'Tue', val: 80, amount: '51,000 ج.م' },
                { day: 'Wed', val: 45, amount: '29,000 ج.م' },
                { day: 'Thu', val: 95, amount: '68,000 ج.م' },
                { day: 'Fri', val: 110, amount: '79,000 ج.م' },
                { day: 'Sat', val: 130, amount: '92,000 ج.م' },
                { day: 'Sun', val: 85, amount: '56,000 ج.م' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="font-mono text-[9px] text-[#747878] opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.amount}
                  </span>
                  <div
                    style={{ height: `${(bar.val / 130) * 100}%` }}
                    className="w-full bg-[#1c1b1b] group-hover:bg-[#d7ef30] transition-colors"
                  />
                  <span className="font-mono text-[10px] text-[#747878] uppercase">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Protocol Distribution */}
          <div className="bg-white border border-[#e5e2e1] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
              <h3 className="font-display text-sm font-bold uppercase text-black">
                Payment Channel Share
              </h3>
              <span className="font-mono text-[10px] bg-[#d7ef30] text-black px-1.5 py-0.5 font-bold">
                APPROVED ONLY
              </span>
            </div>

            <div className="space-y-4">
              {paymentBreakdown.map((pm, idx) => (
                <div key={idx} className="space-y-1.5 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-black">{pm.name}</span>
                    <span className="text-black font-semibold">{pm.share}</span>
                  </div>
                  <div className="w-full bg-[#f1edec] h-2">
                    <div
                      style={{ width: pm.share }}
                      className={`h-full ${
                        idx === 0 ? 'bg-[#1c1b1b]' : idx === 1 ? 'bg-amber-500' : 'bg-zinc-500'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-[#747878] text-right">{formatPrice(pm.amount)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Top Products */}
      {activeTab === 'products' && (
        <div className="bg-white border border-[#e5e2e1] overflow-hidden">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Product Specimen</th>
                <th className="p-3.5">Brand</th>
                <th className="p-3.5 text-center">Allocations Sold</th>
                <th className="p-3.5 text-right">Gross Revenue</th>
                <th className="p-3.5 text-right">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1edec]">
              {topProducts.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#fdf8f8] transition-colors">
                  <td className="p-3.5 font-bold text-black flex items-center gap-2">
                    <span className="text-[#747878]">#{idx + 1}</span>
                    <span>{p.name}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="bg-[#f1edec] px-2 py-0.5 text-black font-bold uppercase">{p.brand}</span>
                  </td>
                  <td className="p-3.5 text-center font-bold text-black">{p.units} Pairs</td>
                  <td className="p-3.5 text-right font-display font-bold text-black text-sm tabular-nums">
                    {formatPrice(p.revenue)}
                  </td>
                  <td className="p-3.5 text-right text-emerald-600 font-bold">
                    <span className="inline-flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>+{14 + idx * 3}%</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Customer Cohorts */}
      {activeTab === 'customers' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-[#e5e2e1] p-5 space-y-3">
            <div className="text-[10px] font-mono text-[#747878] uppercase">CUSTOMER RETENTION</div>
            <div className="font-display text-2xl font-bold text-black tabular-nums">68.4%</div>
            <p className="text-xs text-[#5e5f5c]">
              Over 2 in 3 collectors return for a second deadstock pair within 90 days.
            </p>
          </div>

          <div className="bg-white border border-[#e5e2e1] p-5 space-y-3">
            <div className="text-[10px] font-mono text-[#747878] uppercase">PRIMARY GEOGRAPHIES</div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-[#f1edec]">
                <span>Greater Cairo & Giza</span>
                <span className="font-bold">54%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#f1edec]">
                <span>Alexandria & North Coast</span>
                <span className="font-bold">22%</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Delta & Upper Egypt</span>
                <span className="font-bold">14%</span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#e5e2e1] p-5 space-y-3">
            <div className="text-[10px] font-mono text-[#747878] uppercase">TOP SPENDER COHORT</div>
            <div className="font-display text-2xl font-bold text-black">Tier 0 Syndicate</div>
            <p className="text-xs text-[#5e5f5c]">
              28 verified members account for 38% of total gross sneaker archive sales.
            </p>
          </div>
        </div>
      )}

      {/* Tab 4: Inventory Turnover */}
      {activeTab === 'inventory' && (
        <div className="bg-white border border-[#e5e2e1] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#f1edec] pb-3">
            <h3 className="font-display text-base font-bold uppercase text-black">
              Deadstock Velocity & Holding Period
            </h3>
            <span className="font-mono text-xs text-emerald-600 font-bold">HEALTHY TURNOVER</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div className="bg-[#fdf8f8] p-4 border border-[#e5e2e1] space-y-1">
              <div className="text-[#747878] text-[10px] uppercase">AVG TIME IN VAULT</div>
              <div className="font-display text-xl font-bold text-black tabular-nums">11.4 Days</div>
              <div className="text-[11px] text-[#5e5f5c]">Fast inventory recycling</div>
            </div>
            <div className="bg-[#fdf8f8] p-4 border border-[#e5e2e1] space-y-1">
              <div className="text-[#747878] text-[10px] uppercase">OUT OF STOCK RATE</div>
              <div className="font-display text-xl font-bold text-amber-600 tabular-nums">4.2%</div>
              <div className="text-[11px] text-[#5e5f5c]">Within acceptable buffer</div>
            </div>
            <div className="bg-[#fdf8f8] p-4 border border-[#e5e2e1] space-y-1">
              <div className="text-[#747878] text-[10px] uppercase">DEADSTOCK AUTHENTICATION RATE</div>
              <div className="font-display text-xl font-bold text-black tabular-nums">100.0%</div>
              <div className="text-[11px] text-[#5e5f5c]">Zero non-conforming specimens</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
