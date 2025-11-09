// src/components/ProtectedRoute.jsx

import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

// Este componente recibe 'children', que es la página que queremos proteger
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  // 1. Esperamos a que el AuthContext termine de cargar
  // (Esto evita redirigir al login si solo estamos recargando la página)
  if (isLoading) {
    return <div>Cargando...</div>; // Puedes poner un spinner aquí
  }

  // 2. Si ya no está cargando Y NO hay usuario...
  if (!user) {
    // Redirigimos al usuario a la página de login
    return <Navigate to="/login" replace />;
  }

  // 3. Si todo está bien (no está cargando y SÍ hay usuario),
  // mostramos la página que quería ver (los 'children').
  return children;
}

export default ProtectedRoute;