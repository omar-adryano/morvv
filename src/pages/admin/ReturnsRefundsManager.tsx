import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { INITIAL_RETURNS, INITIAL_REFUNDS } from '../../data/initialAdminData';
import { OrderReturn, OrderRefund } from '../../types/admin';
import {
  RotateCcw,
  DollarSign,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Truck,
  ExternalLink,
  CreditCard,
  FileText
} from 'lucide-react';

export const ReturnsRefundsManager: React.FC = () => {
  const { formatPrice, showToast, language, logActivity } = useStore();

  const [activeTab, setActiveTab] = useState<'returns' | 'refunds'>('returns');

  // Returns state
  const [returnsList, setReturnsList] = useState<OrderReturn[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_returns');
      return saved ? JSON.parse(saved) : INITIAL_RETURNS;
    } catch {
      return INITIAL_RETURNS;
    }
  });

  // Refunds state
  const [refundsList, setRefundsList] = useState<OrderRefund[]>(() => {
    try {
      const saved = localStorage.getItem('morv_admin_refunds');
      return saved ? JSON.parse(saved) : INITIAL_REFUNDS;
    } catch {
      return INITIAL_REFUNDS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');

  const saveReturns = (updated: OrderReturn[]) => {
    setReturnsList(updated);
    localStorage.setItem('morv_admin_returns', JSON.stringify(updated));
  };

  const saveRefunds = (updated: OrderRefund[]) => {
    setRefundsList(updated);
    localStorage.setItem('morv_admin_refunds', JSON.stringify(updated));
  };

  const handleUpdateReturnStatus = (id: string, status: OrderReturn['status']) => {
    const updated = returnsList.map((r) => (r.id === id ? { ...r, status } : r));
    saveReturns(updated);
    showToast(language === 'ar' ? `تم تحديث حالة الإرجاع إلى ${status} ✓` : `Return status updated to ${status} ✓`);
    logActivity('Return Status Updated', 'order', id, `Updated to ${status}`);
  };

  const handleProcessRefund = (id: string) => {
    const ref = `IPN-AUTO-${Math.floor(100000 + Math.random() * 900000)}`;
    const updated = refundsList.map((r) =>
      r.id === id ? { ...r, status: 'processed' as const, transactionRef: ref } : r
    );
    saveRefunds(updated);
    showToast(
      language === 'ar'
        ? `تمت تسوية واسترجاع المبلغ بنجاح (مرجع: ${ref}) ✓`
        : `Refund settled successfully (Ref: ${ref}) ✓`
    );
    logActivity('Refund Processed', 'payment', id, `Processed with ref ${ref}`);
  };

  const filteredReturns = returnsList.filter(
    (r) =>
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredRefunds = refundsList.filter(
    (r) =>
      r.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] bg-black text-[#d7ef30] px-2 py-0.5 uppercase font-bold tracking-widest">
              SALES DISPATCH // CLAIMS & REVERSALS
            </span>
            <span className="text-xs font-mono text-[#747878]">
              {returnsList.length} Returns / {refundsList.length} Refunds
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold uppercase tracking-tight text-black">
            Returns, Exchanges & Payment Refunds
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex border border-[#e5e2e1] bg-[#f1edec] p-0.5 font-mono text-xs">
          <button
            onClick={() => setActiveTab('returns')}
            className={`px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'returns' ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Returns & Exchanges ({returnsList.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('refunds')}
            className={`px-4 py-1.5 font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'refunds' ? 'bg-black text-white' : 'text-[#5e5f5c] hover:text-black'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Payment Refunds ({refundsList.length})</span>
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-[#e5e2e1] p-3 flex items-center gap-3">
        <Search className="w-4 h-4 text-[#747878]" />
        <input
          type="text"
          placeholder={
            activeTab === 'returns'
              ? 'Search returns by Order #, Collector name, or sneaker model...'
              : 'Search refunds by Order # or Collector name...'
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full font-mono text-xs bg-transparent focus:outline-none text-black"
        />
      </div>

      {/* Tab 1: Returns Content */}
      {activeTab === 'returns' && (
        <div className="space-y-3">
          {filteredReturns.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-[#e5e2e1] p-4 sm:p-5 space-y-3 hover:border-black transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1edec] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black">{item.orderId}</span>
                    <span className="text-[#c4c7c7]">/</span>
                    <span className="font-semibold text-sm text-black uppercase">
                      {item.productName}
                    </span>
                    <span className="font-mono text-xs bg-[#f1edec] px-1.5 py-0.5">{item.productSize}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#747878] mt-0.5">
                    Customer: <span className="text-black font-semibold">{item.customerName}</span> ({item.customerEmail}) · Requested: {item.requestedAt}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-black">
                    Value: {formatPrice(item.refundAmount)}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 font-bold uppercase ${
                      item.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.status === 'inspected'
                        ? 'bg-blue-100 text-blue-800'
                        : item.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>

              <div className="bg-[#fdf8f8] p-3 border-l-2 border-black text-xs font-mono space-y-1">
                <div className="text-[#5e5f5c]">
                  <strong className="text-black uppercase">Reason:</strong> {item.reason}
                </div>
                {item.notes && (
                  <div className="text-[#747878]">
                    <strong className="text-black uppercase">Audit Notes:</strong> {item.notes}
                  </div>
                )}
              </div>

              {/* Status Update Actions */}
              <div className="flex items-center justify-between pt-1 font-mono text-xs">
                <span className="text-[#747878] text-[11px]">Workflow Actions:</span>
                <div className="flex items-center gap-2">
                  {item.status !== 'inspected' && item.status !== 'completed' && (
                    <button
                      onClick={() => handleUpdateReturnStatus(item.id, 'inspected')}
                      className="px-2.5 py-1 bg-[#f1edec] hover:bg-black hover:text-white font-bold uppercase text-[11px] transition-colors"
                    >
                      Mark Inspected
                    </button>
                  )}
                  {item.status !== 'approved' && item.status !== 'completed' && (
                    <button
                      onClick={() => handleUpdateReturnStatus(item.id, 'approved')}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase text-[11px] transition-colors"
                    >
                      Approve Return
                    </button>
                  )}
                  {item.status !== 'completed' && (
                    <button
                      onClick={() => handleUpdateReturnStatus(item.id, 'completed')}
                      className="px-2.5 py-1 bg-black text-[#d7ef30] font-bold uppercase text-[11px] transition-colors"
                    >
                      Complete & Close
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Refunds Content */}
      {activeTab === 'refunds' && (
        <div className="space-y-3">
          {filteredRefunds.map((ref) => (
            <div
              key={ref.id}
              className="bg-white border border-[#e5e2e1] p-4 sm:p-5 space-y-3 hover:border-black transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#f1edec] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-black">{ref.orderId}</span>
                    <span className="text-[#c4c7c7]">/</span>
                    <span className="font-semibold text-black">{ref.customerName}</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#747878] mt-0.5">
                    Logged: {ref.createdAt} · Protocol:{' '}
                    <span className="font-bold text-black uppercase">{ref.paymentMethod.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-base text-black tabular-nums">
                    {formatPrice(ref.amount)}
                  </span>
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 font-bold uppercase ${
                      ref.status === 'processed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ref.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {ref.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono">
                <div className="text-[#5e5f5c]">
                  <strong className="text-black uppercase">Reason:</strong> {ref.reason}
                  {ref.transactionRef && (
                    <span className="ml-3 text-emerald-700 font-bold">
                      Settlement Ref: {ref.transactionRef}
                    </span>
                  )}
                </div>

                {ref.status === 'pending' && (
                  <button
                    onClick={() => handleProcessRefund(ref.id)}
                    className="px-4 py-1.5 bg-[#d7ef30] hover:bg-black text-black hover:text-white font-bold uppercase text-xs transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Process & Settle Refund</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
