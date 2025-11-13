import { createOrderService, listAllOrders, listOrdersByUser } from "../services/order.service.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;
    const order = await createOrderService(userId, items);
    res.status(201).json({
      message: "Pedido registrado exitosamente",
      order,
    });
  } catch (error) {
    console.error("Error al registrar pedido:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await listAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await listOrdersByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos del usuario", error: error.message });
  }
};