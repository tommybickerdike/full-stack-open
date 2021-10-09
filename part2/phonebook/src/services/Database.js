import axios from "axios";
const db = "http://localhost:3001/persons";

const add = (personObject, persons, setPersons) => {
	axios
		.post(db, personObject)
		.then((response) => {
			setPersons(persons.concat(response.data));
		})
		.catch((error) => {
			alert("Sorry, please try again");
		});
};

const get = (setPersons) =>
	axios.get(db).then((response) => {
		setPersons(response.data);
	});

const remove = (person, persons, setPersons) => {
	if (window.confirm(`Delete ${person.name}?`)) {
		axios
			.delete(`${db}/${person.id}`)
			.then(() => {
				const newPersons = persons.filter((p) => p.id !== person.id);
				setPersons(newPersons);
			})
			.catch((error) => {
				console.log("Could not delete", error);
			});
	}
};

const update = (updatePerson, persons, setPersons, newNumber) => {
	if (
		window.confirm(
			`${updatePerson.name} is already in the phonebook, replace the old number with the new one?`
		)
	) {
		updatePerson.number = newNumber;
		const otherPersons = persons.filter((p) => p.id !== updatePerson.id);
		const updatedPersons = otherPersons.concat(updatePerson);
		axios
			.put(`${db}/${updatePerson.id}`, updatePerson)
			.then(() => {
				setPersons(updatedPersons);
			})
			.catch((error) => {
				console.log("Could not update", error);
			});
	}
};

const database = {
	add,
	get,
	remove,
	update,
};

export default database;
