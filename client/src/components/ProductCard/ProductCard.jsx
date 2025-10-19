// src/components/ProductCard/ProductCard.jsx

import './ProductCard.css';
import { useCart } from '../../context/CartContext'; // 1. Importamos el hook useCart

function ProductCard({ product }) {
  const { addToCart } = useCart(); // 2. Obtenemos la función addToCart del contexto

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
      {/* 3. Al hacer clic, llamamos a la función addToCart con el producto actual */}
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Añadir al carrito
      </button>
    </div>
  );
}

export default ProductCard;