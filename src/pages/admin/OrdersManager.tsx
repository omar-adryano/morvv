import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Order } from '../../types';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  XCircle,
  Copy,
  Check,
  ShieldCheck,
  Smartphone,
  ExternalLink,
  X
} from 'lucide-react';

export const OrdersManager: React.FC = () => {
  const { orders, updateOrderStatus, cancelOrder, formatPrice, language, showToast } = useStore();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(search.toLowerCase()) ||
      o.shippingAddress.phone.includes(search) ||
      o.nfcCertHash.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    return true;
  });

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedHash(text);
    showToast(language === 'ar' ? 'تم نسخ الرمز' : 'Copied to Clipboard');
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'dispatched':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'vault_transit':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'authenticated':
      case 'processing':
        return 'bg-[#d7ef30] text-[#191e00] border-[#c0d828]';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            VAULT DISPATCH TRANSMISSIONS
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Order Fulfillment Center ({orders.length})
          </h2>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 bg-white border border-[#e5e2e1] text-black">
            Total Orders Value:{' '}
            <strong className="text-black">
              {formatPrice(orders.reduce((sum, o) => sum + o.total, 0))}
            </strong>
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
            placeholder="Search by order number, customer name, phone, or NFC hash..."
            className="w-full bg-[#f7f3f2] border border-[#e5e2e1] pl-9 pr-3 py-2 text-xs text-black focus:outline-none focus:border-black rtl:pl-3 rtl:pr-9"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {['all', 'authenticated', 'processing', 'dispatched', 'delivered'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 text-xs font-bold uppercase transition-colors ${
                statusFilter === st
                  ? 'bg-black text-white'
                  : 'bg-[#f7f3f2] text-black hover:bg-[#e5e2e1]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Datatable */}
      <div className="bg-white border border-[#e5e2e1] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left rtl:text-right font-mono text-xs">
            <thead className="bg-[#f7f3f2] border-b border-[#e5e2e1] text-[#747878] uppercase text-[10px]">
              <tr>
                <th className="p-3">Order Number</th>
                <th className="p-3">Date</th>
                <th className="p-3">Collector</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Fulfillment Status</th>
                <th className="p-3 text-right rtl:text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e2e1]">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#747878] font-mono">
                    No orders match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#fdf8f8] transition-colors">
                    <td className="p-3 font-bold text-black">{ord.orderNumber}</td>
                    <td className="p-3 text-[#5e5f5c] text-[11px]">{ord.date}</td>
                    <td className="p-3">
                      <div className="font-semibold text-black">{ord.shippingAddress.fullName}</div>
                      <div className="text-[10px] text-[#747878]">{ord.shippingAddress.phone}</div>
                    </td>
                    <td className="p-3 text-[#5e5f5c]">{ord.items.length} Specimen(s)</td>
                    <td className="p-3 font-bold text-black">{formatPrice(ord.total)}</td>
                    <td className="p-3 text-[11px] text-[#1c1b1b] max-w-[150px] truncate">
                      {ord.paymentMethod}
                    </td>
                    <td className="p-3">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as any)}
                        className={`text-[10px] font-bold uppercase px-2 py-1 border cursor-pointer ${getStatusBadge(
                          ord.status
                        )}`}
                      >
                        <option value="authenticated">Authenticated</option>
                        <option value="processing">Processing</option>
                        <option value="vault_transit">Vault Transit</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="p-3 text-right rtl:text-left">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="px-3 py-1.5 bg-black hover:bg-[#313030] text-white text-[10px] font-bold uppercase transition-colors"
                      >
                        Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ORDER DETAIL MODAL DRAWER */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white border border-[#e5e2e1] w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in-95">
            <div className="p-4 sm:p-6 border-b border-[#e5e2e1] flex items-center justify-between bg-[#fdf8f8]">
              <div>
                <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
                  ORDER FULL RECORD & NFC CERTIFICATE
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase text-black">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-[#e5e2e1] text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-5 font-mono text-xs flex-1">
              {/* Status Header */}
              <div className="p-3 bg-[#f7f3f2] border border-[#e5e2e1] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#747878] uppercase block">Current Fulfillment Stage:</span>
                  <span className="font-bold text-black uppercase">{selectedOrder.status}</span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as any);
                      setSelectedOrder({ ...selectedOrder, status: e.target.value as any });
                    }}
                    className="p-1.5 bg-white border border-black text-xs font-bold uppercase"
                  >
                    <option value="authenticated">Authenticated</option>
                    <option value="processing">Processing</option>
                    <option value="vault_transit">Vault Transit</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* NFC Blockchain Ledger Hash */}
              <div className="p-3 bg-black text-white space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-[#d7ef30] uppercase font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    IMMUTABLE CRYPTOGRAPHIC NFC HASH
                  </span>
                  <button
                    onClick={() => handleCopy(selectedOrder.nfcCertHash)}
                    className="text-[9px] text-white hover:text-[#d7ef30] underline flex items-center gap-1 cursor-pointer"
                  >
                    {copiedHash === selectedOrder.nfcCertHash ? <Check className="w-3 h-3 text-[#d7ef30]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash === selectedOrder.nfcCertHash ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-white truncate select-all">
                  {selectedOrder.nfcCertHash}
                </div>
              </div>

              {/* Ordered Items List */}
              <div className="space-y-2">
                <span className="text-[10px] text-[#747878] uppercase font-bold block">
                  Purchased Footwear Specimens ({selectedOrder.items.length})
                </span>
                <div className="border border-[#e5e2e1] divide-y divide-[#e5e2e1]">
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} className="p-3 flex items-center gap-3">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-14 h-14 object-contain bg-[#f7f3f2] p-1 border border-[#e5e2e1] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-black uppercase truncate">
                          {item.product.name}
                        </div>
                        <div className="text-[11px] text-[#5e5f5c]">
                          Brand: {item.product.brand} · SKU: {item.product.sku}
                        </div>
                        <div className="text-[11px] text-[#1c1b1b]">
                          Size: <strong>{item.selectedSize}</strong> · Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="font-bold text-black text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#fdf8f8] border border-[#e5e2e1] space-y-1">
                  <span className="text-[10px] text-[#747878] uppercase font-bold block">
                    Collector Information
                  </span>
                  <div className="font-bold text-black">{selectedOrder.shippingAddress.fullName}</div>
                  <div className="text-[#5e5f5c] flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    {selectedOrder.shippingAddress.phone}
                  </div>
                  <div className="text-[11px] text-[#5e5f5c]">Payment: {selectedOrder.paymentMethod}</div>
                </div>

                <div className="p-3 bg-[#fdf8f8] border border-[#e5e2e1] space-y-1">
                  <span className="text-[10px] text-[#747878] uppercase font-bold block">
                    Shipping Destination
                  </span>
                  <div className="font-semibold text-black">
                    {selectedOrder.shippingAddress.addressLine1}
                  </div>
                  <div className="text-[#5e5f5c]">
                    {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.country}
                  </div>
                  <div className="text-[11px] text-[#5e5f5c]">
                    Method: {selectedOrder.shippingMethod}
                  </div>
                </div>
              </div>

              {/* Financial Totals */}
              <div className="p-3 bg-[#f7f3f2] border border-[#e5e2e1] space-y-1.5">
                <div className="flex justify-between text-[#5e5f5c]">
                  <span>Subtotal:</span>
                  <span>{formatPrice(selectedOrder.subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#5e5f5c]">
                  <span>Insured Shipping:</span>
                  <span>{selectedOrder.shipping === 0 ? 'Complimentary ($0.00)' : formatPrice(selectedOrder.shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-black pt-1.5 border-t border-[#e5e2e1]">
                  <span>Total Amount Paid / Due:</span>
                  <span>{formatPrice(selectedOrder.total)}</span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#e5e2e1] flex items-center justify-between bg-[#fdf8f8]">
              <button
                onClick={() => {
                  if (confirm('Cancel this allocation order?')) {
                    cancelOrder(selectedOrder.id);
                    setSelectedOrder(null);
                  }
                }}
                className="px-3 py-2 text-red-600 hover:bg-red-50 text-xs uppercase font-bold transition-colors"
              >
                Cancel Allocation
              </button>
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2 bg-black text-white hover:bg-[#313030] text-xs uppercase font-bold transition-colors"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
