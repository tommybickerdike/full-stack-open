import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { apiBaseUrl } from "../constants";
import { Entry, Patient } from "../types";
import { useStateValue } from "../state";
import EntryDetails from "./EntryDetails";
import { Button } from "semantic-ui-react";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";

const PatientPage = () => {
	const [modalOpen, setModalOpen] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string | undefined>();

	const openModal = (): void => setModalOpen(true);

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};

	const [{ currentPatient }, dispatch] = useStateValue();
	const { id } = useParams<{ id: string }>();

	const submitNewEntry = async (values: EntryFormValues) => {
		try {
			const { data: newEntry } = await axios.post<Entry>(
				`${apiBaseUrl}/patients/${id}/entries`,
				values
			);
			dispatch({ type: "UPDATE_ENTRIES", payload: newEntry });
			closeModal();
		} catch (e) {
			console.error(e.response?.data || "Unknown Error");
			setError(e.response?.data?.error || "Unknown error");
		}
	};

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
	}, [id]);

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
			{currentPatient.entries.length ? <h2>Entries</h2> : ""}
			{currentPatient.entries.map((e: Entry) => {
				return <EntryDetails entry={e} key={e.id} />;
			})}
			<AddEntryModal
				modalOpen={modalOpen}
				onSubmit={submitNewEntry}
				error={error}
				onClose={closeModal}
			/>
			<Button onClick={() => openModal()}>Add New Entry</Button>
		</div>
	) : (
		<div>
			<h1>Patient not found</h1>
		</div>
	);
};

export default PatientPage;
