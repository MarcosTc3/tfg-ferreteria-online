// src/components/Chatbot/Chatbot.jsx

import { useState } from 'react';
import { FaRobot, FaTimes, FaPaperPlane } from 'react-icons/fa';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado para guardar el historial de la conversación actual
  const [messages, setMessages] = useState([
    { text: "¡Hola! Soy el asistente virtual de Ferretería El Arroyo. ¿En qué puedo ayudarte hoy?", sender: "bot" }
  ]);

  // Las opciones predefinidas (Árbol de decisiones)
  const options = [
    { label: "🕒 Horario de Tienda", answer: "Nuestro horario es de Lunes a Viernes de 8:30 a 14:00 y de 16:30 a 20:00. Sábados de 9:00 a 14:00." },
    { label: "📍 ¿Dónde estáis?", answer: "Estamos en Plaza Valdeserrano, 9, Fuenlabrada, Madrid. ¡Ven a visitarnos!" },
    { label: "🚚 Envíos y Devoluciones", answer: "Realizamos envíos a toda la península en 24/48h. Tienes 15 días para devoluciones." },
    { label: "📞 Contacto Directo", answer: "Puedes llamarnos al 91 607 77 77 o escribirnos en la sección de Contacto." },
  ];

  const handleOptionClick = (option) => {
    // 1. Añadimos la pregunta del usuario
    const newMessages = [...messages, { text: option.label, sender: "user" }];
    setMessages(newMessages);

    // 2. Simulamos un pequeño retraso para que parezca que "piensa"
    setTimeout(() => {
      setMessages(prev => [...prev, { text: option.answer, sender: "bot" }]);
    }, 600);
  };

  return (
    <div className="chatbot-wrapper">
      {/* Botón flotante para abrir/cerrar */}
      <button 
        className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </button>

      {/* Ventana del Chat */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Asistente Virtual</h3>
            <span className="online-dot"></span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-options">
            <p>Selecciona una opción:</p>
            <div className="options-grid">
              {options.map((opt, index) => (
                <button 
                  key={index} 
                  className="option-btn"
                  onClick={() => handleOptionClick(opt)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;