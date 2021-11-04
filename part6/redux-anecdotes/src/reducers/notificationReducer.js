const initialState = null;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET":
			return action.data;
		case "CLEAR":
			return initialState;
		default:
			return state;
	}
};

export const setNotification = (content, timeout) => {
	return async (dispatch) => {
		const seconds = timeout * 1000;
		setTimeout(() => {
			dispatch({ type: "CLEAR" });
		}, seconds);

		dispatch({ type: "SET", data: content });
	};
};

export default reducer;
