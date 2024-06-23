import {
    enablePromise,
    openDatabase,
    SQLiteDatabase,
} from 'react-native-sqlite-storage';

import uuid from "react-native-uuid";

const tableName = 'sensorData';

enablePromise(true);

export const getDBConnection = async () => {
    //console.log("connecting to the database");
    try {
        let db: SQLiteDatabase = await openDatabase({ name: 'sensor.db', location: 'default' });
        return db;
    } catch (error) {
        //console.log(error);
        return undefined;
    }
};

export const createTable = async (db: SQLiteDatabase) => {
    // create table if not exists
    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id UUID PRIMARY KEY NOT NULL,
        timestamp TEXT NOT NULL,
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
    );`;
    //console.log("trying to create table");
    try {
        await db.executeSql(query);
    } catch (error) {
        //console.log("table creation query error", error);
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
    id,timestamp, ax, ay, az, pitch, roll, azimuth, avx, 
    avy, avz, mfx, mfy, mfz, latitude, longitude, altitude, haac) VALUES 
    (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
        uuid.v4(),
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

    //console.log(values);
   // console.log(insertQuery);
    try {
    //    console.log("trying to insert data");
        await db.executeSql(insertQuery, values);
        return;
    } catch (error) {
     //   console.log("insertion query error ", error);
       return;
    }
};

export const getData = async (db: SQLiteDatabase) => {
    try {
        let sensorData:sensorDataType[] = [];
        const data = await db.executeSql(`SELECT * FROM ${tableName}`);
        data.forEach(result => {
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows.item(i);
                sensorData.push(row);
            }
        });
        return sensorData;
    } catch (error) {
       // console.error(error);
        return null;
    }
};
