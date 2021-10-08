import axios from "axios";
const db = "http://localhost:3001/persons";

const add = (nameObject, persons, setPersons) => {
	axios
		.post(db, nameObject)
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

const database = {
	add,
	get,
	remove,
};

export default database;
