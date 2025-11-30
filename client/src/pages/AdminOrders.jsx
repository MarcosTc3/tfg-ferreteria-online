// src/pages/AdminOrders.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
import './AdminOrders.css';

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setError('No estás autenticado.');
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        setError('Error de conexión o no eres Admin.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const config = { headers: { 'x-auth-token': token } };
      const body = { status: newStatus };
      
      const res = await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, body, config);

      // Actualización local del estado
      setOrders(currentOrders =>
        currentOrders.map(order =>
          order._id === orderId ? { ...order, orderStatus: res.data.orderStatus } : order
        )
      );

    } catch (err) {
      console.error(err);
      alert('Error al actualizar el estado.');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando pedidos...</div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div style={{ color: 'red', padding: '2rem' }}>{error}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-orders-container">
        <h1>Gestión de Pedidos</h1>
        
        {orders.length === 0 ? (
          <p>No hay pedidos para mostrar.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Artículos</th>
                <th>Total</th>
                <th>Estado del Pedido</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <code style={{ fontSize: '0.8rem' }}>{order._id}</code>
                  </td>
                  <td>
                    <div className="order-user-info">{order.user.name}</div>
                    <div className="order-user-email">{order.user.email}</div>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString('es-ES')}</td>
                  <td>
                    <ul className="order-items-list">
                      {order.orderItems.map(item => (
                        <li key={item.product}>
                          {item.quantity} x {item.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="order-total">{order.totalPrice.toFixed(2)} €</td>
                  <td>
                    <select 
                      value={order.orderStatus}
                      // AQUÍ ESTÁ EL CAMBIO: Usamos guion (-) para reemplazar espacios
                      className={`status-select ${order.orderStatus.replace(/\s+/g, '-')}`}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      <option value="Pendiente">Pendiente</option>
                      <option value="En Camino">En Camino</option>
                      <option value="Entregado">Entregado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminOrders;