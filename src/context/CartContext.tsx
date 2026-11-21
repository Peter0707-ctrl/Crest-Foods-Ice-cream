import React, { useMemo, useState } from 'react';
import {
  BRAND_CONFIG,
  type CurrencyCode,
  type ProductItem,
  type ProductVariant,
} from '../data/catalog';
import {
  buildSafeWhatsAppUrl,
  clampQuantity,
  sanitizePhone,
  sanitizeText,
} from '../utils/security';
import { CartContext, type CartItem } from './useCart';

const MAX_DISTINCT_CART_ITEMS = 30;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>('TZS');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState<ProductItem | null>(null);

  const addToCart = (product: ProductItem, variant: ProductVariant, qty = 1) => {
    const safeQty = clampQuantity(qty, 1, 50);
    const key = `${product.id}__${variant.id}`;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: clampQuantity(i.quantity + safeQty, 1, 50) } : i
        );
      }
      if (prev.length >= MAX_DISTINCT_CART_ITEMS) {
        return prev;
      }
      return [...prev, { key, product, variant, quantity: safeQty }];
    });
    setIsDrawerOpen(true);
  };

  const updateQty = (key: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) =>
          i.key === key ? { ...i, quantity: Math.min(50, i.quantity + Math.trunc(delta)) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  };

  const clearCart = () => setItems([]);

  const { totalItems, subtotalTzs, subtotalKes } = useMemo(() => {
    return items.reduce(
      (acc, item) => {
        acc.totalItems += item.quantity;
        acc.subtotalTzs += item.variant.priceTzs * item.quantity;
        acc.subtotalKes += item.variant.priceKes * item.quantity;
        return acc;
      },
      { totalItems: 0, subtotalTzs: 0, subtotalKes: 0 }
    );
  }, [items]);

  const buildWhatsAppUrl = (customer: {
    name: string;
    phone: string;
    fulfillment: 'delivery' | 'pickup';
    location: string;
    notes: string;
  }) => {
    const safeName = sanitizeText(customer.name, 80);
    const safePhone = sanitizePhone(customer.phone, 24);
    const safeLocation = sanitizeText(customer.location, 140);
    const safeNotes = sanitizeText(customer.notes, 220);

    const lines = [
      `Hello *${BRAND_CONFIG.name}*! I would like to place an order:`,
      '',
      ...items.map(
        (item, idx) =>
          `${idx + 1}. *${item.product.name}* (${item.variant.label}) x${item.quantity}`
      ),
      '',
      `*Mode:* ${customer.fulfillment === 'delivery' ? 'Chilled Delivery' : 'Parlour Pickup'}`,
      safeName ? `*Name:* ${safeName}` : '',
      safePhone ? `*Phone:* ${safePhone}` : '',
      safeLocation ? `*Address / Area:* ${safeLocation}` : '',
      safeNotes ? `*Notes:* ${safeNotes}` : '',
    ].filter(Boolean);

    return buildSafeWhatsAppUrl(BRAND_CONFIG.whatsappNumber, lines);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        currency,
        setCurrency,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        activeProduct,
        openProductModal: (p) => setActiveProduct(p),
        closeProductModal: () => setActiveProduct(null),
        addToCart,
        updateQty,
        removeItem,
        clearCart,
        totalItems,
        subtotalTzs,
        subtotalKes,
        buildWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
