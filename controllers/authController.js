/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models/index.js';
import {
  getHashedPassword,
  generateTokens,
  getErrorData,
  validateUser,
  userExists,
} from '../utils/authUtils.js';

export const Register = async (req, res) => {
  const credentials = req.body;
  credentials.password = await getHashedPassword(credentials?.password);

  UserModel.create(credentials).then((user) => {
    res.status(201).json({
      status: 'success',
      data: {
        message: 'User created successfully',
        ...generateTokens(user),
      },
    });
  }).catch((err) => {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  });
};

export const Login = (req, res) => {
  const credentials = req.body;
  UserModel.findOne({ email: credentials.email }, '+password email').then(
    async (user) => {
      if (user) {
        const passwordIsValid = await bcrypt.compare(credentials.password, user.password);
        validateUser(passwordIsValid, user, res);
      } else {
        res.status(400).json({
          status: 'failed',
          data: { message: 'Invalid Phone Number or Password' },
        });
      }
    },
  ).catch((err) => {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  });
};

export const RefreshToken = async (req, res) => {
  const { token } = req.body;
  jwt.verify(token, process.env.REFRESH_TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        data: {
          message: 'token not valid',
        },
      });
    }
    const user = await userExists(data.user_id);
    if (user) {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Token refreshed successfully',
          ...generateTokens(user),
        },
      });
    } else {
      res.status(401).json({
        status: 'failed',
        data: {
          message: 'token not valid',
        },
      });
    }
  });
};
