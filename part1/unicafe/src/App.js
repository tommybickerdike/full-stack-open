import React, { useState } from "react";

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const Button = ({ text, handleClick }) => {
		return <button onClick={handleClick}>{text}</button>;
	};

	const increaseGood = () => setGood(good + 1);
	const increaseNeutral = () => setNeutral(neutral + 1);
	const increaseBad = () => setBad(bad + 1);

	return (
		<main>
			<h1>give feedback</h1>
			<Button handleClick={increaseGood} text={"Good"} />
			<Button handleClick={increaseNeutral} text={"Neutral"} />
			<Button handleClick={increaseBad} text={"Bad"} />
			<h1>statistics</h1>
			<p>Good {good}</p>
			<p>Neutral {neutral}</p>
			<p>Bad {bad}</p>
		</main>
	);
};

export default App;
