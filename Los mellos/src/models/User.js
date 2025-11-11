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
    },
    password: {
      type: "varchar",
      length: 255,
    },
    role: {
      type: "varchar",
      length: 50,
    },
    createdAt: {
      type: "timestamp",
      createDate: true,
    },
  },
});
