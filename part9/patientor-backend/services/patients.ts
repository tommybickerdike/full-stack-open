import { PublicPatients, Patients, NewPatients } from "../types";
import { v1 as uuid } from "uuid";
import patients from "../data/patients";

const getPatients = (): PublicPatients[] => {
	return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
		id,
		name,
		dateOfBirth,
		gender,
		occupation,
	}));
};

const addPatient = (patient: NewPatients): Patients => {
	const id = uuid();
	const newPatient = {
		id,
		...patient,
	};

	patients.push(newPatient);
	return newPatient;
};

export default { getPatients, addPatient };
