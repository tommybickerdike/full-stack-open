import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Notification = (props) => {
	const notification = props.notification;

	const style = {
		border: "solid",
		padding: 10,
		borderWidth: 1,
	};

	return notification ? (
		<div id="notification" style={style}>
			{notification}
		</div>
	) : (
		""
	);
};

Notification.propTypes = {
	notification: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		notification: state.notification,
	};
};

const ConnectedNotification = connect(mapStateToProps)(Notification);
export default ConnectedNotification;
