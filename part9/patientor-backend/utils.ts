import { NewPatients, Gender } from "./types";

const isString = (text: unknown): text is string => {
	return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const parseString = (string: unknown): string => {
	if (!string || !isString(string)) {
		throw new Error("Incorrect or missing name: " + name);
	}
	return string;
};

const parseDate = (date: unknown): string => {
	if (!date || !isString(date) || !isDate(date)) {
		throw new Error("Incorrect or missing date: " + date);
	}
	return date;
};

const isGender = (param: any): param is Gender => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
	if (!gender || !isGender(gender)) {
		throw new Error("Incorrect or missing gender: " + gender);
	}
	return gender;
};

const parseOccupation = (occupation: unknown): string => {
	if (!occupation || !isString(occupation)) {
		throw new Error("Incorrect or missing occupation: " + occupation);
	}
	return occupation;
};

type PatientFields = {
	name: unknown;
	dateOfBirth: unknown;
	ssn: unknown;
	gender: unknown;
	occupation: unknown;
};

export const toNewPatient = ({
	name,
	dateOfBirth,
	ssn,
	gender,
	occupation,
}: PatientFields): NewPatients => {
	const newPatient: NewPatients = {
		name: parseString(name),
		dateOfBirth: parseDate(dateOfBirth),
		ssn: parseString(ssn),
		gender: parseGender(gender),
		occupation: parseOccupation(occupation),
		entries: [],
	};

	return newPatient;
};
