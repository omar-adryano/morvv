import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminUser, AdminRole } from '../../types/admin';
import { Plus, Shield, UserCheck, Trash2, Edit3, Activity, HardDrive, CheckCircle2, Lock, Cpu, Server, X } from 'lucide-react';

interface AdminUsersSystemProps {
  initialTab?: 'users' | 'activity' | 'health';
}

export const AdminUsersSystem: React.FC<AdminUsersSystemProps> = ({ initialTab = 'users' }) => {
  const {
    adminUsers,
    createAdminUser,
    updateAdminUser,
    deleteAdminUser,
    currentAdmin,
    activityLogs,
    products,
    orders
  } = useStore();

  const [activeTab, setActiveTab] = useState<'users' | 'activity' | 'health'>(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'store_manager' as AdminRole,
    roleTitle: 'Store Operations Manager',
    status: 'active' as const,
    permissions: ['catalog', 'orders']
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    createAdminUser(formData);
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      role: 'store_manager',
      roleTitle: 'Store Operations Manager',
      status: 'active',
      permissions: ['catalog', 'orders']
    });
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] text-[#747878] uppercase tracking-widest block">
            VAULT ACCESS GOVERNANCE & TELEMETRY
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Admin Access & System Health
          </h2>
        </div>

        {activeTab === 'users' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-black hover:bg-[#313030] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#d7ef30]" />
            <span>Grant Admin Access</span>
          </button>
        )}
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-[#e5e2e1]">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-5 py-2.5 font-bold uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'users'
              ? 'border-black text-black'
              : 'border-transparent text-[#747878] hover:text-black'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Admin Users ({adminUsers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('activity')}
          className={`px-5 py-2.5 font-bold uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'activity'
              ? 'border-black text-black'
              : 'border-transparent text-[#747878] hover:text-black'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Immutable Audit Log ({activityLogs.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('health')}
          className={`px-5 py-2.5 font-bold uppercase border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'health'
              ? 'border-black text-black'
              : 'border-transparent text-[#747878] hover:text-black'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>System Diagnostics</span>
        </button>
      </div>

      {/* USERS TAB */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#e5e2e1] overflow-hidden">
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3">Administrator</th>
                <th className="p-3">Role</th>
                <th className="p-3">Designation</th>
                <th className="p-3">Status</th>
                <th className="p-3">Last Active</th>
                <th className="p-3 text-right rtl:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1]">
              {adminUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[#fdf8f8] transition-colors">
                  <td className="p-3">
                    <div className="font-bold text-black uppercase">{u.name}</div>
                    <div className="text-[11px] text-[#5e5f5c]">{u.email}</div>
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 text-[9px] font-bold uppercase ${
                        u.role === 'super_admin'
                          ? 'bg-black text-[#d7ef30]'
                          : 'bg-[#f1edec] text-black'
                      }`}
                    >
                      {u.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-[#5e5f5c]">{u.roleTitle}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                      {u.status}
                    </span>
                  </td>
                  <td className="p-3 text-[#747878] text-[11px]">{u.lastActive}</td>
                  <td className="p-3 text-right rtl:text-left">
                    {u.id !== currentAdmin?.id ? (
                      <button
                        onClick={() => {
                          if (confirm(`Revoke admin privileges for ${u.name}?`)) deleteAdminUser(u.id);
                        }}
                        className="p-1 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    ) : (
                      <span className="text-[10px] text-[#747878] italic">Current Session</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ACTIVITY LOG TAB */}
      {activeTab === 'activity' && (
        <div className="bg-white border border-[#e5e2e1] overflow-hidden">
          <table className="w-full text-left rtl:text-right">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Category</th>
                <th className="p-3">Action</th>
                <th className="p-3">Target / Specimen</th>
                <th className="p-3">Network IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1]">
              {activityLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#fdf8f8] transition-colors">
                  <td className="p-3 text-[#747878] whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 font-bold text-black">{log.adminName}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 bg-[#f1edec] text-black font-bold uppercase text-[9px]">
                      {log.category}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-black">{log.action}</td>
                  <td className="p-3 text-[#5e5f5c] max-w-[250px] truncate" title={log.target}>
                    {log.target}
                  </td>
                  <td className="p-3 text-[10px] text-[#747878]">{log.ip || '197.38.12.84'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* SYSTEM HEALTH TAB */}
      {activeTab === 'health' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-white border border-[#e5e2e1] space-y-2">
              <div className="flex items-center justify-between text-[#747878]">
                <span className="uppercase text-[10px]">Application Core</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-display text-xl font-bold text-black">Operational</div>
              <div className="text-[11px] text-[#5e5f5c]">Vite 8.3 + React 19 Engine</div>
            </div>

            <div className="p-5 bg-white border border-[#e5e2e1] space-y-2">
              <div className="flex items-center justify-between text-[#747878]">
                <span className="uppercase text-[10px]">Database & State</span>
                <HardDrive className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="font-display text-xl font-bold text-black">Live Synchronized</div>
              <div className="text-[11px] text-[#5e5f5c]">
                {products.length} Products · {orders.length} Orders Active
              </div>
            </div>

            <div className="p-5 bg-white border border-[#e5e2e1] space-y-2">
              <div className="flex items-center justify-between text-[#747878]">
                <span className="uppercase text-[10px]">Payment Protocol</span>
                <Lock className="w-4 h-4 text-black" />
              </div>
              <div className="font-display text-xl font-bold text-black">Zero-Card Escrow</div>
              <div className="text-[11px] text-[#5e5f5c]">Vodafone Cash, InstaPay, COD Only</div>
            </div>
          </div>

          <div className="p-5 bg-white border border-[#e5e2e1] space-y-3">
            <h3 className="font-display text-base font-bold uppercase text-black border-b border-[#e5e2e1] pb-2">
              Security Compliance & Zero-Secret Guarantee
            </h3>
            <p className="text-xs text-[#5e5f5c] leading-relaxed">
              In accordance with commercial application security standards, no database passwords, private API secrets, or sensitive credentials are ever printed or transmitted to the client interface. All operations are isolated and audit-logged in real-time.
            </p>
          </div>
        </div>
      )}

      {/* CREATE ADMIN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-md p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#e5e2e1] pb-2">
              <h3 className="font-display text-lg font-bold uppercase text-black">
                Provision New Admin User
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-[#e5e2e1]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Youssef Nabil"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Corporate Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="youssef@morv.store"
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
                  Role Assignment
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => {
                    const r = e.target.value as AdminRole;
                    setFormData({
                      ...formData,
                      role: r,
                      roleTitle:
                        r === 'super_admin'
                          ? 'Super Administrator'
                          : r === 'store_manager'
                          ? 'Store Operations Manager'
                          : r === 'content_editor'
                          ? 'Editorial & Brand Lead'
                          : 'Order Fulfillment Specialist'
                    });
                  }}
                  className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2 text-xs text-black"
                >
                  <option value="super_admin">Super Admin (Full Access)</option>
                  <option value="store_manager">Store Operations Manager</option>
                  <option value="content_editor">Content & Media Editor</option>
                  <option value="order_specialist">Order Specialist</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#e5e2e1]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-[#f1edec] uppercase font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-black text-white uppercase font-bold"
                >
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
