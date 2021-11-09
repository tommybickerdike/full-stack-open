const initialState = null;
let notificationTimer;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "NOTE":
			return action.data;
		case "CLEAR_NOTE":
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
			dispatch({ type: "CLEAR_NOTE" });
		}, seconds);

		dispatch({ type: "NOTE", data: content });
	};
};

export default reducer;
