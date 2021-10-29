import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import Blog from "./Blog";

test("renders content", () => {
	const blog = {
		id: "6170132654f16c58bf54f3f4",
		title: "A blog title",
		author: "Joe Blogs",
		url: "http://www.test.com",
		user: "616ffe778bc6624f59de2099",
	};

	const user = {
		id: "616ffe778bc6624f59de2099",
		username: "testuser",
		name: "John Doe",
	};

	const component = render(<Blog blog={blog} user={user} />);

	const toggleContent = component.container.querySelector(
		".blog__toggle-content"
	);

	// have title
	expect(component.container).toHaveTextContent("A blog title");

	// have author
	expect(component.container).toHaveTextContent("Joe Blogs");

	// toggle content hidden
	expect(toggleContent).toHaveStyle("display: none");
});
