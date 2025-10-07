// src/components/KeyServices/KeyServices.jsx
import './KeyServices.css';

function KeyServices() {
  return (
    <section className="keyservices-container">
      <div className="service-item">
        <div className="service-icon-circle">
          {/* Aquí irá un icono SVG o una imagen */}
        </div>
        <h3 className="service-title">SUMINISTROS INDUSTRIALES</h3>
      </div>

      <div className="service-item">
        <div className="service-icon-circle">
          {/* Aquí irá un icono SVG o una imagen */}
        </div>
        <h3 className="service-title">CARPINTERÍA DE MADERA</h3>
      </div>

      <div className="service-item">
        <div className="service-icon-circle">
          {/* Aquí irá un icono SVG o una imagen */}
        </div>
        <h3 className="service-title">ASESORAMIENTO PERSONALIZADO</h3>
      </div>
    </section>
  );
}

export default KeyServices;