import React from "react";

const Part = (props) => {
	return (
		<p>
			{props.name} {props.exercises}
		</p>
	);
};

const Content = (props) => {
	return (
		<main>
			<Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
			<Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
			<Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
		</main>
	);
};

export default Content;
