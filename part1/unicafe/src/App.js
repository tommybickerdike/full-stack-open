import React, { useState } from "react";

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);
	const [score, setScore] = useState(0);
	const [average, setAverage] = useState(0);
	const [positive, setPositive] = useState(0);

	const Button = ({ text, handleClick }) => {
		return <button onClick={handleClick}>{text}</button>;
	};

	const clickGood = () => {
		setGood(good + 1);
		setTotal(total + 1);
		setScore(score + 1);
		setAverage(score / total);
		setPositive((good / total) * 100);
	};

	const clickNeutral = () => {
		setNeutral(neutral + 1);
		setTotal(total + 1);
		setScore(score);
		setAverage(score / total);
		setPositive((good / total) * 100);
	};

	const clickBad = () => {
		setBad(bad + 1);
		setTotal(total + 1);
		setScore(score - 1);
		setAverage(score / total);
		setPositive((good / total) * 100);
	};

	return (
		<main>
			<h1>give feedback</h1>
			<Button handleClick={clickGood} text={"Good"} />
			<Button handleClick={clickNeutral} text={"Neutral"} />
			<Button handleClick={clickBad} text={"Bad"} />
			<h1>statistics</h1>
			<p>Good {good}</p>
			<p>Neutral {neutral}</p>
			<p>Bad {bad}</p>
			<p>All {total}</p>
			<p>Average {average}</p>
			<p>Positive {positive}%</p>
		</main>
	);
};

export default App;
