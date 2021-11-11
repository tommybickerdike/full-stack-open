import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
	notification: notificationReducer,
	blogs: blogReducer,
	user: userReducer,
});

const Store = ({ children }) => {
	console.log(reducer.notification);
	
	const store = createStore(
		reducer,
		composeWithDevTools(applyMiddleware(thunk))
	);

	return <Provider store={store}>{children}</Provider>;
};

Store.propTypes = {
	children: PropTypes.object.isRequired,
};

export default Store;
