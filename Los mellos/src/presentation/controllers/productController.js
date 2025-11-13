import { AppDataSource } from "../../config/data-source.js";
import { Product } from "../../models/Product.js";

// Crear un producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, isActive } = req.body;

    // Validación básica
    if (!name || !price) {
      return res.status(400).json({ message: "El nombre y el precio son obligatorios." });
    }

    const productRepository = AppDataSource.getRepository(Product);

    const newProduct = productRepository.create({
      name,
      description,
      price,
      stock: stock || 0,
      isActive: isActive !== undefined ? isActive : true,
    });

    await productRepository.save(newProduct);

    return res.status(201).json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    console.error("Error al crear producto:", error);
    return res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
};
export const getActiveProducts = async (req, res) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const products = await productRepository.find({
      where: { isActive: true },
      order: { id: "ASC" },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No hay productos activos registrados." });
    }

    return res.status(200).json({ message: "Productos activos encontrados", products });
  } catch (error) {
    console.error("Error al listar productos:", error);
    return res.status(500).json({ message: "Error al obtener los productos", error: error.message });
  }
};

// Actualizar un producto por ID
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, isActive } = req.body;

    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id: parseInt(id) });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Actualizar solo los campos enviados
    product.name = name ?? product.name;
    product.description = description ?? product.description;
    product.price = price ?? product.price;
    product.stock = stock ?? product.stock;
    product.isActive = isActive ?? product.isActive;

    await productRepository.save(product);

    return res.status(200).json({ message: "Producto actualizado", product });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    return res.status(500).json({ message: "Error al actualizar el producto", error: error.message });
  }
};

// Desactivar (eliminar lógico) un producto
export const deactivateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOneBy({ id: parseInt(id) });

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    product.isActive = false;
    await productRepository.save(product);

    return res.status(200).json({ message: "Producto desactivado correctamente", product });
  } catch (error) {
    console.error("Error al desactivar producto:", error);
    return res.status(500).json({ message: "Error al desactivar el producto", error: error.message });
  }
};
