// server/models/Message.model.js

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    // Vinculamos el mensaje a un Usuario (Opcional, por si escribe un invitado)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true }, // El mensaje original
    isRead: { type: Boolean, default: false },
    
    // --- NUEVO: Historial de respuestas (Chat) ---
    replies: [
      {
        sender: { type: String, enum: ['admin', 'client'], required: true }, // Quién escribe
        text: { type: String, required: true }, // Qué dice
        createdAt: { type: Date, default: Date.now }, // Cuándo lo dijo
      }
    ],
    
    // Estado del ticket
    status: {
      type: String,
      enum: ['Abierto', 'Respondido', 'Cerrado'],
      default: 'Abierto'
    }
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;