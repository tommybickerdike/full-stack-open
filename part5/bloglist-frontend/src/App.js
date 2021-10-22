import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";

const App = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	return (
		<main>
			{user === null ? (
				<LoginForm user={user} setUser={setUser} />
			) : (
				<div>
					<h2>blogs</h2>
					<p>{user.name} logged-in</p>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</main>
	);
};

export default App;
