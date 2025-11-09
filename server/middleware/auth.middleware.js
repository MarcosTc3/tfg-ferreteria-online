// server/middleware/auth.middleware.js

import jwt from 'jsonwebtoken';

// Este guardia (auth) comprueba si el usuario está logueado
export const auth = (req, res, next) => {
  // 1. Buscamos el token en los 'headers' de la petición
  const token = req.header('x-auth-token');

  // 2. Si no hay token, lo rechazamos
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, permiso denegado' });
  }

  // 3. Si hay token, intentamos verificarlo
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Si es válido, guardamos los datos del usuario en la petición (req)
    // para que las siguientes funciones puedan usarlo
    req.user = decoded.user;
    next(); // Dejamos que la petición continúe

  } catch (err) {
    res.status(401).json({ msg: 'El token no es válido' });
  }
};

// Este guardia (admin) comprueba si el usuario es Admin
export const admin = (req, res, next) => {
  // (Este guardia DEBE usarse DESPUÉS del guardia 'auth')

  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Acceso denegado, no eres administrador' });
  }
  next(); // Si es admin, dejamos pasar
};