// server/routes/images.routes.js

import { Router } from 'express';
import { getProductImages } from '../controllers/images.controller.js';

const router = Router();

// GET /api/images -> Devuelve la lista de archivos
router.get('/', getProductImages);

export default router;