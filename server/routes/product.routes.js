// server/routes/product.routes.js

import { Router } from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  deleteProduct 
} from '../controllers/product.controller.js';
import { auth, admin } from '../middleware/auth.middleware.js';

const router = Router();

// Rutas Públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rutas Privadas (Solo Admin)
router.post('/', [auth, admin], createProduct);
router.delete('/:id', [auth, admin], deleteProduct);

export default router;