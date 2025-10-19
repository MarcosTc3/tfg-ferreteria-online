// src/components/Header/Header.jsx

import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.jpg'; // Importamos el logo desde la carpeta assets

function Header() {
  return (
    <header className="site-header">
      <div className="container header-container">
        {/* El logo ahora es un enlace a la página de inicio */}
        <NavLink to="/">
          <img src={logo} alt="Logo Ferretería El Arroyo" className="header-logo" />
        </NavLink>

        <nav className="main-navigation">
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/quienes-somos">Quiénes Somos</NavLink></li>
            <li><NavLink to="/tienda">Tienda</NavLink></li>
            <li><NavLink to="/servicios">Servicios</NavLink></li>
            <li><NavLink to="/contacto">Contacto</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;