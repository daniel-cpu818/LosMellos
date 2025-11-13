import { AppDataSource } from "../../config/data-source.js";
import { Order } from "../../models/Order.js";
import { OrderItem } from "../../models/OrderItem.js";
import { Product } from "../../models/Product.js";
import { User } from "../../models/User.js";

export const createOrderService = async (userId, items) => {
  const orderRepo = AppDataSource.getRepository(Order);
  const productRepo = AppDataSource.getRepository(Product);
  const userRepo = AppDataSource.getRepository(User);
  const orderItemRepo = AppDataSource.getRepository(OrderItem);

  // 🔹 Validar usuario
  const user = await userRepo.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("Usuario no encontrado");
  }

  if (!items || items.length === 0) {
    throw new Error("El pedido debe contener al menos un producto");
  }

  // 🔹 Validar productos y calcular total
  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await productRepo.findOne({
      where: { id: item.productId, isActive: true },
    });

    if (!product) {
      throw new Error(`Producto con ID ${item.productId} no encontrado`);
    }

    if (product.stock < item.quantity) {
      throw new Error(
        `Stock insuficiente para el producto "${product.name}". Disponible: ${product.stock}`
      );
    }

    const subtotal = parseFloat(product.price) * item.quantity;
    total += subtotal;

    // Crear el objeto OrderItem temporal
    const orderItem = orderItemRepo.create({
      product,
      quantity: item.quantity,
      subtotal,
    });
    orderItems.push(orderItem);

    // Descontar stock
    product.stock -= item.quantity;
    await productRepo.save(product);
  }

  // 🔹 Crear pedido
  const newOrder = orderRepo.create({
    user,
    total,
    status: "pendiente",
    items: orderItems,
  });

  const savedOrder = await orderRepo.save(newOrder);
  return savedOrder;
};


export const listAllOrders = async () => {
  const orderRepo = AppDataSource.getRepository(Order);

  const orders = await orderRepo.find({
    relations: ["user", "items", "items.product"],
    order: { createdAt: "DESC" }
  });

  return orders;
};

export const listOrdersByUser = async (userId) => {
  const orderRepo = AppDataSource.getRepository(Order);

  const orders = await orderRepo.find({
    where: { user: { id: userId } },
    relations: ["items", "items.product"],
    order: { createdAt: "DESC" }
  });

  return orders;
};
