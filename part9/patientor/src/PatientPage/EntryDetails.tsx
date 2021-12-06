import React from "react";
import { useStateValue } from "../state";
import {
	Entry,
	HospitalEntry,
	OccupationalHealthcareEntry,
	HealthCheckEntry,
} from "../types";

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

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({
	entry,
}) => {
	console.log("E", entry);
	return (
		<div>
			<h3>{entry.date}</h3>
			<p>{entry.description}</p>
			{patientDiagnosis(entry.diagnosisCodes)}
		</div>
	);
};

const OccupationalHealthcareEntryDetails: React.FC<{
	entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
	console.log("E", entry);
	return (
		<div>
			<h3>{entry.date}</h3>
			<p>{entry.description}</p>
		</div>
	);
};

const HealthCheckEntryDetails: React.FC<{
	entry: HealthCheckEntry;
}> = ({ entry }) => {
	console.log("E", entry);
	return (
		<div>
			<h3>{entry.date}</h3>
			<p>{entry.description}</p>
		</div>
	);
};

const assertNever = (value: never): never => {
	throw new Error(`Unknown entry type: ${JSON.stringify(value)}`);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
	switch (entry.type) {
		case "Hospital":
			return <HospitalEntryDetails entry={entry} />;
		case "OccupationalHealthcare":
			return <OccupationalHealthcareEntryDetails entry={entry} />;
		case "HealthCheck":
			return <HealthCheckEntryDetails entry={entry} />;
		default:
			return assertNever(entry);
	}
};

export default EntryDetails;
