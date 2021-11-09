import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import Toggle from "./components/Toggle";
import userService from "./services/user";
import { initialize as initBlogs } from "./reducers/blogReducer";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

	const [user, setUser] = useState(null);

	useEffect(() => {
		userService.getUser().then((user) => setUser(user));
	}, []);

	return (
		<main>
			<Notification />
			{user === null ? (
				<Toggle buttonLabel="Login">
					<LoginForm setUser={setUser} />
				</Toggle>
			) : (
				<div>
					<h2>blogs</h2>
					<UserInfo user={user} setUser={setUser} />
					<Toggle buttonLabel="Create new blog">
						<AddBlogForm />
					</Toggle>
					<BlogList />
				</div>
			)}
		</main>
	);
};

export default App;
