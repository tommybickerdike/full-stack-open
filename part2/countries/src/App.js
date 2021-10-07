import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countrylist, setCountrylist] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then(
			(response) => {
				setCountrylist(response.data);
			},
			(response) => console.log("AXIOS FAIL", response)
		);
	}, []);

	return (
		<ul>
			{countrylist.map((country) => (
				<li key={country.cca3}>{country.name.common}</li>
			))}
		</ul>
	);
};

export default App;
