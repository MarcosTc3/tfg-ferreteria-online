// server/index.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Importar nuestras rutas
import authRoutes from './routes/auth.routes.js';
import contactRoutes from './routes/contact.routes.js';
import orderRoutes from './routes/order.routes.js'; // <-- 1. IMPORTAR RUTA DE PEDIDOS

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI; 

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('¡El servidor de la Ferretería está funcionando!');
});

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/orders', orderRoutes); // <-- 2. USAR LA RUTA DE PEDIDOS

// Conexión a BD y arranque
console.log("Conectando a MongoDB...");
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("¡Conexión a MongoDB exitosa!");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error.message);
  });