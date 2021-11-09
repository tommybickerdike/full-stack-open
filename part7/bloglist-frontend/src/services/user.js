export const getUser = (user) => {
	if (user !== "undefined") {
		return JSON.parse(user);
	} else {
		return null;
	}
};
