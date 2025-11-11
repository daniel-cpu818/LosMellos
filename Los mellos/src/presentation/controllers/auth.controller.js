import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "./../../config/data-source.js";
import { User } from "./../../models/User.js";

const userRepo = () => AppDataSource.getRepository(User);

export const register = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Faltan campos requeridos" });
    }

    const repo = userRepo();
    const existe = await repo.findOne({ where: { email } });
    if (existe) return res.status(409).json({ error: "El usuario ya existe" });

    const hashed = await bcrypt.hash(password, 10);
    const nuevo = repo.create({ nombre, email, password: hashed, rol });
    await repo.save(nuevo);

    res.status(201).json({ message: "Usuario registrado", id: nuevo.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const repo = userRepo();
    const user = await repo.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = jwt.sign(
      { sub: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET || "secreto_dev",
      { expiresIn: "7d" }
    );

    res.json({ token, user: { id: user.id, nombre: user.nombre, rol: user.rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
