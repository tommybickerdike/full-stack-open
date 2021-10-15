import React from "react";
import Database from "../services/Database";

const Persons = ({ persons, filtered, setPersons, ...props }) => {
	const filteredNames = persons.filter(
		(person) => person.name.toLowerCase().indexOf(filtered.toLowerCase()) !== -1
	);
	return (
		<ul>
			{filteredNames.map((person) => (
				<li key={person._id}>
					{person.name} {person.number}
					<button onClick={() => Database.remove(person, persons, setPersons)}>
						DELETE
					</button>
				</li>
			))}
		</ul>
	);
};

export default Persons;
