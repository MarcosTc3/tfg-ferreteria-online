// src/context/CartContext.jsx

import { createContext, useState, useContext } from 'react';

// 1. Creamos el Contexto. Es como el almacén de datos.
const CartContext = createContext();

// 2. Creamos una función helper para usar el contexto más fácilmente.
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Creamos el Proveedor del Contexto. Este componente envolverá nuestra app.
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Función para añadir productos al carrito
  const addToCart = (product) => {
    // Buscamos si el producto ya está en el carrito
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // Si ya existe, solo aumentamos la cantidad
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Si es nuevo, lo añadimos con cantidad 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Aquí añadiremos más funciones en el futuro (removeFromCart, clearCart, etc.)

  // 4. Proveemos los datos (el array de items y la función para añadir) a los componentes hijos.
  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};