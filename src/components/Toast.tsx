import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useStore();

  if (!toast.visible) return null;

  return (
    <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom duration-200">
      <div className="bg-[#000000] text-[#ffffff] px-4 py-2.5 shadow-2xl flex items-center gap-2 border border-[#444748] font-mono text-xs">
        <CheckCircle2 className="w-4 h-4 text-[#d7ef30] shrink-0" />
        <span className="tracking-wide font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
