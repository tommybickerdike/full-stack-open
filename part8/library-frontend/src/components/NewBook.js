import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK } from "../queries";

const NewBook = ({ setError, favoriteGenre, ...props }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);

	const [createBook] = useMutation(CREATE_BOOK, {
		refetchQueries: [
			{ query: ALL_AUTHORS },
			{ query: ALL_BOOKS, variables: { genre: favoriteGenre } },
		],
		update: (store, response) => {
			const currentBooks = store.readQuery({
				query: ALL_BOOKS,
				variables: { genre: "" },
			});
			store.writeQuery({
				query: ALL_BOOKS,
				variables: { genre: "" },
				data: {
					allBooks: [...currentBooks.allBooks, response.data.addBook],
				},
			});
		},
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

	if (!props.show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();

		createBook({
			variables: {
				title,
				author,
				published,
				genres,
			},
		});

		setTitle("");
		setPublished("");
		setAuthor("");
		setGenres([]);
		setGenre("");
	};

	const addGenre = () => {
		setGenres(genres.concat(genre));
		setGenre("");
	};

	return (
		<div>
			<h2>add book</h2>
			<form onSubmit={submit}>
				<div>
					title
					<input
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					author
					<input
						value={author}
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					published
					<input
						type="number"
						value={published}
						onChange={({ target }) => setPublished(parseInt(target.value))}
					/>
				</div>
				<div>
					<input
						value={genre}
						onChange={({ target }) => setGenre(target.value)}
					/>
					<button onClick={addGenre} type="button">
						add genre
					</button>
				</div>
				<div>genres: {genres.join(" ")}</div>
				<button type="submit">create book</button>
			</form>
		</div>
	);
};

export default NewBook;
