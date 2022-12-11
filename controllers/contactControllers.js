/* eslint-disable import/extensions */
import { ContactModel } from '../models/index.js';
import { getErrorData } from '../utils/authUtils.js';

export const addContact = async (req, res) => {
  const data = req.body;
  await ContactModel.create(data).then((contact) => {
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

export const addContacts = async (req, res) => {
  const data = req.body;
  await ContactModel.insertMany(data).then((contacts) => {
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

export const removeContact = async (req, res) => {
  const { phone } = req.body;
  await ContactModel.deleteOne({ phone })
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

export const removeContacts = async (req, res) => {
  const data = req.body;
  await ContactModel.deleteMany({ phone: { $in: data } })
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

export const updateContact = async (req, res) => {
  const { id, ...otherData } = req.body;
  await ContactModel.updateOne({ _id: id }, otherData)
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

export const getContacts = async (req, res) => {
  await ContactModel.find({}, 'phone email address, name state createdAt')
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

export const getContact = async (req, res) => {
  const { id } = req.params;
  await ContactModel.findOne({ id }, 'phone email address name state createdAt')
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
