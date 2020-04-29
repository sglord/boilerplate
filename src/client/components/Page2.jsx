/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import {
	Link,
	useParams,
	// useRouteMatch,
} from 'react-router-dom';

const About = () => {
	const { topic } = useParams;
	// const { path, url } = useRouteMatch();

	return (
		<div>
			<h2>About</h2>
			<ul>
				<li>
					<Link to='/'>Home</Link>
					{/* <Link to={`${url}/them`}>about them</Link>
					<Link to={`${url}/us`}>about us</Link> */}
				</li>
			</ul>
			<div>Cuirrent: {topic}</div>
			{/* <Routes>
				<Route path={`${path}/:them`} />
				<Route path={`${path}/:us`} />
			</Routes> */}
		</div>
	);
};

export default About;
