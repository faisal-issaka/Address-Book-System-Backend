/* eslint-disable import/extensions */
import express from 'express';
import {
  Login,
  RefreshToken,
  Register,
  UpdatePassword,
  UpdateUser,
} from '../controllers/authController.js';
import { verifyToken } from '../middlewares/index.js';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.patch('/update-user', verifyToken, UpdateUser);
router.patch('/update-password', verifyToken, UpdatePassword);
router.post('/token/refresh', RefreshToken);

export default router;
