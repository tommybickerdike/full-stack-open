import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
	const [countrylist, setCountrylist] = useState([]);
	const [search, setSearch] = useState([]);
	const [filtered, setFiltered] = useState([]);

	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then(
			(response) => {
				setCountrylist(response.data);
				setFiltered(response.data);
			},
			(response) => console.log("AXIOS FAIL", response)
		);
	}, []);

	const updateSearch = (event) => {
		const filtered = countrylist.filter(
			(country) =>
				country.name.common
					.toLowerCase()
					.indexOf(event.target.value.toLowerCase()) !== -1
		);
		setFiltered(filtered);
		setSearch(event.target.value);
	};

	const getLanguages = () => {
		const languages = Object.values(filtered[0].languages);
		return languages.map((language) => <li>{language}</li>);
	};

	return (
		<main>
			<div>
				find country <input value={search} onChange={updateSearch} />
			</div>
			{filtered.length > 10 ? (
				"Too many matches, specify another filter"
			) : filtered.length === 0 ? (
				"No matches"
			) : filtered.length === 1 ? (
				<div key={filtered[0].cca3}>
					<h1>{filtered[0].name.common}</h1>
					<p>Capital: {filtered[0].capital[0]}</p>
					<p>Population: {filtered[0].population}</p>
					<h2>languages</h2>
					<ul>{getLanguages()}</ul>
					<img
						width="200"
						alt={filtered[0].name.common}
						src={filtered[0].flags.svg}
					/>
				</div>
			) : (
				filtered.map((country) => (
					<div key={country.cca3}>{country.name.common}</div>
				))
			)}
		</main>
	);
};

export default App;
