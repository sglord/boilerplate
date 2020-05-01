import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
	return (
		<div>
			<h2>Page 2</h2>
			<nav>
				<Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/page1'>Page1</Link> |{' '}
				<Link to='/page2'>Page2</Link>
			</nav>
		</div>
	);
};

export default About;
