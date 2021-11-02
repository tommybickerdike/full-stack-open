import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./reducers/anecdoteReducer";

const Store = (props) => {
	const store = createStore(reducer, composeWithDevTools());

	return <Provider store={store}>{props.children}</Provider>;
};

export default Store;
