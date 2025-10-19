/* src/components/ContactForm/ContactForm.css */

.contact-form-container {
  padding: 2rem;
  background-color: #ffffff;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.contact-form-container h3 {
  margin-top: 0;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative; /* Para posicionar el mensaje de error */
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #004a99;
  box-shadow: 0 0 5px rgba(0, 74, 153, 0.2);
}

/* --- NUEVOS ESTILOS PARA ERRORES --- */
.input-error {
  border-color: #e3001b; /* Borde rojo si hay error */
}

.input-error:focus {
  border-color: #e3001b;
  box-shadow: 0 0 5px rgba(227, 0, 27, 0.2);
}

.error-text {
  color: #e3001b;
  font-size: 0.875rem;
  padding-top: 4px;
  display: block;
}
/* --- FIN DE NUEVOS ESTILOS --- */

.submit-button {
  width: 100%;
  background-color: #e3001b;
  color: white;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #c40017;
}