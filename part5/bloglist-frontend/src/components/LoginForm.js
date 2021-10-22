import React, { useState } from "react";
import loginService from "../services/login";

const LoginForm = ({ setUser }) => {
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login(username, password);
			setUser(user);
			window.localStorage.setItem("user", JSON.stringify(user));
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
			<button type="submit">login</button>
			{errorMessage ? <div>{errorMessage}</div> : ""}
		</form>
	);
};

export default LoginForm;
