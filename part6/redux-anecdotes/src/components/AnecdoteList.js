import React from "react";
import { connect } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
	const anecdoteList = () => {
		if (props.filter === "ALL") {
			return props.anecdotes;
		} else {
			return props.anecdotes.filter(
				(anecdote) =>
					anecdote.content.toLowerCase().indexOf(props.filter.toLowerCase()) !==
					-1
			);
		}
	};

	const addVote = (anecdote) => () => {
		props.vote(anecdote.id);
		props.setNotification(`Voted on ${anecdote.content}`, 3);
	};

	return (
		<div>
			{anecdoteList().map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={addVote(anecdote)}>vote</button>
					</div>
					<hr />
				</div>
			))}
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		vote: (value) => {
			dispatch(vote(value));
		},
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

const mapStateToProps = (state) => {
	return {
		anecdotes: state.anecdotes,
		filter: state.filter,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
