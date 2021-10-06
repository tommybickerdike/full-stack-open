import React, { useState } from "react";
import Name from "./components/Name";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "040-123456", id: 1 },
		{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
		{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
		{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [filter, setFilter] = useState("");

	const addName = () => {
		const nameObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};

		setPersons(persons.concat(nameObject));
		setNewName("");
		setNewNumber("");
	};

	const updateName = (event) => {
		setNewName(event.target.value);
	};

	const updateNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const updateFilter = (event) => {
		setFilter(event.target.value);
	};

	const filteredNames = persons.filter(
		(person) => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
	);

	const checkExists = (event) => {
		event.preventDefault();

		const currentList = persons.map((person) => person.name);

		currentList.includes(newName)
			? alert(`${newName} is already added to the phonebook`)
			: addName();
	};

	return (
		<div>
			<h2>Phonebook</h2>
			filter shown with: <input value={filter} onChange={updateFilter} />
			<h2>add a new</h2>
			<form onSubmit={checkExists}>
				<div>
					name: <input value={newName} onChange={updateName} />
				</div>
				<div>
					number: <input value={newNumber} onChange={updateNumber} />
				</div>
				<button type="submit">add</button>
			</form>
			<h2>Numbers</h2>
			<ul>
				{filteredNames.map((person) => (
					<Name key={person.id} person={person} />
				))}
			</ul>
		</div>
	);
};

export default App;
