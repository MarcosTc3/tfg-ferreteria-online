// src/pages/Pedidos.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminOrders.css'; // Reutilizamos el CSS de la tabla de admin

function Pedidos() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get('http://localhost:5000/api/orders/myorders', config);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchMyOrders();
  }, [token]);

  if (loading) return <div className="container" style={{padding:'4rem', textAlign:'center'}}>Cargando pedidos...</div>;

  return (
    <div className="container" style={{ padding: '3rem 1rem' }}>
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>Mis Pedidos</h1>

      {orders.length === 0 ? (
        <p>No has realizado ningún pedido todavía.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="orders-table" style={{ minWidth: '600px' }}>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Artículos</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td><code style={{ fontSize: '0.8rem' }}>{order._id}</code></td>
                  <td>{new Date(order.createdAt).toLocaleDateString('es-ES')}</td>
                  <td>
                    <ul className="order-items-list">
                      {order.orderItems.map(item => (
                        <li key={item.product}>{item.quantity} x {item.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="order-total">{order.totalPrice.toFixed(2)} €</td>
                  <td>
                    {/* Estado visual con colores */}
                    <span className={`status-select ${order.orderStatus.replace(' ', '.')}`} 
                          style={{ display:'inline-block', border:'1px solid', padding:'5px 10px', borderRadius:'5px' }}>
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Pedidos;