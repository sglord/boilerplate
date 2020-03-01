import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('ci with travis yo');
});

// app.use(express.static('public'));
// app.use(apiRouter);

const port = process.env.PORT || 3000;

const server = app.listen(port, () =>
	console.log(`Server listening on port: ${port}`)
);

export default server;
