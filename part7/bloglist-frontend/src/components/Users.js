import React from "react";
import { useResource } from "../hooks/useResource";

const Users = () => {
	const [users] = useResource("/api/users");

	const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length);

	const userList = sortedUsers.map((user) => (
		<tr key={user.id}>
			<td>{user.name}</td>
			<td>{user.blogs.length}</td>
		</tr>
	));

	return (
		<table>
			<thead>
				<tr>
					<th></th>
					<th>blogs created</th>
				</tr>
			</thead>
			<tbody>{userList}</tbody>
		</table>
	);
};

export default Users;
