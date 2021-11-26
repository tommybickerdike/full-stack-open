interface BMI {
	height: number;
	weight: number;
	bmi: string;
}

export default function calculateBmi(height: number, weight: number): BMI {
	// CANNOT DO THIS AS ERROR VALUE CANNOT BE ASSIGNED TO BMI
	// if (height <= 0 || weight <= 0) {
	// 	return { error: "malformatted parameters" };
	// }

	const obj = {
		height,
		weight,
		bmi: "",
	};

	const BMI = (weight / height / height) * 10000;
	if (BMI < 18.5) {
		obj.bmi = "Underweight";
	} else if (BMI < 25) {
		obj.bmi = "Normal (healthy weight)";
	} else if (BMI < 30) {
		obj.bmi = "Overweight";
	} else {
		obj.bmi = "Obese";
	}

	return obj;
}
