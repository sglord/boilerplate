import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Page1 from './Page1';
import Page2 from './Page2';
import HomePage from './HomePage';

const App = () => (
	<div>
		<Routes>
			<Route path='/page2' component={<Page1 />} />
			<Route path='/page1' component={<Page2 />} />
			<Route path='/' component={<HomePage />} />
			<Route path='*' component={<HomePage />} />
		</Routes>
	</div>
);

export default App;
