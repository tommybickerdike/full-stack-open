import React, { useState } from "react";

const Blog = ({ blog }) => {
	const [visible, setVisible] = useState(false);

	const blogStyle = {
		padding: "1rem",
		border: "1px solid #bbb",
		marginBottom: "-1px",
		clear: "both",
	};

	const buttonStyle = {
		float: "right",
	};

	const detailsStyle = {
		clear: "both",
		paddingTop: "1rem",
		borderTop: "1px solid #ddd",
		marginTop: "1rem",
	};

	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author}
			<button style={{ ...hideWhenVisible, ...buttonStyle }} onClick={toggle}>
				View
			</button>
			<button style={{ ...showWhenVisible, ...buttonStyle }} onClick={toggle}>
				Hide
			</button>
			<div style={{ ...showWhenVisible, ...detailsStyle }}>
				<p>{blog.url}</p>
				<p>
					Likes {blog.likes} <button>Like</button>
				</p>

				<p>{blog.user.name}</p>
			</div>
		</div>
	);
};

export default Blog;
