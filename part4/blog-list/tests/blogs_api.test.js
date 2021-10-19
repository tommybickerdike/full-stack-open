const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const helper = require("./test_helper");

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of helper.initialBlogs) {
		let blogObject = new Blog(blog);
		await blogObject.save();
	}
});

describe("general api calls", () => {
	test("blogs are returned as json", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	}, 100000);

	test("_id converted to id", async () => {
		const response = await api.get("/api/blogs");
		const contents = response.body;
		expect(contents[0].id).toBeDefined();
		expect(contents[0]._id).not.toBeDefined();
	});

	test("post to database", async () => {
		const postBlog = {
			title: "New One",
			author: "John Snow",
			url: "https://www.sasadadasd.com",
			likes: 12,
		};
		await api.post("/api/blogs").send(postBlog).expect(201);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(blogsAtEnd.slice(-1)[0].title).toEqual(postBlog.title);
	});

	test("default to 0 likes", async () => {
		const postBlog = {
			title: "New One",
			author: "John Snow",
			url: "https://www.sasadadasd.com",
		};
		await api.post("/api/blogs").send(postBlog).expect(201);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(blogsAtEnd.slice(-1)[0].likes).toEqual(0);
	});

	test("missing info post responds 400", async () => {
		const postBlog = {
			author: "John Snow",
		};
		await api.post("/api/blogs").send(postBlog).expect(400);
	}, 100000);
});

describe("api individual mutations", () => {
	test("can delete an existing note", async () => {
		const blogToDelete = new Blog(helper.initialBlogs[1]);
		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
		const blogsAtEnd = await helper.blogsInDb();
		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
		const contents = blogsAtEnd.map((r) => r.id);
		expect(contents).not.toContain(blogToDelete.id);
	}, 100000);

	test("can get an existing note", async () => {
		const blogToGet = new Blog(helper.initialBlogs[1]);
		await api.get(`/api/blogs/${blogToGet.id}`).expect(200);
	}, 100000);
});

afterAll(() => {
	mongoose.connection.close();
});
