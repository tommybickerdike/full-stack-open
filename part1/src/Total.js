import React from "react";

const Total = (props) => {
	console.log(props[0]);
	return (
		<footer>
			<p>
				Number of exercises &nbsp;
				{props.parts[0].exercises +
					props.parts[1].exercises +
					props.parts[2].exercises}
			</p>
		</footer>
	);
};

export default Total;
