import React from "react";
import { useResource } from "../hooks/useResource";
import PropTypes from "prop-types";

const User = ({ userId }) => {
	const [users] = useResource("/api/users");

	const foundUser = users.find((item) => item.id === userId);

	if (!foundUser) {
		return null;
	}

	return (
		<div>
			<h1>{foundUser.name}</h1>
			<h2>Added Blogs</h2>
			<ul>
				{foundUser.blogs.map((blog) => (
					<li key={blog.id}>{blog.title}</li>
				))}
			</ul>
		</div>
	);
};

User.propTypes = {
	userId: PropTypes.string.isRequired,
};

export default User;
