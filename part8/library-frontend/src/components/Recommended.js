import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Recommended = (props) => {
	const result = useQuery(ALL_BOOKS, {
		variables: { genre: props.favoriteGenre },
	});

	if (!props.show) {
		return null;
	}

	if (result.loading) {
		return (
			<div>
				<h2>books</h2>
				<p>loading...</p>
			</div>
		);
	}

	const books = result.data.allBooks;

	return (
		<div>
			<h2>Recommended</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommended;
