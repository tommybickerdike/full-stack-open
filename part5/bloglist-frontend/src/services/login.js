import axios from "axios";
const baseUrl = "/api/login";

const login = async (username, password) => {
	const response = await axios.post(baseUrl, {
		username: username,
		password: password,
	});
	try {
		return response.data;
	} catch {
		return response.data;
	}
};

const exports = {
	login,
};

export default exports;
