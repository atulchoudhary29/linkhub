import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullname: String,
//   photo: String,
  password: {
    type: String,
    required: true,
  },
  links: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Link',
    },
  ],
});

// Middleware to encrypt password before save
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
