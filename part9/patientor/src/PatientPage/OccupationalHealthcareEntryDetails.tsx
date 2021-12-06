import React from "react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry } from "../types";

const patientDiagnosis = (diagnosis: string[] | undefined) => {
	const [{ diagnosisList }] = useStateValue();
	const diagnosisDetails = diagnosis?.map((diag) =>
		diagnosisList.find((d) => d.code === diag)
	);
	if (diagnosisDetails) {
		return (
			<ul>
				{diagnosisDetails?.map((d) => (
					<li key={d?.code}>
						{d?.code} {d?.name}
					</li>
				))}
			</ul>
		);
	} else {
		return null;
	}
};

const OccupationalHealthcareEntryDetails: React.FC<{
	entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
	console.log("E", entry);
	return (
		<div>
			<h3>{entry.date}</h3>
			<p>{entry.description}</p>
			{patientDiagnosis(entry.diagnosisCodes)}
		</div>
	);
};

export default OccupationalHealthcareEntryDetails;
