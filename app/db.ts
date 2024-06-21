import SQLite from 'react-native-sqlite-storage';

export const init = async () => {
  console.log('Initializing database');
  const db = await SQLite.openDatabase({name: 'sensorData.db'});
  console.log('Database initialized');
  await db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS sensorData (
        id UUID NOT NULL PRIMARY KEY,
        timestamp TIMESTAMP NOT NULL,
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
        haac Float
      )`,
      [],
      () => {
        console.log('Database created successfully');
      },
      (error: any) => {
        console.error('Failed to create database', error);
        return false;
      },
    );
  });
  db.close();
};

export const readData = async () => {
  const db = await SQLite.openDatabase({name: 'sensorData.db'});

  try {
    await new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM sensorData',
          [],
          (tx, results) => {
            let data = [];
            for (let i = 0; i < results.rows.length; ++i) {
              data.push(results.rows.item(i));
            }
            console.log('Data read successfully', data);
            resolve();
          },
          (tx, error) => {
            console.error('Failed to read data', error);
            reject(error);
          },
        );
      });
    });
  } catch (error) {
    console.error('Transaction failed', error);
  }
};

export const insertData = async (data: any) => {
  const db = await SQLite.openDatabase({name: 'sensorData.db'});

  console.log('Inserting data');

  try {
    await new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'INSERT INTO sensorData (timestamp, ax, ay, az, pitch, roll, azimuth, avx, avy, avz, mfx, mfy, mfz, latitude, longitude, altitude, haac) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [
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
            data.haac,
          ],
          () => {
            console.log('Data inserted successfully');
            resolve();
          },
          (tx, error) => {
            console.error('Failed to insert data', error);
            reject(error);
          },
        );
      });
    });
  } catch (error) {
    console.error('Transaction failed', error);
  }
};

export const deleteData = async () => {
  const db = await SQLite.openDatabase({name: 'sensorData.db'});

  console.log('Deleting data');

  try {
    await new Promise<void>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM sensorData',
          [],
          () => {
            console.log('Data deleted successfully');
            resolve();
          },
          (tx, error) => {
            console.error('Failed to delete data', error);
            reject(error);
          },
        );
      });
    });
  } catch (error) {
    console.error('Transaction failed', error);
  }
};
