import React from "react";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
	const anecdotes = useSelector((state) => state);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log("vote", id);
		dispatch({
			type: "VOTE",
			data: {
				id: id,
			},
		});
	};

	const create = (event) => {
		const addThis = event.target.anecdote.value;
		event.preventDefault();

		dispatch({
			type: "ADD",
			data: {
				anecdote: addThis,
			},
		});
	};

	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
			<h2>create new</h2>
			<form onSubmit={create}>
				<div>
					<input name="anecdote" />
				</div>
				<button type="submit">create</button>
			</form>
		</div>
	);
};

export default App;
