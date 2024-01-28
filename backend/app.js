// app.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000; // Choose a port for your Express server

// Enable CORS
app.use(cors());

// Replace these credentials with your PostgreSQL database details
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'denttamuhack2024db',
  password: '',
  port: '',
});

// Define a route for the stats page
app.get('/stats', async (req, res) => {
  try {
    // Fetch user stats from the database
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', ['tommyztx']);

    if (rows.length === 0) {
      throw new Error('User not found');
    }

    // Convert the user stats to a dictionary
    const userStats = {
      username: rows[0].username,
      challengesCompleted: rows[0].challenges_completed,
      streak: rows[0].streak,
      hoursPlayed: rows[0].hours_played,
    };

    // Return user stats as JSON
    res.json(userStats);
  } catch (error) {
    console.error('Error fetching user stats:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});