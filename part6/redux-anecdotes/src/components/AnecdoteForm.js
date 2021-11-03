import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const create = async (event) => {
		const anecdote = event.target.anecdote.value;
		event.preventDefault();
		dispatch(setNotification(`${anecdote} added`));
		const newAnecdote = await anecdoteService.createNew(anecdote);
		dispatch(createAnecdote(newAnecdote));
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
