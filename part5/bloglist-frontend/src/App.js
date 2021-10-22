import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import UserInfo from "./components/UserInfo";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
		userService.getUser().then((user) => setUser(user));
	}, []);

	return (
		<main>
			{user === null ? (
				<LoginForm setUser={setUser} />
			) : (
				<div>
					<h2>blogs</h2>
					<UserInfo user={user} setUser={setUser} />
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</main>
	);
};

export default App;
