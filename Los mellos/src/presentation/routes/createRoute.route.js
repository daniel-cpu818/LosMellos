import { Router } from "express";
import { createOrder, getAllOrders, getOrdersByUser } from "../controllers/createOrder.controller.js";

const router = Router();

router.post("/", createOrder);

// Listar todos los pedidos
router.get("/", getAllOrders);

// Listar pedidos por usuario
router.get("/user/:userId", getOrdersByUser);


export default router;