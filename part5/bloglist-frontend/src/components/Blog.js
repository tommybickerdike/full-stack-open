import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, setNotification, user }) => {
	const [visible, setVisible] = useState(false);
	const [removed, setRemoved] = useState(false);
	const [likes, setLikes] = useState(blog.likes);

	const blogStyle = {
		padding: "1rem",
		border: "1px solid #bbb",
		marginBottom: "-1px",
		clear: "both",
	};

	const buttonStyle = {
		float: "right",
	};

	const handleLike = async () => {
		try {
			const updatedBlog = await blogService.like(blog, likes);
			setLikes(updatedBlog.likes);
		} catch (exception) {
			setNotification({ message: "could not like", style: "bad" });
		}
	};

	const handleRemove = async () => {
		try {
			if (
				window.confirm(
					`Do you really want to remove ${blog.title} by ${blog.author}?`
				)
			) {
				await blogService.remove(blog);
				setRemoved(true);
			}
		} catch (exception) {
			setNotification({ message: "could not remove", style: "bad" });
		}
	};

	const detailsStyle = {
		clear: "both",
		paddingTop: "1rem",
		borderTop: "1px solid #ddd",
		marginTop: "1rem",
	};

	const showWhenUser = {
		display: blog.user.username === user.username ? "" : "none",
	};

	const hideWhenRemoved = { display: removed ? "none" : "" };
	const hideWhenVisible = { display: visible ? "none" : "" };
	const showWhenVisible = { display: visible ? "" : "none" };

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<div style={{ ...blogStyle, ...hideWhenRemoved }}>
			{blog.title}, {blog.author}
			<button style={{ ...hideWhenVisible, ...buttonStyle }} onClick={toggle}>
				View
			</button>
			<button style={{ ...showWhenVisible, ...buttonStyle }} onClick={toggle}>
				Hide
			</button>
			<div style={{ ...showWhenVisible, ...detailsStyle }}>
				<p>{blog.url}</p>
				<p>
					Likes {likes} <button onClick={handleLike}>Like</button>
				</p>

				<p>{blog.user.name}</p>

				<button style={showWhenUser} onClick={handleRemove}>
					remove
				</button>
			</div>
		</div>
	);
};

export default Blog;
