import loginService from "../services/login";

const reducer = (state = null, action) => {
	switch (action.type) {
		case "SET_USER":
			return action.data;
		case "GET_USER":
			return;
		default:
			return state;
	}
};

export const login = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login(username, password);
		dispatch({
			type: "SET_USER",
			data: JSON.stringify(user),
		});
	};
};

export const get = () => {
	return async (dispatch) => {
		dispatch({
			type: "GET_USER",
		});
	};
};

export const logout = () => {
	return async (dispatch) => {
		dispatch({
			type: "SET_USER",
			data: null,
		});
	};
};

export default reducer;
