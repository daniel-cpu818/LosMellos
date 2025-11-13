import { EntitySchema } from "typeorm";

export const Product = new EntitySchema({
  name: "Product",
  tableName: "products",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    name: {
      type: "varchar",
      length: 150,
    },
    description: {
      type: "text",
      nullable: true,
    },
    price: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },
    stock: {
      type: "int",
      default: 0,
    },
    isActive: {
      type: "boolean",
      default: true,
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
    orderItems: {
      target: "OrderItem",
      type: "one-to-many",
      inverseSide: "product",
    },
  },
});
