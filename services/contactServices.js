/* eslint-disable max-len */
import { ContactModel } from '../models';

// !create
export const createContact = async (data) => ContactModel.create(data);
export const createMultipleContacts = async (data) => ContactModel.insertMany(data);

// !read
export const getContact = async (id, data) => ContactModel.findOne({ id }, data);
export const getContacts = async (data) => ContactModel.find({}, data);

// !update
export const updateContact = async (phone, otherData) => ContactModel.updateOne({ phone }, otherData);

// !delete
export const deleteContact = async (phone) => ContactModel.deleteOne({ phone });
export const deleteMultipleContacts = async (data) => ContactModel.deleteMany({ phone: { $in: data } });
