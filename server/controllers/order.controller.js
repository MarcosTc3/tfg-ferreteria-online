// server/controllers/order.controller.js

import Order from '../models/Order.model.js';

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

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
      
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener los pedidos:', error.message);
    res.status(500).send('Error del servidor');
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; 
    const orderId = req.params.id; 

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ msg: 'Pedido no encontrado' });
    }

    order.orderStatus = status;
    
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

// --- NUEVA FUNCIÓN: OBTENER MIS PEDIDOS ---
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('Error al obtener mis pedidos:', error.message);
    res.status(500).send('Error del servidor');
  }
};