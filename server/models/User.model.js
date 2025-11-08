// server/models/User.model.js

import mongoose from 'mongoose';

// 1. Definimos el "molde" (Schema)
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // El nombre será obligatorio
      trim: true, // Quita espacios en blanco al principio y al final
    },
    email: {
      type: String,
      required: true, // El email será obligatorio
      unique: true,   // No puede haber dos usuarios con el mismo email
      lowercase: true, // Se guarda siempre en minúsculas
      trim: true,
    },
    password: {
      type: String,
      required: true, // La contraseña será obligatoria
      // Más adelante la encriptaremos aquí
    },
    role: {
      type: String,
      enum: ['client', 'admin'], // Solo puede ser uno de estos dos valores
      default: 'client',         // Por defecto, todos los nuevos usuarios son 'client'
    },
  },
  {
    // 2. Opciones del Schema
    timestamps: true, // Esto añade automáticamente las fechas 'createdAt' y 'updatedAt'
  }
);

// 3. Creamos el "Modelo" a partir del molde
const User = mongoose.model('User', userSchema);

// 4. Exportamos el Modelo para poder usarlo en otras partes del servidor
export default User;