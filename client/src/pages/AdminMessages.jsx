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

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

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
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]);

  const handleSendReply = async (messageId) => {
    try {
      const config = { headers: { 'x-auth-token': token } };
      const body = { replyText };

      await axios.put(`http://localhost:5000/api/contact/reply/${messageId}`, body, config);

      // ¡ALERTA ELIMINADA!

      setMessages(currentMessages =>
        currentMessages.map(msg =>
          msg._id === messageId
            ? { ...msg, isReplied: true, replyMessage: replyText }
            : msg
        )
      );

      setReplyingTo(null);
      setReplyText('');

    } catch (err) {
      // Esta alerta SÍ se queda, porque es un error
      alert('Error al enviar la respuesta.');
      console.error(err);
    }
  };

  const openReplyBox = (message) => {
    setReplyingTo(message._id);
    setReplyText('');
  };

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
           {/* ... (El resto de la tabla JSX sigue igual) ... */}
          <thead>
            <tr>
              <th>De</th>
              <th>Asunto y Mensaje</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id}>
                <td>
                  <div className="message-from">{msg.name}</div>
                  <div className="message-email">{msg.email}</div>
                </td>
                <td>
                  <strong>{msg.subject}</strong>
                  <div className="message-content">{msg.message}</div>
                </td>
                <td>
                  {msg.isReplied ? (
                    <span className="status-replied">Respondido</span>
                  ) : (
                    <span className="status-pending">Pendiente</span>
                  )}
                </td>
                <td className="message-date">
                  {new Date(msg.createdAt).toLocaleString('es-ES')}
                </td>
                <td className="message-action">
                  {replyingTo === msg._id ? (
                    <div className="reply-box">
                      <textarea
                        rows="4"
                        placeholder={`Respondiendo a ${msg.name}...`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button onClick={() => handleSendReply(msg._id)} className="send-reply-btn">
                        Enviar
                      </button>
                      <button onClick={() => setReplyingTo(null)} className="cancel-reply-btn">
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => openReplyBox(msg)} 
                      className="reply-btn"
                      disabled={msg.isReplied}
                    >
                      {msg.isReplied ? 'Ya Respondido' : 'Responder'}
                    </button>
                  )}
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