import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const logout = (setUser, setNotification) => {
	window.localStorage.removeItem("user");
	setUser(null);
	setNotification("logged out", 10);
};

const UserInfo = ({ user, setUser, setNotification }) => {
	return (
		<div>
			<p>{user.name} logged in</p>
			<button onClick={() => logout(setUser, setNotification)}>Logout</button>
		</div>
	);
};

UserInfo.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};

export default connect(null, mapDispatchToProps)(UserInfo);
