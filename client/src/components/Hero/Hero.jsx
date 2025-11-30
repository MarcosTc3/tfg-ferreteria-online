// src/components/Hero/Hero.jsx
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <section className="hero-container">
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-badge">¡Bienvenidos!</span>
          <h1 className="hero-title">Ferretería El Arroyo</h1>
          <p className="hero-subtitle">
            Suministros industriales, bricolaje y asesoramiento profesional en Fuenlabrada desde 1980.
          </p>
          <div className="hero-buttons">
            <Link to="/tienda" className="btn-primary">Ver Catálogo</Link>
            <Link to="/contacto" className="btn-outline">Contactar</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;