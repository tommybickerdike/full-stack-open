import blogsService from "../services/blogs";

const reducer = (state = [], action) => {
	switch (action.type) {
		case "LOAD_BLOGS":
			return action.data.sort((a, b) => b.likes - a.likes);
		default:
			return state;
	}
};

export const initialize = () => {
	return async (dispatch) => {
		const initBlogs = await blogsService.getAll();
		dispatch({
			type: "LOAD_BLOGS",
			data: initBlogs,
		});
	};
};

export default reducer;
