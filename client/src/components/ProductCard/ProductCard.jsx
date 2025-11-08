// src/components/ProductCard/ProductCard.jsx

import { useState } from 'react'; // 1. Importamos useState
import './ProductCard.css';
import { useCart } from '../../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  // 2. Creamos un estado local para la animación del botón
  const [isAdded, setIsAdded] = useState(false);

  // 3. Creamos una nueva función manejadora
  const handleAddToCart = () => {
    addToCart(product); // Añade el producto al carrito global
    setIsAdded(true);   // Activa el estado "añadido" del botón
    
    // 4. Después de 1.5 segundos, vuelve al estado normal
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{product.price.toFixed(2)} €</p>
      </div>
      
      {/* 5. Modificamos el botón */}
      <button 
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdded} // Deshabilitamos el botón mientras está en "Añadido"
      >
        {isAdded ? '¡Añadido!' : 'Añadir al carrito'}
      </button>
    </div>
  );
}

export default ProductCard;