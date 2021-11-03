import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
	const anecdotes = useSelector(({ filter, anecdotes }) => {
		if (filter === "ALL") {
			return anecdotes;
		} else {
			return anecdotes.filter(
				(anecdote) =>
					anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) !== -1
			);
		}
	});

	const dispatch = useDispatch();

	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
					</div>
					<hr />
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
