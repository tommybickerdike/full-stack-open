const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
	const user = await User.find({});
	const targetUser = user[0];

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		user: targetUser.id,
	});

	const savedBlog = await blog.save();
	targetUser.blogs = targetUser.blogs.concat(savedBlog._id);
	await targetUser.save();

	response.status(201).json(savedBlog.toJSON()).end();
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	response.json(blog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	await Blog.findByIdAndRemove(request.params.id);
	response.status(204).end();
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
