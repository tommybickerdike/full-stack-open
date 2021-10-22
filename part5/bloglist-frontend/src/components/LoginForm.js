import React, { useState, useEffect } from "react";
import loginService from "../services/login";

const LoginForm = ({ user, setUser }) => {
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login(username, password);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (exception) {
			setErrorMessage("wrong credentials");
			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};
	const [username, setUsername] = useState([]);
	const [password, setPassword] = useState([]);
	const [errorMessage, setErrorMessage] = useState([]);

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label for="username">User Name</label>
				<input
					id="username"
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<label for="password">Password</label>
			<input
				id="password"
				type="password"
				value={password}
				name="Password"
				onChange={({ target }) => setPassword(target.value)}
			/>
			<button type="submit">login</button>
			{errorMessage ? <div>{errorMessage}</div> : ""}
		</form>
	);
};

export default LoginForm;
