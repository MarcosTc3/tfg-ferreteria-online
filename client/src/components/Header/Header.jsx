// src/components/Header/Header.jsx
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    // Envolvemos todo en un div para la barra de navegación que está debajo
    <div className="header-wrapper">
      <header>
        <div className="logo-container">
          {/* Usamos un Link en el logo para que siempre lleve a Inicio */}
          <Link to="/">
            <h2>MiFerretería</h2>
          </Link>
        </div>

        <div className="search-container">
          <input type="text" placeholder="Buscar por nombre o referencia..." />
          <button type="submit">🔍</button>
        </div>

        <div className="cart-container">
          <span>🛒</span>
          <p>Total: 0,00 €</p>
        </div>
      </header>

      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/tienda">Tienda</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {/* Aquí puedes añadir más enlaces como "Categorías", "Marcas", etc. */}
        </ul>
      </nav>
    </div>
  );
}

export default Header;