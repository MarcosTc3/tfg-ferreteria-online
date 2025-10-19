// src/components/ContactInfo/ContactInfo.jsx

import './ContactInfo.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'; // Importamos los iconos

function ContactInfo() {
  return (
    <div className="contact-info-container">
      <h3>Información de Contacto</h3>
      <p>Ponte en contacto con nosotros o visítanos. Estaremos encantados de ayudarte.</p>
      <ul className="info-list">
        <li>
          <FaMapMarkerAlt className="info-icon" />
          <span>Calle Ficticia, 123, 28947 Fuenlabrada, Madrid</span>
        </li>
        <li>
          <FaPhone className="info-icon" />
          <span>912 345 678</span>
        </li>
        <li>
          <FaEnvelope className="info-icon" />
          <span>contacto@miferreteria.com</span>
        </li>
        <li>
          <FaClock className="info-icon" />
          <span>Lunes a Viernes: 9:00 - 20:00</span>
        </li>
      </ul>
    </div>
  );
}

export default ContactInfo;