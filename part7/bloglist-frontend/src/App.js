import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import BlogList from "./routes/BlogList";
import UserList from "./routes/UserList";
import User from "./routes/User";
import Blog from "./routes/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import UserInfo from "./components/UserInfo";
import Toggle from "./components/Toggle";
import PropTypes from "prop-types";
import { initialize as initUser } from "./reducers/userReducer";
import { Switch, Route } from "react-router-dom";

const App = ({ user }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initUser());
	}, [dispatch]);

	return (
		<main>
			<Notification />
			{user === null ? (
				<Toggle buttonLabel="Login">
					<LoginForm />
				</Toggle>
			) : (
				<div>
					<h2>blogs</h2>
					<UserInfo />
					<Switch>
						<Route path="/user/:slug">
							<User />
						</Route>
						<Route path="/users">
							<UserList />
						</Route>
						<Route path="/blog/:slug">
							<Blog />
						</Route>
						<Route path="/">
							<BlogList />
						</Route>
					</Switch>
				</div>
			)}
		</main>
	);
};

App.propTypes = {
	user: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => {
	return {
		initUser: (user) => {
			dispatch(initUser(user));
		},
	};
};
const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
