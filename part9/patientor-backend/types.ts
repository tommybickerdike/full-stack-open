export type Diagnoses = {
	code: string;
	name: string;
	latin?: string;
};

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
};

export type PublicPatients = Omit<Patients, "ssn">;

export type NewPatients = Omit<Patients, "id">;
