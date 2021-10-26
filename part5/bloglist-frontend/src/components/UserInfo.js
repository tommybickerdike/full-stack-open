import React from "react";

const logout = (setUser, setNotification) => {
	window.localStorage.removeItem("user");
	setUser(null);
	setNotification({ message: "logged out", style: "good" });
};

const UserInfo = ({ user, setUser, setNotification }) => (
	<div>
		<p>{user.name} logged-in</p>
		<button onClick={() => logout(setUser, setNotification)}>Logout</button>
	</div>
);

export default UserInfo;
