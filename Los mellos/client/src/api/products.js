// src/api/products.js
import api from "./api";

// Obtener todos los productos activos
export const getActiveProducts = async () => {
  const res = await api.get("/products");
  return res.data.products;
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  const res = await api.post("/products", productData);
  return res.data.product;
};
