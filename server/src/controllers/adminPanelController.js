import { db } from '../../mysql/dbconnect.js'; 

const apiKey = "";

export const getAdminDashboard = async (req, res) => {
  try {
    const query = `
      SELECT complaint_id AS summary_id, 
             title AS summary_title, 
             CONCAT(city, ', ', state) AS location, 
             status AS current_status, 
             'road' AS department, 
             'High' AS severity 
      FROM road
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'light', 'Medium' FROM light
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'sanitation', 'Low' FROM sanitation
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'water', 'Critical' FROM water
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'traffic', 'Medium' FROM traffic
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'drainage', 'High' FROM drainage
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'garbage', 'Low' FROM garbage
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'electricity', 'Critical' FROM electricity
      UNION ALL
      SELECT complaint_id, title, CONCAT(city, ', ', state), status, 'others', 'Low' FROM others
      ORDER BY summary_id DESC
    `;

    const [rows] = await db.query(query);
    res.json(rows);

  } catch (error) {
    console.error("Admin Dashboard Error:", error);
    res.status(500).json({ message: "Failed to load dashboard data" });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { newStatus, department } = req.body; 

  if (!department) return res.status(400).json({ message: "Department required." });

  const allowedTables = ['road', 'light', 'sanitation', 'water', 'traffic', 'drainage', 'garbage', 'electricity', 'others'];
  if (!allowedTables.includes(department)) return res.status(400).json({ message: "Invalid department." });

  try {
    const query = `UPDATE \`${department}\` SET status = ? WHERE complaint_id = ?`;
    const [result] = await db.execute(query, [newStatus, id]);

    if (result.affectedRows === 0) return res.status(404).json({ message: "Complaint not found." });

    res.json({ message: `Status updated to ${newStatus} in ${department}.` });

  } catch (error) {
    console.error("Update Status Error:", error);
    res.status(500).json({ message: "Database error updating status." });
  }
};

export const runSummarizer = async (req, res) => {
    try {
        console.log("Starting AI Summarization...");

        const query = `
            SELECT complaint_id, title, description, CONCAT(city, ', ', state) as location, 'road' as department FROM road WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'light' FROM light WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'sanitation' FROM sanitation WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'water' FROM water WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'traffic' FROM traffic WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'drainage' FROM drainage WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'garbage' FROM garbage WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'electricity' FROM electricity WHERE status IN ('Pending', 'In Progress')
            UNION ALL SELECT complaint_id, title, description, CONCAT(city, ', ', state), 'others' FROM others WHERE status IN ('Pending', 'In Progress')
        `;
        
        const [complaints] = await db.query(query);

        if (complaints.length === 0) {
            return res.json({ message: "No pending complaints to analyze.", summaryData: [] });
        }

        const prompt = `
            You are an AI for an urban management dashboard. Analyze the following list of citizen complaints.
            
            Tasks:
            1. Group complaints that are about the SAME issue in the SAME location (or very close).
            2. Group complaints that are semantically similar (e.g. "pothole on main st" and "bad road main street").
            3. Assign a Severity Level (Critical, High, Medium, Low) based on the description intensity.
            4. Generate a concise "Summary Title" and "Summarized Description" for each group.
            
            Input Data: ${JSON.stringify(complaints)}

            Output Schema (JSON Array):
            [
                {
                    "summary_id": (use the ID of the first complaint in group),
                    "summary_title": "Concise Title",
                    "location": "Common Location",
                    "department": "Department Name",
                    "severity": "Critical/High/Medium/Low",
                    "current_status": "Pending",
                    "description": "AI Summarized Description",
                    "count": (number of complaints in this group)
                }
            ]
            Return ONLY valid JSON.
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { responseMimeType: "application/json" }
            })
        });

        const data = await response.json();
        
        let summaryData = [];
        try {
            const text = data.candidates[0].content.parts[0].text;
            summaryData = JSON.parse(text);
        } catch (e) {
            console.error("Failed to parse AI response:", e);
            return res.status(500).json({ message: "AI processing failed to generate valid JSON." });
        }
        
        res.json({ 
            message: "AI Analysis Complete.", 
            summaryData: summaryData 
        });

    } catch (error) {
        console.error("AI Service Error:", error);
        res.status(500).json({ message: "Failed to run AI summarizer." });
    }
};