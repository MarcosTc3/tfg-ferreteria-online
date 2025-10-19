// src/components/ContactForm/ContactForm.jsx

import { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "El nombre es obligatorio.";
    if (!formData.email) {
      formErrors.email = "El email es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "El formato del email no es válido.";
    }
    if (!formData.subject) formErrors.subject = "El asunto es obligatorio.";
    if (!formData.message) formErrors.message = "El mensaje es obligatorio.";
    
    return formErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      alert('Formulario enviado (simulación). ¡Gracias por contactar!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="contact-form-container">
      <h3>Envíanos un Mensaje</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'input-error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Asunto</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? 'input-error' : ''}
          />
          {errors.subject && <span className="error-text">{errors.subject}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? 'input-error' : ''}
          ></textarea>
          {errors.message && <span className="error-text">{errors.message}</span>}
        </div>
        <button type="submit" className="submit-button">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default ContactForm;