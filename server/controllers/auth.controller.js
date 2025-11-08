// server/controllers/auth.controller.js

import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// --- FUNCIÓN DE REGISTRO (la que ya tenías) ---
export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El email ya está registrado' });
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// --- NUEVA FUNCIÓN DE LOGIN ---
export const login = async (req, res) => {
  // 1. Comprobar si hay errores de validación (de la ruta)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // 2. Buscar al usuario por su email
    let user = await User.findOne({ email });
    if (!user) {
      // ¡No decimos "email no encontrado"! Por seguridad, es un error genérico.
      return res.status(400).json({ msg: 'Credenciales no válidas' });
    }

    // 3. Comparar la contraseña que nos envían con la encriptada en la BD
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // ¡No decimos "contraseña incorrecta"! Mismo error genérico.
      return res.status(400).json({ msg: 'Credenciales no válidas' });
    }

    // 4. Si todo es correcto, crear y firmar el "pase digital" (JWT)
    const payload = {
      user: {
        id: user.id,
        role: user.role, // Aquí irá 'client' o 'admin'
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Devolvemos el pase
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};