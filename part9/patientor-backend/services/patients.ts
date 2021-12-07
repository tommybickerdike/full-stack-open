import {
	PublicPatients,
	Patients,
	NewPatients,
	NewEntry,
	Entry,
} from "../types";
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

const getPatient = (id: string): Patients => {
	const patient = patients.find((p) => p.id === id);
	if (patient) {
		return patient;
	} else {
		throw new Error("Patient not found");
	}
};

const addPatient = (patient: NewPatients): Patients => {
	const id = uuid();
	const newPatient = {
		id,
		...patient,
		entries: [],
	};

	patients.push(newPatient);
	return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
	const id = uuid();
	const newEntry = {
		id,
		...entry,
	};

	const patient = patients.find((p) => p.id === patientId);
	if (patient) {
		patient.entries.push(newEntry);
		return newEntry;
	} else {
		throw new Error("Patient not found");
	}
};

export default { getPatients, addPatient, getPatient, addEntry };
