import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = async (event) => {
		const anecdote = event.target.anecdote.value;
		event.preventDefault();
		dispatch(setNotification(`${anecdote} added`));
		dispatch(createAnecdote(anecdote));
		event.target.anecdote.value = "";
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
