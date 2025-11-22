// src/pages/AdminMessages.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../layouts/AdminLayout';
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
          setError('Error de conexión. ¿Está el servidor backend encendido?');
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
      
      const res = await axios.put(`http://localhost:5000/api/contact/reply/${messageId}`, body, config);

      setMessages(currentMessages =>
        currentMessages.map(msg =>
          msg._id === messageId ? res.data : msg
        )
      );

      setReplyText('');

    } catch (err) {
      alert('Error al enviar la respuesta.');
      console.error(err);
    }
  };

  // --- NUEVA FUNCIÓN: CERRAR TICKET ---
  const handleCloseTicket = async (messageId) => {
    if(!window.confirm("¿Seguro que quieres cerrar este ticket? El cliente ya no podrá responder.")) return;

    try {
      const config = { headers: { 'x-auth-token': token } };
      
      // Llamamos a la nueva ruta
      const res = await axios.put(`http://localhost:5000/api/contact/close/${messageId}`, {}, config);

      // Actualizamos localmente
      setMessages(currentMessages =>
        currentMessages.map(msg =>
          msg._id === messageId ? res.data : msg
        )
      );

    } catch (err) {
      alert('Error al cerrar el ticket.');
      console.error(err);
    }
  };

  const toggleChat = (id) => {
    if (activeChatId === id) {
      setActiveChatId(null); // Usaba una variable que olvidé declarar arriba, corregido abajo
    } else {
      setActiveChatId(id);
      setReplyText('');
    }
  };

  // Necesitamos declarar activeChatId (se me pasó en la copia anterior, aquí lo pongo bien)
  const [activeChatId, setActiveChatId] = useState(null);


  if (loading) return <AdminLayout><div style={{ padding: '4rem', textAlign: 'center' }}>Cargando...</div></AdminLayout>;
  if (error) return <AdminLayout><div style={{ color: 'red', padding: '2rem' }}>{error}</div></AdminLayout>;
  
  return (
    <AdminLayout>
      <div className="admin-messages-container">
        <h1>Buzón de Mensajes</h1>
        
        {messages.length === 0 ? (
          <p>No hay mensajes nuevos.</p>
        ) : (
          <table className="messages-table">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Asunto</th>
                <th>Estado</th>
                <th>Fecha</th>
                <th>Conversación</th>
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
                  <td>
                    <span className={`status-badge ${msg.status}`}>
                      {msg.status}
                    </span>
                  </td>
                  <td className="message-date">
                    {new Date(msg.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td className="message-action">
                    
                    <button 
                      onClick={() => toggleChat(msg._id)} 
                      className="toggle-chat-btn"
                    >
                      {activeChatId === msg._id ? 'Cerrar' : 'Ver / Responder'}
                    </button>

                    {activeChatId === msg._id && (
                      <div className="chat-container" style={{ marginTop: '1rem' }}>
                        
                        <div className="chat-history">
                          <div className="chat-bubble client">
                            <span className="bubble-meta">{msg.name} (Original)</span>
                            {msg.message}
                          </div>

                          {msg.replies && msg.replies.map((reply, index) => (
                            <div key={index} className={`chat-bubble ${reply.sender}`}>
                              <span className="bubble-meta">
                                {reply.sender === 'admin' ? 'Tú (Admin)' : msg.name} - {new Date(reply.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                              {reply.text}
                            </div>
                          ))}
                        </div>

                        {/* --- LOGICA DE ESTADO CERRADO --- */}
                        {msg.status === 'Cerrado' ? (
                          <div className="chat-closed-message">
                            Este ticket está cerrado. No se pueden enviar más respuestas.
                          </div>
                        ) : (
                          <div className="reply-input-area">
                            <textarea 
                              rows="3" 
                              placeholder="Escribe tu respuesta..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                            ></textarea>
                            <button onClick={() => handleSendReply(msg._id)} className="send-btn">
                              Enviar
                            </button>
                            
                            {/* BOTÓN PARA CERRAR TICKET */}
                            <button onClick={() => handleCloseTicket(msg._id)} className="close-ticket-btn">
                              Cerrar Ticket
                            </button>
                          </div>
                        )}

                      </div>
                    )}
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

export default AdminMessages;