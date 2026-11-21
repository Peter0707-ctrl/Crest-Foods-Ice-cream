import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Leaf, Plus, SlidersHorizontal } from 'lucide-react';
import { type ProductItem } from '../data/catalog';
import { useCart } from '../context/useCart';

interface ProductCardProps {
  product: ProductItem;
  index?: number;
}

const FLAVOR_ACCENTS: Record<
  string,
  { tint: string; pillBg: string; pillText: string; barColor: string }
> = {
  'ic-crest-swirl': {
    tint: 'from-[#FFF6E8] to-[#FAF7F2]',
    pillBg: 'bg-[#FEF3C7]',
    pillText: 'text-[#B45309]',
    barColor: 'bg-[#F48C1C]',
  },
  'ic-vanilla-bean': {
    tint: 'from-[#FBF7EE] to-[#FAF7F2]',
    pillBg: 'bg-[#F5EFE0]',
    pillText: 'text-[#855B1E]',
    barColor: 'bg-[#D98A2B]',
  },
  'ic-dark-cocoa': {
    tint: 'from-[#F5EDE8] to-[#FAF7F2]',
    pillBg: 'bg-[#EFE2DA]',
    pillText: 'text-[#4A2511]',
    barColor: 'bg-[#4A2511]',
  },
  'ic-mango-passion': {
    tint: 'from-[#FFF5E0] to-[#FAF7F2]',
    pillBg: 'bg-[#FDE68A]',
    pillText: 'text-[#92400E]',
    barColor: 'bg-[#F59E0B]',
  },
  'ic-salted-caramel': {
    tint: 'from-[#FDF1E4] to-[#FAF7F2]',
    pillBg: 'bg-[#FDE4C8]',
    pillText: 'text-[#9A3412]',
    barColor: 'bg-[#C86E12]',
  },
  'ic-berry-cream': {
    tint: 'from-[#FDF0F3] to-[#FAF7F2]',
    pillBg: 'bg-[#FCE7F3]',
    pillText: 'text-[#9D174D]',
    barColor: 'bg-[#BE185D]',
  },
  'pc-cookies-cream': {
    tint: 'from-[#EEF2F8] to-[#FAF7F2]',
    pillBg: 'bg-[#E2E8F0]',
    pillText: 'text-[#0F172A]',
    barColor: 'bg-[#072B75]',
  },
  'pc-strawberry-shortcake': {
    tint: 'from-[#FDF0F4] to-[#FAF7F2]',
    pillBg: 'bg-[#FCE7F3]',
    pillText: 'text-[#9D174D]',
    barColor: 'bg-[#D41414]',
  },
  'pc-birthday-cake': {
    tint: 'from-[#FFF7E8] to-[#FAF7F2]',
    pillBg: 'bg-[#FEF3C7]',
    pillText: 'text-[#B45309]',
    barColor: 'bg-[#F48C1C]',
  },
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { openProductModal, addToCart } = useCart();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant = product.variants[selectedIdx] ?? product.variants[0];
  const accent = FLAVOR_ACCENTS[product.id] ?? {
    tint: 'from-[#F7F2E9] to-[#FAF7F2]',
    pillBg: 'bg-[#F2EBE0]',
    pillText: 'text-[#072B75]',
    barColor: 'bg-[#072B75]',
  };

  const handleQuickAdd = () => {
    addToCart(product, activeVariant, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.25) }}
      className={`group relative rounded-[28px] overflow-hidden bg-gradient-to-b ${accent.tint} border border-[#E5DDD0] shadow-[0_10px_35px_rgba(5,27,71,0.05)] hover:shadow-[0_22px_50px_rgba(5,27,71,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col`}
    >
      {/* Top Flavor Bar Accent (Mövenpick style) */}
      <div className={`h-1.5 w-full ${accent.barColor}`} />

      {/* Image Frame with arched bottom curve feel */}
      <div className="p-3.5 pb-0">
        <div
          onClick={() => openProductModal(product)}
          className="relative aspect-[4/3] rounded-[22px] overflow-hidden bg-[#EDE5D8] cursor-pointer shadow-inner"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 opacity-75 group-hover:opacity-55 transition-opacity" />

          {/* Top Floating Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#051B47] text-[10px] font-semibold uppercase tracking-[0.18em] shadow-xs">
              <Leaf className="w-2.5 h-2.5 text-emerald-600" />
              {product.tag === 'Dairy-Free' ? '100% Fruit Sorbet' : '100% Natural'}
            </span>
            {product.tag && (
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em] shadow-xs ${accent.pillBg} ${accent.pillText}`}
              >
                {product.tag}
              </span>
            )}
          </div>

          {/* Bottom Tasting Inclusions Strip */}
          <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5">
            {product.tastingNotes.map((note) => (
              <span
                key={note}
                className="px-2.5 py-0.5 rounded-full bg-black/55 backdrop-blur-md text-white text-[10px] tracking-wide font-medium border border-white/15"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gastronomy Card Body */}
      <div className="p-6 pt-5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.24em] text-[#9A5B13] font-semibold">
            {product.subtitle}
          </p>

          <h3
            onClick={() => openProductModal(product)}
            className="font-serif text-[1.7rem] leading-tight text-[#051B47] group-hover:text-[#D41414] transition-colors cursor-pointer mt-1"
          >
            {product.name}
          </h3>

          <p className="mt-2 text-[13.5px] text-[#556275] font-light leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Interactive Size / Format Quick-Selector Pills (Mövenpick & Berry's pack switcher) */}
          <div className="mt-4 pt-3.5 border-t border-[#E8E0D2]">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#6B7688] font-semibold mb-2">
              <span>Select Pack / Size</span>
              <span className="text-[#072B75]">{activeVariant.detail}</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {product.variants.map((v, vIdx) => {
                const isSelected = vIdx === selectedIdx;
                const shortLabel = v.label.split('(')[0].trim();
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedIdx(vIdx)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium transition-all cursor-pointer truncate border text-left flex items-center justify-between gap-1 ${
                      isSelected
                        ? 'bg-[#051B47] text-white border-[#051B47] shadow-xs'
                        : 'bg-white/80 text-[#3B475C] border-[#E4DDD0] hover:border-[#051B47]'
                    }`}
                  >
                    <span className="truncate">{shortLabel}</span>
                    {isSelected && <Check className="w-3 h-3 text-[#F6B254] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Order & Customize Actions (No price display) */}
        <div className="mt-5 pt-4 border-t border-[#E8E0D2] flex items-center justify-between gap-3">
          <span className="text-xs font-semibold text-[#051B47]">
            {activeVariant.label.split('(')[0].trim()}
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => openProductModal(product)}
              title="Customize options"
              className="p-2.5 rounded-full bg-white border border-[#DED5C6] text-[#051B47] hover:border-[#072B75] transition-colors cursor-pointer"
              aria-label="Customize size and quantity"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.16em] transition-all cursor-pointer shadow-sm ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#EA337A] hover:bg-[#051B47] text-white'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  Order Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};
