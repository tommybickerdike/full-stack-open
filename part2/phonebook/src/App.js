import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Database from "./services/Database";

const App = () => {
	const [persons, setPersons] = useState([]);

	useEffect(() => {
		Database.get(setPersons);
	}, []);

	const [filter, setFilter] = useState("");

	const filteredNames = persons.filter(
		(person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<h2>add a new</h2>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			<Persons filteredNames={filteredNames} />
		</div>
	);
};

export default App;
