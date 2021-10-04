import React, { useState } from "react";

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
	];

	const points = Array(anecdotes.length).fill(0);
	const [pointCount, setCount] = useState([...points]);
	const [selected, setSelected] = useState(0);
	const [popular, setPopular] = useState(0);

	const updatePopular = (arr) => {
		let max = arr[0];
		let maxIndex = 0;

		for (var i = 1; i < arr.length; i++) {
			if (arr[i] > max) {
				maxIndex = i;
				max = arr[i];
			}
		}

		setPopular(maxIndex);
	};

	const getRandom = (max) => () => {
		const min = 0;
		const num = Math.floor(Math.random() * (max - min) + min);
		setSelected(num);
	};

	const vote = (current) => () => {
		const newCount = [...pointCount];
		newCount[current] += 1;
		setCount(newCount);
		updatePopular(newCount);
	};

	return (
		<main>
			<h1>Anecdote of the day</h1>
			<div>{anecdotes[selected]}</div>
			<p>Has {pointCount[selected]} votes</p>
			<button onClick={vote(selected)}>vote</button>
			<button onClick={getRandom(anecdotes.length)}>next anecdote</button>
			<h1>Anecdote with most votes</h1>
			<p>{anecdotes[popular]}</p>
		</main>
	);
};

export default App;
