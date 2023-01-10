/* eslint-disable import/extensions */
import {
  createContact, createMultipleContacts, deleteContact, deleteMultipleContacts,
} from '../services/contactServices.js';
import { errorResponse, successResponseWithData } from '../utils/apiResponse.js';
import { getErrorData } from '../utils/authUtils.js';

export const addContact = async (req, res) => {
  const data = req.body;
  try {
    const contact = await createContact(data);
    const message = 'Contact added successfully';
    return successResponseWithData(res, message, contact);
  } catch (err) {
    const errorData = getErrorData(err);
    return res.status(400).json(errorData);
  }
};

export const addContacts = async (req, res) => {
  const data = req.body;
  try {
    const contacts = await createMultipleContacts(data);
    const message = 'Contacts added successfully';
    return successResponseWithData(res, message, contacts);
  } catch (err) {
    const errorData = getErrorData(err);
    return res.status(400).json(errorData);
  }
};

export const removeContact = async (req, res) => {
  const { phone } = req.body;
  try {
    const contacts = await deleteContact(phone);
    const message = 'Contact removed successfully';
    return successResponseWithData(res, message, contacts);
  } catch (err) {
    const message = 'An Error Occurred';
    return errorResponse(res, message);
  }
};

export const removeContacts = async (req, res) => {
  const data = req.body;
  try {
    const contacts = await deleteMultipleContacts(data);
    const message = 'Contact removed successfully';
    return successResponseWithData(res, message, contacts);
  } catch (err) {
    const message = 'An Error Occurred';
    return errorResponse(res, message);
  }
};

export const updateContact = async (req, res) => {
  const { phone, ...otherData } = req.body;
  try {
    const contact = await updateContact(phone, otherData);
    const message = 'Contact updated successfully';
    return successResponseWithData(res, message, contact);
  } catch (err) {
    const message = 'An Error Occurred';
    return errorResponse(res, message);
  }
};

export const getContacts = async (req, res) => {
  const data = 'phone email address name state createdAt';
  try {
    const contacts = await getContacts(data);
    const message = 'Contacts retrieved successfully';
    return successResponseWithData(res, message, contacts);
  } catch (err) {
    const message = 'An Error Occurred';
    return errorResponse(res, message);
  }
};

export const getContact = async (req, res) => {
  const { id } = req.params;
  const data = 'phone email address name state createdAt';
  try {
    const contacts = await getContact(id, data);
    const message = 'Contact retrieved successfully';
    return successResponseWithData(res, message, contacts);
  } catch (err) {
    const message = 'An Error Occurred';
    return errorResponse(res, message);
  }
};
