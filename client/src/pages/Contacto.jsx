// src/pages/Contacto.jsx

import './Contacto.css';
import ContactInfo from '../components/ContactInfo/ContactInfo';
import ContactForm from '../components/ContactForm/ContactForm';

function Contacto() {
  return (
    <div className="contact-page">
      <div className="contact-page-header">
        <h1>Contáctanos</h1>
        <p>Estamos aquí para ayudarte. Rellena el formulario o utiliza nuestros datos de contacto.</p>
      </div>

      <div className="contact-layout container">
        <ContactInfo />
        <ContactForm />

        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12174.96052843477!2d-3.8051515516999246!3d40.28284561877028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd41f531a733e823%3A0xc345f1e58b6e63a3!2sFuenlabrada%2C%20Madrid!5e0!3m2!1ses!2ses!4v1729381669429!5m2!1ses!2ses"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contacto;