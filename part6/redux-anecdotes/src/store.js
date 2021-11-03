import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const reducer = combineReducers({
	anecdote: anecdoteReducer,
	notification: notificationReducer,
});

const Store = (props) => {
	const store = createStore(reducer, composeWithDevTools());

	return <Provider store={store}>{props.children}</Provider>;
};

export default Store;
