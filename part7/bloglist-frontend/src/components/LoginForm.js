import React, { useState } from "react";
import loginService from "../services/login";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setNotification } from "../reducers/notificationReducer";

const LoginForm = ({ setUser, setNotification }) => {
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login(username, password);
			setUser(user);
			window.localStorage.setItem("user", JSON.stringify(user));
			setUsername("");
			setPassword("");
		} catch (exception) {
			setNotification("wrong username or password", 10);
		}
	};
	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label htmlFor="username">User Name</label>
				<input
					id="username"
					type="text"
					autoComplete="username"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<label htmlFor="password">Password</label>
			<input
				id="password"
				type="password"
				autoComplete="current-password"
				value={password}
				name="Password"
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button type="submit" id="login-button">
				Login
			</button>
		</form>
	);
};

LoginForm.propTypes = {
	setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

export default connect(null, mapDispatchToProps)(LoginForm);
