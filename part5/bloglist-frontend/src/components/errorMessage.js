import React from "react";

const LoginForm = ({
	handleLogin,
	username,
	password,
	setUsername,
	setPassword,
}) => (
	<form onSubmit={handleLogin}>
		<label for="username">User Name</label>
		<input
			id="username"
			type="text"
			value={username}
			name="Username"
			onChange={({ target }) => setUsername(target.value)}
		/>
		<label for="password">Password</label>
		<input
			id="password"
			type="password"
			value={password}
			name="Password"
			onChange={({ target }) => setPassword(target.value)}
		/>
		<button type="submit">login</button>
	</form>
);

export default LoginForm;
