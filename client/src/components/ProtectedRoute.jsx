// src/components/ProtectedRoute.jsx

import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    // Pasamos la ubicación actual en el estado para redirigir después
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default ProtectedRoute;