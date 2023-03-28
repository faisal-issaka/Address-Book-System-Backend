/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/index.js';
import { errorResponse, successResponseWithData } from './apiResponse.js';

export const generateTokens = (user) => {
  if (user) {
    const accessToken = jwt.sign(
      {
        user_id: user._id,
        phone: user.phone,
        country_code: user.country_code,
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '2h' },
    );

    const refreshToken = jwt.sign(
      {
        user_id: user._id,
        phone: user.phone,
        country_code: user.country_code,
      },
      process.env.REFRESH_TOKEN_KEY,
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  return {};
};

export const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const getErrorData = (err) => {
  let message = 'An error occurred';
  if (err.code) {
    const { code } = err;
    const errorMessages = {
      11000: 'Email Address Exists',
    };
    message = errorMessages[code];
  } else {
    const errorKeys = Object.keys(err.errors || {});
    message = errorKeys?.length > 0 ? 'Required Field condition not satisfied' : message;
  }

  return {
    status: 'failed',
    data: {
      message,
    },
  };
};

export const validateUser = (passwordIsValid, user, res) => {
  if (passwordIsValid) {
    const data = { ...user._doc, ...generateTokens(user) };
    delete data.password;
    return successResponseWithData(res, 'User logged in successfully', data);
  }
  return errorResponse(400, 'Invalid Email Address or Password');
};

export const userExists = async (id) => {
  let userData = {};
  await UserModel
    .findOne({ _id: id }, '_id email firstName lastName gender mobileNumber picture')
    .then((user) => {
      userData = user;
    }).catch((err) => {
      console.error(err);
    });

  return userData;
};
