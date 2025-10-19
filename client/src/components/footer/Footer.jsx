// src/components/Footer/Footer.jsx

import './Footer.css';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          {/* Columna 1: Tienda y Exposición */}
          <div className="footer-column">
            <h4><FaMapMarkerAlt /> Tienda y Exposición</h4>
            <ul className="footer-info-list">
              <li>Plaza Valdeserrano, 9, 28945 Fuenlabrada, Madrid</li>
              <li><FaPhone /> 91 607 77 77 (Ejemplo)</li>
              <li><FaEnvelope /> info@ferreteriaelarroyo.com (Ejemplo)</li>
              <li>
                <FaClock />
                <div className="horario-footer">
                  <span>L-V: 8:30-14:00 y 16:30-20:00</span>
                  <span>Sáb: 9:00-14:00</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Columna 2: Sobre Nosotros */}
          <div className="footer-column">
            <h4>Ferretería El Arroyo</h4>
            <p>Tu ferretería de confianza y suministros industriales en Fuenlabrada desde 1980.</p>
            <p>Formamos parte de la red de tiendas <strong>Ferrokey</strong>.</p>
          </div>

          {/* Columna 3: Síguenos */}
          <div className="footer-column">
            <h4>Síguenos</h4>
            <div className="social-icons">
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="TikTok"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ferretería El Arroyo - TFG Marcos Toribio Cano</p>
          <div className="footer-legal-links">
            <Link to="/politica-privacidad">Política de Privacidad</Link>
            <Link to="/aviso-legal">Aviso Legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;