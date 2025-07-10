// server.js

// 1. Import the tools we installed
const express = require('express');
const cors = require('cors');

// 2. Create our Express app
const app = express();

// 3. Tell our app to use the tools
app.use(cors()); // This enables requests from other origins (like your HTML file)
app.use(express.json()); // This allows our app to understand incoming JSON data

// 4. Define our API endpoint
app.post('/api/v1/admin/analytics/activity-status', async (req, res) => {
  try {
    // Get the data sent from the live monitor page
    const { phoneNumbers, endDate } = req.body;

    // Simple validation
    if (!phoneNumbers || !Array.isArray(phoneNumbers) || !endDate) {
      return res.status(400).json({ error: 'Missing or invalid phoneNumbers or endDate' });
    }

    // --- IMPORTANT: Replace this placeholder with your actual database code ---
    // Your query should now return both the phone number and the latest transaction date.
    // Example SQL:
    // SELECT "phoneNumber", MAX("transactionDate") as "latestTransactionDate"
    // FROM "transactions"
    // WHERE "phoneNumber" IN (...) AND "transactionDate" <= ...
    // GROUP BY "phoneNumber"
    
    console.log('Checking activity for:', phoneNumbers, 'until', endDate);

    // For demonstration, we'll simulate a database response.
    // Let's pretend the first user in the list has been reactivated.
    const reactivatedUsers = phoneNumbers.length > 0 
      ? [{ 
          phoneNumber: phoneNumbers[0], 
          latestTransactionDate: new Date().toISOString() 
        }] 
      : [];
    
    console.log('Simulated reactivated users:', reactivatedUsers);
    // --- End of placeholder section ---


    // Send the result back as JSON
    res.json({
      reactivated_users: reactivatedUsers
    });

  } catch (error) {
    console.error('Error fetching activity status:', error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// 5. Define the port our server will run on
const PORT = process.env.PORT || 3000;

// 6. Start the server and listen for requests
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`Your activity-status endpoint is available at http://localhost:${PORT}/api/v1/admin/analytics/activity-status`);
});
