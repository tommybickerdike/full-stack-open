import React, { useState } from "react";
import Database from "../services/Database";

const PersonForm = ({ persons, setPersons }) => {
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const updateName = (event) => {
		setNewName(event.target.value);
	};

	const personObject = {
		name: newName,
		number: newNumber,
	};

	const updateNumber = (event) => {
		setNewNumber(event.target.value);
	};

	const addName = () => {
		Database.add(personObject, persons, setPersons);
		setNewName("");
		setNewNumber("");
	};

	const checkExists = (event) => {
		event.preventDefault();

		const currentList = persons.map((person) => person.name);
		const updatePerson = persons.find((person) => person.name === newName);

		currentList.includes(newName)
			? Database.update(updatePerson, persons, setPersons, newNumber)
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
