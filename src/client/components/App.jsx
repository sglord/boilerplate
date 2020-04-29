import React from 'react';
import {
	Routes,
	Route,
	Link,
	// useRouteMatch,
} from 'react-router-dom';
// import Page1 from './Page1';
// import Page2 from './Page2';
// import HomePage from './HomePage';

import Home from './Page1';
import About from './Page2';
import Kanban from './Kanban/Board';

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

const App = () => (
	<div>
		<h1>Welcome </h1>
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/about' element={<About />} />
			<Route path='/kanban' element={<Kanban />} />

			<Route path='*' element={<FOF />} />
		</Routes>
	</div>
);

export default App;
