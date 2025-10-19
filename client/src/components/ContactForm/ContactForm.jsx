// src/components/ContactForm/ContactForm.jsx

import './ContactForm.css';

function ContactForm() {
  // Esta función es solo un ejemplo, no hará nada por ahora
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que la página se recargue al enviar
    alert('Formulario enviado (simulación). ¡Gracias por contactar!');
  };

  return (
    <div className="contact-form-container">
      <h3>Envíanos un Mensaje</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre Completo</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Asunto</label>
          <input type="text" id="subject" name="subject" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows="6" required></textarea>
        </div>
        <button type="submit" className="submit-button">Enviar Mensaje</button>
      </form>
    </div>
  );
}

export default ContactForm;