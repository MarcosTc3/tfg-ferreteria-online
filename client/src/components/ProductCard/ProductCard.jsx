// src/components/ProductCard/ProductCard.jsx

import { useState } from 'react';
import './ProductCard.css';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // 1. Importamos el hook de autenticación
import { useNavigate } from 'react-router-dom'; // 2. Importamos el hook de navegación

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth(); // 3. Obtenemos el estado del usuario
  const navigate = useNavigate(); // 4. Obtenemos la función para navegar
  
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    // 5. ¡AQUÍ ESTÁ LA NUEVA LÓGICA!
    if (!user) {
      // Si NO hay usuario, redirigimos al login y no hacemos nada más
      navigate('/login');
      return; 
    }

    // Si hay usuario, la función continúa como antes:
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