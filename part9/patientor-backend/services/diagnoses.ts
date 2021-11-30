import { Diagnoses } from "../types";
import diagnoses from "../data/diagnoses";

const getDiagnoses = (): Diagnoses[] => {
	return diagnoses.map(({ code, name, latin }) => ({
		code,
		name,
		latin,
	}));
};

export default { getDiagnoses };
