// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>¡Vaya! Te has perdido.</h2>
      <p>La página que buscas no existe o ha sido movida.</p>
      <Link to="/" className="back-home-btn">Volver al Inicio</Link>
    </div>
  );
}

export default NotFound;