import { useEffect, useState } from "react";
import axios from "axios";

export const useCountry = (name) => {
	const [country, setCountry] = useState(null);

	useEffect(() => {
		axios
			.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
			.then((response) => {
				const data = response.data[0];
				setCountry({ data: { ...data }, found: true });
			})
			.catch((error) => {
				setCountry(name ? { error, found: false } : null);
			});
	}, [name]);

	return country;
};
