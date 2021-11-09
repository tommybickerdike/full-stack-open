import React from "react";
import { connect } from "react-redux";
import { getUser } from "../services/user";
import { setNotification } from "../reducers/notificationReducer";
import { logout } from "../reducers/userReducer";

const handleLogout = (props) => {
	props.logout();
	props.setNotification("logged out", 10);
};

const UserInfo = (props) => {
	const user = getUser(props.user);
	return (
		<div>
			<p>{user.name} logged in</p>
			<button onClick={() => handleLogout(props)}>Logout</button>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		user: state.user,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
		logout: () => {
			dispatch(logout());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
