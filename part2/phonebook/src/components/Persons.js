import React from "react";
import Name from "./Name";

const Persons = ({ filteredNames }) => {
	return (
		<ul>
			{filteredNames.map((person) => (
				<Name key={person.id} person={person} />
			))}
		</ul>
	);
};

export default Persons;
