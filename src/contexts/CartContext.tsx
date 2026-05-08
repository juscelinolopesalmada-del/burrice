import React, { createContext, useContext, useState, useCallback } from "react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
  variantLabel?: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, variantLabel?: string) => void;
  removeItem: (productId: string, variantLabel?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantLabel?: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product, variantLabel?: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.variantLabel === variantLabel);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.variantLabel === variantLabel ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1, variantLabel }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, variantLabel?: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.variantLabel === variantLabel)));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number, variantLabel?: string) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.variantLabel === variantLabel)));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId && i.variantLabel === variantLabel ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
