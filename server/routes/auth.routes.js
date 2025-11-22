// server/routes/auth.routes.js

import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, updateProfile } from '../controllers/auth.controller.js'; // Importar updateProfile
import { auth } from '../middleware/auth.middleware.js';

const router = Router();

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

router.post(
  '/login',
  [
    body('email', 'Por favor, incluye un email válido').isEmail(),
    body('password', 'La contraseña es obligatoria').not().isEmpty(),
  ],
  login
);

// --- NUEVA RUTA ---
router.put('/update', auth, updateProfile);

export default router;