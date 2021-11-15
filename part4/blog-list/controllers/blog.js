const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/:id/comments", async (request, response) => {
	const blogToComment = await Blog.findById(request.params.id);
	const comment = request.body.comment;

	if (!blogToComment) {
		return response.status(404).json({ error: "blog not found" }).end();
	}
	if (comment) {
		blogToComment.comments.push(comment);
		blogToComment.save();

		response.status(200).end();
	}

	return response.status(403).json({ error: "missing comment" });
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	blogToDelete = await Blog.findById(request.params.id);

	if (!blogToDelete) {
		return response.status(404).json({ error: "blog not found" }).end();
	}
	if (blogToDelete.user.toString() === request.user) {
		await Blog.findByIdAndRemove(request.params.id);
		return response.status(204).end();
	}

	return response.status(403).json({ error: "token missing or invalid" });
});

blogsRouter.put("/:id", async (request, response) => {
	const updatedBlog = await Blog.findByIdAndUpdate(
		request.params.id,
		request.body,
		{
			new: true,
		}
	);
	response.json(updatedBlog);
});

module.exports = blogsRouter;
