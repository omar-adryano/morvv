import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Search, Users, ShieldCheck, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

export const CustomersManager: React.FC = () => {
  const { customers, toggleCustomerStatus, formatPrice, orders } = useStore();
  const [search, setSearch] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.city.includes(search)
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            VERIFIED COLLECTOR DIRECTORY
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Customer Registry ({customers.length})
          </h2>
        </div>

        <div className="text-xs font-mono bg-white border border-[#e5e2e1] px-3 py-1.5 text-black">
          VIP Collectors: <strong className="text-black">{customers.filter((c) => c.tier.includes('VIP')).length}</strong>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-[#e5e2e1] p-4 font-mono text-xs">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#747878] rtl:left-auto rtl:right-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collectors by name, email, phone, city..."
            className="w-full bg-[#f7f3f2] border border-[#e5e2e1] pl-9 pr-3 py-2 text-xs text-black focus:outline-none focus:border-black rtl:pl-3 rtl:pr-9"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white border border-[#e5e2e1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right font-mono text-xs">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3">Collector Name</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Location</th>
                <th className="p-3">Registry Tier</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Lifetime Value</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right rtl:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1]">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#747878] font-mono">
                    No collectors matching search query.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((c) => (
                  <tr key={c.id} className="hover:bg-[#fdf8f8] transition-colors">
                    <td className="p-3 font-bold text-black">{c.name}</td>
                    <td className="p-3 text-[11px] text-[#5e5f5c]">
                      <div>{c.email}</div>
                      <div>{c.phone}</div>
                    </td>
                    <td className="p-3 text-[11px] text-[#5e5f5c]">
                      {c.city}, {c.country}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-black text-[#d7ef30] font-bold text-[9px] uppercase">
                        {c.tier}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-black">{c.totalOrders}</td>
                    <td className="p-3 font-bold text-black">{formatPrice(c.totalSpent)}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                          c.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right rtl:text-left">
                      <button
                        onClick={() => toggleCustomerStatus(c.id)}
                        className="px-2.5 py-1 border border-[#e5e2e1] hover:border-black text-[10px] font-bold uppercase transition-colors"
                      >
                        {c.status === 'active' ? 'Suspend' : 'Activate'}
                      </button>
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
