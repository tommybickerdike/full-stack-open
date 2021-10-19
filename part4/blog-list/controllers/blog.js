const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
	try {
		const blogs = await Blog.find({});
		response.json(blogs.map((blog) => blog.toJSON()));
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post("/", async (request, response, next) => {
	try {
		const blog = new Blog(request.body);
		const savedBlog = await blog.save();
		response.status(201).json(savedBlog.toJSON()).end();
	} catch (exception) {
		next(exception);
	}
});

module.exports = blogsRouter;
