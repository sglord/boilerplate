// do the good stuff here
// https://expressjs.com/en/advanced/best-practice-performance.html

import express from 'express';
import path from 'path';

const app = express();
// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

app.use(express.static('static'));
app.use('*', (req, res) => {
	console.log('app.use');
	console.log(path.resolve(__dirname, 'static/index.html'));
	res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.get('*', (req, res) => {
	res.send('ci with travis yo');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
	console.log(`Server listening on port: ${port}`)
);

export default server;
