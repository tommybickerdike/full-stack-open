import React, { useState, useCallback } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK } from "../queries";

const NewBook = (props) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [published, setPublished] = useState("");
	const [genre, setGenre] = useState("");
	const [genres, setGenres] = useState([]);
	const [info, setInfo] = useState("");

	const [createBook] = useMutation(CREATE_BOOK);

	if (!props.show) {
		return null;
	}

	const submit = async (event) => {
		event.preventDefault();

		try {
			await createBook({
				variables: {
					title,
					author,
					published,
					genres,
				},
			});
			setInfo(`${title} added`);
		} catch (error) {
			setInfo(error.message);
		}

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
			<div>{info}</div>
		</div>
	);
};

export default NewBook;
