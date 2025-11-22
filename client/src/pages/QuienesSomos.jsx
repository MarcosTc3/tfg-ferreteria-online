// src/pages/QuienesSomos.jsx

import './InfoPages.css';

function QuienesSomos() {
  return (
    <div className="info-page-container">
      <div className="info-header">
        <h1>Sobre Ferretería El Arroyo</h1>
        <p>Más de 40 años al servicio de los vecinos y profesionales de Fuenlabrada.</p>
      </div>

      <div className="about-section">
        <div className="about-text">
          <h2>Nuestra Historia</h2>
          <p>
            Fundada en 1980, Ferretería El Arroyo comenzó como un pequeño negocio familiar en el corazón de Fuenlabrada. Con el paso de los años, hemos crecido gracias a la confianza de nuestros clientes, convirtiéndonos en un referente en el sector del suministro industrial y el bricolaje.
          </p>
          <p>
            Formamos parte de la red <strong>Ferrokey</strong>, lo que nos permite ofrecer un catálogo con miles de referencias a precios competitivos, sin perder la cercanía y el trato personalizado del comercio de barrio.
          </p>
          <p>
            Nuestro equipo está formado por profesionales expertos que te asesorarán para encontrar la mejor solución, ya seas un particular haciendo una reforma en casa o una empresa de construcción.
          </p>
        </div>
        <div className="about-image">
          {/* Asegúrate de que la imagen esté en la carpeta 'public' */}
          <img src="/fachada.jpg" alt="Fachada de Ferretería El Arroyo" />
        </div>
      </div>

      <div className="info-header" style={{ marginTop: '4rem' }}>
        <h2>Nuestros Valores</h2>
      </div>

      <div className="services-grid">
        <div className="service-card">
          <h3>Cercanía</h3>
          <p>Trato directo y personalizado. Conocemos a nuestros clientes y sus necesidades.</p>
        </div>
        <div className="service-card">
          <h3>Calidad</h3>
          <p>Trabajamos con las mejores marcas del mercado para garantizar la durabilidad.</p>
        </div>
        <div className="service-card">
          <h3>Experiencia</h3>
          <p>Cuatro décadas de experiencia nos avalan para resolver cualquier duda técnica.</p>
        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;