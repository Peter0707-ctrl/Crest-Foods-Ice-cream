import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  Copy,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { BRAND_CONFIG } from '../data/catalog';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQty,
    removeItem,
    clearCart,
    buildWhatsAppUrl,
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fulfillment, setFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopySummary = async () => {
    const summary = [
      `${BRAND_CONFIG.name} Order`,
      ...items.map((i) => `- ${i.product.name} (${i.variant.label}) x${i.quantity}`),
      `Mode: ${fulfillment === 'delivery' ? 'Chilled Delivery' : 'Parlour Pickup'}`,
      name ? `Name: ${name}` : '',
      phone ? `Phone: ${phone}` : '',
      location ? `Location: ${location}` : '',
      notes ? `Notes: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[75] flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="absolute inset-0 bg-[#03112E]/65 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col border-l border-[#E6DDD0]"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#051B47] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#F6B254]" />
                <div>
                  <h2 className="font-serif text-2xl leading-none">Your Crest Basket</h2>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/65 mt-1">
                    Freshly packed to order
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                className="p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close basket"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#F2EBE0] flex items-center justify-center text-[#072B75] mb-4">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#051B47]">Your basket is empty</h3>
                  <p className="text-sm text-[#5A657A] font-light mt-2 max-w-xs">
                    Explore our Artisan Ice Cream swirls and Gourmet Kettle Popcorn to compose your
                    order.
                  </p>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    className="mt-6 px-6 py-2.5 rounded-full bg-[#072B75] text-white text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#D41414] transition-colors cursor-pointer"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <>
                  {/* Items list */}
                  <div className="space-y-3.5">
                    {items.map((item) => (
                      <div
                        key={item.key}
                        className="flex gap-3.5 bg-white p-3.5 rounded-2xl border border-[#E8DFD1]"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-18 h-18 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-serif text-lg text-[#051B47] leading-tight">
                                {item.product.name}
                              </h4>
                              <p className="text-xs text-[#C86E12] font-medium mt-0.5">
                                {item.variant.label}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.key)}
                              className="text-[#9AA4B4] hover:text-[#D41414] transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="inline-flex items-center rounded-full border border-[#E2D8C8] bg-[#FAF7F2]">
                              <button
                                type="button"
                                onClick={() => updateQty(item.key, -1)}
                                className="w-7 h-7 flex items-center justify-center text-[#051B47] hover:text-[#D41414] cursor-pointer"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-7 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQty(item.key, 1)}
                                className="w-7 h-7 flex items-center justify-center text-[#051B47] hover:text-[#D41414] cursor-pointer"
                                aria-label="Increase"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Fulfillment & Customer Details */}
                  <div className="bg-white rounded-2xl p-4 border border-[#E8DFD1] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#051B47]">
                        Fulfillment Details
                      </span>
                      <button
                        type="button"
                        onClick={clearCart}
                        className="text-[11px] text-[#8B95A6] hover:text-[#D41414] underline cursor-pointer"
                      >
                        Clear basket
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#F2EBE0]">
                      {(['delivery', 'pickup'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setFulfillment(mode)}
                          className={`py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            fulfillment === mode
                              ? 'bg-[#072B75] text-white shadow-xs'
                              : 'text-[#5A657A] hover:text-[#051B47]'
                          }`}
                        >
                          {mode === 'delivery' ? 'Chilled Delivery' : 'Parlour Pickup'}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        maxLength={80}
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DACB] text-xs text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                      <input
                        type="tel"
                        maxLength={24}
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone number"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DACB] text-xs text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    </div>

                    {fulfillment === 'delivery' && (
                      <input
                        type="text"
                        maxLength={140}
                        autoComplete="street-address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Delivery area / street landmark"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#E4DACB] text-xs text-[#051B47] focus:outline-none focus:border-[#072B75]"
                      />
                    )}

                    <textarea
                      rows={2}
                      maxLength={220}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Special notes (extra cones, gift ribbon, preferred time)..."
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-[#E4DACB] text-xs text-[#051B47] focus:outline-none focus:border-[#072B75] resize-none"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Footer Checkout Actions */}
            {items.length > 0 && (
              <div className="p-6 bg-white border-t border-[#E6DDD0] space-y-3.5">
                <a
                  href={buildWhatsAppUrl({ name, phone, fulfillment, location, notes })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#EA337A] hover:bg-[#072B75] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-colors shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  Confirm Order via WhatsApp
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#DDD2C0] text-[#051B47] hover:bg-[#FAF7F2] text-xs font-medium transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      Order summary copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy order summary
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
