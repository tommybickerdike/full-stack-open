export type Diagnoses = {
	code: string;
	name: string;
	latin?: string;
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export enum Gender {
	Male = "male",
	Female = "female",
	Other = "other",
}

export type Patients = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation: string;
	entries: Array<Entry>;
};

export type PublicPatients = Omit<Patients, "ssn" | "entries"> | undefined;

export type NewPatients = Omit<Patients, "id">;
