import mongoose from 'mongoose';
import { UserDocument } from 'server/interfaces/user/user-document.interface';

const UserSchema = new mongoose.Schema<UserDocument>({
  fullname: {
    type: String,
    required: true,
    min: 2,
    max: 50
  },
  email: {
    type: String,
    max: 50,
    required: true, 
    index: true, 
    unique: true
  },
  password: {
    type: String,
    min: 6,
  },
  hasPassword: {
    type: Boolean,
  },
  githubUserId: {
    type: String,
    default: '',
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: "user",
  }
});

const User = mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
User.createIndexes();

export default User;