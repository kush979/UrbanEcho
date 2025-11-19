import { db } from '../../mysql/dbconnect.js';

export const PutComplaint = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { city, department, description, issueLocation, title, state } = req.body;

    console.log("1. Received Department:", `"${department}"`); 

    const [result] = await db.execute(
      'INSERT INTO complaints (user_id, title, state, city, department, description, issue_location, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [userId, title, state, city, department, description, issueLocation]
    );

    console.log("2. Main Complaint Inserted ID:", result.insertId);

    const deptQuery = `
      INSERT INTO \`${department}\` 
      (user_id, title, state, city, description, issue_location, created_at) 
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    console.log("3. Executing Dept Query:", deptQuery);

    await db.execute(deptQuery, [
      userId, title, state, city, description, issueLocation
    ]);

    console.log("4. Department Insert Success");

    res.status(201).json({ 
        complaint_id: result.insertId, 
        user_id: userId, 
        title, 
        state, 
        city, 
        department, 
        description, 
        issueLocation, 
        created_at: new Date() 
    });

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
