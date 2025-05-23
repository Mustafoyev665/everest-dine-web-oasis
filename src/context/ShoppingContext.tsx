
import React, { createContext, useContext, useState, useEffect } from "react";

// Define the types for our items
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  quantity?: number;
}

// Define the context type
interface ShoppingContextType {
  cartItems: MenuItem[];
  likedItems: MenuItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (id: number) => void;
  updateCartItemQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  addToLiked: (item: MenuItem) => void;
  removeFromLiked: (id: number) => void;
  isInCart: (id: number) => boolean;
  isLiked: (id: number) => boolean;
  cartCount: number;
  likedCount: number;
  cartTotal: number;
}

// Create the context with initial state
const ShoppingContext = createContext<ShoppingContextType>({
  cartItems: [],
  likedItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {},
  addToLiked: () => {},
  removeFromLiked: () => {},
  isInCart: () => false,
  isLiked: () => false,
  cartCount: 0,
  likedCount: 0,
  cartTotal: 0,
});

// Create the provider component
export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [cartItems, setCartItems] = useState<MenuItem[]>(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [likedItems, setLikedItems] = useState<MenuItem[]>(() => {
    const savedLiked = localStorage.getItem("likedItems");
    return savedLiked ? JSON.parse(savedLiked) : [];
  });

  // Calculate derived values
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  const likedCount = likedItems.length;
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  // Persist state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
  }, [likedItems]);

  // Cart operations
  const addToCart = (itemToAdd: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === itemToAdd.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateCartItemQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  // Liked items operations
  const addToLiked = (item: MenuItem) => {
    setLikedItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) return prevItems;
      return [...prevItems, item];
    });
  };

  const removeFromLiked = (id: number) => {
    setLikedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Helper functions
  const isInCart = (id: number) => cartItems.some((item) => item.id === id);
  const isLiked = (id: number) => likedItems.some((item) => item.id === id);

  return (
    <ShoppingContext.Provider
      value={{
        cartItems,
        likedItems,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        addToLiked,
        removeFromLiked,
        isInCart,
        isLiked,
        cartCount,
        likedCount,
        cartTotal,
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

// Create a hook to use the shopping context
export const useShoppingContext = () => useContext(ShoppingContext);

