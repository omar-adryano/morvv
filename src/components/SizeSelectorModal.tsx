import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface SizeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize?: (size: string) => void;
  selectedSize?: string;
}

export const SizeSelectorModal: React.FC<SizeSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectSize,
  selectedSize
}) => {
  const { language, navigateTo } = useStore();

  if (!isOpen) return null;

  const sizeConversions = [
    { usM: '7.0', usW: '8.5', uk: '6.0', eu: '40.0' },
    { usM: '8.0', usW: '9.5', uk: '7.0', eu: '41.0' },
    { usM: '8.5', usW: '10.0', uk: '7.5', eu: '42.0', highlight: true },
    { usM: '9.5', usW: '11.0', uk: '8.5', eu: '43.0' },
    { usM: '10.0', usW: '11.5', uk: '9.0', eu: '44.0' },
    { usM: '11.0', usW: '12.5', uk: '10.0', eu: '45.0' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200 font-sans">
      <div className="bg-[#ffffff] w-full max-w-xl p-6 sm:p-8 shadow-2xl relative space-y-4 border border-[#e5e2e1]">
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-[#e5e2e1]">
          <div>
            <span className="text-xs text-[#747878] uppercase tracking-wide block mb-1">
              {language === 'ar' ? 'دليل القياسات والتحويل' : 'Measurement Reference'}
            </span>
            <h2 className="font-display text-xl font-bold text-black">
              {language === 'ar' ? 'دليل مقاسات الأحذية الرياضية' : 'Footwear Fitting Protocol'}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Modal"
            className="p-1 hover:bg-[#f1edec] text-[#1c1b1b] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#5e5f5c] leading-relaxed">
          {language === 'ar'
            ? 'تعتمد التخصيصات الأرشيفية قوالب التصنيع الأصلية الدقيقة. نوصي باختيار مقاسك المعتاد في أحذية كرة السلة والركض.'
            : 'Archival specifications utilize verified production molds. Fits true to size with authentic proportions. Order your standard sneaker size.'}
        </p>

        {/* Matrix Grid */}
        <div className="space-y-1 text-xs">
          <div className="grid grid-cols-4 bg-[#f1edec] p-2.5 text-[#5e5f5c] font-semibold text-xs">
            <span>{language === 'ar' ? 'مقاس الاتحاد الأوروبي EU' : 'EU Size'}</span>
            <span>{language === 'ar' ? 'المقاس الأمريكي رجالي' : 'US Men'}</span>
            <span>{language === 'ar' ? 'المقاس الأمريكي نسائي' : 'US Women'}</span>
            <span>{language === 'ar' ? 'المقاس البريطاني UK' : 'UK Size'}</span>
          </div>

          {sizeConversions.map((row) => (
            <div
              key={row.usM}
              onClick={() => {
                onSelectSize?.(row.eu.replace('.0', ''));
                onClose();
              }}
              className={`grid grid-cols-4 p-2.5 text-xs tabular-nums cursor-pointer transition-colors ${
                selectedSize && (selectedSize === row.eu || selectedSize === row.eu.replace('.0', ''))
                  ? 'bg-black text-white font-bold'
                  : 'bg-[#f7f3f2] text-black hover:bg-[#ebe7e6]'
              }`}
            >
              <span className="font-bold">EU {row.eu}</span>
              <span>US {row.usM}</span>
              <span>US {row.usW}</span>
              <span>UK {row.uk}</span>
            </div>
          ))}
        </div>

        {/* Help Banner */}
        <div className="bg-[#f1edec] p-3 flex items-center justify-between text-xs">
          <span className="text-[#5e5f5c]">
            {language === 'ar' ? 'هل تحتاج إلى استشارة خاصة في المقاس؟' : 'Need expert measurement support?'}
          </span>
          <button
            onClick={() => {
              onClose();
              navigateTo('account');
            }}
            className="font-semibold text-black hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تواصل مع الكونسيرج' : 'Concierge Desk'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
