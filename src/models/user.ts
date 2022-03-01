import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      unique: true
    },

    firstname: {
      type: String,
      required: [true, 'First name is required']
    },

    lastname: {
      type: String,
      required: [true, 'Last name is required']
    },

    password: String,

    role: {
      type: String,
      default: 'user',
    },

    otp: {
      type: Number
    }
  },
  { timestamps: true },
);

const userSchema = mongoose.model('User', User);

export { userSchema as User };
