import axios from 'axios';

export const increment = payload => dispatch => {
	console.log('redux -> increment', payload);
	dispatch({
		type: 'INCREMENT',
		payload,
	});
};

const SMOKE_TEST = 'SMOKE_TEST';
const SMOKE_TEST_FAILURE = 'SMOKE_TEST_FAILURE';

export const smokeTest = () => async dispatch => {
	console.log('redux -> smokeTest');

	const token = localStorage.getItem('token');

	console.log('redux -> smokeTest -> Token', token);

	let config = {};

	if (token) {
		console.log('redux -> smokeTest -> set headers', token);

		config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
	}

	try {
		const { data } = await axios.get('/api', config);

		console.log('redux -> smoketest -> success', data);

		dispatch({ type: SMOKE_TEST, payload: data });
	} catch (error) {
		console.log('redux -> smokeTest -> error', JSON.stringify(error));

		dispatch({ type: SMOKE_TEST_FAILURE, payload: error });
	}
};

const smoke = (state = { count: 0, smoke: '', error: '' }, { type, payload }) => {
	switch (type) {
		case 'INCREMENT':
			return { ...state, count: payload + state.count };
		case SMOKE_TEST:
			return { ...state, smoke: payload };
		case SMOKE_TEST_FAILURE:
			return { ...state, error: payload };
		default:
			return state;
	}
};

export default smoke;
