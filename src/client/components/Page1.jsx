import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
	<div>
		<h2>Page 1</h2>
		{/* <Link to='/about'>About</Link> */}
		<nav>
			<Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/page1'>Page1</Link> |{' '}
			<Link to='/page2'>Page2</Link>
		</nav>
	</div>
);

export default Home;
