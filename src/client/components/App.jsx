import React, { lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
// import Kanban from './Kanban/Board';

export const SuspenseWrapper = Component => (
	// create error boundry component
	// https://codesandbox.io/s/j4wrxnm14v
	<Suspense fallback={<div>Loading...</div>}>
		<Component />
	</Suspense>
);
const Page1 = lazy(() => import('./Page1'));
const Page2 = SuspenseWrapper(lazy(() => import('./Page2')));
function Home() {
	return (
		<div>
			<h1>Home</h1>
			<nav>
				<Link to='/'>Home</Link> | <Link to='about'>About</Link> | <Link to='page1'>Page1</Link> |{' '}
				<Link to='page2'>Page2</Link> |{' '}
			</nav>
		</div>
	);
}

function About() {
	return <h1>About</h1>;
}

function App() {
	return (
		<div>
			<h1>Hello World</h1>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='about' element={SuspenseWrapper(About)} />
				<Route path='page1' element={SuspenseWrapper(Page1)} />
				<Route path='page2' element={Page2} />
			</Routes>
		</div>
	);
}
export default App;
