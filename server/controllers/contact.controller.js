// server/controllers/contact.controller.js

import Message from '../models/Message.model.js';

// Controlador para GUARDAR un nuevo mensaje
export const saveMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();
    res.status(201).json({ msg: 'Mensaje enviado correctamente' });
  } catch (error) {
    console.error('Error al guardar el mensaje:', error.message);
    res.status(500).send('Error del servidor');
  }
};

// Controlador para OBTENER todos los mensajes (solo para admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    console.error('Error al obtener los mensajes:', error.message);
    res.status(500).send('Error del servidor');
  }
};