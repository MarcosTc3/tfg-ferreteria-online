// server/controllers/contact.controller.js

import Message from '../models/Message.model.js';

// 1. GUARDAR MENSAJE (Ahora intenta guardar el ID del usuario si existe)
export const saveMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
      // Si el middleware 'auth' detectó un usuario, guardamos su ID. Si no, null.
      user: req.user ? req.user.id : null 
    });

    await newMessage.save();
    res.status(201).json({ msg: 'Mensaje enviado correctamente' });

  } catch (error) {
    console.error('Error al guardar mensaje:', error.message);
    res.status(500).send('Error del servidor');
  }
};

// 2. OBTENER TODOS (Solo Admin) - Sigue igual
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// 3. RESPONDER COMO ADMIN
export const replyToMessage = async (req, res) => {
  const { messageId } = req.params;
  const { replyText } = req.body;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ msg: 'Mensaje no encontrado' });

    // Añadimos la respuesta al array
    message.replies.push({
      sender: 'admin',
      text: replyText
    });
    
    message.status = 'Respondido'; // Cambiamos estado
    await message.save();

    // Devolvemos el mensaje completo actualizado
    res.json(message);

  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// --- NUEVAS FUNCIONES PARA EL CLIENTE ---

// 4. OBTENER MIS MENSAJES (Cliente)
export const getMyMessages = async (req, res) => {
  try {
    // Buscamos mensajes donde el campo 'user' coincida con el ID del que pide
    const messages = await Message.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// 5. RESPONDER COMO CLIENTE (Para seguir el hilo)
export const replyAsClient = async (req, res) => {
  const { messageId } = req.params;
  const { replyText } = req.body;

  try {
    // Importante: Nos aseguramos de que el mensaje pertenezca al usuario que intenta responder
    const message = await Message.findOne({ _id: messageId, user: req.user.id });
    if (!message) return res.status(404).json({ msg: 'Mensaje no encontrado o no autorizado' });

    message.replies.push({
      sender: 'client',
      text: replyText
    });
    
    message.status = 'Abierto'; // Vuelve a estar abierto porque el cliente contestó
    await message.save();

    res.json(message);

  } catch (error) {
    res.status(500).send('Error del servidor');
  }
};

// --- NUEVA FUNCIÓN PARA CERRAR TICKET ---
export const closeTicket = async (req, res) => {
  const { messageId } = req.params;

  try {
    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ msg: 'Mensaje no encontrado' });

    message.status = 'Cerrado';
    await message.save();

    res.json(message); // Devolvemos el mensaje actualizado
  } catch (error) {
    console.error('Error al cerrar el ticket:', error.message);
    res.status(500).send('Error del servidor');
  }
};