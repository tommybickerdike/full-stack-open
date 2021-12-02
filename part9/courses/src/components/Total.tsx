import { CoursePart } from "../types";

const Total = ({ courseParts }: { courseParts: CoursePart[] }): JSX.Element => {
	return (
		<h2>
			<hr />
			Total Number of exercises{" "}
			{courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</h2>
	);
};

export default Total;
