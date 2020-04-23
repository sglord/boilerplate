/* eslint-disable react/prop-types */

import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
	// useRouteMatch,
} from 'react-router-dom';

function Home() {
	return (
		<div>
			<h2>Homer</h2>
			<Link to='/about'>About</Link>
		</div>
	);
}

function About() {
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
}
function FOF() {
	return (
		<div>
			<h2>404 noones home</h2>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
			</ul>
		</div>
	);
}

function App() {
	return (
		<div>
			<h1>Welcome</h1>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='*' element={<FOF />} />
			</Routes>
		</div>
	);
}

ReactDOM.render(
	<Router>
		<App />
	</Router>,
	document.getElementById('root')
);
