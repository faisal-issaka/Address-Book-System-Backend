/* eslint-disable import/extensions */
import express from 'express';
import { Login, RefreshToken, Register } from '../controllers/authController.js';
import { validateCredentials } from '../middlewares/index.js';

const router = express.Router();

router.post('/register', validateCredentials, Register);
router.post('/login', validateCredentials, Login);
router.post('/token/refresh', RefreshToken);

export default router;
