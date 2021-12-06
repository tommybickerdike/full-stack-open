import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
	| {
			type: "SET_PATIENT_LIST";
			payload: Patient[];
	  }
	| {
			type: "SET_DIAGNOSIS_LIST";
			payload: Diagnosis[];
	  }
	| {
			type: "ADD_PATIENT";
			payload: Patient;
	  }
	| {
			type: "SET_PATIENT";
			payload: Patient;
	  };

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "SET_PATIENT_LIST":
			return {
				...state,
				patients: {
					...action.payload.reduce(
						(memo, patient) => ({ ...memo, [patient.id]: patient }),
						{}
					),
					...state.patients,
				},
			};
		case "SET_DIAGNOSIS_LIST":
			return {
				...state,
				diagnosisList: action.payload,
			};
		case "ADD_PATIENT":
			return {
				...state,
				patients: {
					...state.patients,
					[action.payload.id]: action.payload,
				},
			};
		case "SET_PATIENT":
			return {
				...state,
				currentPatient: action.payload,
			};
		default:
			return state;
	}
};

export const setPatientList = (patients: Patient[]): Action => {
	return {
		type: "SET_PATIENT_LIST",
		payload: patients,
	};
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
	return {
		type: "SET_DIAGNOSIS_LIST",
		payload: diagnosis,
	};
};
