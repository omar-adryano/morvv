import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, formatPrice, addToCart, isInWishlist, toggleWishlist, navigateTo, language } = useStore();
  const [selectedQuickSize] = useState<string>(product.sizes[0]?.size || '42');
  const isWishlisted = isInWishlist(product.id);

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'VAULT VERIFIED':
      case 'DEADSTOCK':
      case 'HERITAGE VAULT':
      case 'ARCHIVAL SPECIMEN':
        return 'bg-[#000000] text-[#ffffff] font-medium';
      case 'STAFF PICK':
      case 'COLLABORATION':
        return 'bg-[#d7ef30] text-[#191e00] font-semibold';
      case 'LOW STOCK':
      case 'LOW STOCK (3)':
        return 'bg-[#ba1a1a] text-[#ffffff] font-medium';
      default:
        return 'bg-[#ffffff] text-[#000000] border border-[#e5e2e1] font-medium';
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    addToCart(product, size, 1);
  };

  const displayName = language === 'ar' && product.nameAr ? product.nameAr : product.name;

  return (
    <article
      onClick={() => navigateTo('product', product)}
      className="group bg-[#ffffff] border border-[#e5e2e1] hover:border-black flex flex-col justify-between transition-all duration-200 cursor-pointer relative overflow-hidden"
    >
      {/* Top Image Stage */}
      <div className="relative bg-[#f7f3f2] aspect-square overflow-hidden flex items-center justify-center p-2 sm:p-4">
        {/* Status Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2 z-10 max-w-[70%]">
            <span className={`text-[10px] font-sans px-2 py-0.5 uppercase tracking-wide block truncate ${getBadgeStyle(product.badge)}`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Toggle Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white/90 hover:bg-white text-black transition-colors rounded-none shadow-xs"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-[#ba1a1a] text-[#ba1a1a]' : 'text-[#5e5f5c]'}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Desktop Quick Size Overlay on Hover */}
        <div className="absolute inset-x-0 bottom-0 bg-[#000000]/95 text-[#ffffff] p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-[11px] font-sans text-[#c9c6c5]">
            <span>{t('quickAllocation')}</span>
            <span className="text-[#d7ef30] font-semibold">100% SPEC</span>
          </div>
          <div className="grid grid-cols-4 gap-1 text-center font-sans text-xs">
            {product.sizes.slice(0, 4).map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={(e) => handleQuickAdd(e, s.size)}
                disabled={!s.inStock}
                className={`py-1 transition-colors ${
                  s.inStock
                    ? 'bg-white/20 hover:bg-[#d7ef30] hover:text-[#191e00] text-white font-medium cursor-pointer'
                    : 'bg-white/5 text-white/30 cursor-not-allowed line-through'
                }`}
              >
                {s.size.replace('EU ', '').replace('US ', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metadata Bottom Container */}
      <div className="p-3 sm:p-4 flex flex-col flex-1 justify-between gap-2 bg-[#fdf8f8]">
        <div>
          <div className="flex items-center justify-between text-[11px] font-sans text-[#747878] uppercase mb-1">
            <span className="truncate max-w-[70%] font-medium tracking-wide">
              <bdi>{product.brand}</bdi>
            </span>
            <span className="hidden xs:inline font-mono text-[10px] text-[#747878]">
              {product.sku}
            </span>
          </div>

          <h3 className="text-sm sm:text-base font-semibold text-black leading-snug line-clamp-1">
            <bdi>{displayName}</bdi>
          </h3>

          <p className="text-xs text-[#5e5f5c] truncate mt-1">
            {product.colorway}
          </p>
        </div>

        <div>
          <div className="flex items-baseline justify-between pt-2 border-t border-[#e5e2e1]">
            <span className="text-sm sm:text-base font-bold text-black tabular-nums">
              {formatPrice(product.price)}
            </span>
            <span className="text-xs text-[#747878] hidden xs:inline font-sans">
              EU {product.sizes[0]?.size.replace('EU ', '')} – {product.sizes[product.sizes.length - 1]?.size.replace('EU ', '')}
            </span>
          </div>

          {/* Clean Mobile Fast Add Strip */}
          <div className="md:hidden mt-2 pt-2 border-t border-[#f1edec] flex items-center justify-between">
            <span className="text-[11px] text-[#747878] font-sans">
              {product.sizes.filter(s => s.inStock).length} مقاسات
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const defaultSize = product.sizes.find(s => s.inStock)?.size || product.sizes[0]?.size || '42';
                addToCart(product, defaultSize, 1);
              }}
              className="px-2.5 py-1 bg-black text-white text-xs font-medium active:bg-[#d7ef30] active:text-black transition-colors"
            >
              + إضافة
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
