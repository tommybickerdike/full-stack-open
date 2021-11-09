import blogsService from "../services/blogs";

const reducer = (state = [], action) => {
	switch (action.type) {
		case "INIT":
			const initBlogs = action.data;
			return initBlogs.sort((a, b) => b.likes - a.likes);
		default:
			return state;
	}
};

export const initialize = () => {
	return async (dispatch) => {
		const initBlogs = await blogsService.getAll();
		dispatch({
			type: "INIT",
			data: initBlogs,
		});
	};
};

export default reducer;
