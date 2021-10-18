const listHelper = require("../utils/list_helper");
const dummy = require("./dummyData");

describe("favorite blog", () => {
	const mostLikedBlog = {
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0,
	};

	test("if one in array, favoriteBlog finds self", () => {
		const result = listHelper.favoriteBlog(dummy.listWithOneBlog);
		expect(result).toEqual(dummy.listWithOneBlog[0]);
	});

	test("favoriteBlog can find the most liked blog from long list", () => {
		const result = listHelper.favoriteBlog(dummy.listWithManyBlogs);
		expect(result).toEqual(mostLikedBlog);
	});
});
