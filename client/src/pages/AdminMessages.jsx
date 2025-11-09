// src/pages/AdminMessages.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './AdminMessages.css';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) {
        setError('No estás autenticado.');
        setLoading(false);
        return;
      }

      try {
        const config = { headers: { 'x-auth-token': token } };
        const res = await axios.get('http://localhost:5000/api/contact', config);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        if (err.response) {
          setError(err.response.data.msg || 'Error al cargar los mensajes.');
        } else {
          setError('Error de conexión. ¿Está el servidor backend (Terminal 1) encendido?');
        }
      } finally {
        // Esta es la lógica de carga correcta que soluciona el "Cargando..."
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]); // Se ejecuta solo una vez cuando el token está listo

  if (loading) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Cargando mensajes...</h2>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', padding: '2rem' }}>{error}</div>;
  }

  return (
    <div className="admin-messages-container">
      <h1>Mensajes de Contacto Recibidos</h1>

      {messages.length === 0 ? (
        <p>No hay mensajes nuevos.</p>
      ) : (
        <table className="messages-table">
          <thead>
            <tr>
              <th>De</th>
              <th>Asunto</th>
              <th>Mensaje</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>
                  <div className="message-from">{msg.name}</div>
                  <div className="message-email">{msg.email}</div>
                </td>
                <td>{msg.subject}</td>
                <td className="message-content">{msg.message}</td>
                <td className="message-date">
                  {new Date(msg.createdAt).toLocaleString('es-ES')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminMessages;