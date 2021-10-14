import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Database from "./services/Database";

const App = () => {
	useEffect(() => {
		Database.get(setPersons);
	}, []);

	const [persons, setPersons] = useState([]);

	const [filtered, setFilter] = useState("");

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filtered={filtered} setFilter={setFilter} />
			<h2>add a new</h2>
			<PersonForm persons={persons} setPersons={setPersons} />
			<h2>Numbers</h2>
			<Persons
				filtered={filtered}
				setFilter={setFilter}
				persons={persons}
				setPersons={setPersons}
			/>
		</div>
	);
};

export default App;
