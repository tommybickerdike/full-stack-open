const _ = require("lodash");

const dummy = () => {
	return 1;
};

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
	const mostLikes = (fave, blog) => {
		return fave.likes > blog.likes ? fave : blog;
	};

	return blogs.length === 0
		? { likes: 0 }
		: blogs.reduce(mostLikes, { likes: 0 });
};

const mostBlogs = (blogs) => {
	const authorCountArray = _.map(_.countBy(blogs, "author"), (val, key) => ({
		author: key,
		blogs: val,
	}));

	const mostBlogs = (fave, blog) => {
		return fave.blogs > blog.blogs ? fave : blog;
	};

	return authorCountArray.reduce(mostBlogs, { author: "", blogs: 0 });
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
};
