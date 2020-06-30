import { createStore } from 'redux';

export const increment = payload => {
	return {
		type: 'INCREMENT',
		payload,
	};
};
export const dincrement = payload => {
	return {
		type: 'INCREMENT',
		payload,
	};
};
export const cincrement = payload => {
	return {
		type: 'INCREMENT',
		payload,
	};
};

const counter = (state = { count: 6 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return { ...state, count: action.payload + state.count + 1 };
		default:
			return state;
	}
};

export default createStore(counter);
