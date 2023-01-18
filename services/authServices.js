/* eslint-disable import/extensions */
import { UserModel } from '../models/index.js';

export const createUser = async (data) => UserModel.create(data);
export const findUser = async (email, data) => UserModel.findOne({ email }, data);
