import { Router } from "express";
import { createProduct, getActiveProducts, updateProduct, deactivateProduct } from "../controllers/productController.js";

const router = Router();

// POST /products -> crear un producto
router.post("/", createProduct);
router.get("/", getActiveProducts);
// Actualizar un producto por ID
router.put("/:id", updateProduct);

// Desactivar un producto por ID
router.delete("/:id", deactivateProduct);
export default router;
