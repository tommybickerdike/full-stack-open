import axios from "axios";
const db = "http://localhost:3001/persons";
const add = (nameObject, setPersons, persons) => {
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

const database = {
	add,
	get,
};

export default database;
