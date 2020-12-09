import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { register, login, logout, changePassword, resetPassword, setPassword } from '../redux/auth';

/* show login page: email, pw, oauth, and reset link
	-> login
		-> login success lands on home screen
			-> needs to set cookies/headers and all that shit
			-> all api calls need to be sent with that header
		-> login fail < 3 times throws validation error
		-> login fail > 3 times auto triggers lockout/reset?
	-> reset link loads the forgot password page
		-> input email -> submit
		-> displays 'we've email your link
		-> dev display then autoredirect to the linked page
	-> link: link should have payload and token params
		-> displays reset page: email, new pw, new pw confirm
		-> submit redirect to login page ^
*/
const Register = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			dispatch(register(values));
		},
	});

	const { handleChange, handleSubmit, isSubmitting, values } = formik;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' name='email' onChange={handleChange} value={values.email} />
				<input type='password' name='password' onChange={handleChange} value={values.password} />
				<input type='submit' text='submit' value='submit' name='submit' />
			</form>
			{isSubmitting && <div>submitting!</div>}
		</div>
	);
};
const Login = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			dispatch(login(values));
		},
	});

	const { handleChange, handleSubmit, isSubmitting, values } = formik;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' name='email' onChange={handleChange} value={values.email} />
				<input type='password' name='password' onChange={handleChange} value={values.password} />
				<input type='submit' text='submit' value='submit' name='submit' />
			</form>
			{isSubmitting && <div>submitting!</div>}
		</div>
	);
};
const Logout = () => {
	const dispatch = useDispatch();

	return (
		<div>
			<form
				onSubmit={e => {
					dispatch(logout());
					e.preventDefault();
				}}
			>
				<input type='submit' text='submit' value='submit' name='submit' />
			</form>
		</div>
	);
};

const ChangePassword = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			prevPassword: '',
			newPassword: '',
		},
		onSubmit: values => {
			dispatch(changePassword(values));
		},
	});

	const { handleChange, handleSubmit, isSubmitting, values } = formik;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' name='email' onChange={handleChange} value={values.email} />
				<input
					type='password'
					name='prevPassword'
					onChange={handleChange}
					value={values.prevPassword}
				/>
				<input
					type='password'
					name='newPassword'
					onChange={handleChange}
					value={values.newPassword}
				/>
				<input type='submit' text='submit' value='submit' name='submit' />
			</form>
			{isSubmitting && <div>submitting!</div>}
		</div>
	);
};
const ResetPassword = () => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			dispatch(resetPassword(values));
		},
	});

	const { handleChange, handleSubmit, isSubmitting, values } = formik;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' name='email' onChange={handleChange} value={values.email} />
				<input type='submit' text='submit' value='submit' name='submit' />
			</form>
			{isSubmitting && <div>submitting!</div>}
		</div>
	);
};
const SetPassword = () => {
	const dispatch = useDispatch();
	const { auth } = useSelector(state => state);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: values => {
			console.log('onsubmit', typeof auth.token, auth.token);
			dispatch(setPassword({ ...values, token: auth.token }));
		},
	});

	const { handleChange, handleSubmit, isSubmitting, values } = formik;

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type='text' name='email' onChange={handleChange} value={values.email} />
				<input type='password' name='password' onChange={handleChange} value={values.password} />
				<input type='submit' text='submit' value='submit' name='submit' />
			</form>
			{isSubmitting && <div>submitting!</div>}
		</div>
	);
};

const BaseLogin = () => {
	return (
		<div>
			<p>Register</p>
			<Register />
			<p>Login</p>
			<Login />
			<p>Logout</p>
			<Logout />
			<p>ChangePassword</p>
			<ChangePassword />
			<p>ResetPassword</p>
			<ResetPassword />
			<p>SetPassword</p>
			<SetPassword />
		</div>
	);
};
export default BaseLogin;
