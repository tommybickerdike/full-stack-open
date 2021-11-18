import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";

const Authors = ({ setError, ...props }) => {
	const result = useQuery(ALL_AUTHORS);
	const [name, setName] = useState("");
	const [born, setBorn] = useState("");

	const [editBorn] = useMutation(EDIT_BORN, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			if (error.graphQlErrors && error.graphQLErrors.length > 0) {
				setError(`[graphQL]: ${error.graphQLErrors[0].message}`);
			} else if (
				error.networkError &&
				error.networkError.result.errors.length > 0
			) {
				setError(`[network]: ${error.networkError.result.errors[0].message}`);
			} else {
				setError(`[message]: ${error.message}`);
			}
		},
	});

	const submit = async (event) => {
		event.preventDefault();

		if (name === "" || born === "") {
			setError(`[message]: please select name and add date`);
		} else {
			editBorn({
				variables: {
					name,
					born,
				},
			});
			setError(`[edited]: ${name}`);
			setBorn("");
			setName("");
		}
	};

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return (
			<div>
				<h2>authors</h2>
				<p>loading...</p>
			</div>
		);
	}

	const authors = result.data.allAuthors;

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<form onSubmit={submit}>
				<div>
					name
					<select value={name} onChange={({ target }) => setName(target.value)}>
						<option value="" disabled></option>
						{authors.map((a) => (
							<option key={a.name} value={a.name}>
								{a.name}
							</option>
						))}
					</select>
				</div>
				<div>
					born
					<input
						type="number"
						value={born}
						onChange={({ target }) => setBorn(parseInt(target.value))}
					/>
				</div>
				<button type="submit">update author</button>
			</form>
		</div>
	);
};

export default Authors;
