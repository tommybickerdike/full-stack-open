import React from "react";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { logout } from "../reducers/userReducer";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const handleLogout = (props) => {
	props.logout();
	props.setNotification("logged out", 10, "good");
};

const Navigation = (props) => {
	return (
		<nav>
			<Link to={"/blogs"}>Blogs</Link>
			<Link to={"/users"}>Users</Link>
			{props.user.name} logged in
			<button onClick={() => handleLogout(props)}>Logout</button>
		</nav>
	);
};

Navigation.propTypes = {
	user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		user: JSON.parse(state.user),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (message, timeout, style) => {
			dispatch(setNotification(message, timeout, style));
		},
		logout: () => {
			dispatch(logout());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
