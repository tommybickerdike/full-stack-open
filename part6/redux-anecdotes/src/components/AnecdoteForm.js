import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = (event) => {
		const anecdote = event.target.anecdote.value;
		event.preventDefault();
		dispatch(createAnecdote(anecdote));
	};
	return (
		<form onSubmit={create}>
			<div>
				<input name="anecdote" />
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default AnecdoteForm;
