// src/components/ProductCard/ProductCard.jsx

import { useState } from 'react';
import './ProductCard.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom'; // Importar useLocation

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Obtener ubicación
  
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      // Redirigir al login guardando "from"
      navigate('/login', { state: { from: location } });
      return; 
    }

    addToCart(product);
    setIsAdded(true);
    
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
      
      <button 
        className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
        onClick={handleAddToCart}
        disabled={isAdded}
      >
        {isAdded ? '¡Añadido!' : 'Añadir al carrito'}
      </button>
    </div>
  );
}

export default ProductCard;