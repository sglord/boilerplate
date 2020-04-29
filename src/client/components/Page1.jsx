import React from 'react';
import {
	Link,
	// useRouteMatch,
} from 'react-router-dom';

const Home = () => (
	<div>
		<h2>Homer</h2>
		<Link to='/about'>About</Link>
	</div>
);

export default Home;
