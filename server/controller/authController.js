import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../models/authModel.js";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const userId = await createUser(username, email, password);
    res.status(201).json({ message: "User registerd successfully", userId });
  } catch (error) {
    res.status(500).json({ error: "Registeration failed" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "email not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: "password not match" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
