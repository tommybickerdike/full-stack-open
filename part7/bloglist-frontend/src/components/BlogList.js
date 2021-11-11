import React, { useEffect } from "react";
import Blog from "./Blog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { initialize as initBlogs } from "../reducers/blogReducer";

const BlogList = ({blogs}) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlogs());
	}, [dispatch]);

	const blogList = blogs.map((blog) => (
		<Blog key={blog.id} blog={blog} />
	));

	return <div id="blogs">{blogList}</div>;
};

BlogList.propTypes = {
	blogs: PropTypes.object.isRequired,
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
