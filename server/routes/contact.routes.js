// server/routes/contact.routes.js

import { Router } from 'express';
import { 
  saveMessage, 
  getMessages, 
  replyToMessage,
  getMyMessages,
  replyAsClient,
  closeTicket // <-- 1. IMPORTAR
} from '../controllers/contact.controller.js';
import { auth, admin } from '../middleware/auth.middleware.js';
import jwt from 'jsonwebtoken';

const router = Router();

const authOptional = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;
    } catch (err) {}
  }
  next();
};

router.post('/', authOptional, saveMessage);

router.get('/my-messages', auth, getMyMessages);
router.put('/reply-as-client/:messageId', auth, replyAsClient);

// --- RUTAS DE ADMIN ---
router.get('/', [auth, admin], getMessages);
router.put('/reply/:messageId', [auth, admin], replyToMessage);

// 2. NUEVA RUTA PARA CERRAR TICKET
router.put('/close/:messageId', [auth, admin], closeTicket);

export default router;