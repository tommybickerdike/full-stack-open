import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogReducer,
});

const Store = (props) => {
	const store = createStore(
		reducer,
		composeWithDevTools(applyMiddleware(thunk))
	);

	return <Provider store={store}>{props.children}</Provider>;
};

export default Store;
