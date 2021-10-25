import React, { useState } from "react";
import blogService from "../services/blogs";

const AddBlog = ({ blogs, setBlogs }) => {
	const [title, setTitle] = useState([]);
	const [author, setAuthor] = useState([]);
	const [url, setUrl] = useState([]);
	const [errorMessage, setErrorMessage] = useState([]);

	const handleAdd = async (event) => {
		event.preventDefault();

		try {
			const newBlog = await blogService.addNew(title, author, url);
			const newBlogs = blogs.concat(newBlog);
			setBlogs(newBlogs);
			setTitle("");
			setAuthor("");
			setUrl("");
		} catch (exception) {
			setErrorMessage("could not add blog");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
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
			{errorMessage ? <div>{errorMessage}</div> : ""}
		</form>
	);
};

export default AddBlog;
