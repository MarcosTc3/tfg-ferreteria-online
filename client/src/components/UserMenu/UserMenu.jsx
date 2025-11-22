// src/components/UserMenu/UserMenu.jsx

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import './UserMenu.css';

function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Para saber dónde estamos

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  // Función para obtener solo el primer nombre
  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  return (
    <div className="user-menu-container">
      
      <FaUserCircle className="user-icon" />

      <div className="user-dropdown">
        {user ? (
          // --- VISTA LOGUEADO ---
          <>
            <div className="dropdown-header">
              {/* Saludo corregido: Sin coma y solo primer nombre */}
              <span>Bienvenido {getFirstName(user.name) || user.email}</span>
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
            <Link to="/mis-mensajes" className="dropdown-item">Mis Mensajes</Link>
            
            <button onClick={handleLogout} className="dropdown-item logout-btn">
              Cerrar Sesión
            </button>
          </>
        ) : (
          // --- VISTA INVITADO ---
          <>
            <div className="dropdown-header">
              <span>Invitado</span>
            </div>
            {/* Enlace Login corregido: Pasa la ubicación actual */}
            <Link 
              to="/login" 
              state={{ from: location }} 
              className="dropdown-item"
            >
              Iniciar Sesión
            </Link>
            <Link to="/registro" className="dropdown-item">Registrarse</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserMenu;