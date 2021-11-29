interface BMI {
	height: number;
	weight: number;
	bmi: string;
}

const parseArguments = (args: Array<number>): BMI => {
	if (args.length < 2) throw new Error("Not enough arguments");
	if (args.length > 2) throw new Error("Too many arguments");

	if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
		return {
			height: Number(args[0]),
			weight: Number(args[1]),
			bmi: "",
		};
	} else {
		throw new Error("Provided values were not numbers!");
	}
};

function getBMI(height: number, weight: number, bmi: string): BMI {
	const result = {
		height,
		weight,
		bmi,
	};

	const BMIcalc = (weight / height / height) * 10000;
	if (BMIcalc < 18.5) {
		result.bmi = "Underweight";
	} else if (BMIcalc < 25) {
		result.bmi = "Normal (healthy weight)";
	} else if (BMIcalc < 30) {
		result.bmi = "Overweight";
	} else {
		result.bmi = "Obese";
	}

	return result;
}

export default function calculateBmi(height: number, weight: number): object {
	try {
		const prams = parseArguments([height, weight]);
		return getBMI(prams.height, prams.weight, prams.bmi);
	} catch (error: unknown) {
		return { error: "malformatted parameters" };
	}
}
