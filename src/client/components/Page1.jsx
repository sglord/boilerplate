/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { increment } from '../redux';

const Page1 = () => {
	const stated = useSelector(state => state);
	const { count } = stated;

	const dispatch = useDispatch();

	return (
		<div>
			<h2>Page 1</h2>
			<p>currentData: {count}</p>
			<button type='button' onClick={() => dispatch(increment(5))}>
				Increment counter
			</button>
			<nav>
				<Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/page1'>Page1</Link> |{' '}
				<Link to='/page2'>Page2</Link>
			</nav>
		</div>
	);
};

export default Page1;
