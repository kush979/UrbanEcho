import { db } from '../../mysql/dbconnect.js';

// POST: create a registration
export const RegisterUser = async (req, res) => {
  try {
    const { username, email, password, location, mobile } = req.body;
    const [result] = await db.execute(
      'INSERT INTO users (username, email, password, location, mobile) VALUES (?, ?, ?, ?, ?)',
      [username, email, password, location, mobile]
    );
    console.log('hello');
    res.status(201).json({ id: result.insertId, username, email, password, location, mobile });
  } catch (error) {
    console.error('REGISTRATION ERROR:', error);
    res.status(400).json({ message: error.message });
  }
};

// GET: fetch all users
export const getUsers = async (req, res) => {
  try {
    const [users] = await db.execute('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};