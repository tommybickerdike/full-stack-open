const listHelper = require("../utils/list_helper");
const dummy = require("./dummyData");

describe("total likes", () => {
	test("when list has only one blog, equals the likes of that", () => {
		const result = listHelper.totalLikes(dummy.listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list has many blogs, equals the likes of that", () => {
		const result = listHelper.totalLikes(dummy.listWithManyBlogs);
		expect(result).toBe(36);
	});
});
