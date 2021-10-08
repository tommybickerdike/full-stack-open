import axios from "axios";

const person = (db, nameObject, setPersons, persons) => {
	axios
		.post(db, nameObject)
		.then((response) => {
			setPersons(persons.concat(response.data));
		})
		.catch((error) => {
			alert("Sorry, please try again");
		});
};

const save = {
	person,
};

export default save;
