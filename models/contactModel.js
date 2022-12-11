import { Schema } from 'mongoose';

const contactModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => v.length >= 6 && v.length <= 18,
      message: (props) => `${props.value} is not a valid country code`,
    },
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

export default contactModel;
