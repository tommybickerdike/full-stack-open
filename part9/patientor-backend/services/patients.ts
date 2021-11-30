import { PublicPatients } from "../types";
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

export default { getPatients };
