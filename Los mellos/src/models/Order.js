import { EntitySchema } from "typeorm";

export const Order = new EntitySchema({
  name: "Order",
  tableName: "orders",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    total: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
    status: {
      type: "varchar",
      length: 50,
      default: "pendiente", // pendiente | enviado | entregado | cancelado
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },
  relations: {
    user: {
      target: "User",
      type: "many-to-one",
      joinColumn: { name: "user_id" },
      onDelete: "CASCADE",
      eager: true,
    },
    items: {
      target: "OrderItem",
      type: "one-to-many",
      inverseSide: "order",
      cascade: true,
      eager: true,
    },
  },
});
