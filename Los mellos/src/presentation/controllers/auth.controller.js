import { AppDataSource } from "../../config/data-source.js";
import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userRepository = AppDataSource.getRepository(User);

// 🔹 LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.findOneBy({ email });

    if (!user)
      return res.status(400).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, role: user.role }, "secreto", {
      expiresIn: "1d",
    });

    res.json({ user, token });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// 🔹 REGISTER
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser)
      return res.status(400).json({ message: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await userRepository.save(newUser);
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en register:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};
