import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

export const SuspenseWrapper = Component => (
	// create error boundry component
	// https://codesandbox.io/s/j4wrxnm14v
	<Suspense fallback={<div>Loading...</div>}>
		<Component />
	</Suspense>
);
const Page1 = lazy(() => import('./Page1'));
const Page2 = SuspenseWrapper(lazy(() => import('./Page2')));

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
	const [smokeTest, setSmokeTest] = useState(null);

	useEffect(() => {
		axios.get('/api').then(res => {
			console.log(res.data);
			setSmokeTest(res.data);
		});
	}, []);
	/* remove this */

	return (
		<div>
			<h1>Hello World</h1>
			<h3>SmokeTest: {smokeTest}</h3>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='about' element={SuspenseWrapper(About)} />
				<Route path='page1' element={SuspenseWrapper(Page1)} />
				<Route path='page2' element={Page2} />
			</Routes>
		</div>
	);
};
export default App;
