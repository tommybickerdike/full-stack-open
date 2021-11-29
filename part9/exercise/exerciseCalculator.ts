interface ExerciseReport {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

interface ExerciseArgs {
	target: number;
	dailyHoursExercised: number[];
}

const parseArguments = (
	target: number,
	dailyHoursExercised: number[]
): ExerciseArgs => {
	if (!isNaN(Number(target)) && !isNaN(Number(dailyHoursExercised[0]))) {
		return {
			target: Number(target),
			dailyHoursExercised,
		};
	} else if (!target || !dailyHoursExercised) {
		throw new Error("parameters missing");
	} else {
		throw new Error("malformatted parameters");
	}
};

function exerciseResponse(
	target: number,
	dailyHoursExercised: number[]
): ExerciseReport {
	const periodLength = dailyHoursExercised.length;
	const trainingDays = dailyHoursExercised.filter((hours) => hours > 0).length;
	const totalHours = dailyHoursExercised.reduce((acc, curr) => acc + curr);
	const average = totalHours / dailyHoursExercised.length;
	const success = average > target ? true : false;
	const rating = average > target ? 3 : Math.round(average) < target ? 1 : 2;
	const ratingDescription =
		rating === 1
			? "not great, try harder"
			: rating === 2
			? "not too bad but could be better"
			: "well done!";

	return {
		periodLength,
		trainingDays,
		success,
		rating,
		ratingDescription,
		target,
		average,
	};
}

export default function exerciseCalculator(
	target: number,
	dailyHoursExercised: number[]
): object {
	try {
		const prams = parseArguments(target, dailyHoursExercised);
		return exerciseResponse(prams.target, prams.dailyHoursExercised);
	} catch (error) {
		return { error: error.message };
	}
}
