import { CoursePart } from "../types";

const Part = ({ coursePart }: { coursePart: CoursePart }): JSX.Element => {
	switch (coursePart.type) {
		case "normal":
			return (
				<div>
					<h2>{coursePart.name}</h2>
					<p>Exercises: {coursePart.exerciseCount}</p>
					<p>{coursePart.description}</p>
				</div>
			);
		case "groupProject":
			return (
				<div>
					<h2>{coursePart.name}</h2>
					<p>Exercises: {coursePart.exerciseCount}</p>
					<p>Group Projects: {coursePart.groupProjectCount}</p>
				</div>
			);
		case "submission":
			return (
				<div>
					<h2>{coursePart.name}</h2>
					<p>Exercises: {coursePart.exerciseCount}</p>
					<p>{coursePart.description}</p>
					<p>
						Submit:{" "}
						<a href={coursePart.exerciseSubmissionLink}>
							{coursePart.exerciseSubmissionLink}
						</a>
					</p>
				</div>
			);
		case "special":
			return (
				<div>
					<h2>{coursePart.name}</h2>
					<p>Exercises: {coursePart.exerciseCount}</p>
					<p>{coursePart.description}</p>
					<p>
						Skill requirements:{" "}
						<ul>
							{coursePart.requirements.map((requirement) => (
								<li key={requirement}>{requirement}</li>
							))}
						</ul>
					</p>
				</div>
			);
		default:
			return <div>NEVER</div>;
	}
};

export default Part;
