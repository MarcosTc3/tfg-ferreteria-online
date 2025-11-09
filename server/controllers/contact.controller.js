// server/controllers/contact.controller.js

import Message from '../models/Message.model.js';

// Controlador para guardar un nuevo mensaje de contacto
export const saveMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Validamos que todos los campos estén
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    // Creamos la nueva instancia del mensaje
    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    // Guardamos en la base de datos
    await newMessage.save();

    // Respondemos al frontend con éxito
    res.status(201).json({ msg: 'Mensaje enviado correctamente' });

  } catch (error) {
    console.error('Error al guardar el mensaje:', error.message);
    res.status(500).send('Error del servidor');
  }
};