import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientPage = () => {
	const [{ currentPatient }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();

	React.useEffect(() => {
		const fetchPatient = async () => {
			try {
				if (currentPatient?.id !== id || currentPatient !== undefined) {
					const { data: currentPatient } = await axios.get<Patient>(
						`${apiBaseUrl}/patients/${id}`
					);

					dispatch({ type: "SET_PATIENT", payload: currentPatient });
				}
			} catch (e) {
				console.error(e);
			}
		};
		void fetchPatient();
	}, [dispatch, currentPatient, id]);

	const genderIcon = (gender: string) => {
		switch (gender) {
			case "male":
				return <i className="mars icon"></i>;
			case "female":
				return <i className="venus icon"></i>;
			default:
				return <i className="genderless icon"></i>;
		}
	};

	return currentPatient ? (
		<div>
			<h1>
				{currentPatient.name}
				{genderIcon(currentPatient.gender)}
			</h1>
			<p>
				ssn: {currentPatient.ssn}
				<br />
				occupation: {currentPatient.occupation}
			</p>
		</div>
	) : (
		<div>
			<h1>Patient not found</h1>
		</div>
	);
};

export default PatientPage;
