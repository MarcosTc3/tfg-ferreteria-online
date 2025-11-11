// server/controllers/order.controller.js

import Order from '../models/Order.model.js';

// Controlador para crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    // 1. Obtenemos los datos del frontend (del carrito y el formulario de envío)
    const { orderItems, shippingAddress, totalPrice } = req.body;

    // 2. Obtenemos el ID del usuario que está logueado
    // (Esto lo inyecta nuestro "guardia" auth.middleware.js)
    const userId = req.user.id;

    // 3. Verificamos si nos enviaron productos
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ msg: 'No hay artículos en el pedido' });
    }

    // 4. Creamos la nueva instancia del Pedido usando nuestro "molde"
    const order = new Order({
      user: userId,
      orderItems: orderItems,
      shippingAddress: shippingAddress,
      totalPrice: totalPrice,
      orderStatus: 'Pendiente', // Lo definimos como 'Pendiente' por defecto
      paidAt: Date.now() // Simulamos que se paga al instante
    });

    // 5. Guardamos el pedido en la base de datos
    const createdOrder = await order.save();

    // 6. Respondemos al frontend con el pedido creado
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error('Error al crear el pedido:', error.message);
    res.status(500).send('Error del servidor');
  }
};