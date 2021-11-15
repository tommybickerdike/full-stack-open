import React, { useState, useEffect } from "react";
import { useResource } from "../hooks/useResource";
import blogService from "../services/blogs";
import { useRouteMatch } from "react-router";
import Likes from "../components/Likes";
import { setNotification } from "../reducers/notificationReducer";

const Blog = () => {
	const blogUrl = useRouteMatch("/blog/:slug");
	const blogId = blogUrl ? blogUrl.params.slug : "";
	let [blog] = useResource(`/api/blogs/${blogId}`);

	const [comment, setComment] = useState("");
	const [commentList, setCommentList] = useState("");

	const handleComment = async (event) => {
		event.preventDefault();
		try {
			const updatedBlog = await blogService.comment(blog, comment);
			setComment("");
			setCommentList(updatedBlog.comments);
			setNotification("Comment added", 10, "good");
		} catch (exception) {
			console.log(exception);
		}
	};

	useEffect(() => {
		setCommentList(blog.comments);
	}, [setCommentList, blog]);

	if (!blog.user || !commentList) {
		return null;
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<a href={blog.url}>{blog.url}</a>
			<Likes blog={blog} />
			<p>Added by {blog.user.name}</p>
			<h2>Comments</h2>
			<form onSubmit={handleComment}>
				<input
					type="text"
					value={comment}
					name="Comment"
					onChange={({ target }) => setComment(target.value)}
				/>
				<button type="submit">add comment</button>
			</form>
			<ul>
				{commentList.map((comment, index) => (
					<li key={index}>{comment}</li>
				))}
			</ul>
		</div>
	);
};

export default Blog;
