/* eslint-disable import/extensions */
import { ContactModel } from '../models/index.js';
import { errorResponse, successResponseWithData } from '../utils/apiResponse.js';
import { getErrorData } from '../utils/authUtils.js';

export const addContact = (req, res) => {
  const data = req.body;
  ContactModel.create(data).then((contact) => {
    const message = 'Contact added successfully';
    return successResponseWithData(res, message, contact);
  }).catch((err) => {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  });
};

export const addContacts = (req, res) => {
  const data = req.body;
  ContactModel.insertMany(data).then((contacts) => {
    const message = 'Contacts added successfully';
    return successResponseWithData(res, message, contacts);
  }).catch((err) => {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  });
};

export const removeContact = (req, res) => {
  const { phone } = req.body;
  ContactModel.deleteOne({ phone })
    .then((contacts) => {
      const message = 'Contact removed successfully';
      return successResponseWithData(res, message, contacts);
    }).catch(() => {
      const message = 'An Error Occurred';
      return errorResponse(res, message);
    });
};

export const removeContacts = (req, res) => {
  const data = req.body;
  ContactModel.deleteMany({ phone: { $in: data } })
    .then((contacts) => {
      const message = 'Contact removed successfully';
      return successResponseWithData(res, message, contacts);
    }).catch(() => {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'An Error Occurred',
        },
      });
    });
};

export const updateContact = (req, res) => {
  const { phone, ...otherData } = req.body;
  ContactModel.updateOne({ phone }, otherData)
    .then((contact) => {
      const message = 'Contact updated successfully';
      return successResponseWithData(res, message, contact);
    }).catch(() => {
      const message = 'An Error Occurred';
      return errorResponse(res, message);
    });
};

export const getContacts = (req, res) => {
  ContactModel.find({}, 'phone email address, name state createdAt')
    .then((contacts) => {
      const message = 'Contacts retrieved successfully';
      return successResponseWithData(res, message, contacts);
    }).catch(() => {
      const message = 'An Error Occurred';
      return errorResponse(res, message);
    });
};

export const getContact = (req, res) => {
  const { id } = req.params;
  ContactModel.findOne({ id }, 'phone email address name state createdAt')
    .then((contacts) => {
      const message = 'Contact retrieved successfully';
      return successResponseWithData(res, message, contacts);
    }).catch(() => {
      const message = 'An Error Occurred';
      return errorResponse(res, message);
    });
};
