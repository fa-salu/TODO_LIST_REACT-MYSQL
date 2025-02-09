import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log("enter verify", token);
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  console.log("token", token);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("decode", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
