import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import {
	TextField,
	SelectField,
	TypeOption,
	DiagnosisSelection,
	NumberField,
} from "./FormField";
import { EntryType, Entry, HealthCheckRating } from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;
export type EntryFormId = Pick<Entry, "id">;

interface Props {
	onSubmit: (values: EntryFormValues) => void;
	onCancel: () => void;
}

const typeOptions: TypeOption[] = [
	{ value: EntryType.HealthCheck, label: "Health Check" },
	{ value: EntryType.Hospital, label: "Hospital" },
	{ value: EntryType.OccupationalHealthcare, label: "Occupational Healthcare" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
	const [{ diagnosisList }] = useStateValue();
	return (
		<Formik
			initialValues={{
				type: EntryType.HealthCheck,
				description: "",
				date: "",
				specialist: "",
				diagnosisCodes: [],
				healthCheckRating: HealthCheckRating.Healthy,
			}}
			onSubmit={onSubmit}
			validate={(values) => {
				const requiredError = "Field is required";
				const errors: { [field: string]: string } = {};
				if (!values.type) {
					errors.type = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				}
				if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date)) {
					errors.date = "Date must be in YYYY-MM-DD format";
				}
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				return errors;
			}}
		>
			{({ isValid, dirty, setFieldValue, setFieldTouched }) => {
				return (
					<Form className="form ui">
						<SelectField label="Type" name="type" options={typeOptions} />
						<Field
							label="Date"
							placeholder="YYYY-MM-DD"
							name="date"
							component={TextField}
						/>
						<Field
							label="Description"
							placeholder="Description"
							name="description"
							component={TextField}
						/>
						<Field
							label="Specialist"
							placeholder="Specialist"
							name="specialist"
							component={TextField}
						/>
						<Field
							label="healthCheckRating"
							name="healthCheckRating"
							component={NumberField}
							min={0}
							max={3}
						/>
						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosisList)}
						/>
						<Grid>
							<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onCancel} color="red">
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated="right" width={5}>
								<Button
									type="submit"
									floated="right"
									color="green"
									disabled={!dirty || !isValid}
								>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
