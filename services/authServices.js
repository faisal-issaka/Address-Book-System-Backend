import { UserModel } from '../models';

export const createUser = async (data) => UserModel.create(data);
export const findUser = async (email, data) => UserModel.findOne({ email }, data);
