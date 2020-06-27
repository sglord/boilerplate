import express from 'express';

const router = express.Router();

/* remove this */
const smokeTest = (req, res, next) => {
	res.send('server smoke test');
};
/* remove this */

router.get('/', smokeTest);

export default router;
