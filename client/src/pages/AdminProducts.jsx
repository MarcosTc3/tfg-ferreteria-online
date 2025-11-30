// src/pages/AdminProducts.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import './AdminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Estado para el formulario de nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Herramientas Manuales', // Valor por defecto
    image: '',
    stock: 10
  });

  // 1. Cargar productos al entrar
  const fetchProducts = async () => {
    try {
      // Nota: Esta ruta es pública, no necesita token, pero la usamos dentro del admin
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 2. Manejar cambios en el formulario
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // 3. Crear Producto
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const config = { headers: { 'x-auth-token': token } };
      
      // Enviamos los datos al backend
      const res = await axios.post('http://localhost:5000/api/products', newProduct, config);

      // Añadimos el nuevo producto a la lista visualmente
      setProducts([res.data, ...products]);
      
      // Limpiamos el formulario
      setNewProduct({
        name: '',
        description: '',
        price: '',
        category: 'Herramientas Manuales',
        image: '',
        stock: 10
      });
      
      alert('Producto creado correctamente');

    } catch (err) {
      console.error(err);
      alert('Error al crear el producto. Revisa los datos.');
    }
  };

  // 4. Borrar Producto
  const handleDeleteProduct = async (id) => {
    if(!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;

    try {
      const config = { headers: { 'x-auth-token': token } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);

      // Lo quitamos de la lista visualmente
      setProducts(products.filter(p => p._id !== id));

    } catch (err) {
      console.error(err);
      alert('Error al eliminar el producto');
    }
  };

  if (loading) return <AdminLayout><div style={{padding:'4rem', textAlign:'center'}}>Cargando productos...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-products-container">
        <h1>Gestión de Productos</h1>

        {/* --- FORMULARIO DE CREACIÓN --- */}
        <div className="create-product-form">
          <h2>Añadir Nuevo Producto</h2>
          <form onSubmit={handleCreateProduct}>
            <div className="form-row">
              <input type="text" name="name" placeholder="Nombre del producto" value={newProduct.name} onChange={handleInputChange} required />
              <input type="number" name="price" placeholder="Precio (€)" value={newProduct.price} onChange={handleInputChange} required />
            </div>
            
            <textarea name="description" placeholder="Descripción del producto" value={newProduct.description} onChange={handleInputChange} required rows="3"></textarea>
            
            <div className="form-row">
              <select name="category" value={newProduct.category} onChange={handleInputChange}>
                <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                <option value="Herramientas Manuales">Herramientas Manuales</option>
                <option value="Tornillería">Tornillería</option>
                <option value="Seguridad Laboral">Seguridad Laboral</option>
                <option value="Medición">Medición</option>
                <option value="Hogar">Hogar</option>
                <option value="Otros">Otros</option>
              </select>
              <input type="number" name="stock" placeholder="Stock" value={newProduct.stock} onChange={handleInputChange} required />
            </div>

            <input type="text" name="image" placeholder="URL de la imagen (ej: /products/taladro.jpg)" value={newProduct.image} onChange={handleInputChange} required />
            <small style={{display:'block', marginBottom:'1rem', color:'#666'}}>
              * Usa una ruta local como <b>/products/nombre-foto.jpg</b> (asegúrate de que la foto esté en la carpeta public/products) o una URL de internet.
            </small>

            <button type="submit" className="create-btn">Crear Producto</button>
          </form>
        </div>

        {/* --- TABLA DE PRODUCTOS --- */}
        <h2>Inventario Actual ({products.length})</h2>
        <div style={{overflowX: 'auto'}}>
          <table className="products-table">
            <thead>
              <tr>
                <th>Img</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img src={product.image} alt={product.name} className="table-img" />
                  </td>
                  <td>
                    <strong>{product.name}</strong>
                    <p style={{fontSize:'0.8rem', color:'#666', margin:0}}>{product.description.substring(0, 50)}...</p>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.price} €</td>
                  <td>{product.stock}</td>
                  <td>
                    <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminProducts;