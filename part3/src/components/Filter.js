import React from "react";

const Filter = ({ filtered, setFilter }) => {
	const updateFilter = (event) => {
		setFilter(event.target.value);
	};

	return (
		<p>
			filter shown with: <input value={filtered} onChange={updateFilter} />
		</p>
	);
};

export default Filter;
