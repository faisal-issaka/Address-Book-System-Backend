/* eslint-disable max-len */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { userExists } from '../utils/authUtils.js';

export const validateCredentials = (req, res, next) => {
  const path = req.path.split('/')[1];
  const credentials = req.body;
  const requiredFields = {
    register: 2,
    login: 2,
    'add-contact': 3,
    'remove-user': 1,
    'remove-contact': 1,
    'update-contact': 2,
    'get-contacts': 0,
    'get-contact': 0,
  };

  const arrayAsBody = ['add-contacts', 'remove-contacts'];

  const validateObjData = () => {
    if ((Object.keys(credentials).length >= requiredFields[path]) && (Object.values(credentials).every((elt) => elt !== ''))) {
      next();
    } else {
      return res.status(400).json({
        status: 'failed',
        data: {
          message: 'Missing credentials',
        },
      });
    }
  };

  const validateArrayData = () => {
    const isValidCredentials = credentials.every(
      (elt) => (Object.keys(elt).length >= requiredFields[path.slice(0, path.length - 1)]) && (Object.values(elt).every((field) => field !== '')),
    );
    return isValidCredentials;
  };

  if (arrayAsBody.includes(path)) {
    if (validateArrayData()) {
      next();
    } else {
      return res.status(400).json({ status: 'failed', data: { message: 'Missing credentials' } });
    }
  } else {
    validateObjData();
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        data: {
          message: 'token not valid',
        },
      });
    }
    const user = await userExists(data.user_id);
    return user ? next() : (
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'token not valid',
        },
      })
    );
  });
};
