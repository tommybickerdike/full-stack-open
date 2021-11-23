import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
	const [books, setBooks] = useState([]);
	const [filter, setFilter] = useState("");

	const allBooks = useQuery(ALL_BOOKS);

	const filteredBooks = useQuery(ALL_BOOKS, {
		variables: { genre: filter },
	});

	const updateFilter = (event) => {
		setFilter(event.target.value);
	};

	useEffect(() => {
		if (filteredBooks.data) {
			setBooks(filteredBooks.data.allBooks);
		} else if (allBooks.data) {
			setBooks(allBooks.data.allBooks);
		}
	}, [allBooks.data, filteredBooks.data]);

	if (!props.show) {
		return null;
	}

	if (allBooks.loading || filteredBooks.loading || !books) {
		return (
			<div>
				<h2>books</h2>
				<p>loading... {filter ? filter : ""} </p>
			</div>
		);
	}

	const genres = allBooks.data.allBooks.reduce((accumulator, element) => {
		element.genres.forEach((genre) => {
			if (genre !== "" && !accumulator.includes(genre)) {
				accumulator.push(genre);
			}
		});
		return accumulator;
	}, []);

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
					{books.map((b) => (
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
