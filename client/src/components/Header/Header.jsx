// src/components/Header/Header.jsx

import { useState, useEffect, useRef } from 'react'; // 1. Importamos más hooks
import { NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../assets/logo.jpg';
import { useCart } from '../../context/CartContext';
import CartPreview from '../CartPreview/CartPreview';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 2. Estado para la animación del carrito
  const [isAnimating, setIsAnimating] = useState(false);
  
  // 3. Ref para guardar el número previo de items
  const prevTotalItems = useRef(totalItems);

  // 4. Efecto que se ejecuta CADA VEZ que 'totalItems' cambia
  useEffect(() => {
    // Solo animamos si el número de items AUMENTÓ
    if (totalItems > prevTotalItems.current) {
      setIsAnimating(true); // Activa la animación
      
      // 5. Quita la animación después de 300ms (lo que dura la animación CSS)
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
    
    // 6. Actualiza el valor previo para la próxima vez
    prevTotalItems.current = totalItems;
  }, [totalItems]); // Este efecto vigila la variable 'totalItems'


  const closeMobileMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container header-container">
        <NavLink to="/" onClick={closeMobileMenu}>
          <img src={logo} alt="Logo Ferretería El Arroyo" className="header-logo" />
        </NavLink>

        <div className="header-right">
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
            {/* 7. Aplicamos la clase de animación 'pop' si 'isAnimating' es true */}
            <NavLink to="/carrito" className={`cart-icon-link ${isAnimating ? 'pop' : ''}`}>
              <FaShoppingCart />
              {totalItems > 0 && <span className="cart-item-count">{totalItems}</span>}
            </NavLink>
            <div className="cart-preview-wrapper">
              <CartPreview />
            </div>
          </div>

          <button className="menu-toggle" onClick={() => setIsMenuOpen(true)}>
            <FaBars />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;