import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from "expo-crypto";

import { CartItem, Product } from "@/types";

type CartType = {
  items: CartItem[];
  totalPrice: number;
  addItem: (product: Product, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  totalPrice: 0,
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product.id === product.id && item.size === size
    );

    if (existingItem) {
      updateQuantity(existingItem.id, 1);
    } else {
      const newCartItem: CartItem = {
        product,
        product_id: product.id,
        size,
        quantity: 1,
        id: randomUUID(),
      };
      setItems([newCartItem, ...items]);
    }
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);

    setItems(updatedItems);
  };

  const total = items.reduce(
    (sum, item) => (sum += item.quantity * item.product.price),
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, totalPrice: total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
