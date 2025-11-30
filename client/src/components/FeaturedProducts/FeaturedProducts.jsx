// src/components/FeaturedProducts/FeaturedProducts.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard/ProductCard';
import { Link } from 'react-router-dom';
import './FeaturedProducts.css'; // Importa el CSS

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const adaptedProducts = res.data.map(p => ({ ...p, id: p._id }));
        setProducts(adaptedProducts.slice(0, 4)); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="featured-section">
      <div className="container">
        <h2 className="section-title">Productos Destacados</h2>
        
        <div className="featured-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="view-all-container">
          <Link to="/tienda" className="view-all-btn">
            Ver Todo el Catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;