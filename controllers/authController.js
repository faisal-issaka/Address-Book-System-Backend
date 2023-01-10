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
import { successResponse, successResponseWithData, unauthorizedResponse } from '../utils/apiResponse.js';

export const Register = async (req, res) => {
  const credentials = req.body;
  credentials.password = await getHashedPassword(credentials?.password);

  UserModel.create(credentials).then((user) => {
    const message = 'User created successfully';
    return successResponseWithData(res, message, { ...generateTokens(user) });
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
        const message = 'Invalid Phone Number or Password';
        return successResponse(res, message);
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
      const message = 'token not valid';
      return unauthorizedResponse(res, message);
    }
    const user = await userExists(data.user_id);
    if (user) {
      const message = 'Token refreshed successfully';
      return successResponseWithData(res, message, { ...generateTokens(user) });
    }

    const message = 'token not valid';
    return unauthorizedResponse(res, message);
  });
};
