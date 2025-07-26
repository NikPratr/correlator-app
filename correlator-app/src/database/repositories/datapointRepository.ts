import { getDatabase } from '../index';
import { Datapoint } from '../../models/datapoint';

/**
 * Represents a single datapoint as it is stored in the database; history is stored in separate tables
 * to allow for more efficient queries and updates.
 */
export type DatapointRow = {
	/** Autoincremeting ID */
	id: number;
	name: string;
	type: string;
	color: string;
	/** Store config as JSON string */
	config: string;
}

/** Insert a single datapoint */
export const insertDatapoint = async (datapoint: Datapoint): Promise<number> => {
	const database = getDatabase();
	const configStr = JSON.stringify(datapoint.config ?? {});

	const result = await database.runAsync(
		'INSERT INTO datapoints (name, type, color, config) VALUES (?, ?, ?, ?);',
		[datapoint.name, datapoint.type, datapoint.color ?? null, configStr]
	);

	return result.lastInsertRowId!;
};

/** Get all datapoints */
export const getAllDatapoints = async (): Promise<DatapointRow[] | null> => {
	const database = getDatabase();
	const result = await database.getAllAsync<DatapointRow>('SELECT * FROM datapoints;');
	return result;
};

/** Get a single datapoint by ID */
export const getDatapoint = async (id: number): Promise<DatapointRow | null> => {
	const database = getDatabase();
	const result = await database.getFirstAsync<DatapointRow>('SELECT * FROM datapoints WHERE id = ?;', [id]);
	return result;
};

/** Update a single datapoint based on its ID */
export const updateDatapoint = async (id: number, updatedFields: Partial<Datapoint>): Promise<void> => {
	const database = getDatabase();
	const existing = await getDatapoint(id);
	if (!existing) throw new Error(`Datapoint with id ${id} not found.`);

	const name = updatedFields.name ?? existing.name;
	const type = updatedFields.type ?? existing.type;
	const color = updatedFields.color ?? existing.color;
	const configStr = JSON.stringify(updatedFields.config ?? JSON.parse(existing.config ?? '{ }'));

	await database.runAsync(
		'UPDATE datapoints SET name = ?, type = ?, color = ?, config = ? WHERE id = ?;',
		[name, type, color, configStr, id]
	);
};

/** Delete a single datapoint by its ID */
export const deleteDatapoint = async (id: number): Promise<void> => {
	const database = getDatabase();
	await database.runAsync('DELETE FROM datapoints WHERE id = ?;', [id]);
};
