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
});

afterAll(() => {
	mongoose.connection.close();
});
