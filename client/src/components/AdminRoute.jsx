// src/components/AdminRoute.jsx

import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  // 1. Si no hay usuario O el usuario NO es 'admin'
  if (!user || user.role !== 'admin') {
    // Lo redirigimos al inicio
    return <Navigate to="/" replace />;
  }

  // 2. Si es admin, le dejamos pasar
  return children;
}

export default AdminRoute;