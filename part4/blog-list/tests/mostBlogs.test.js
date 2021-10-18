const listHelper = require("../utils/list_helper");
const dummy = require("./dummyData");

describe("total likes", () => {
	const manyBlogResult = {
		author: "Robert C. Martin",
		blogs: 3,
	};

	const singleBlogResult = {
		author: "Edsger W. Dijkstra",
		blogs: 1,
	};

	test("find the author with the most blogs from a list", () => {
		const result = listHelper.mostBlogs(dummy.listWithManyBlogs);
		expect(result).toEqual(manyBlogResult);
	});

	test("find a single author count from a list of one", () => {
		const result = listHelper.mostBlogs(dummy.listWithOneBlog);
		expect(result).toEqual(singleBlogResult);
	});
});
