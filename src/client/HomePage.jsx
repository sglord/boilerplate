import React from 'react';
import Link from 'react-router-dom';

const HomePage = () => (
	<div>
		<h1>HomePage</h1>
		<Link to='/'>Home</Link>
		<Link to='/page1'>Page1</Link>
		<Link to='/page2'>Page2</Link>
	</div>
);

export default HomePage;
