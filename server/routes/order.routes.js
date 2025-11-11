// server/routes/order.routes.js

import { Router } from 'express';
// 1. Importamos las nuevas funciones
import { 
  createOrder, 
  getAllOrders, 
  updateOrderStatus 
} from '../controllers/order.controller.js';

// 2. Importamos AMBOS guardias
import { auth, admin } from '../middleware/auth.middleware.js';

const router = Router();

// --- RUTA DE CLIENTE ---
// POST /api/orders (Cualquier usuario logueado puede crear un pedido)
router.post('/', auth, createOrder);

// --- RUTAS DE ADMIN ---

// GET /api/orders (Solo un ADMIN puede ver todos los pedidos)
router.get('/', [auth, admin], getAllOrders);

// PUT /api/orders/:id/status (Solo un ADMIN puede cambiar el estado)
router.put('/:id/status', [auth, admin], updateOrderStatus);

export default router;