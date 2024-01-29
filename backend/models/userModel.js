import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [200, 'your name cannot exceed 50 characters'],
    },

    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },

    password: {
      type: String,
      required: [true, 'Please enter your password'],
      maxLength: [6, 'your password should be longer than 6 characters'],
      select: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },

    role: {
      type: String,
      default: 'user',
    },
  },
  { timestamps: true }
);

// encrypting password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', userSchema);

export default User;
