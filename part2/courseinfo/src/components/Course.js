import React from "react";

const Header = ({ header }) => {
	return <h1>{header}</h1>;
};

// const Total = ({ course }) => {
// 	const sum =
// 		course.parts[0].exercises +
// 		course.parts[1].exercises +
// 		course.parts[2].exercises;
// 	return <p>Number of exercises {sum}</p>;
// };

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
			{/* <Total course={course} /> */}
		</div>
	);
};

export default Course;
