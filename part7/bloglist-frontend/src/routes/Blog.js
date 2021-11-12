import React from "react";
import { useResource } from "../hooks/useResource";
import { useRouteMatch } from "react-router";

const Blog = () => {
	const blogUrl = useRouteMatch("/blog/:slug");
	const blogId = blogUrl ? blogUrl.params.slug : "";

	const [blog] = useResource(`/api/blogs/${blogId}`);

	if (!blog) {
		return null;
	}

	return (
		<div>
			<h1>{blog.title}</h1>
		</div>
	);
};

export default Blog;
