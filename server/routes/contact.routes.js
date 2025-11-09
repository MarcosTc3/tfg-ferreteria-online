// server/routes/contact.routes.js

import { Router } from 'express';
import { saveMessage } from '../controllers/contact.controller.js';

const router = Router();

// Definimos la ruta POST /api/contact
router.post('/', saveMessage);

export default router;