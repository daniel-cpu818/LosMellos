import { EntitySchema } from "typeorm";

export const OrderItem = new EntitySchema({
  name: "OrderItem",
  tableName: "order_items",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    quantity: {
      type: "int",
    },
    subtotal: {
      type: "decimal",
      precision: 10,
      scale: 2,
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
    order: {
      target: "Order",
      type: "many-to-one",
      joinColumn: { name: "order_id" },
      onDelete: "CASCADE",
    },
    product: {
      target: "Product",
      type: "many-to-one",
      joinColumn: { name: "product_id" },
      eager: true,
      onDelete: "CASCADE",
    },
  },
});
