import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./presentation/routes/auth.routes.js";
import path from "path";
import { fileURLToPath } from "url";


const app = express();

app.use(helmet());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Health Check
app.get("/health", (req, res) => res.json({ ok: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 👉 Servir React en producción
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client/build");
  app.use(express.static(clientPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

export default app;
