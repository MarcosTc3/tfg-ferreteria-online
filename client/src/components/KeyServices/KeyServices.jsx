// src/components/KeyServices/KeyServices.jsx

import { Link } from 'react-router-dom';
import { FaKey, FaPaintRoller, FaTools } from 'react-icons/fa'; 
import './KeyServices.css';

function KeyServices() {
  return (
    <section className="keyservices-section">
      <div className="container">
        {/* Título de la sección integrado aquí para mejor control */}
        <h2 className="keyservices-header">Nuestras Especialidades</h2>
        
        <div className="services-wrapper">
          
          <Link to="/servicios" className="service-card-item">
            <div className="service-icon-box">
              <FaKey />
            </div>
            <div className="service-content">
              <h3>Copia de Llaves</h3>
              <p>Duplicado al instante de todo tipo de llaves y mandos.</p>
              <span className="service-link">Saber más &rarr;</span>
            </div>
          </Link>

          <Link to="/servicios" className="service-card-item">
            <div className="service-icon-box">
              <FaPaintRoller />
            </div>
            <div className="service-content">
              <h3>Pinturas a la Carta</h3>
              <p>Creamos tu color exacto con nuestro sistema tintométrico.</p>
              <span className="service-link">Saber más &rarr;</span>
            </div>
          </Link>

          <Link to="/servicios" className="service-card-item">
            <div className="service-icon-box">
              <FaTools />
            </div>
            <div className="service-content">
              <h3>Alquiler de Maquinaria</h3>
              <p>Herramientas profesionales a tu disposición por días.</p>
              <span className="service-link">Saber más &rarr;</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}

export default KeyServices;