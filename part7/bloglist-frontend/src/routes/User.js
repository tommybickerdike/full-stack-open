import React from "react";
import { useResource } from "../hooks/useResource";
import PropTypes from "prop-types";

const User = ({ userId }) => {
	const [users] = useResource("/api/users");

	const foundUser = users.filter((item) => item.id === userId);

	return (
		<div>
			{foundUser.map((user) => (
				<h1 key={user.id}>{user.name}</h1>
			))}
			<h2>Added Blogs</h2>
			<ul></ul>
		</div>
	);
};

User.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default User;
