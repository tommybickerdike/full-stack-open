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

export const setNotification = (content) => {
	return { type: "SET", data: content };
};

export const clearNotification = (content) => {
	return { type: "CLEAR", data: content };
};

export default reducer;
