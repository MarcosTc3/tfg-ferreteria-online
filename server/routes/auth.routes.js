// server/routes/auth.routes.js

import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/auth.controller.js'; // <-- 1. IMPORTAR LOGIN

const router = Router();

// --- RUTA DE REGISTRO (la que ya tenías) ---
router.post(
  '/register',
  [
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'Por favor, incluye un email válido').isEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres')
      .matches(/\d/)
      .withMessage('La contraseña debe contener al menos un número')
      .matches(/[a-z]/)
      .withMessage('La contraseña debe contener al menos una minúscula')
      .matches(/[A-Z]/)
      .withMessage('La contraseña debe contener al menos una mayúscula'),
  ],
  register
);

// --- NUEVA RUTA DE LOGIN ---
router.post(
  '/login',
  [
    // Validamos que nos envíen un email y una contraseña
    body('email', 'Por favor, incluye un email válido').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],
  login // <-- 2. USAR LA FUNCIÓN LOGIN
);

export default router;