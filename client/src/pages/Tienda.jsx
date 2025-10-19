// src/pages/Tienda.jsx

import './Tienda.css';
import { PRODUCTS } from '../data/products.js'; // Importamos nuestros productos
import ProductCard from '../components/ProductCard/ProductCard.jsx'; // Importamos la tarjeta

function Tienda() {
  return (
    <div className="shop-page-container">
      <header className="shop-header">
        <h1>Nuestros Productos</h1>
        <p>Explora nuestro catálogo completo de herramientas y suministros.</p>
      </header>

      <div className="product-grid">
        {/* Usamos .map() para recorrer cada producto en la lista PRODUCTS.
          Para cada 'product', creamos un componente <ProductCard>.
          La 'key' es un identificador único que React necesita.
          Le pasamos el producto completo al componente a través de la prop 'product'.
        */}
        {PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Tienda;