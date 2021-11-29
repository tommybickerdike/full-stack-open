import express from "express";
import bmiCalculator from "./bmiCalculator";
import exerciseCalculator from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
	res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
	const height = Number(req.query.height);
	const weight = Number(req.query.weight);

	res.send(bmiCalculator(height, weight));
});

app.post("/exercises", (req, res) => {
	const target = req.body.target; // eslint-disable-next-line @typescript-eslint/no-explicit-any
	const dailyHoursExercised = req.body.daily_exercises; // eslint-disable-next-line @typescript-eslint/no-explicit-any
	res.send(exerciseCalculator(target, dailyHoursExercised));
});

const PORT = 3002;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
