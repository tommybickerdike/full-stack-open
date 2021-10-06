import React from "react";

const Name = ({ person }) => {
	return (
		<li>
			{person.name} {person.number}
		</li>
	);
};

export default Name;
