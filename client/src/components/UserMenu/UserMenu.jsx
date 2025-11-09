// src/components/UserMenu/UserMenu.jsx

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import './UserMenu.css';

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirigimos al inicio al cerrar sesión
  };

  return (
    <div className="user-menu-container">
      
      {/* 1. Icono de usuario (sin el div rojo) */}
      <FaUserCircle className="user-icon" />

      {/* 2. El menú desplegable (sigue igual) */}
      <div className="user-dropdown">
        {user ? (
          // Contenido si el usuario ESTÁ conectado
          <>
            <div className="dropdown-header">
              <span>Bienvenido, {user.name || user.email}</span>
            </div>
            <Link to="/perfil" className="dropdown-item">Mi Perfil</Link>
            <Link to="/pedidos" className="dropdown-item">Mis Pedidos</Link>
            <button onClick={handleLogout} className="dropdown-item logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          // Contenido si el usuario NO está conectado
          <>
            <div className="dropdown-header">
              <span>Invitado</span>
            </div>
            <Link to="/login" className="dropdown-item">Iniciar Sesión</Link>
            <Link to="/registro" className="dropdown-item">Registrarse</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserMenu;