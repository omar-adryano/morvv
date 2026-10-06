import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, Plus, Trash2, Save, ShieldCheck, MapPin } from 'lucide-react';
import { ShippingZone } from '../../types/admin';

export const ShippingManager: React.FC = () => {
  const { shippingSettings, updateShippingSettings, formatPrice } = useStore();

  const [formData, setFormData] = useState({ ...shippingSettings });
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneNameAr, setNewZoneNameAr] = useState('');
  const [newZoneFee, setNewZoneFee] = useState(0);
  const [newZoneDays, setNewZoneDays] = useState('24-48 Hours');

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingSettings(formData);
  };

  const handleToggleZone = (zoneId: string) => {
    const updatedZones = formData.zones.map((z) =>
      z.id === zoneId ? { ...z, enabled: !z.enabled } : z
    );
    const updated = { ...formData, zones: updatedZones };
    setFormData(updated);
    updateShippingSettings(updated);
  };

  const handleAddZone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newZoneName.trim()) return;
    const newZone: ShippingZone = {
      id: 'zone-' + Date.now(),
      name: newZoneName.trim(),
      nameAr: newZoneNameAr.trim() || newZoneName.trim(),
      fee: newZoneFee,
      estimatedDays: newZoneDays,
      enabled: true,
      governorates: []
    };
    const updated = { ...formData, zones: [...formData.zones, newZone] };
    setFormData(updated);
    updateShippingSettings(updated);
    setNewZoneName('');
    setNewZoneNameAr('');
    setNewZoneFee(0);
  };

  const handleDeleteZone = (zoneId: string) => {
    const updated = { ...formData, zones: formData.zones.filter((z) => z.id !== zoneId) };
    setFormData(updated);
    updateShippingSettings(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e2e1] pb-4">
        <div>
          <span className="text-[10px] font-mono text-[#747878] uppercase tracking-widest block">
            SECURE LOGISTICS & REGIONAL FULFILLMENT
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-black">
            Shipping & Dispatch Protocols
          </h2>
        </div>

        <div className="text-xs font-mono bg-white border border-[#e5e2e1] px-3 py-1.5 text-black">
          Free Shipping At:{' '}
          <strong className="text-black tabular-nums">
            {formatPrice(formData.freeShippingThreshold)}
          </strong>
        </div>
      </div>

      {/* Global Rules Form */}
      <form onSubmit={handleSaveGeneral} className="bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-5 font-mono text-xs">
        <h3 className="font-display text-base font-bold uppercase text-black border-b border-[#e5e2e1] pb-2">
          Global Pricing & Delivery Estimates
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
              Free Shipping Threshold (ج.م EGP)
            </label>
            <input
              type="number"
              value={formData.freeShippingThreshold}
              onChange={(e) =>
                setFormData({ ...formData, freeShippingThreshold: parseFloat(e.target.value) || 0 })
              }
              className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono font-bold focus:outline-none focus:border-black"
            />
            <span className="text-[10px] text-[#747878] mt-1 block">
              Cart subtotal required for complimentary free delivery.
            </span>
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
              Standard Base Shipping Fee (ج.م EGP)
            </label>
            <input
              type="number"
              value={formData.defaultFee}
              onChange={(e) =>
                setFormData({ ...formData, defaultFee: parseFloat(e.target.value) || 0 })
              }
              className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
              Armored Priority Air Fee (ج.م EGP)
            </label>
            <input
              type="number"
              value={formData.expressFee}
              onChange={(e) =>
                setFormData({ ...formData, expressFee: parseFloat(e.target.value) || 0 })
              }
              className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black font-mono focus:outline-none focus:border-black"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] uppercase font-bold text-[#747878] block mb-1">
            Dispatch Instructions Shown to Shoppers (Arabic)
          </label>
          <textarea
            rows={2}
            value={formData.instructionsAr}
            onChange={(e) => setFormData({ ...formData, instructionsAr: e.target.value })}
            className="w-full bg-[#f7f3f2] border border-[#e5e2e1] p-2.5 text-xs text-black focus:outline-none focus:border-black text-right"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-5 py-2 bg-black hover:bg-[#313030] text-white font-bold uppercase transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Save className="w-4 h-4 text-[#d7ef30]" />
            <span>Save Shipping Thresholds</span>
          </button>
        </div>
      </form>

      {/* Regional Zones Manager */}
      <div className="bg-white border border-[#e5e2e1] p-5 sm:p-6 space-y-4 font-mono text-xs">
        <h3 className="font-display text-base font-bold uppercase text-black border-b border-[#e5e2e1] pb-2">
          Regional Delivery Zones & Governorates ({formData.zones.length})
        </h3>

        <div className="divide-y divide-[#e5e2e1]">
          {formData.zones.map((zone) => (
            <div key={zone.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-black" />
                  <span className="font-bold text-black text-sm">{zone.name}</span>
                  <span className="text-xs text-[#747878]">({zone.nameAr})</span>
                </div>
                <div className="text-[11px] text-[#5e5f5c]">
                  Estimate: {zone.estimatedDays} · Surcharge: {zone.fee === 0 ? 'Free' : formatPrice(zone.fee)}
                </div>
                {zone.governorates.length > 0 && (
                  <div className="text-[10px] text-[#747878]">
                    Areas: {zone.governorates.join(', ')}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => handleToggleZone(zone.id)}
                  className={`px-3 py-1 font-bold text-[10px] uppercase border transition-colors ${
                    zone.enabled
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-red-50 border-red-300 text-red-800'
                  }`}
                >
                  {zone.enabled ? 'ACTIVE' : 'DISABLED'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteZone(zone.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Zone Form */}
        <form onSubmit={handleAddZone} className="p-4 bg-[#fdf8f8] border border-[#e5e2e1] space-y-3 mt-4">
          <span className="text-[10px] font-bold uppercase text-black tracking-wider block">
            Add New Delivery Zone
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <input
              type="text"
              required
              value={newZoneName}
              onChange={(e) => setNewZoneName(e.target.value)}
              placeholder="Zone Name (EN)"
              className="bg-white border border-[#e5e2e1] p-2 text-xs text-black"
            />
            <input
              type="text"
              value={newZoneNameAr}
              onChange={(e) => setNewZoneNameAr(e.target.value)}
              placeholder="المنطقة (بالعربية)"
              className="bg-white border border-[#e5e2e1] p-2 text-xs text-black text-right"
            />
            <input
              type="number"
              value={newZoneFee}
              onChange={(e) => setNewZoneFee(parseFloat(e.target.value) || 0)}
              placeholder="Fee ($)"
              className="bg-white border border-[#e5e2e1] p-2 text-xs text-black"
            />
            <input
              type="text"
              value={newZoneDays}
              onChange={(e) => setNewZoneDays(e.target.value)}
              placeholder="Time e.g. 24-48 Hours"
              className="bg-white border border-[#e5e2e1] p-2 text-xs text-black"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white hover:bg-[#313030] text-xs font-bold uppercase transition-colors"
          >
            Add Regional Zone
          </button>
        </form>
      </div>
    </div>
  );
};
