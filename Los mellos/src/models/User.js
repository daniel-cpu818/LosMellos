import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    username: {
      type: "varchar",
      length: 100,
      unique: true,
    },
    email: {
      type: "varchar",
      length: 150,
      unique: true,
    },
    password: {
      type: "varchar",
      length: 255,
    },
    role: {
      type: "varchar",
      length: 50,
      default: "aux_pedidos", // por defecto auxiliar de pedidos
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
});
