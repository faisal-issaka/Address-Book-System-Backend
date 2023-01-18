/* eslint-disable import/extensions */
/* eslint-disable max-len */
import { ContactModel } from '../models/index.js';

export const createContact = async (data) => ContactModel.create(data);
export const createMultipleContacts = async (data) => ContactModel.insertMany(data);

export const getContact = async (id, data) => ContactModel.findOne({ id }, data);
export const getContacts = async (data) => ContactModel.find({}, data);

export const updateContact = async (phone, otherData) => ContactModel.updateOne({ phone }, otherData);

export const deleteContact = async (phone) => ContactModel.deleteOne({ phone });
export const deleteMultipleContacts = async (data) => ContactModel.deleteMany({ phone: { $in: data } });
