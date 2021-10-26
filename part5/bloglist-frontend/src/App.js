import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
	const [user, setUser] = useState(null);
	const [blogs, setBlogs] = useState([]);
	const [notification, setNotification] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
		userService.getUser().then((user) => setUser(user));
	}, []);

	return (
		<main>
			<Notification
				notification={notification}
				setNotification={setNotification}
			/>
			{user === null ? (
				<LoginForm setUser={setUser} setNotification={setNotification} />
			) : (
				<div>
					<h2>blogs</h2>
					<UserInfo
						user={user}
						setUser={setUser}
						setNotification={setNotification}
					/>
					<AddBlogForm
						blogs={blogs}
						setBlogs={setBlogs}
						setNotification={setNotification}
					/>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			)}
		</main>
	);
};

export default App;
