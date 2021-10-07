import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ city }) => {
	const [weather, updateWeather] = useState([]);

	useEffect(() => {
		axios
			.get(
				`http://api.weatherstack.com/current?access_key=${
					process.env.REACT_APP_API_KEY
				}&query=${encodeURI(city.slice(0, 1))}`
			)
			.then(
				(response) => {
					updateWeather(response.data);
				},
				(response) => console.log("AXIOS FAIL", response)
			);
	}, [city]);
	console.log(
		`http://api.weatherstack.com/current?access_key=${
			process.env.REACT_APP_API_KEY
		}&query=${encodeURI(city.slice(0, 1))}`
	);
	return weather.current ? (
		<div>
			<p>
				<strong>Temprature: </strong>
				{weather.current.temperature} Celcius
			</p>
			<p>
				<img
					alt={weather.current.weather_descriptions.slice(0, 1)}
					width="100"
					src={weather.current.weather_icons.slice(0, 1)}
				/>
			</p>
			<p>
				<strong>Wind: </strong>
				{weather.current.wind_speed} mph direction {weather.current.wind_dir}
			</p>
		</div>
	) : (
		"WEATHER API FAILED"
	);
};

export default Weather;
