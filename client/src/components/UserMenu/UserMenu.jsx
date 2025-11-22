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
    navigate('/');
  };

  return (
    <div className="user-menu-container">
      <FaUserCircle className="user-icon" />
      <div className="user-dropdown">
        {user ? (
          <>
            <div className="dropdown-header">
              <span>Bienvenido, {user.name || user.email}</span>
            </div>
            
            {user.role === 'admin' && (
              <>
                <Link to="/admin/pedidos" className="dropdown-item admin-link">
                  Gestionar Pedidos
                </Link>
                <Link to="/admin/mensajes" className="dropdown-item admin-link">
                  Ver Mensajes
                </Link>
              </>
            )}
            
            <Link to="/perfil" className="dropdown-item">Mi Perfil</Link>
            <Link to="/pedidos" className="dropdown-item">Mis Pedidos</Link>
            {/* --- NUEVO ENLACE --- */}
            <Link to="/mis-mensajes" className="dropdown-item">Mis Mensajes</Link>
            
            <button onClick={handleLogout} className="dropdown-item logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
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