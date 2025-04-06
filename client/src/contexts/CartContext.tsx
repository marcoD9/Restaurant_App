import React, { createContext, useState, useContext, useEffect } from "react";
import { createOrder } from "../api";
import { Order } from "../types";

interface CartContextProps {
  cartItems: { dishId: string; quantity: number }[];
  addToCart: (dishId: string, quantity: number) => void;
  removeFromCart: (dishId: string) => void;
  decreaseQuantity: (dishId: string) => void;
  clearCart: () => void;
  createOrderFromCart: (
    token: string,
    time: Date,
    userId: string
  ) => Promise<Order | null>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<
    { dishId: string; quantity: number }[]
  >(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (dishId: string, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.dishId === dishId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.dishId === dishId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { dishId, quantity }];
      }
    });
  };

  const removeFromCart = (dishId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.dishId !== dishId)
    );
  };

  const decreaseQuantity = (dishId: string) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.dishId === dishId) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const createOrderFromCart = async (
    token: string,
    time: Date,
    userId: string
  ): Promise<Order | null> => {
    try {
      const orderDishes = JSON.stringify(cartItems);
      const order = await createOrder(
        token,
        time,
        "Pending",
        userId,
        orderDishes
      );
      clearCart();
      return order;
    } catch (err) {
      console.error("Error creating order:", err);
      return null;
    }
  };

  const value: CartContextProps = {
    cartItems,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    createOrderFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
