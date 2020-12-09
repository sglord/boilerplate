// do the good stuff here
// https://expressjs.com/en/advanced/best-practice-performance.html
// custom middlewares and global middlewares
// ddos and debouncing
import express from 'express';
import path from 'path';
import cors from 'cors';
// import passport from 'passport';
// import morgan from 'morgan';
// import compression from 'compression'
// import helmet from 'helmet'

import api from './api/routes/index';
import dbConnect from './database/mongodb';
// import passportConfig from './api/middleware/passport';

const app = express();
const __dirname = path.resolve();

dbConnect();
// app.use(morgan('common'));
// app.use(helmet());
app.use(
	cors({
		origin: ['http://localhost:3000'],
		methods: ['GET', 'POST'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);
// app.use(compression())
// error handling https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('static'));
// app.use(express.static(__dirname));

// passport authentication
// app.use(passport.initialize());
// passportConfig(passport);

app.use('/api', api);
app.use('*', (req, res) => {
	console.log(path.resolve(__dirname, 'static/index.html'));
	res.sendFile(path.resolve(__dirname, 'static/index.html'));
});

app.get('*', (req, res) => {
	res.send('ci with travis yo');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Server listening on port: ${port}`));

export default server;
