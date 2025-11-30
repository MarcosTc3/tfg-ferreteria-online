// src/components/ContactInfo/ContactInfo.jsx

import './ContactInfo.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

function ContactInfo() {
  return (
    <div className="contact-info-container">
      <h3>Información de Contacto</h3>
      <p>Ponte en contacto con nosotros o visítanos. Estaremos encantados de ayudarte.</p>
      <ul className="info-list">
        <li>
          <FaMapMarkerAlt className="info-icon" />
          <span>Plaza Valdeserrano, 9, 28945 Fuenlabrada, Madrid</span>
        </li>
        <li>
          <FaPhone className="info-icon" />
          <span>916 90 38 60</span>
        </li>
        <li>
          <FaEnvelope className="info-icon" />
          <span>info@ferreteriaelarroyo.com</span>
        </li>
        <li className="horario-item">
          <FaClock className="info-icon" />
          <div className="horario-details">
            <strong>Horario de Apertura</strong>
            <span>Lunes a Viernes: 8:30 - 14:00 y 16:30 - 20:00</span>
            <span>Sábados: 9:00 - 14:00</span>
            <span>Domingos: Cerrado</span>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ContactInfo;