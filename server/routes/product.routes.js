// server/routes/product.routes.js

import { Router } from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  deleteProduct,
  updateProduct // <-- 1. IMPORTAR
} from '../controllers/product.controller.js';
import { auth, admin } from '../middleware/auth.middleware.js';

const router = Router();

// Rutas Públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rutas Privadas (Solo Admin)
router.post('/', [auth, admin], createProduct);
router.delete('/:id', [auth, admin], deleteProduct);

// 2. NUEVA RUTA PUT PARA ACTUALIZAR
router.put('/:id', [auth, admin], updateProduct);

export default router;