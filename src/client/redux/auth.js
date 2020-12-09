import axios from 'axios';

const BASE_URL = '/api/auth';
// AUTH
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILURE = 'RESET_PASSWORD_FAILURE';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';
export const SET_PASSWORD_SUCCESS = 'SET_PASSWORD_SUCCESS';
export const SET_PASSWORD_FAILURE = 'SET_PASSWORD_FAILURE';

// INIT
export const ADD_TOKEN_TO_STATE = 'ADD_TOKEN_TO_STATE';
export const QUERY_USER_BY_TOKEN = 'QUERY_USER_BY_TOKEN';
export const QUERYING_USER_BY_TOKEN = 'QUERYING_USER_BY_TOKEN';
export const QUERYING_USER_BY_TOKEN_SUCCESS = 'QUERYING_USER_BY_TOKEN_SUCCESS';
export const QUERYING_USER_BY_TOKEN_ERROR = 'QUERYING_USER_BY_TOKEN_ERROR';

export const register = ({ email, password }) => async dispatch => {
	// create the user in the db
	dispatch({ type: AUTH_LOADING });

	try {
		const { data } = await axios.post(`${BASE_URL}/register`, { email, password });
		console.log('redux -> register', data);

		const { user, token } = data;
		dispatch({ type: REGISTRATION_SUCCESS, payload: { user } });

		// we currently are logging them in ??
		localStorage.setItem('token', token);

		dispatch({ type: ADD_TOKEN_TO_STATE, payload: { token } });
	} catch (error) {
		console.log('redux -> register -> error', error);

		dispatch({ type: REGISTRATION_FAILURE, payload: { error } });
	}

	// redirect to login page
	// alternative is to then run the login thunk basically
};

export const login = ({ email, password }) => async dispatch => {
	dispatch({ type: AUTH_LOADING });
	try {
		const { data } = await axios.post(`${BASE_URL}/login`, { email, password });
		console.log('redux -> login', data);

		const { token, user } = data;

		dispatch({ type: LOGIN_SUCCESS, payload: user });

		localStorage.setItem('token', token);

		dispatch({ type: ADD_TOKEN_TO_STATE, payload: token });
	} catch (error) {
		console.log('redux -> login -> error', error);

		dispatch({ type: LOGIN_FAILURE, payload: error });
	}
};

export const logout = () => async dispatch => {
	dispatch({ type: AUTH_LOADING });

	console.log('redux -> logout');

	localStorage.removeItem('token');

	console.log('redux -> logout -> success');

	dispatch({ type: LOGOUT_SUCCESS });
	// return intial default state
	// call api/auth/logout, session destroy, redirect
	// redirect to the home page / login page
};

export const changePassword = ({ email, prevPassword, newPassword }) => async dispatch => {
	dispatch({ type: AUTH_LOADING });

	try {
		// send the request to the server
		const { data } = await axios.post(`${BASE_URL}/change`, { email, prevPassword, newPassword });

		console.log('redux -> changePassword', data);

		const { token, user } = data;

		dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: user });

		localStorage.setItem('token', token);

		dispatch({ type: ADD_TOKEN_TO_STATE, payload: token });
	} catch (error) {
		console.log('redux -> changePassword -> error', error);

		dispatch({ type: CHANGE_PASSWORD_FAILURE, payload: error });
	}

	// redirect to user home page?
};

export const resetPassword = ({ email }) => async dispatch => {
	dispatch({ type: AUTH_LOADING });

	try {
		// send the request to the server
		const { data } = await axios.post(`${BASE_URL}/reset`, { email });

		// data will just be a message
		console.log('redux -> resetPassword', data);

		dispatch({ type: RESET_PASSWORD_SUCCESS });

		// this is dev skipping the email circuit
		const { token } = data;
		localStorage.setItem('token', data.token);
		dispatch({ type: ADD_TOKEN_TO_STATE, payload: token });
	} catch (error) {
		console.log('redux -> resetPassword -> error', error);

		dispatch({ type: RESET_PASSWORD_FAILURE, payload: error });
	}

	// redirect to user home page?
};
//

export const setPassword = ({ email, password, token }) => async dispatch => {
	dispatch({ type: AUTH_LOADING });

	try {
		const { data } = await axios.post(`${BASE_URL}/set?token=${token}`, {
			email,
			password,
		});

		// data will just be a message
		console.log('redux -> setPassword', data);

		dispatch({ type: SET_PASSWORD_SUCCESS });
	} catch (error) {
		console.log('redux -> setPassword -> error', error);

		dispatch({ type: SET_PASSWORD_FAILURE });
	}
};

// is there any need for an authenticate redux function?
// export const authenticate = ({ email, password }) => async dispatch => {};

const defaultUser = {
	email: '',
	password: '',
	token: '',
};

const defaultState = {
	user: { ...defaultUser },
	isLoggedIn: false,
	pending: false,
	error: null,
	token: null,
};

const auth = (state = defaultState, { type, payload }) => {
	switch (type) {
		case AUTH_LOADING:
			return { ...state, pending: true, error: null };
		case REGISTRATION_SUCCESS:
			return { ...state, user: { ...payload }, pending: false, error: null };
		case REGISTRATION_FAILURE:
			return { ...state, pending: false, error: { ...payload } };
		case LOGIN_SUCCESS:
			return {
				...state,
				user: { ...payload },
				isLoggedIn: true,
				pending: false,
				error: null,
			};
		case LOGIN_FAILURE:
			return { ...state, isLoggedIn: false, pending: false, error: payload };
		case LOGOUT_SUCCESS:
			return {
				...state,
				...defaultState,
			};
		case RESET_PASSWORD_SUCCESS:
			return { ...defaultState };
		case RESET_PASSWORD_FAILURE:
			return { ...defaultState, error: payload };
		case CHANGE_PASSWORD_SUCCESS:
			return { ...defaultState };
		case CHANGE_PASSWORD_FAILURE:
			return { ...defaultState, error: payload };
		case ADD_TOKEN_TO_STATE:
			return { ...state, token: payload };
		default:
			return state;
	}
};

export default auth;
