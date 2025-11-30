// src/pages/Tienda.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import './Tienda.css';
import ProductCard from '../components/ProductCard/ProductCard.jsx';

function Tienda() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Cargar productos del Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        
        // TRUCO: Adaptamos los datos de MongoDB para que funcionen con tu carrito
        // MongoDB usa '_id', pero tu carrito espera 'id'. Hacemos una copia.
        const adaptedProducts = res.data.map(product => ({
          ...product,
          id: product._id // Mapeamos _id a id
        }));

        setProducts(adaptedProducts);
      } catch (err) {
        console.error(err);
        setError('Error al cargar el catálogo de productos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="shop-page-container">
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>Cargando catálogo...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page-container">
        <div style={{ textAlign: 'center', color: 'red', padding: '4rem' }}>
          <h2>{error}</h2>
          <p>Asegúrate de que el servidor Backend (puerto 5000) está encendido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page-container">
      <header className="shop-header">
        <h1>Nuestros Productos</h1>
        <p>Explora nuestro catálogo completo de herramientas y suministros.</p>
      </header>

      {products.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay productos disponibles en este momento.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tienda;