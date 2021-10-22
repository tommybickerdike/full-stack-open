import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
	const request = await axios.get(baseUrl);
	try {
		return request.data;
	} catch {
		return request.data;
	}
};

const exports = {
	getAll,
};

export default exports;
