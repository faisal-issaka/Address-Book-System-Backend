/* eslint-disable import/extensions */
import mongoose from 'mongoose';
import userModel from './authModel.js';
import contactModel from './contactModel.js';

export const UserModel = mongoose.model('User', userModel);
export const ContactModel = mongoose.model('Contact', contactModel);
