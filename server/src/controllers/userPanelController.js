import { db } from '../../mysql/dbconnect.js';

// POST: put a complaint
export const PutComplaint = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { title, state, city, department, description, issueLocation } = req.body;
    const [result] = await db.execute(
      'INSERT INTO complaints (user_id, title, state, city, department, description, issue_location, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [userId, title, state, city, department, description, issueLocation]
    );
    res.status(201).json({ complaint_id: result.insertId, user_id: userId, title, state, city, department, description, issueLocation, created_at: new Date() });
  } catch (error) {
    console.error('COMPLAINT ERROR:', error);
    res.status(400).json({ message: error.message });
  }
};

export const GetComplaintCount = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
    const [rows] = await db.query(
      `SELECT COALESCE(COUNT(*), 0) AS count, COALESCE(SUM(status='Resolved'), 0) AS resolved, COALESCE(SUM(status='Pending'), 0) AS pending FROM complaints WHERE user_id = ?;`,
      [userId]
    );

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const GetAllComplaints = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  
  try {
    const [allComplaints] = await db.query(
      `SELECT 
         COALESCE(complaint_id, 0) AS complaint_id, 
         title, 
         status, 
         created_at 
       FROM complaints 
       WHERE user_id = ?`,
      [userId]
    );

    res.json(allComplaints);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
