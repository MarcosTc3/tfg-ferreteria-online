// src/pages/Tienda.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard/ProductCard.jsx';
import { FaSearch, FaFilter } from 'react-icons/fa'; // Iconos para el buscador
import './Tienda.css';

function Tienda() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- ESTADOS PARA FILTROS ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Categorías disponibles (iguales a las de tu Backend)
  const categories = [
    'Todas',
    'Herramientas Eléctricas',
    'Herramientas Manuales',
    'Tornillería',
    'Seguridad Laboral',
    'Medición',
    'Hogar',
    'Otros'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        // Adaptamos _id a id para el frontend
        const adaptedProducts = res.data.map(product => ({
          ...product,
          id: product._id
        }));
        setProducts(adaptedProducts);
      } catch (err) {
        console.error(err);
        setError('Error al cargar el catálogo.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- LÓGICA DE FILTRADO ---
  const filteredProducts = products.filter(product => {
    // 1. Filtro por Texto (Nombre o Descripción)
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // 2. Filtro por Categoría
    const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="shop-page-container" style={{textAlign:'center', padding:'4rem'}}><h2>Cargando catálogo...</h2></div>;
  if (error) return <div className="shop-page-container" style={{textAlign:'center', color:'red', padding:'4rem'}}><h2>{error}</h2></div>;

  return (
    <div className="shop-page-container">
      <header className="shop-header">
        <h1>Nuestros Productos</h1>
        <p>Calidad profesional para tus proyectos.</p>
      </header>

      {/* --- BARRA DE HERRAMIENTAS (BUSCADOR Y FILTRO) --- */}
      <div className="shop-toolbar">
        
        {/* Buscador */}
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Buscar productos..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtro de Categoría */}
        <div className="category-filter">
          <FaFilter className="filter-icon" />
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- GRID DE PRODUCTOS FILTRADOS --- */}
      {filteredProducts.length === 0 ? (
        <div className="no-results">
          <h3>No hemos encontrado productos.</h3>
          <p>Prueba con otra búsqueda o cambia la categoría.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tienda;