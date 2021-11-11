import React from "react";

const User = (user) => {
	const userInfo = <h1>{user.name}</h1>;

	return (
		<div>
			<h1>User</h1>
			<p>{userInfo}</p>
		</div>
	);
};

export default User;
