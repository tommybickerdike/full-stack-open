import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
	const result = useQuery(ALL_BOOKS);
	const [filter, setFilter] = useState("");

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

	const updateFilter = (event) => {
		setFilter(event.target.value);
	};

	const books = result.data.allBooks;

	const genres = books.reduce((acc, book) => {
		book.genres.forEach((genre) => {
			if (genre !== "" && !acc.includes(genre)) {
				acc.push(genre);
			}
		});
		return acc;
	}, []);

	const booksToShow =
		filter === ""
			? books
			: books.filter((book) => book.genres.includes(filter));

	return (
		<div>
			<h2>books</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{booksToShow.map((b) => (
						<tr key={b.title}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<br />
			<h3>filter by genre</h3>
			{genres.map((genre) => (
				<button key={genre} value={genre} onClick={updateFilter}>
					{genre}
				</button>
			))}
			<button onClick={updateFilter}>all genres</button>
		</div>
	);
};

export default Books;
