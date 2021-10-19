const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");
const dummy = require("./dummyData");

beforeEach(async () => {
	await Blog.deleteMany({});

	for (let blog of dummy.listWithManyBlogs) {
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
});

afterAll(() => {
	mongoose.connection.close();
});
