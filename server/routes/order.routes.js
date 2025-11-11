// server/routes/order.routes.js

import { Router } from 'express';
import { createOrder } from '../controllers/order.controller.js';
import { auth } from '../middleware/auth.middleware.js'; // 1. Importamos a nuestro "guardia"

const router = Router();

// 

// Definimos la ruta POST /api/orders
// 2. ¡Aplicamos el guardia!
// Solo si 'auth' (el guardia) da el visto bueno (el usuario tiene un token válido),
// se ejecutará la función 'createOrder'.
router.post('/', auth, createOrder);

export default router;