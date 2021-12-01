export type Diagnoses = {
	code: string;
	name: string;
	latin?: string;
};

export type Patients = {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
};

export type PublicPatients = Omit<Patients, "ssn">;

export type NewPatients = Omit<Patients, "id">;
