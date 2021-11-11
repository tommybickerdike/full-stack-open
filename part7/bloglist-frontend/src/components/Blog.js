import React, { useState } from "react";
import blogService from "../services/blogs";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
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
			setNotification("could not like", 10);
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
			setNotification("could not remove", 10);
		}
	};

	const detailsStyle = {
		clear: "both",
		paddingTop: "1rem",
		borderTop: "1px solid #ddd",
		marginTop: "1rem",
	};

	const showWhenUser = {
		display: blog.user.username === user.username ? "block" : "none",
	};

	const hideWhenRemoved = { display: removed ? "none" : "block" };
	const hideWhenVisible = { display: visible ? "none" : "block" };
	const showWhenVisible = { display: visible ? "block" : "none" };

	const toggle = () => {
		setVisible(!visible);
	};

	return (
		<div style={{ ...blogStyle, ...hideWhenRemoved }}>
			{blog.title}, {blog.author}
			<button
				data-testid="blog__toggle-init"
				style={{ ...hideWhenVisible, ...buttonStyle }}
				onClick={toggle}
			>
				View
			</button>
			<button style={{ ...showWhenVisible, ...buttonStyle }} onClick={toggle}>
				Hide
			</button>
			<div
				className="blog__toggle-content"
				style={{ ...showWhenVisible, ...detailsStyle }}
			>
				<p>{blog.url}</p>
				<p>
					Likes {likes}{" "}
					<button onClick={handleLike} data-testid="blog__like-button">
						Like
					</button>
				</p>

				<p>{blog.user.name}</p>

				<button style={showWhenUser} onClick={handleRemove}>
					remove
				</button>
			</div>
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: JSON.parse(state.user),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
