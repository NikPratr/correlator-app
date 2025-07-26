import { getDatabase } from '../index';
import { DatapointResult } from '../../models/datapoint';

/**
 * Represents a single datapoint result as it is stored in the database
 */
export type DatapointResultRow = DatapointResult & {
    /** The ID of its parent datapoint */
    datapoint_id: number;
    /** The ID of the result */
    id: number;
    /** Store as ISO string for SQLite compatibility */
    timestamp: string;
};


/**
 * Insert a new result for a specific datapoint
 * @returns The ID of the newly inserted result
 */
export const insertResult = async (datapoint_id: number, input: DatapointResult): Promise<number> => {
    const database = getDatabase();
    const result = await database.runAsync(
        'INSERT INTO datapoint_results (datapoint_id, timestamp, result) VALUES (?, ?, ?);',
        [datapoint_id, input.timestamp.toISOString(), input.result]
    );
    return result.lastInsertRowId;
};

/**
 * Get all results associated with a specific datapoint
 */
export const getResults = async (datapointId: number): Promise<DatapointResultRow[] | null> => {
    const database = getDatabase();
    const results = await database.getAllAsync<DatapointResultRow>(
        'SELECT * FROM datapoint_results WHERE datapoint_id = ? ORDER BY timestamp ASC;',
        [datapointId]
    );
    return results;
};

/**
 * Get a single result by ID
 */
export const getResult = async (id: number): Promise<DatapointResultRow | null> => {
    const database = getDatabase();
    const result = await database.getFirstAsync<DatapointResultRow>(
        'SELECT * FROM datapoint_results WHERE id = ?;',
        [id]
    );
    return result;
};

/**
 * Update a single result based on its ID
 * @param id ID of the result to update
 */
export const updateResult = async (id: number, updatedFields: Partial<DatapointResult>): Promise<void> => {
    const database = getDatabase();
    const existing = await getResult(id);
    if (!existing) throw new Error(`Datapoint result with id ${id} not found.`);

    const timestamp = updatedFields.timestamp ?? existing.timestamp;
    const result = updatedFields.result ?? existing.result;

    await database.runAsync(
        'UPDATE datapoint_results SET timestamp = ?, result = ? WHERE id = ?;',
        [timestamp, result, id]
    );
};

/**
 * Delete a single result by its ID
 */
export const deleteResult = async (id: number): Promise<void> => {
    const database = getDatabase();
    await database.runAsync('DELETE FROM datapoint_results WHERE id = ?;', [id]);
};
