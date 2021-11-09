import React from "react";
import Blog from "./Blog";
import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const BlogList = (props) => {
	return props.blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
	};
};
const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
