// server.js

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// This is a placeholder for your actual database connection logic.
// You might initialize your database client (e.g., node-postgres, mysql2, mongodb) here
// and export it for use in your route handlers.
// Example:
// const { Pool } = require('pg');
// const dbClient = new Pool({ connectionString: process.env.DATABASE_URL });
// async function connectToYourDatabase() {
//   return dbClient;
// }

app.post('/api/v1/admin/analytics/activity-status', async (req, res) => {
  try {
    const { phoneNumbers, endDate } = req.body;

    if (!phoneNumbers || !Array.isArray(phoneNumbers) || !endDate) {
      return res.status(400).json({ error: 'Missing or invalid phoneNumbers or endDate' });
    }

    // --- IMPORTANT: This is where you will connect to YOUR database ---
    // The logic below is the template for processing the data.
    // Replace "connectToYourDatabase" and "dbClient.query" with your actual database implementation.
    
    // Example using a hypothetical database client (e.g., node-postgres, mongodb driver)
    const dbClient = await connectToYourDatabase(); // Replace with your actual DB connection
    const queryResult = await dbClient.query(
      `SELECT "phoneNumber", MAX("transactionDate") as "latestTransactionDate"
       FROM "transactions"
       WHERE "phoneNumber" = ANY($1::text[]) AND "transactionDate" <= $2
       GROUP BY "phoneNumber"`,
      [phoneNumbers, endDate]
    );
    const reactivatedUsers = queryResult.rows; 
    // --- End of database section ---

    console.log('Found reactivated users:', reactivatedUsers);
    
    res.json({
      reactivated_users: reactivatedUsers
    });

  } catch (error) {
    console.error('Error fetching activity status:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Your activity-status endpoint is available at http://localhost:${PORT}/api/v1/admin/analytics/activity-status`);
});