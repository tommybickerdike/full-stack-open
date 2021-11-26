interface ExerciseReport {
	periodLength: number;
	trainingDays: number;
	success: boolean;
	rating: number;
	ratingDescription: string;
	target: number;
	average: number;
}

function calculateExercises(
	dailyHoursExercised: number[],
	target: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
