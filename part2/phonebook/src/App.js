import React, { useState } from "react";
import Name from "./components/Name";

const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
	const [newName, setNewName] = useState("");

	const addName = () => {
		const nameObject = {
			name: newName,
			id: persons.length + 1,
		};

		setPersons(persons.concat(nameObject));
		setNewName("");
	};

	const updateName = (event) => {
		setNewName(event.target.value);
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
				<input value={newName} onChange={updateName} />
				<button type="submit">add</button>
			</form>
			<h2>Numbers</h2>
			<ul>
				{persons.map((person) => (
					<Name key={person.id} name={person.name} />
				))}
			</ul>
		</div>
	);
};

export default App;
