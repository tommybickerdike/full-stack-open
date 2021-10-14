import axios from "axios";
const db = "http://localhost:3001/api/persons";

const add = (personObject, persons, setPersons, setNotification) => {
	axios
		.post(db, personObject)
		.then((response) => {
			setPersons(persons.concat(response.data));
			setNotification({
				message: `${personObject.name} was added`,
				style: "good",
			});
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		})
		.catch(() => {
			setNotification({
				message: `${personObject.name} could not be added`,
				style: "bad",
			});
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		});
};

const get = (setPersons) =>
	axios.get(db).then((response) => {
		console.log(response);
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

const update = (
	updatePerson,
	persons,
	setPersons,
	newNumber,
	setNotification
) => {
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
				setNotification({
					message: `${updatePerson.name} was updated`,
					style: "good",
				});
				setTimeout(() => {
					setNotification(null);
				}, 5000);
			})
			.catch(() => {
				setNotification({
					message: `${updatePerson.name} has already been deleted`,
					style: "bad",
				});
				setTimeout(() => {
					setNotification(null);
				}, 5000);
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
