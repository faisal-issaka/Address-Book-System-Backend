/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  getHashedPassword,
  generateTokens,
  getErrorData,
  validateUser,
  userExists,
} from '../utils/authUtils.js';
import { errorResponse, successResponseWithData, unauthorizedResponse } from '../utils/apiResponse.js';
import { createUser, findUser, updateUser } from '../services/authServices.js';

export const Register = async (req, res) => {
  const credentials = req.body;
  try {
    credentials.password = await getHashedPassword(credentials?.password);
    const user = await createUser(credentials);
    const message = 'User created successfully';
    return successResponseWithData(res, message, { ...generateTokens(user) });
  } catch (err) {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  }
};

export const Login = async (req, res) => {
  const credentials = req.body;
  const data = '+password email';
  try {
    const user = await findUser(credentials.email, data);
    if (user) {
      const passwordIsValid = await bcrypt.compare(credentials.password, user.password);
      validateUser(passwordIsValid, user, res);
    } else {
      const message = 'Invalid Phone Number or Password';
      return errorResponse(res, message);
    }
  } catch (err) {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  }
};

export const UpdateUser = async (user, req, res, _next) => {
  const data = req.body;
  try {
    const updatedUser = await updateUser(user?.id, data);
    const message = 'User updated successfully';
    return successResponseWithData(res, message, updatedUser);
  } catch (err) {
    return errorResponse(res, 'An error occurred while updating...');
  }
};

export const UpdatePassword = async (user, req, res, _next) => {
  const data = req.body;
  try {
    const password = await getHashedPassword(data?.password);
    console.log(password);
    const updatedUser = await updateUser(user?.id, { password });
    const message = 'Password updated successfully';
    return successResponseWithData(res, message, updatedUser);
  } catch (err) {
    return errorResponse(res, 'An error occurred while updating...');
  }
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
