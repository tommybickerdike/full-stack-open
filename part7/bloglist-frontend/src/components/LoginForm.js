import React, { useState } from "react";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { login } from "../reducers/userReducer";

const LoginForm = (props) => {
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			props.login(username, password);
		} catch (exception) {
			props.setNotification("wrong username or password", 10);
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

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
		login: (username, password) => {
			dispatch(login(username, password));
		},
	};
};

export default connect(null, mapDispatchToProps)(LoginForm);
