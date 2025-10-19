// src/pages/Contacto.jsx

import './Contacto.css';
import ContactInfo from '../components/ContactInfo/ContactInfo';
import ContactForm from '../components/ContactForm/ContactForm';

function Contacto() {
  // URL para buscar la dirección en Google Maps (para el enlace)
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Plaza+Valdeserrano+9+Fuenlabrada+Madrid";

  // URL para incrustar el mapa (para el iframe)
  const embedUrl = "https://maps.google.com/maps?q=Plaza%20Valdeserrano%209%20Fuenlabrada&t=&z=17&ie=UTF8&iwloc=&output=embed";

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
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" title="Ver en Google Maps">
            <iframe
              src={embedUrl}
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