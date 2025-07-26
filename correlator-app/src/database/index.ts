import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

export const initDatabase = async () => {
    db = await SQLite.openDatabaseAsync('correlator.db');

    // Schema setup
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS datapoints (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL,
            color TEXT,
            config TEXT
        );

        CREATE TABLE IF NOT EXISTS datapoint_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datapoint_id INTEGER NOT NULL,
            timestamp DATETIME NOT NULL,
            result TEXT NOT NULL,
            FOREIGN KEY (datapoint_id) REFERENCES datapoints(id)
        );

        CREATE TABLE IF NOT EXISTS datapoint_tracking_periods (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datapoint_id INTEGER NOT NULL,
            start DATETIME NOT NULL,
            end DATETIME,
            FOREIGN KEY (datapoint_id) REFERENCES datapoints(id)
        );
    `);


    return db;
};

export const getDatabase = () => {
    if (!db) {
        throw new Error('Database not initialized. Call initDatabase() first.');
    }
    return db;
};
