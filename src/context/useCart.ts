import { createContext, useContext } from 'react';
import type { CurrencyCode, ProductItem, ProductVariant } from '../data/catalog';

export interface CartItem {
  key: string;
  product: ProductItem;
  variant: ProductVariant;
  quantity: number;
}

export interface CartContextValue {
  items: CartItem[];
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  activeProduct: ProductItem | null;
  openProductModal: (product: ProductItem) => void;
  closeProductModal: () => void;
  addToCart: (product: ProductItem, variant: ProductVariant, qty?: number) => void;
  updateQty: (key: string, delta: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalTzs: number;
  subtotalKes: number;
  buildWhatsAppUrl: (customer: {
    name: string;
    phone: string;
    fulfillment: 'delivery' | 'pickup';
    location: string;
    notes: string;
  }) => string;
}

export const CartContext = createContext<CartContextValue | null>(null);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
