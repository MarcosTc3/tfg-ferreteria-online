// server/controllers/images.controller.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Truco para obtener __dirname en módulos ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProductImages = (req, res) => {
  // Buscamos la carpeta client/public/products
  // Subimos dos niveles (../../) para salir de 'controllers' y 'server'
  const directoryPath = path.join(__dirname, '../../client/public/products');

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'No se pudo escanear la carpeta de imágenes' });
    }

    // Filtramos para que solo devuelva imágenes (jpg, png, webp, etc)
    const images = files.filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // Devolvemos la lista de nombres de archivo
    res.json(images);
  });
};