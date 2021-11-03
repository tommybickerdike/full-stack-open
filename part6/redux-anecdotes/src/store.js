import { useEffect } from "react";
import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import anecdoteReducer, { initialize } from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";
import anecdoteService from "./services/anecdotes";

const reducer = combineReducers({
	anecdotes: anecdoteReducer,
	notification: notificationReducer,
	filter: filterReducer,
});

const Store = (props) => {
	const store = createStore(reducer, composeWithDevTools());

	useEffect(() => {
		anecdoteService
			.getAll()
			.then((anecdotes) => store.dispatch(initialize(anecdotes)));
	}, []);

	return <Provider store={store}>{props.children}</Provider>;
};

export default Store;
