import { enablePromise, openDatabase, ResultSet, SQLiteDatabase, } from 'react-native-sqlite-storage';

const tableName = 'sensorData';

enablePromise(true);

export const getDBConnection = async () => {
  console.log("connecting to the database");
  try {
    let db: SQLiteDatabase = await openDatabase({ name: 'sensor.db', location: 'default' });
    return db;
  } catch (error) {
    console.log("Error in opening database", error);
    return ;
  }
};

export const createTable = async (db: SQLiteDatabase) => {

  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP ,
        ax Float,
        ay Float,
        az Float,
        pitch Float,
        roll  Float,
        azimuth Float,
        avx Float,
        avy Float,
        avz Float,
        mfx Float,
        mfy Float,
        mfz Float,
        latitude Float,
        longitude Float,
        altitude Float,
        haac Float,
        synced Bool DEFAULT 0
    );`;
  console.log("trying to create table");

  try {
    await db.executeSql(query);
  } catch (error) {
    console.log("table creation query error", error);
    return;
  }
};

//not required
export const dropTable = async (db: SQLiteDatabase) => {
  const query = `DROP TABLE ${tableName}`;
  await db.executeSql(query);
};

export const insertData = async (db: SQLiteDatabase, data: sensorDataType) => {
  const insertQuery = `INSERT INTO ${tableName} (
    timestamp, ax, ay, az, pitch, roll, azimuth, avx,
    avy, avz, mfx, mfy, mfz, latitude, longitude, altitude, haac) VALUES
    (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
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
    data.hacc
  ];

  console.log(values);
  console.log(insertQuery);

  try {
    console.log("trying to insert data");
    await db.executeSql(insertQuery, values);
    return;
  } catch (error) {
    console.log("insertion query error ", error);
    return;
  }
};

export const getData = async (db: SQLiteDatabase): Promise<SensorDataResponse[] | null> => {
  try {
    const sensorData: SensorDataResponse[] = [];
    const query = `SELECT * FROM ${tableName} ORDER BY timestamp DESC LIMIT 100`;

    // Execute the SQL query
    const results = await db.executeSql(query);
    console.log("The results of the db query" , results);

    // Process the result set
    results.forEach((result: ResultSet) => {
      for (let i = 0; i < result.rows.length; i++) {
        const row = result.rows.item(i);
        sensorData.push(row as SensorDataResponse); // Ensure typecasting if needed
      }
    });
    return sensorData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
export const markDataAsSynced = async (db: SQLiteDatabase, ids: number[]) => {
  if (ids.length === 0) return;

  // Create a parameterized query with placeholders
  const placeholders = ids.map(() => '?').join(', ');
  const updateQuery = `UPDATE ${tableName} SET synced = 1 WHERE id IN (${placeholders})`;

  try {
    await db.executeSql(updateQuery, ids);
    console.log("Data marked as synced for IDs:", ids);
  } catch (error) {
    console.error("Error marking data as synced:", error);
  }
};

