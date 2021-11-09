import loginService from "../services/login";

const reducer = (state = [], action) => {
	switch (action.type) {
		case "SET_USER":
			return action.data;
		default:
			return state;
	}
};

export const login = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login(username, password);
		dispatch({
			type: "SET_USER",
			data: user.token,
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
