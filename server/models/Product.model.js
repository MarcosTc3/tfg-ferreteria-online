// server/models/Product.model.js

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ['Herramientas Eléctricas', 'Herramientas Manuales', 'Tornillería', 'Seguridad Laboral', 'Medición', 'Hogar', 'Otros'], // Puedes añadir más categorías aquí
    },
    image: {
      type: String,
      required: true,
      // Aquí guardaremos la URL de la imagen (ej: "/products/taladro.jpg" o una URL de internet)
    },
    stock: {
      type: Number,
      default: 10, // Por defecto tendremos 10 unidades
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;