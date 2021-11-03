const reducer = (state = [], action) => {
	switch (action.type) {
		case "VOTE":
			const anecdoteToChange = state.find((n) => n.id === action.data.id);
			const changedAnecdote = {
				...anecdoteToChange,
				votes: anecdoteToChange.votes + 1,
			};
			const updatedAnecdotes = state.map((anecdote) =>
				anecdote.id !== action.data.id ? anecdote : changedAnecdote
			);
			return updatedAnecdotes.sort((a, b) => b.votes - a.votes);
		case "ADD":
			return [...state, action.data];
		case "INIT":
			return action.data;
		default:
			return state;
	}
};

export const createAnecdote = (content) => {
	return {
		type: "ADD",
		data: content,
	};
};

export const vote = (id) => {
	return { type: "VOTE", data: { id } };
};

export const initialize = (anecdotes) => {
	return {
		type: "INIT",
		data: anecdotes,
	};
};

export default reducer;
