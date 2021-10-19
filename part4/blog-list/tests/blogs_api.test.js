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

describe("api calls", () => {
	test("notes are returned as json", async () => {
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
		const notesAtEnd = await helper.blogsInDb();
		expect(notesAtEnd).toHaveLength(helper.initialBlogs.length + 1);
		expect(notesAtEnd.slice(-1)[0].title).toEqual(postBlog.title);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
