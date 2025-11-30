// src/context/CartContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  // 1. INICIALIZACIÓN "PEREZOSA":
  // En lugar de empezar con [], miramos si hay algo guardado en el navegador.
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('ferreteria_cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. EFECTO DE GUARDADO:
  // Cada vez que 'cartItems' cambie, lo guardamos en el navegador.
  useEffect(() => {
    localStorage.setItem('ferreteria_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      newQuantity = 1; 
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    // También limpiamos el almacenamiento local
    localStorage.removeItem('ferreteria_cart');
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateItemQuantity, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};