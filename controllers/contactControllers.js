/* eslint-disable import/extensions */
import { ContactModel } from '../models/index.js';
import { getErrorData } from '../utils/authUtils.js';

export const addContact = (req, res) => {
  const data = req.body;
  ContactModel.create(data).then((contact) => {
    res.status(201).json({
      status: 'success',
      data: {
        message: 'Contact added successfully',
        contact,
      },
    });
  }).catch((err) => {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  });
};

export const addContacts = (req, res) => {
  const data = req.body;
  ContactModel.insertMany(data).then((contacts) => {
    res.status(200).json({
      status: 'success',
      data: {
        message: 'Contacts added successfully',
        contacts,
      },
    });
  }).catch((err) => {
    const errorData = getErrorData(err);
    res.status(400).json(errorData);
  });
};

export const removeContact = (req, res) => {
  const { phone } = req.body;
  ContactModel.deleteOne({ phone })
    .then((contacts) => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Contact removed successfully',
          contacts,
        },
      });
    }).catch(() => {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'An Error Occurred',
        },
      });
    });
};

export const removeContacts = (req, res) => {
  const data = req.body;
  ContactModel.deleteMany({ phone: { $in: data } })
    .then((contacts) => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Contacts removed successfully',
          contacts,
        },
      });
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
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Contact updated successfully',
          contact,
        },
      });
    }).catch(() => {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'An Error Occurred',
        },
      });
    });
};

export const getContacts = (req, res) => {
  ContactModel.find({}, 'phone email address, name state createdAt')
    .then((contacts) => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Contacts retrieved successfully',
          contacts,
        },
      });
    }).catch(() => {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'An Error Occurred',
        },
      });
    });
};

export const getContact = (req, res) => {
  const { id } = req.params;
  ContactModel.findOne({ id }, 'phone email address name state createdAt')
    .then((contacts) => {
      res.status(200).json({
        status: 'success',
        data: {
          message: 'Contact retrieved successfully',
          contacts,
        },
      });
    }).catch(() => {
      res.status(400).json({
        status: 'failed',
        data: {
          message: 'An Error Occurred',
        },
      });
    });
};
