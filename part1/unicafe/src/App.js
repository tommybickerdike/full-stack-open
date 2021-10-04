import React, { useState } from "react";

const StatisticLine = ({ text, value }) => {
	if (value) {
		return (
			<tr>
				<td>{text}</td>
				<td>{value}</td>
			</tr>
		);
	} else {
		return (
			<tr>
				<td>{text}</td>
				<td>0</td>
			</tr>
		);
	}
};

const Statistics = (props) => {
	const values = props.values;
	if (values.total) {
		return (
			<table>
				<tbody>
					<StatisticLine text={"Good"} value={values.good} />
					<StatisticLine text={"Neutral"} value={values.neutral} />
					<StatisticLine text={"Bad"} value={values.bad} />
					<StatisticLine text={"All"} value={values.total} />
					<StatisticLine text={"Average"} value={values.average} />
					<StatisticLine text={"Positive"} value={`${values.positive}%`} />
				</tbody>
			</table>
		);
	} else {
		return <p>No feedback given</p>;
	}
};

const Button = ({ text, click }) => {
	return <button onClick={click}>{text}</button>;
};

const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);
	const [total, setTotal] = useState(0);
	const [score, setScore] = useState(0);
	const [average, setAverage] = useState(0);
	const [positive, setPositive] = useState(0);

	const clickButton = (change) => () => {
		if (change === 1) {
			setGood(good + 1);
			setScore(score + 1);
		}
		if (change === 0) {
			setNeutral(neutral + 1);
		}
		if (change === -1) {
			setBad(bad + 1);
			setScore(score - 1);
		}
		setTotal(total + 1);
		setAverage(score / total);
		setPositive((good / total) * 100);
	};

	return (
		<main>
			<h1>give feedback</h1>
			<Button click={clickButton(1)} text={"Good"} />
			<Button click={clickButton(0)} text={"Neutral"} />
			<Button click={clickButton(-1)} text={"Bad"} />
			<h1>statistics</h1>
			<Statistics values={{ good, neutral, bad, total, average, positive }} />
		</main>
	);
};

export default App;
