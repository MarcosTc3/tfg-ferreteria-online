// server/controllers/auth.controller.js

import User from '../models/User.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

// 1. REGISTER
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
        name: user.name,
        email: user.email, // <-- ¡AÑADIDO EMAIL AQUÍ!
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

// 2. LOGIN
export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales no válidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales no válidas' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email, // <-- ¡AÑADIDO EMAIL AQUÍ!
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};

// 3. UPDATE PROFILE
export const updateProfile = async (req, res) => {
  const { name, currentPassword, newPassword } = req.body;
  
  try {
    let user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    if (name) user.name = name;

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ msg: 'Debes introducir tu contraseña actual para cambiarla' });
      }
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'La contraseña actual es incorrecta' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    await user.save();

    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email, // <-- ¡AÑADIDO EMAIL AQUÍ!
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, msg: 'Perfil actualizado correctamente' });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error del servidor');
  }
};