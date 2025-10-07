// src/components/Header/Header.jsx
import './Header.css';
import { Link } from 'react-router-dom'; // 1. IMPORTA LINK

function Header() {
  return (
    <header>
      <div>
        <h2>MiFerretería</h2>
      </div>
      <nav>
        <ul>
          {/* 2. REEMPLAZA <a> POR <Link> y href POR to */}
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/tienda">Tienda</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;