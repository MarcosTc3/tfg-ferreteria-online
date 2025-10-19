// src/components/ProductCard/ProductCard.jsx

import './ProductCard.css';

// El componente recibe un objeto 'product' con toda la información
function ProductCard({ product }) {
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
      <button className="add-to-cart-btn">Añadir al carrito</button>
    </div>
  );
}

export default ProductCard;