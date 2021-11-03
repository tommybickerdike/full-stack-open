import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
	switch (action.type) {
		case "VOTE":
			const updatedAnecdotes = state.map((anecdote) =>
				anecdote.id !== action.data.id ? anecdote : action.data
			);
			return updatedAnecdotes.sort((a, b) => b.votes - a.votes);
		case "ADD":
			return [...state, action.data];
		case "INIT":
			const initAnecdotes = action.data;
			return initAnecdotes.sort((a, b) => b.votes - a.votes);
		default:
			return state;
	}
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch({
			type: "ADD",
			data: newAnecdote,
		});
	};
};

export const vote = (id) => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		const anecdoteToChange = anecdotes.find((a) => a.id === id);
		const changedAnecdote = {
			...anecdoteToChange,
			votes: anecdoteToChange.votes + 1,
		};
		const updated = await anecdoteService.update(id, changedAnecdote);
		dispatch({
			type: "VOTE",
			data: updated,
		});
	};
};

export const initialize = () => {
	return async (dispatch) => {
		const initAnecdotes = await anecdoteService.getAll();
		dispatch({
			type: "INIT",
			data: initAnecdotes,
		});
	};
};

export default reducer;
