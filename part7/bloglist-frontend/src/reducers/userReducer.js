const reducer = (state = null, action) => {
	switch (action.type) {
	case "SET_USER":
		return action.data;
	default:
		return state;
	}
};

export const initialize = () => {
	const user = window.localStorage.getItem("user");
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			data: user,
		});
	};
};

export const setUser = (user) => {
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			data: JSON.stringify(user),
		});
	};
};

export const logout = () => {
	window.localStorage.removeItem("user");
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			data: null,
		});
	};
};

export default reducer;
