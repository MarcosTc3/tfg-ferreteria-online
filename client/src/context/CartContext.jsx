// src/context/CartContext.jsx

import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // ... (tu código existente de addToCart)
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

  // --- ¡NUEVA FUNCIÓN! ---
  // Vacía el carrito por completo
  const clearCart = () => {
    setCartItems([]);
  };
  // --- FIN DE NUEVA FUNCIÓN ---

  // Añadimos la nueva función al 'value' para que esté disponible
  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      updateItemQuantity, 
      clearCart // <-- AÑADIDA AQUÍ
    }}>
      {children}
    </CartContext.Provider>
  );
};