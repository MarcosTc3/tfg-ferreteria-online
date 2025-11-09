// src/context/AuthContext.jsx

import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// 1. Creamos el Contexto
const AuthContext = createContext();

// 2. Función helper para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Creamos el Proveedor
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null); // Almacena el "pase digital" (token)
  const [user, setUser] = useState(null);   // Almacena los datos del usuario (id, email, rol)
  const [isLoading, setIsLoading] = useState(true); // Para saber si está cargando

  // La función de LOGIN que llamaremos desde la página de Login
  const login = (newToken) => {
    // 1. Guardamos el token en el estado
    setToken(newToken);
    // 2. Guardamos el token en el localStorage del navegador
    // Esto hace que la sesión se mantenga aunque recargues la página
    localStorage.setItem('token', newToken);

    // 3. Decodificamos el token (una parte) para obtener el 'rol' y el 'id'
    const userData = JSON.parse(atob(newToken.split('.')[1]));
    setUser(userData.user); // Guardamos { id: "...", role: "..." }
  };

  // La función de LOGOUT (Cerrar Sesión)
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  // 4. Comprobar si ya existe un token al cargar la web
  // (Para que no se cierre la sesión al recargar)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const userData = JSON.parse(atob(storedToken.split('.')[1]));
      setToken(storedToken);
      setUser(userData.user);
    }
    setIsLoading(false); // Terminamos de cargar
  }, []);

  // 5. Los valores que compartimos con toda la app
  const value = {
    token,
    user,
    isLoading,
    login,
    logout,
  };

  // No mostramos la app hasta que sepamos si el usuario está logueado o no
  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};