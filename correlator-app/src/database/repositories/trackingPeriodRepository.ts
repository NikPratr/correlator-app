import { getDatabase } from '../index';
import { TrackingPeriod } from '../../models/datapoint';

/**
 * Represents a single tracking period as it is stored in the database
 */
export type TrackingPeriodRow = TrackingPeriod & {
    /** The ID of its parent datapoint */
    datapoint_id: number;
    /** The ID of the tracking period */
    id: number;
};

/**
 * Insert a new tracking period for a specific datapoint
 * @returns The ID of the newly inserted tracking period
 */
export const insertTrackingPeriod = async (datapoint_id: number, input: TrackingPeriod): Promise<number> => {
    const db = getDatabase();
    const result = await db.runAsync(
        'INSERT INTO datapoint_tracking_periods (datapoint_id, start, end) VALUES (?, ?, ?);',
        [datapoint_id, input.start.toISOString(), input.end?.toISOString() ?? null]
    );
    return result.lastInsertRowId!;
};

/**
 * Get all tracking periods associated with a specific datapoint
 */
export const getTrackingPeriods = async (datapointId: number): Promise<TrackingPeriodRow[]> => {
    const db = getDatabase();
    return db.getAllAsync<TrackingPeriodRow>(
        'SELECT * FROM datapoint_tracking_periods WHERE datapoint_id = ? ORDER BY start ASC;',
        [datapointId]
    );
};

/**
 * Get a single tracking period by ID
 */
export const getTrackingPeriod = async (id: number): Promise<TrackingPeriodRow | null> => {
    const db = getDatabase();
    return db.getFirstAsync<TrackingPeriodRow>(
        'SELECT * FROM datapoint_tracking_periods WHERE id = ?;',
        [id]
    );
};

/**
 * Update a single result based on its ID
 * @param id ID of the result to update
 * @param updatedFields 
 */
export const updateTrackingPeriod = async (
    id: number,
    updatedFields: Partial<TrackingPeriod>
): Promise<void> => {
    const db = getDatabase();
    const existing = await getTrackingPeriod(id);
    if (!existing) throw new Error(`Tracking period with id ${id} not found.`);

    const start = updatedFields.start ?? existing.start;
    const end = updatedFields.end ?? existing.end;

    const formattedStart =
        start instanceof Date ? start.toISOString() : start;

    const formattedEnd =
        end instanceof Date ? end.toISOString() :
        end === undefined ? null :
        end;

    await db.runAsync(
        'UPDATE datapoint_tracking_periods SET start = ?, end = ? WHERE id = ?;',
        [formattedStart, formattedEnd, id]
    );
};

/**
 * Delete a single tracking period by its ID
 */
export const deleteTrackingPeriod = async (id: number): Promise<void> => {
    const db = getDatabase();
    await db.runAsync('DELETE FROM datapoint_tracking_periods WHERE id = ?;', [id]);
};
