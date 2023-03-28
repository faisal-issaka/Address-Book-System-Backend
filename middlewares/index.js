/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';
import { userExists } from '../utils/authUtils.js';

export const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
    if (err) return errorResponse(res, 'Token not valid');
    const user = await userExists(data.user_id);
    return user ? next(user) : errorResponse(res, 'Token not valid');
  });
};
