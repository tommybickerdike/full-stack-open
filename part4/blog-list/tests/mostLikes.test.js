const listHelper = require("../utils/list_helper");
const dummy = require("./dummyData");

describe("total likes", () => {
	const manyBlogResult = {
		author: "Edsger W. Dijkstra",
		likes: 17,
	};

	const singleBlogResult = {
		author: "Edsger W. Dijkstra",
		likes: 5,
	};

	test("find the author with the most likes from a list", () => {
		const result = listHelper.mostLikes(dummy.listWithManyBlogs);
		expect(result).toEqual(manyBlogResult);
	});

	test("find a single author likes from a list of one", () => {
		const result = listHelper.mostLikes(dummy.listWithOneBlog);
		expect(result).toEqual(singleBlogResult);
	});
});
