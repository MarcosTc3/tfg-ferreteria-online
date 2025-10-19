// src/components/Header/Header.jsx

import { useState } from 'react'; // 1. Importamos useState
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.jpg';
import { useCart } from '../../context/CartContext';
import CartPreview from '../CartPreview/CartPreview';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'; // 2. Importamos iconos de menú

function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // 3. Estado para controlar si el menú móvil está abierto o cerrado
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 4. Función para cerrar el menú (la usaremos en los enlaces)
  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo Ferretería El Arroyo" className="header-logo" />
        </NavLink>

        <div className="header-right">
          {/* 5. Aplicamos una clase condicional al <nav> */}
          <nav className={isMenuOpen ? "main-navigation nav-open" : "main-navigation"}>
            <div className="mobile-menu-header">
              <span>Menú</span>
              <button className="close-menu-btn" onClick={() => setIsMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <ul>
              <li><NavLink to="/" onClick={closeMobileMenu}>Inicio</NavLink></li>
              <li><NavLink to="/quienes-somos" onClick={closeMobileMenu}>Quiénes Somos</NavLink></li>
              <li><NavLink to="/tienda" onClick={closeMobileMenu}>Tienda</NavLink></li>
              <li><NavLink to="/servicios" onClick={closeMobileMenu}>Servicios</NavLink></li>
              <li><NavLink to="/contacto" onClick={closeMobileMenu}>Contacto</NavLink></li>
            </ul>
          </nav>

          <div className="header-cart-container">
            <NavLink to="/carrito" className="cart-icon-link">
              <FaShoppingCart />
              {totalItems > 0 && <span className="cart-item-count">{totalItems}</span>}
            </NavLink>
            <div className="cart-preview-wrapper">
              <CartPreview />
            </div>
          </div>

          {/* 6. Botón de hamburguesa que solo se verá en móvil */}
          <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;