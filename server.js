const { v4: uuidv4 } = require('uuid');
const http = require('http');
const url = require('url');
const sqlite3 = require('sqlite3');
const hostname = '192.168.0.104';
const port = 4001;
const tableName = 'sensorData';

// Create and configure the database connection
let db = new sqlite3.Database('./sensorData.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the sensorData SQLite database.');
  }
});



// Create table for sensor data
db.run(`CREATE TABLE IF NOT EXISTS sensorData (
  id TEXT PRIMARY KEY NOT NULL,
  timestamp TEXT NOT NULL,
  ax REAL,
  ay REAL,
  az REAL,
  pitch REAL,
  roll REAL,
  azimuth REAL,
  avx REAL,
  avy REAL,
  avz REAL,
  mfx REAL,
  mfy REAL,
  mfz REAL,
  latitude REAL,
  longitude REAL,
  altitude REAL,
  haac REAL
)`);

const requestListener = (req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (req.method === 'POST' && reqUrl.pathname === '/api/sensors') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const {
        timestamp,
        ax,
        ay,
        az,
        pitch,
        roll,
        azimuth,
        avx,
        avy,
        avz,
        mfx,
        mfy,
        mfz,
        latitude,
        longitude,
        altitude,
        haac
      } = JSON.parse(body);

      const id = uuidv4();

      const query = `INSERT INTO sensorData (
        id, timestamp, ax, ay, az, pitch, roll, azimuth, avx,
        avy, avz, mfx, mfy, mfz, latitude, longitude, altitude, haac
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      db.run(query, [
        id,
        timestamp,
        ax,
        ay,
        az,
        pitch,
        roll,
        azimuth,
        avx,
        avy,
        avz,
        mfx,
        mfy,
        mfz,
        latitude,
        longitude,
        altitude,
        haac
      ]

      , function (err) {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: err.message }));
          return;
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ id }));
        db.close();
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
};

const server = http.createServer(requestListener);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// Properly close the database connection when the server is shutting down


