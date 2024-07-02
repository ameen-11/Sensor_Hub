// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // SQLite3 module

// Create an Express app
const app = express();
const port = 3000; // Choose your desired port

// Middleware to parse JSON requests
app.use(bodyParser.json());

// SQLite database connection
const dbPath = './data/sensorData.db'; // Path to your SQLite database file
const db = new sqlite3.Database(dbPath);

// Endpoint to store sensor data
app.post('/api/sensorData', (req, res) => {
    const data = req.body; // Assuming your request body contains sensor data
    
    console.log('Received sensor data:', data); // Add this line to log received data
    
    // Insert data into SQLite database
    const insertQuery = `
        INSERT INTO sensor_data (timestamp, ax, ay, az, pitch, roll, azimuth, avx, avy, avz, mfx, mfy, mfz, latitude, longitude, altitude, hacc)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        data.timestamp,
        data.ax,
        data.ay,
        data.az,
        data.pitch,
        data.roll,
        data.azimuth,
        data.avx,
        data.avy,
        data.avz,
        data.mfx,
        data.mfy,
        data.mfz,
        data.latitude,
        data.longitude,
        data.altitude,
        data.hacc,
    ];

    db.run(insertQuery, values, function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'Failed to store sensor data' });
        } else {
            console.log(`Rows inserted ${this.changes}`);
            res.status(200).json({ message: 'Sensor data stored successfully' });
        }
    });
    res.status(200).json({ message: 'Sensor data stored successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
