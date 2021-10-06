import React, { useState } from "react";
import Name from "./components/Name";

const App = () => {
	console.log("app");
	const [persons, setPersons] = useState([{ name: "Arto Hellas", id: 1 }]);
	const [newName, setNewName] = useState("");

	const addName = (event) => {
		event.preventDefault();
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

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
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
