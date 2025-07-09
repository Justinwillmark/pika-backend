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
    // This is where you'll query your database (e.g., PostgreSQL, MongoDB, etc.)
    // Your query should look for transactions from the given 'phoneNumbers'
    // that occurred on or before the 'endDate'.
    
    console.log('Checking activity for:', phoneNumbers, 'until', endDate);

    // For demonstration, we'll simulate a database response.
    // Let's pretend the first user in the list has been reactivated.
    const reactivatedPhones = phoneNumbers.length > 0 ? [phoneNumbers[0]] : [];
    
    console.log('Simulated reactivated users:', reactivatedPhones);
    // --- End of placeholder section ---


    // Send the result back as JSON
    res.json({
      reactivated_users: reactivatedPhones
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