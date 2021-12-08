import React from "react";
import { useStateValue } from "../state";
import {
	Entry,
	HospitalEntry,
	OccupationalHealthcareEntry,
	HealthCheckEntry,
} from "../types";
import { Card } from "semantic-ui-react";

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
	return (
		<Card fluid>
			<Card.Content>
				<Card.Header>
					<h3>
						{entry.date} <i className="hospital icon"></i>
					</h3>
				</Card.Header>
				<p>{entry.description}</p>
				{patientDiagnosis(entry.diagnosisCodes)}
			</Card.Content>
		</Card>
	);
};

const OccupationalHealthcareEntryDetails: React.FC<{
	entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Card.Header>
					<h3>
						{entry.date} <i className="briefcase icon"></i>
					</h3>
				</Card.Header>
				<p>{entry.description}</p>
				{patientDiagnosis(entry.diagnosisCodes)}
			</Card.Content>
		</Card>
	);
};

const HealthCheckEntryDetails: React.FC<{
	entry: HealthCheckEntry;
}> = ({ entry }) => {
	return (
		<Card fluid>
			<Card.Content>
				<Card.Header>
					<h3>
						{entry.date} <i className="clipboard check icon"></i>
					</h3>
				</Card.Header>
				<p>{entry.description}</p>
				{patientDiagnosis(entry.diagnosisCodes)}
			</Card.Content>
		</Card>
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
