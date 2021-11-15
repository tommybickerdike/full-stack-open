import React from "react";
import { useResource } from "../hooks/useResource";
import { useRouteMatch } from "react-router";
import Likes from "../components/Likes";

const Blog = () => {
	const blogUrl = useRouteMatch("/blog/:slug");
	const blogId = blogUrl ? blogUrl.params.slug : "";

	const [blog] = useResource(`/api/blogs/${blogId}`);

	if (!blog.user) {
		return null;
	}

	return (
		<div>
			<h1>{blog.title}</h1>
			<a href={blog.url}>{blog.url}</a>
			<Likes blog={blog} />

			<p>Added by {blog.user.name}</p>
		</div>
	);
};

export default Blog;
