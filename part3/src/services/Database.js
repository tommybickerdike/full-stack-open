import axios from "axios";
const db = "https://fso-part3-phonebook-server.herokuapp.com/api/persons";

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
		.catch((error) => {
			setNotification({
				message: error.response.data.message,
				style: "bad",
			});
			setTimeout(() => {
				setNotification(null);
			}, 5000);
		});
};

const get = (setPersons) =>
	axios.get(db).then((response) => {
		setPersons(response.data);
	});

const remove = (person, persons, setPersons) => {
	if (window.confirm(`Delete ${person.name}?`)) {
		axios
			.delete(`${db}/${person._id}`)
			.then(() => {
				const newPersons = persons.filter((p) => p._id !== person._id);
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
		const otherPersons = persons.filter((p) => p._id !== updatePerson._id);
		const updatedPersons = otherPersons.concat(updatePerson);
		axios
			.put(`${db}/${updatePerson._id}`, updatePerson)
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
			.catch((error) => {
				setNotification({
					message: error.response.data.message,
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
