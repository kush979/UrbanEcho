import { db } from '../../mysql/dbconnect.js';
import dotenv from "dotenv";

dotenv.config();

export const LoginUser = async (req, res) => {
  try {
    console.log("Login attempt...");
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return res.status(200).json({ message: "Admin" });
    }

    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    if (user.password === password) {
      console.log("User logged in:", user.id);
      return res.status(200).json({ message: "Success", id: user.id });
    } else {
      return res.status(401).json({ message: "Failure" });
    }

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: error.message });
  }
};