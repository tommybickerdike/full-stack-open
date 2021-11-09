import React, { useState } from "react";
// import blogService from "../services/blogs";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const AddBlog = () => {
	const [title, setTitle] = useState([]);
	const [author, setAuthor] = useState([]);
	const [url, setUrl] = useState([]);

	const handleAdd = async (event) => {
		event.preventDefault();

		// try {
		// 	const newBlog = await blogService.addNew(title, author, url);
		// 	const newBlogs = blogs.concat(newBlog);
		// 	setBlogs(newBlogs);
		// 	setTitle("");
		// 	setAuthor("");
		// 	setUrl("");

		// 	setNotification(`A new blog: "${title}" by ${author} added`, 10);

		// 	if (toggleRef) toggleRef.current.toggleVisibility();
		// } catch (exception) {
		// 	setNotification("could not add blog", 10);
		// }
	};

	return (
		<form onSubmit={handleAdd}>
			<div>
				<label htmlFor="title">Title</label>
				<input
					id="title"
					type="text"
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				<label htmlFor="author">Author</label>
				<input
					id="author"
					type="text"
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				<label htmlFor="url">URL</label>
				<input
					id="url"
					type="text"
					value={url}
					name="URL"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit">create</button>
		</form>
	);
};

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog);
