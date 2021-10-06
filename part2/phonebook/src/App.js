import React, { useState } from "react";
import Name from "./components/Name";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: "Arto Hellas", number: "012313", id: 1 },
	]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

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
				{persons.map((person) => (
					<Name key={person.id} person={person} />
				))}
			</ul>
		</div>
	);
};

export default App;
