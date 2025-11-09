// server/models/Message.model.js

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Para saber si ya lo leíste en el panel
    },
  },
  {
    timestamps: true, // Guarda la fecha en que se recibió
  }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;