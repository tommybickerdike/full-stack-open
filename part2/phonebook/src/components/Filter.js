import React from "react";

const Filter = ({ filter, setFilter }) => {
	const updateFilter = (event) => {
		setFilter(event.target.value);
	};

	return (
		<p>
			filter shown with: <input value={filter} onChange={updateFilter} />
		</p>
	);
};

export default Filter;
