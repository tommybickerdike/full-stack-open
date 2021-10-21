const blogsRouter = require("express").Router();
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
	const decodedToken = jwt.verify(request.token, config.SECRET);

	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	const blog = new Blog({
		title: request.body.title,
		author: request.body.author,
		url: request.body.url,
		user: user.id,
	});

	const savedBlog = await blog.save();
	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	response.status(201).json(savedBlog.toJSON()).end();
});

blogsRouter.get("/:id", async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	response.json(blog.toJSON());
});

blogsRouter.delete("/:id", async (request, response) => {
	const decodedToken = jwt.verify(request.token, config.SECRET);
	if (!request.token || !decodedToken.id) {
		return response.status(401).json({ error: "token missing or invalid" });
	}
	const user = await User.findById(decodedToken.id);

	blogToDelete = await Blog.findById(request.params.id);

	if (!blogToDelete) {
		return response.status(404).json({ error: "blog not found" }).end();
	}
	if (blogToDelete.user.toString() === user.id.toString()) {
		await Blog.findByIdAndRemove(request.params.id);
		return response.status(204).end();
	}

	return response.status(401).json({ error: "token missing or invalid" });
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
