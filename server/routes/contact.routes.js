// server/routes/contact.routes.js

import { Router } from 'express';
import { saveMessage, getMessages } from '../controllers/contact.controller.js';
import { auth, admin } from '../middleware/auth.middleware.js';

const router = Router();

// POST /api/contact (Pública)
router.post('/', saveMessage);

// GET /api/contact (Solo Admin)
router.get('/', [auth, admin], getMessages);

export default router;