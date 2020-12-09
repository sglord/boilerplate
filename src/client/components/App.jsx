import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import '@babel/polyfill';

import { smokeTest, increment } from '../redux/smoke';

export const SuspenseWrapper = Component => (
	// create error boundry component
	// https://codesandbox.io/s/j4wrxnm14v
	<Suspense fallback={<div>Loading...</div>}>
		<Component />
	</Suspense>
);
const Page1 = lazy(() => import('./Page1'));
const Page2 = SuspenseWrapper(lazy(() => import('./Page2')));
const BaseLogin = SuspenseWrapper(lazy(() => import('./ForgotPassword')));

const Home = () => {
	return (
		<div>
			<h1>Home</h1>
			<nav>
				<Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/page1'>Page1</Link> |{' '}
				<Link to='/page2'>Page2</Link> |{' '}
			</nav>
		</div>
	);
};

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<nav>
				<Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/page1'>Page1</Link> |{' '}
				<Link to='/page2'>Page2</Link> |{' '}
			</nav>
		</div>
	);
};

const App = () => {
	/* remove this */
	const { smoke } = useSelector(state => state);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(smokeTest());
		console.log(smoke);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const increase = e => {
		dispatch(increment(1));
		e.preventDefault();
	};
	/* remove this */

	return (
		<div>
			<h1>Boilerplated</h1>
			<h3>SmokeTest: {smoke.error ? JSON.stringify(smoke.error) : smoke.count}</h3>
			<div>
				<button type='button' onClick={increase}>
					increase
				</button>
			</div>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='about' element={SuspenseWrapper(About)} />
				<Route path='page1' element={SuspenseWrapper(Page1)} />
				<Route path='page2' element={Page2} />
				<Route path='forgot' element={BaseLogin} />
			</Routes>
		</div>
	);
};
export default App;
