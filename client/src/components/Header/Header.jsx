// src/components/Header/Header.jsx

import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.jpg';
import { useCart } from '../../context/CartContext';
import CartPreview from '../CartPreview/CartPreview';
import { FaShoppingCart } from 'react-icons/fa';

function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/">
          <img src={logo} alt="Logo Ferretería El Arroyo" className="header-logo" />
        </NavLink>

        {/* --- NUEVO DIV PARA AGRUPAR LA PARTE DERECHA --- */}
        <div className="header-right">
          <nav className="main-navigation">
            <ul>
              <li><NavLink to="/">Inicio</NavLink></li>
              <li><NavLink to="/quienes-somos">Quiénes Somos</NavLink></li>
              <li><NavLink to="/tienda">Tienda</NavLink></li>
              <li><NavLink to="/servicios">Servicios</NavLink></li>
              <li><NavLink to="/contacto">Contacto</NavLink></li>
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
        </div>
        {/* --- FIN DEL DIV AGRUPADOR --- */}
        
      </div>
    </header>
  );
}

export default Header;