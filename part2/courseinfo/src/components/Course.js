import React from "react";

const Header = ({ header }) => {
	return <h1>{header}</h1>;
};

const Total = ({ parts }) => {
	const exercises = parts.map((part) => part.exercises);
	const sum = exercises.reduce((a, b) => a + b);
	return (
		<p>
			<strong>Number of exercises {sum}</strong>
		</p>
	);
};

const Part = ({ part }) => {
	return (
		<p>
			{part.name} {part.exercises}
		</p>
	);
};

const Content = ({ parts }) => {
	return parts.map((part) => <Part key={part.id} part={part} />);
};

const Course = ({ course }) => {
	return (
		<div>
			<Header header={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	);
};

export default Course;
