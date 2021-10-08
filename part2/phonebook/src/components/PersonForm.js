import React, { useState } from "react";
import Save from "../services/Save";

const PersonForm = ({ persons, setPersons, db }) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const updateName = (event) => {
		setNewName(event.target.value);
	};

	const updateNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const addName = () => {
		const nameObject = {
			name: newName,
			number: newNumber,
		};
		Save.person(db, nameObject, setPersons, persons);
		setNewName("");
		setNewNumber("");
	};

	const checkExists = (event) => {
		event.preventDefault();

		const currentList = persons.map((person) => person.name);

		currentList.includes(newName)
			? alert(`${newName} is already added to the phonebook`)
			: addName();
	};

	return (
		<form onSubmit={checkExists}>
			<div>
				name: <input value={newName} onChange={updateName} />
			</div>
			<div>
				number: <input value={newNumber} onChange={updateNumber} />
			</div>
			<button type="submit">add</button>
		</form>
	);
};

export default PersonForm;
