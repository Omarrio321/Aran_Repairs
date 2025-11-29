
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('aran_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('aran_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      // Check if item already exists (simple logic: same productId and same color/details if applicable)
      // For now, accessories stack, devices don't usually stack unless exact match, but let's keep it simple:
      // We'll treat every add as a unique line item for Refurbished, but stack accessories.
      
      if (product.type === 'accessory') {
        const existing = prev.find(i => i.productId === product.productId);
        if (existing) {
          return prev.map(i => i.productId === product.productId ? { ...i, quantity: i.quantity + 1 } : i);
        }
      }

      const newItem = { ...product, id: Math.random().toString(36).substr(2, 9) };
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
