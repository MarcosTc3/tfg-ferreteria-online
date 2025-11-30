// server/controllers/product.controller.js

import Product from '../models/Product.model.js';

// 1. Obtener TODOS los productos (Público)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

// 2. Obtener UN producto por ID (Público - para ver detalles)
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// 3. Crear un producto (Solo Admin)
export const createProduct = async (req, res) => {
  const { name, description, price, category, image, stock } = req.body;

  try {
    const product = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error: error.message });
  }
};

// 4. Borrar un producto (Solo Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'Producto eliminado' });
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // El ID del producto a editar
    const updatedData = req.body; // Los nuevos datos (nombre, precio, stock...)

    // Buscamos por ID y actualizamos. 
    // { new: true } hace que nos devuelva el producto YA actualizado
    const product = await Product.findByIdAndUpdate(id, updatedData, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json(product); // Devolvemos el producto actualizado al frontend

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
  }
};