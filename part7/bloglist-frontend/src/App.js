import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import Toggle from "./components/Toggle";
import { initialize as initBlogs } from "./reducers/blogReducer";

const App = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

	return (
		<main>
			<Notification />
			{props.user === null ? (
				<Toggle buttonLabel="Login">
					<LoginForm />
				</Toggle>
			) : (
				<div>
					<h2>blogs</h2>
					<UserInfo user={props.user} />
					<Toggle buttonLabel="Create new blog">
						<AddBlogForm />
					</Toggle>
					<BlogList />
				</div>
			)}
		</main>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, null)(App);
