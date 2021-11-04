import React from "react";
import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
	const create = async (event) => {
		const anecdote = event.target.anecdote.value;
		event.preventDefault();
		props.setNotification(`${anecdote} added`, 10);
		props.createAnecdote(anecdote);
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

const mapDispatchToProps = (dispatch) => {
	return {
		createAnecdote: (value) => {
			dispatch(createAnecdote(value));
		},
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
