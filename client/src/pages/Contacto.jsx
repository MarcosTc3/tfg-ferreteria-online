// src/pages/Contacto.jsx

import './Contacto.css';
import ContactInfo from '../components/ContactInfo/ContactInfo';
import ContactForm from '../components/ContactForm/ContactForm';

function Contacto() {
  // URL para buscar la dirección en Google Maps
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Calle+Ficticia+123+Fuenlabrada+Madrid";
  // URL para incrustar el mapa (embed)
  const embedUrl = "https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=Fuenlabrada"; // NOTA: Para producción se necesita una API Key de Google. Usamos una URL genérica para desarrollo.

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
          {/* Al hacer clic, se abrirá Google Maps en una nueva pestaña */}
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" title="Ver en Google Maps">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24341.2291539207!2d-3.816922865234372!3d40.28424599999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd418b3417e65179%3A0x29641b08d3d9396f!2sFuenlabrada%2C%20Madrid!5e0!3m2!1ses!2ses!4v1678886400000!5m2!1ses!2ses"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contacto;