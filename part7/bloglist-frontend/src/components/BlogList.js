import React, { useEffect } from "react";
import Blog from "./Blog";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { initialize as initBlogs } from "../reducers/blogReducer";

const BlogList = (props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

	return props.blogs.map((blog) => <Blog key={blog.id} blog={blog} />);
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNotification: (value, time) => {
			dispatch(setNotification(value, time));
		},
		initBlogs: () => {
			dispatch(initBlogs());
		},
	};
};
const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
