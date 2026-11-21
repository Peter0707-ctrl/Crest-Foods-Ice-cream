import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useCart } from '../context/useCart';
import { type ProductItem } from '../data/catalog';

const ProductModalContent: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { closeProductModal, addToCart } = useCart();
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProductModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeProductModal]);

  const variant = product.variants[selectedVariantIdx] ?? product.variants[0];

  const handleAdd = () => {
    addToCart(product, variant, qty);
    closeProductModal();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeProductModal}
        className="absolute inset-0 bg-[#03112E]/70 backdrop-blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#E6DDD0] grid grid-cols-1 md:grid-cols-12 max-h-[90vh]"
      >
        <button
          type="button"
          onClick={closeProductModal}
          aria-label="Close product dialog"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 text-[#051B47] hover:bg-[#D41414] hover:text-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Photo */}
        <div className="md:col-span-5 relative min-h-[220px] md:min-h-full bg-[#051B47]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#051B47]/70 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
            {product.tastingNotes.map((note) => (
              <span
                key={note}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-[#051B47] text-[10px] font-semibold uppercase tracking-wider"
              >
                <Sparkles className="w-2.5 h-2.5 text-[#F48C1C]" />
                {note}
              </span>
            ))}
          </div>
        </div>

        {/* Right Configuration */}
        <div className="md:col-span-7 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C86E12]">
                {product.category === 'ice-cream' ? 'Artisan Ice Cream' : 'Gourmet Popcorn'}
              </p>
              {product.category === 'ice-cream' && (
                <img
                  src="/images/crest-ice-cream-logo.png"
                  alt="Crest Ice Cream"
                  className="h-7 w-auto object-contain mr-8"
                />
              )}
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#051B47] mt-1 leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-[#5A657A] font-light mt-2.5 leading-relaxed">
              {product.description}
            </p>

            {/* Format / Size Picker */}
            <div className="mt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#051B47] mb-3">
                Select Serving Format
              </p>
              <div className="space-y-2">
                {product.variants.map((v, idx) => {
                  const active = idx === selectedVariantIdx;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        active
                          ? 'border-[#072B75] bg-white shadow-sm ring-1 ring-[#072B75]/15'
                          : 'border-[#E6DDD0] bg-white/60 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors ${
                            active
                              ? 'bg-[#072B75] border-[#072B75] text-white'
                              : 'border-[#C8BDA9]'
                          }`}
                        >
                          {active && <Check className="w-3 h-3" />}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-[#051B47]">{v.label}</p>
                          <p className="text-xs text-[#5A657A]">{v.detail}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quantity & Add CTA */}
          <div className="mt-7 pt-5 border-t border-[#E6DDD0] flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center rounded-full border border-[#D8CEBC] bg-white p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#051B47] hover:bg-[#F2EBE0] cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-9 text-center text-sm font-semibold text-[#051B47]">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#051B47] hover:bg-[#F2EBE0] cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#EA337A] hover:bg-[#051B47] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-md cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Order
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ProductModal: React.FC = () => {
  const { activeProduct } = useCart();

  return (
    <AnimatePresence>
      {activeProduct && <ProductModalContent key={activeProduct.id} product={activeProduct} />}
    </AnimatePresence>
  );
};
