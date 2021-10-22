import React from "react";

const logout = (setUser) => {
	window.localStorage.removeItem("user");
	setUser(null);
};

const UserInfo = ({ user, setUser }) => (
	<div>
		<p>{user.name} logged-in</p>
		<button onClick={() => logout(setUser)}>Logout</button>
	</div>
);

export default UserInfo;
