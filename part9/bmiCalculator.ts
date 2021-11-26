function calculateBmi(height: number, weight: number): string {
	const BMI = (weight / height / height) * 10000;
	console.log(BMI);
	if (BMI < 18.5) {
		return "Underweight";
	} else if (BMI < 25) {
		return "Normal (healthy weight)";
	} else if (BMI < 30) {
		return "Overweight";
	} else {
		return "Obese";
	}
}
console.log(calculateBmi(180, 74));
