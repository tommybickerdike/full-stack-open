const initialState = {
	good: 0,
	ok: 0,
	bad: 0,
};

const counterReducer = (state = initialState, action) => {
	console.log(action);
	switch (action.type) {
		case "GOOD":
			const goodInc = state.good + 1;
			return { ...state, good: goodInc };
		case "OK":
			const okInc = state.ok + 1;
			return { ...state, ok: okInc };
		case "BAD":
			const badInc = state.bad + 1;
			return { ...state, bad: badInc };
		case "ZERO":
			return initialState;
		default:
			return state;
	}
};

export default counterReducer;
