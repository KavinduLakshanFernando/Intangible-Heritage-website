'use client';
/**
 * components/CartContext.tsx
 * React Context + localStorage cart for the Shop page.
 * Wrap your root layout with <CartProvider> to enable cart state.
 */
import React, { createContext, useContext, useEffect, useReducer, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';

// ── State ──────────────────────────────────────────────────────────────────
interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; id: string }
  | { type: 'INCREMENT'; id: string }
  | { type: 'DECREMENT'; id: string }
  | { type: 'CLEAR' }
  | { type: 'SET'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'SET':
      return { items: action.items };
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === action.product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) };
    case 'INCREMENT':
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    case 'DECREMENT':
      return {
        items: state.items
          .map(i => (i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i))
          .filter(i => i.quantity > 0),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

// ── Context ────────────────────────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalQuantity: number;
  totalPrice: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'ih_cart';

// ── Provider ───────────────────────────────────────────────────────────────
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          dispatch({ type: 'SET', items: parsed });
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = useCallback((product: Product) => dispatch({ type: 'ADD', product }), []);
  const removeFromCart = useCallback((id: string) => dispatch({ type: 'REMOVE', id }), []);
  const incrementItem = useCallback((id: string) => dispatch({ type: 'INCREMENT', id }), []);
  const decrementItem = useCallback((id: string) => dispatch({ type: 'DECREMENT', id }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const totalItems = state.items.length;
  const totalQuantity = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, totalItems, totalQuantity, totalPrice, addToCart, removeFromCart, incrementItem, decrementItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ───────────────────────────────────────────────────────────────────
export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
