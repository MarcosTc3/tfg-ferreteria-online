// server/controllers/order.controller.js

import Order from '../models/Order.model.js';

// --- ESTA FUNCIÓN YA LA TENÍAS ---
// Controlador para crear un nuevo pedido (para clientes)
export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    const userId = req.user.id;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ msg: 'No hay artículos en el pedido' });
    }

    const order = new Order({
      user: userId,
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
      orderStatus: 'Pendiente',
      paidAt: Date.now()
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error('Error al crear el pedido:', error.message);
    res.status(500).send('Error del servidor');
  }
};

// --- NUEVA FUNCIÓN ---
// Controlador para OBTENER TODOS los pedidos (solo para Admin)
export const getAllOrders = async (req, res) => {
  try {
    // 1. Buscamos todos los pedidos
    // 2. Usamos .populate() para traer los datos del usuario (nombre y email)
    //    en lugar de solo su ID. ¡Esta es la magia de Mongoose!
    // 3. Ordenamos por fecha (más nuevos primero)
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error.message);
    res.status(500).send('Error del servidor');
  }
};

// --- NUEVA FUNCIÓN ---
// Controlador para ACTUALIZAR EL ESTADO de un pedido (solo para Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // El nuevo estado (ej: "En Camino")
    const orderId = req.params.id; // El ID del pedido

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Pedido no encontrado' });
    }

    // Actualizamos el estado
    order.orderStatus = status;

    // Si el estado es "Entregado", guardamos la fecha de entrega
    if (status === 'Entregado') {
      order.deliveredAt = Date.now();
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } catch (error) {
    console.error('Error al actualizar el pedido:', error.message);
    res.status(500).send('Error del servidor');
  }
};