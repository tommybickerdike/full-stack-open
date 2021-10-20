const blogsRouter = require("express").Router();
const config = require("../utils/config");
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
	const authorization = request.get("authorization");
	console.log(authorization);
	if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
		return authorization.substring(7);
	}
	return null;
};

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
	const token = getTokenFrom(request);
	const decodedToken = jwt.verify(token, config.SECRET);
	if (!token || !decodedToken.id) {
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
