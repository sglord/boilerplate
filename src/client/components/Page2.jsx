import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
	const [fields, setFields] = useState([]);
	console.log(fields);
	return (
		<div>
			<h2>Page 2</h2>
			<nav>
				<Link to='/'>Home</Link> | <Link to='/about'>About</Link> | <Link to='/page1'>Page1</Link> |{' '}
				<Link to='/page2'>Page2</Link>
			</nav>
			<div>
				<ul>
					{fields.map(({ name, type, value }, idx) => (
						<div key={`${idx}-${name}`}>
							<p>{name}</p>
							<input type={type} name={name} value={value} />
						</div>
					))}
				</ul>
				<button
					aria-label='button here'
					type='button'
					onClick={() => {
						setFields([...fields, { type: 'input', name: 'addone', value: 'one for here' }]);
						console.log({ type: 'input', name: 'addone', value: 'one for here' });
					}}
				/>
			</div>
		</div>
	);
};

export default About;
