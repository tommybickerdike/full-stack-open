import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ setError, setToken, show }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [login, result] = useMutation(LOGIN, {
		onError: (error) => {
			setError(error.graphQLErrors[0].message);
		},
		update: () => {
			setError("Logged in");
		},
	});

	useEffect(() => {
		if (result.data) {
			const token = result.data.login.value;
			setToken(token);
			localStorage.setItem("user", token);
		}
		if (localStorage.getItem("user") !== null) {
			setToken(localStorage.getItem("user"));
		}
	}, [result.data, setToken]);

	const loginHandler = (event) => {
		event.preventDefault();
		login({ variables: { username, password } });
	};

	if (!show) {
		return null;
	}

	return (
		<form onSubmit={loginHandler}>
			<h2>login</h2>
			<div>
				<input
					type="text"
					name="username"
					value={username}
					placeholder="username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<div>
				<button type="submit">Login</button>
			</div>
		</form>
	);
};

export default Login;
