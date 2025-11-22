// server/routes/order.routes.js

import { Router } from 'express';
import { 
  createOrder, 
  getAllOrders, 
  updateOrderStatus,
  getMyOrders // <-- Importar
} from '../controllers/order.controller.js';
import { auth, admin } from '../middleware/auth.middleware.js';

const router = Router();

// Rutas Cliente
router.post('/', auth, createOrder);
router.get('/myorders', auth, getMyOrders); // <-- NUEVA RUTA

// Rutas Admin
router.get('/', [auth, admin], getAllOrders);
router.put('/:id/status', [auth, admin], updateOrderStatus);

export default router;