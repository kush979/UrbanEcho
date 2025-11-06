import { db } from '../../mysql/dbconnect.js';
import dotenv from "dotenv";
// import bcrypt from 'bcrypt';

dotenv.config();

export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
    res.status(201).json({ message: "Admin" });
    } else if(user.password === password){
      res.status(201).json({ message: "Success" });
    } else{
      res.status(401).json({ message: "Failure" });
    }
  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(400).json({ message: error.message });
  }
};