import express from 'express';

import auth from './auth';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/* remove this */
const smokeTest = (req, res, next) => {
	res.send('server smoke test');
};

router.get('/', authenticate, smokeTest);
/* remove this */

router.use('/auth', auth);

export default router;
