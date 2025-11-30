// src/pages/AdminProducts.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import { FaImage, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'; // Iconos nuevos
import './AdminProducts.css';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Estados para la galería
  const [showGallery, setShowGallery] = useState(false);
  const [availableImages, setAvailableImages] = useState([]);

  // Estado del formulario
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Herramientas Manuales',
    image: '',
    stock: 10
  });

  // --- NUEVO ESTADO: MODO EDICIÓN ---
  const [editingId, setEditingId] = useState(null); // Si es null, estamos creando. Si tiene ID, estamos editando.

  const fetchProducts = async () => {
    try {
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

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // --- FUNCIÓN UNIFICADA: CREAR O ACTUALIZAR ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    try {
      const config = { headers: { 'x-auth-token': token } };

      if (editingId) {
        // --- MODO ACTUALIZAR (PUT) ---
        const res = await axios.put(`http://localhost:5000/api/products/${editingId}`, productForm, config);
        
        // Actualizamos la lista localmente
        setProducts(products.map(p => (p._id === editingId ? res.data : p)));
        
        // Salimos del modo edición
        setEditingId(null);
      } else {
        // --- MODO CREAR (POST) ---
        const res = await axios.post('http://localhost:5000/api/products', productForm, config);
        setProducts([res.data, ...products]);
      }

      // Limpiamos el formulario en ambos casos
      setProductForm({
        name: '',
        description: '',
        price: '',
        category: 'Herramientas Manuales',
        image: '',
        stock: 10
      });

    } catch (err) {
      console.error(err);
      alert('Error al guardar el producto.');
    }
  };

  // --- FUNCIÓN PARA ACTIVAR EDICIÓN ---
  const startEditing = (product) => {
    // Rellenamos el formulario con los datos del producto seleccionado
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      stock: product.stock
    });
    setEditingId(product._id); // Activamos modo edición
    
    // Hacemos scroll hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FUNCIÓN PARA CANCELAR EDICIÓN
  const cancelEditing = () => {
    setEditingId(null);
    setProductForm({
      name: '',
      description: '',
      price: '',
      category: 'Herramientas Manuales',
      image: '',
      stock: 10
    });
  };

  // Borrar producto
  const handleDeleteProduct = async (id) => {
    if(!window.confirm('¿Estás seguro de que quieres eliminar este producto?')) return;
    try {
      const config = { headers: { 'x-auth-token': token } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      alert('Error al eliminar el producto');
    }
  };

  // Galería de imágenes
  const handleOpenGallery = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/images');
      setAvailableImages(res.data);
      setShowGallery(true);
    } catch (err) { alert('Error al cargar galería'); }
  };

  const selectImage = (fileName) => {
    setProductForm({ ...productForm, image: `/products/${fileName}` });
    setShowGallery(false);
  };

  if (loading) return <AdminLayout><div style={{padding:'4rem', textAlign:'center'}}>Cargando...</div></AdminLayout>;

  return (
    <AdminLayout>
      <div className="admin-products-container">
        <h1>Gestión de Productos</h1>

        <div className="create-product-form" style={editingId ? {border:'2px solid #ffc107'} : {}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <h2>{editingId ? 'Editar Producto' : 'Añadir Nuevo Producto'}</h2>
            {editingId && (
              <button type="button" onClick={cancelEditing} className="cancel-edit-btn">
                <FaTimes /> Cancelar Edición
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input type="text" name="name" placeholder="Nombre" value={productForm.name} onChange={handleInputChange} required />
              <input type="number" name="price" placeholder="Precio (€)" value={productForm.price} onChange={handleInputChange} required />
            </div>
            
            <textarea name="description" placeholder="Descripción" value={productForm.description} onChange={handleInputChange} required rows="3"></textarea>
            
            <div className="form-row">
              <select name="category" value={productForm.category} onChange={handleInputChange}>
                <option value="Herramientas Eléctricas">Herramientas Eléctricas</option>
                <option value="Herramientas Manuales">Herramientas Manuales</option>
                <option value="Tornillería">Tornillería</option>
                <option value="Seguridad Laboral">Seguridad Laboral</option>
                <option value="Medición">Medición</option>
                <option value="Hogar">Hogar</option>
                <option value="Otros">Otros</option>
              </select>
              <input type="number" name="stock" placeholder="Stock" value={productForm.stock} onChange={handleInputChange} required />
            </div>

            <label style={{fontWeight:'bold', display:'block', marginBottom:'0.5rem'}}>Imagen:</label>
            <div className="input-group">
              <input type="text" name="image" placeholder="Ruta imagen" value={productForm.image} onChange={handleInputChange} required />
              <button type="button" onClick={handleOpenGallery} className="gallery-btn"><FaImage/> Galería</button>
            </div>
            
            <button type="submit" className={`create-btn ${editingId ? 'update-btn' : ''}`}>
              {editingId ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </form>
        </div>

        <h2>Inventario Actual ({products.length})</h2>
        <div style={{overflowX: 'auto'}}>
          <table className="products-table">
            <thead>
              <tr>
                <th>Img</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className={editingId === product._id ? 'editing-row' : ''}>
                  <td><img src={product.image} alt={product.name} className="table-img" /></td>
                  <td>
                    <strong>{product.name}</strong>
                    <div style={{fontSize:'0.8rem', color:'#666'}}>{product.category}</div>
                  </td>
                  <td>{product.price} €</td>
                  <td style={{fontWeight:'bold', color: product.stock < 5 ? 'red' : 'green'}}>
                    {product.stock} u.
                  </td>
                  <td>
                    <div style={{display:'flex', gap:'10px'}}>
                      {/* BOTÓN EDITAR */}
                      <button onClick={() => startEditing(product)} className="edit-btn" title="Editar">
                        <FaEdit />
                      </button>
                      {/* BOTÓN ELIMINAR */}
                      <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn" title="Eliminar">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL GALERÍA (Igual que antes) */}
      {showGallery && (
        <div className="gallery-modal-overlay">
          <div className="gallery-modal">
            <button onClick={() => setShowGallery(false)} className="close-modal-btn"><FaTimes/></button>
            <h2 style={{marginTop:0}}>Selecciona una imagen</h2>
            <div className="gallery-grid">
              {availableImages.map((imgName, index) => (
                <div key={index} className="gallery-item" onClick={() => selectImage(imgName)}>
                  <img src={`/products/${imgName}`} alt={imgName} />
                  <p>{imgName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default AdminProducts;