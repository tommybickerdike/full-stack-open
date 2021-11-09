const initialState = null;
let notificationTimer;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "NOTIFICATION":
			return action.data;
		case "CLEAR_NOTIFICATION":
			return initialState;
		default:
			return state;
	}
};

export const setNotification = (content, timeout) => {
	return async (dispatch) => {
		const seconds = timeout * 1000;

		clearTimeout(notificationTimer);

		notificationTimer = setTimeout(() => {
			dispatch({ type: "CLEAR_NOTIFICATION" });
		}, seconds);

		dispatch({ type: "NOTIFICATION", data: content });
	};
};

export default reducer;
