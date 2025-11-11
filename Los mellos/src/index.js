import "reflect-metadata";
import dotenv from "dotenv";
import app from "./app.js";
import { AppDataSource } from "./config/data-source.js";

dotenv.config();

const PORT = process.env.PORT || 4000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Conexión a la base de datos exitosa");
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en el puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error al inicializar la base de datos:", err);
  });
