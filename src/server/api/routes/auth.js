// add password confirm field for setting PW and validate the two
import express from 'express';

import {
	validateUserFields,
	register,
	login,
	logout,
	changePassword,
	resetPassword,
	setPassword,
	authenticate,
} from '../middleware/auth';

const router = express.Router();

router.post('/register', validateUserFields, register);
router.post('/login', validateUserFields, login);
// should we authenticate before hand? If not logged in behavior is the same, just short circuited?
// could provide insights if users keep coming in and failing at authenticate
router.post('/logout', validateUserFields, logout);
router.post('/change', authenticate, validateUserFields, changePassword);
router.post('/reset', validateUserFields, resetPassword);
router.post('/set', validateUserFields, setPassword);

export default router;
