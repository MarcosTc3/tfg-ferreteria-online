// src/components/ContactForm/ContactForm.jsx

import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // 1. Importamos el contexto de autenticación
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [statusMsg, setStatusMsg] = useState('');
  const [isError, setIsError] = useState(false);

  const { token } = useAuth(); // 2. Obtenemos el token del usuario logueado

  const { name, email, subject, message } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setStatusMsg('');

    try {
      // 3. Preparamos la configuración. 
      // Si hay token, lo añadimos a la cabecera. Si no, enviamos sin cabecera (anónimo).
      const config = token ? {
        headers: {
          'x-auth-token': token
        }
      } : {};

      // 4. Enviamos la petición con la configuración (que incluye el token si existe)
      const res = await axios.post('http://localhost:5000/api/contact', formData, config);

      setStatusMsg(res.data.msg);
      setFormData({ name: '', email: '', subject: '', message: '' });

    } catch (err) {
      setIsError(true);
      // Comprobación de seguridad por si la respuesta de error no tiene el formato esperado
      const errorMsg = err.response && err.response.data && err.response.data.msg 
        ? err.response.data.msg 
        : 'Error en el servidor';
      setStatusMsg(errorMsg);
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Envíanos un Mensaje</h3>

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