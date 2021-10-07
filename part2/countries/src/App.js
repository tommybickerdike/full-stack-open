import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from "./components/Weather";

const App = () => {
	const [countrylist, setCountrylist] = useState([]);
	const [search, setSearch] = useState([]);
	const [filtered, setFiltered] = useState([]);
	const [result, setResult] = useState([]);

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
		setResult(filtered[0]);
		setSearch(event.target.value);
	};

	const showThis = (country) => () => {
		setFiltered([country]);
	};

	const getLanguages = () => {
		const languages = Object.entries(result.languages);
		return languages.map(([key, language]) => <li key={key}>{language}</li>);
	};

	const loadResult = () => {
		return (
			<div key={result.cca3}>
				<h1>{result.name.common}</h1>
				<p>Capital: {result.capital.slice(0, 1)}</p>
				<p>Population: {result.population}</p>
				<h2>languages</h2>
				<ul>{getLanguages()}</ul>
				<img width="200" alt={result.name.common} src={result.flags.svg} />
				<h2>Weather in {result.capital.slice(0, 1)}</h2>
				<p>
					<Weather city={result.capital} />
				</p>
			</div>
		);
	};

	return (
		<main>
			<div>
				find country <input value={search} onChange={updateSearch} />
			</div>
			{filtered.length > 10
				? "Too many matches, specify another filter"
				: filtered.length === 0
				? "No matches"
				: filtered.length === 1
				? loadResult()
				: filtered.map((country) => (
						<div key={country.cca3}>
							{country.name.common}
							<button onClick={showThis(country)}>show</button>
						</div>
				  ))}
		</main>
	);
};

export default App;
