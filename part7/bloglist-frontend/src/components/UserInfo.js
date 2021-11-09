import React from "react";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { logout } from "../reducers/userReducer";

const handleLogout = (props) => {
	props.logout();
	props.setNotification("logged out", 10);
};

const UserInfo = (props) => {
	console.log(props);
	return (
		<div>
			<p>{props.user.name} logged in</p>
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
