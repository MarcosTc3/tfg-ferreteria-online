// src/pages/ClientMessages.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './ClientMessages.css';

function ClientMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  const [activeChatId, setActiveChatId] = useState(null);
  const [replyText, setReplyText] = useState('');

  // 1. Cargar MIS mensajes
  useEffect(() => {
    const fetchMyMessages = async () => {
      if (!token) return;
      
      try {
        const config = { headers: { 'x-auth-token': token } };
        // Llamamos al endpoint específico de cliente
        const res = await axios.get('http://localhost:5000/api/contact/my-messages', config);
        setMessages(res.data);
      } catch (err) {
        console.error(err);
        setError('Error al cargar tus mensajes.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyMessages();
  }, [token]);

  // 2. Responder como Cliente
  const handleSendReply = async (messageId) => {
    if (!replyText.trim()) return;

    try {
      const config = { headers: { 'x-auth-token': token } };
      const body = { replyText };
      
      // Llamamos al endpoint de respuesta de cliente
      const res = await axios.put(`http://localhost:5000/api/contact/reply-as-client/${messageId}`, body, config);

      // Actualización visual inmediata
      setMessages(currentMessages =>
        currentMessages.map(msg =>
          msg._id === messageId ? res.data : msg
        )
      );

      setReplyText('');

    } catch (err) {
      alert('Error al enviar el mensaje.');
      console.error(err);
    }
  };

  const toggleChat = (id) => {
    if (activeChatId === id) {
      setActiveChatId(null);
    } else {
      setActiveChatId(id);
      setReplyText('');
    }
  };

  if (loading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Cargando tus mensajes...</div>;
  if (error) return <div style={{ color: 'red', padding: '2rem', textAlign: 'center' }}>{error}</div>;

  return (
    <div className="client-messages-container container">
      <h1>Mis Consultas y Mensajes</h1>
      
      {messages.length === 0 ? (
        <div className="no-messages">
          <p>No tienes mensajes de contacto.</p>
          <p>Si tienes dudas, ve a la sección de <a href="/contacto">Contacto</a>.</p>
        </div>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <div className="message-header">
                <div className="message-info">
                  <h3>{msg.subject}</h3>
                  <span className="message-date">
                    Iniciado el: {new Date(msg.createdAt).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <div className="message-status">
                  <span className={`status-badge ${msg.status}`}>
                    {msg.status}
                  </span>
                </div>
              </div>

              <div className="message-body-preview">
                {msg.message.substring(0, 100)}...
              </div>

              <button 
                onClick={() => toggleChat(msg._id)} 
                className="toggle-chat-btn"
              >
                {activeChatId === msg._id ? 'Cerrar Conversación' : 'Ver Conversación / Responder'}
              </button>

              {/* ZONA DE CHAT */}
              {activeChatId === msg._id && (
                <div className="client-chat-container">
                  <div className="chat-history">
                    {/* Mensaje Original */}
                    <div className="chat-bubble client">
                      <span className="bubble-meta">Tú (Mensaje original)</span>
                      {msg.message}
                    </div>

                    {/* Hilo de respuestas */}
                    {msg.replies && msg.replies.map((reply, index) => (
                      <div key={index} className={`chat-bubble ${reply.sender}`}>
                        <span className="bubble-meta">
                          {reply.sender === 'client' ? 'Tú' : 'Soporte (Admin)'} - {new Date(reply.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                        {reply.text}
                      </div>
                    ))}
                  </div>

                  {/* LÓGICA DE ESTADO CERRADO PARA CLIENTE */}
                  {msg.status === 'Cerrado' ? (
                    <div style={{ 
                      padding: '1rem', 
                      textAlign: 'center', 
                      backgroundColor: '#e9ecef', 
                      color: '#495057', 
                      borderRadius: '8px', 
                      marginTop: '1rem',
                      fontWeight: 'bold',
                      border: '1px solid #dee2e6'
                    }}>
                      🔒 Este ticket ha sido cerrado por el soporte.
                    </div>
                  ) : (
                    <div className="reply-input-area">
                      <textarea 
                        rows="3" 
                        placeholder="Escribe una respuesta..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      ></textarea>
                      <button onClick={() => handleSendReply(msg._id)} className="send-btn">
                        Enviar
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClientMessages;