// server/models/Order.model.js

import mongoose from 'mongoose';

// 1. Definimos el "molde" para un solo producto DENTRO del pedido
const orderItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  // Guardamos el ID del producto (de nuestro archivo products.js)
  product: { 
    type: String, 
    required: true 
  }, 
});

// 2. Definimos el "molde" principal del Pedido
const orderSchema = new mongoose.Schema(
  {
    // --- ¿QUIÉN COMPRÓ? ---
    // Aquí conectamos este pedido con el usuario que lo hizo.
    // 'ref: 'User'' es lo que crea la magia, lo enlaza con tu 'User.model.js'
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    // --- ¿QUÉ COMPRÓ? ---
    // Un array (lista) que usará el "molde" de arriba
    orderItems: [orderItemSchema],

    // --- ¿A DÓNDE SE ENVÍA? ---
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
    },

    // --- ¿CUÁNTO FUE? ---
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    // --- ¿CUÁL ES EL ESTADO? (Clave para tu panel de admin) ---
    orderStatus: {
      type: String,
      required: true,
      enum: ['Pendiente', 'En Camino', 'Entregado', 'Cancelado'],
      default: 'Pendiente',
    },

    // --- ¿CUÁNDO SE PAGÓ? ---
    paidAt: {
      type: Date, // Guardaremos la fecha cuando se pague
    },

    // --- ¿CUÁNDO SE ENTREGÓ? ---
    deliveredAt: {
      type: Date, // Guardaremos la fecha cuando lo marques como entregado
    },
  },
  {
    // Añade las fechas 'createdAt' (cuándo se creó) y 'updatedAt'
    timestamps: true,
  }
);

// 3. Creamos y exportamos el modelo final
const Order = mongoose.model('Order', orderSchema);

export default Order;