import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source.js";
import authRoutes from "./presentation/routes/auth.routes.js";

const app = express();

// ✅ Configurar CORS correctamente para permitir el front
app.use(
  cors({
    origin: "http://localhost:3000", // 👈 tu frontend
    credentials: true, // permite enviar cookies/autorización
  })
);

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Iniciar base de datos y servidor
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");
    app.listen(4000, () => console.log("🚀 Servidor en http://localhost:4000"));
  })
  .catch((err) => console.error("❌ Error al conectar la base de datos:", err));
