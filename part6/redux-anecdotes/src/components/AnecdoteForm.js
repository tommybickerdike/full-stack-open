import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = (event) => {
		const anecdote = event.target.anecdote.value;
		event.preventDefault();
		dispatch(createAnecdote(anecdote));
		dispatch(setNotification(`${anecdote} added`));
	};

	return (
		<form onSubmit={create}>
			<h2>create new</h2>
			<div>
				<input name="anecdote" />
			</div>
			<button type="submit">create</button>
		</form>
	);
};

export default AnecdoteForm;
