import React from "react";

const Content = (props) => {
	return (
		<main>
			<p>
				{props.part1} {props.exercises1}
			</p>
			<p>
				{props.part2} {props.exercises2}
			</p>
			<p>
				{props.part3} {props.exercises3}
			</p>
		</main>
	);
};

export default Content;
