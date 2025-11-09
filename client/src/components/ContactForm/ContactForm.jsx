// src/components/ContactForm/ContactForm.jsx

import { useState } from 'react';
import axios from 'axios'; // 1. Importamos axios
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Estado para mensajes de éxito o error
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const { name, email, subject, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setStatusMsg('');

    try {
      // 2. Apuntamos a nuestro nuevo endpoint del backend
      const res = await axios.post('http://localhost:5000/api/contact', formData);

      // 3. Mostramos mensaje de éxito y limpiamos el formulario
      setStatusMsg(res.data.msg); // "Mensaje enviado correctamente"
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err) {
      // 4. Mostramos el error que nos envía el backend
      setIsError(true);
      setStatusMsg(err.response.data.msg || 'Error en el servidor');
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Envíanos un Mensaje</h3>

      {/* 5. Mostramos el mensaje de estado (éxito o error) */}
      {statusMsg && (
        <div className={`status-message ${isError ? 'error-msg' : 'success-msg'}`}>
          {statusMsg}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input type="text" id="name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Asunto</label>
          <input type="text" id="subject" name="subject" value={subject} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows="6" value={message} onChange={onChange} required></textarea>
        </div>
        <button type="submit" className="submit-button">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default ContactForm;