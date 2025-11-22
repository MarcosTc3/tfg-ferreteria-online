// src/components/AdminSidebar/AdminSidebar.jsx

import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBoxOpen, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import './AdminSidebar.css';

function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <h2>Panel Admin</h2>
      </div>
      
      <nav className="admin-sidebar-nav">
        <ul>
          {/* 1. Texto limpio: solo "Mensajes" */}
          <li>
            <NavLink to="/admin" end className={({ isActive }) => isActive ? "active" : ""}>
              <FaEnvelope className="icon" /> Mensajes
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/admin/pedidos" className={({ isActive }) => isActive ? "active" : ""}>
              <FaBoxOpen className="icon" /> Pedidos
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="admin-sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt className="icon" /> Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;